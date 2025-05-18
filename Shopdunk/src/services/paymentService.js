import axios from "axios";
import instance from "./customAxios"
export const handleMockDataPayment = () =>{
    return axios.post(process.env.REACT_APP_API_SERVER + "/callback",{
        partnerCode: 'MOMO',
        orderId: 'MOMO1746496228780',
        requestId: 'MOMO1746496228780',
        amount: 20000,
        orderInfo: 'Hóa đơn cho khách hàng Lâm Nguyễn Hoàng mã hóa đơn IVTKQPO',
        orderType: 'momo_wallet',
        transId: 3301543729,
        resultCode: 0,
        message: 'Successful.',
        payType: 'qr',
        responseTime: 1746496245459,
        extraData: '',
        signature: 'a22e52b56cf6aafce2fdf493eeaf0310b85b3c356a48c8591d6feeef1dbe56b9'
      });
}
