// services/commentService.js
const db = require('../models');

const getCommentsByProductDetailId = async (productDetailId) => {
  try {
    const parentComments = await db.Comment.findAll({
      where: {
        productDetailId: productDetailId,
        parentId: null
      },
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'username', 'image']
        },
        {
          model: db.Comment,
          as: 'replies',
          include: [
            {
              model: db.User,
              as: 'user',
              attributes: ['id', 'username', 'image']
            }
          ],
          order: [['createdAt', 'ASC']]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const formattedComments = parentComments.map(parent => ({
      userId: parent.userId,
      comId: parent.id,
      fullName: parent.user?.username || 'Ẩn danh',
      text: parent.text,
      avatarUrl: parent.user?.image || 'https://ui-avatars.com/api/name=No+Name',
      timestamp: parent.createdAt,
      replies: parent.replies.map(reply => ({
        userId: reply.userId,
        comId: reply.id,
        fullName: reply.user?.username || 'Ẩn danh',
        text: reply.text,
        avatarUrl: reply.user?.image || 'https://ui-avatars.com/api/name=No+Name',
        timestamp: reply.createdAt
      }))
    }));

    return formattedComments;
  } catch (err) {
    console.error("🔥 Lỗi lấy comment:", err);
    throw err;
  }
};

module.exports = {
  getCommentsByProductDetailId,
};
