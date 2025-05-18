const crypto = require('crypto');
const https = require('https');
const ngrok = require('ngrok');
const axios = require('axios');

async function getNgrokUrl() {
    try {
        // Check xem ngrok đã mở tunnel nào chưa
        const res = await axios.get('http://127.0.0.1:4040/api/tunnels');
        const tunnels = res.data.tunnels;

        if (tunnels.length > 0) {
            return tunnels[0].public_url;
        }

        // Nếu chưa có tunnel nào → mở mới
        return await ngrok.connect({ addr: 8000 });
    } catch (err) {
        throw new Error('Ngrok failed: ' + err.message);
    }
}
export const paymentMoMo = (data) => {
    return new Promise(async (resolve, reject) => {
        const partnerCode = "MOMO";
        const accessKey = "F8BBA842ECF85";
        const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        const redirectUrl = "http://localhost:3000/";
        let publicUrl;
        try {
            publicUrl = await getNgrokUrl();
        } catch (err) {
            return reject(err); // hoặc xử lý theo context của bạn
        }

        const ipnUrl = `${publicUrl}/api/callback`;
        const requestType = "captureWallet";
        const lang = "en";
        const amount = data.total;
        const requestId = partnerCode + new Date().getTime();
        const orderId = requestId;
        const extraData = "";
        const orderInfo = data.name;
        const rawSignature =
            `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
            `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
            `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = JSON.stringify({
            partnerCode,
            accessKey,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature,
            lang
        });

        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        const momoReq = https.request(options, momoRes => {
            let data = '';
            momoRes.on('data', chunk => data += chunk);
            momoRes.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result && result.payUrl) {
                        resolve(result.payUrl); // ✅ trả về URL MoMo
                    } else {
                        reject(new Error('Failed to get payUrl'));
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });

        momoReq.on('error', err => {
            reject(err);
        });

        momoReq.write(requestBody);
        momoReq.end();
    });
};