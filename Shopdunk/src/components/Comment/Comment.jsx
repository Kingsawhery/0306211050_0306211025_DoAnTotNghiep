import React, { useEffect, useState } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import "./Comment.scss"
import { toast } from 'react-toastify';
import { getComment } from '../../services/commentService';
export default function Comment({id}) {
    const image = JSON.parse(localStorage.getItem("user"));
    const [rawData, setRawData] = useState([]);
    const handleGetComment = async() =>{
        try{
            const rs = await getComment(id);
            if(rs){
                setRawData(rs)
            }
            
        }catch(e){
            toast("Đã có lỗi xảy ra!")
        }
    }
//   const rawData = [
//     {
//       userId: 8,
//       comId: 13,
//       fullName: "Nguyễn Hoàng Lâm",
//       text: "Hello",
//       avatarUrl: "download.jpg",
//       timestamp: "2025-06-29T21:16:33.000Z",
//       replies: [
//         {
//           userId: 1,
//           comId: 14,
//           fullName: "lamnguyen",
//           text: "Xin chào lại nha",
//           avatarUrl: "lamnguyen.jpg",
//           timestamp: "2025-06-29T21:31:57.000Z"
//         },
//         {
//             userId: 3,
//             comId: 15,
//             fullName: "Thương Nguyễn nè",
//             text: "Chào clmm",
//             avatarUrl: "messenger.png",
//             timestamp: "2025-06-29T21:31:57.000Z"
//           }
//       ]
//     }
//   ];
useEffect(()=>{handleGetComment()},[])
  const normalizeComments = (data) => {
    return data.map(comment => ({
      comId: comment.comId.toString(),
      userId: comment.userId.toString(),
      fullName: comment.fullName,
      text: comment.text,
      avatarUrl: `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${comment.avatarUrl}`,
      timestamp: comment.timestamp,
      replies: comment.replies.map(reply => ({
        comId: reply.comId?.toString(),
        userId: reply.userId?.toString(),
        fullName: reply.fullName,
        text: reply.text,
        avatarUrl: `${process.env.REACT_APP_LOCALHOST_SERVER}/userImage/${reply.avatarUrl}`,
        timestamp: reply.timestamp
        // Không có replies trong reply => không hiện nút reply
      }))
    }));
  };

  const commentData = normalizeComments(rawData);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <CommentSection
        currentUser={{
          currentUserId: '1',
          currentUserFullName: 'Haha',
          currentUserImg:"ss"
        }}
        logIn={{
          onLogin: () => alert('Call login function'),
          signUpLink: 'http://localhost:3001/',
        }}
        commentData={commentData}
        placeholder="Viết bình luận của bạn..."
        onSubmitAction={(data) => {
          console.log('📝 Submitted comment:', data);
        }}
        currentData={(data) => {
          console.log('📦 Current comments:', data);
        }}
      />
    </div>
  );
}
