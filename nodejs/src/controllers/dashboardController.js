const { dashboardTop10SubProd, dashboardTop10Product, sumInvoiceByUser, dashboardTop10SubCate, dashboardTop10Brand, dashboardTop10Invoices } = require("../services/dashboardService");

const getTopTenProd = async (req, res) => {
  try {
    const data = req.query;
    const rs = await dashboardTop10Product(data.year, data.month);
    if (rs) {
      return res.status(200).json({ data: rs });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }
};
const getTop10User = async (req, res) => {
  try {
    const data = req.query;
    const rs = await sumInvoiceByUser(data.year, data.month);
    if (rs) {
      return res.status(200).json({ data: rs });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getTopTenSubProd = async (req, res) => {
  try {
    const data = req.query;
    const rs = await dashboardTop10SubProd(data.year, data.month);
    if (rs) {
      return res.status(200).json({ data: rs });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }
};
const getTopTenSubCate = async (req, res) => {
  try {
    const data = req.query;
    const rs = await dashboardTop10SubCate(data.year, data.month);
    if (rs) {
      return res.status(200).json({ data: rs });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }
};
const getTopTenBrand = async (req, res) => {
  try {
    const data = req.query;
    const rs = await dashboardTop10Brand(data.year, data.month);
    if (rs) {
      return res.status(200).json({ data: rs });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getTop10Invoices = async (req, res) => {
  try {
    const data = req.query;
    const rs = await dashboardTop10Invoices(data.year, data.month);
    if (rs) {
      return res.status(200).json({ data: rs });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }
};
module.exports = {
  getTopTenProd,
  getTopTenSubProd,
  getTop10User,
  getTopTenSubCate,
  getTopTenBrand,
  getTop10Invoices
};
