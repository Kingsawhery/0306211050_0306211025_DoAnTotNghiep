const commentService = require('../services/commentService');

const handleGetCommentsByProductDetailId = async (req, res) => {
  try {
    const { productDetailId } = req.query;

    if (!productDetailId) {
      return res.status(400).json({ message: "Thiếu productDetailId" });
    }

    const comments = await commentService.getCommentsByProductDetailId(productDetailId);
    return res.status(200).json(comments);
  } catch (err) {
    console.error("💥 Lỗi khi lấy comment:", err);
    return res.status(500).json({ message: "Có lỗi xảy ra khi lấy bình luận" });
  }
};

module.exports = {
    handleGetCommentsByProductDetailId,
};