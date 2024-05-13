import "./Post.scss";
import { Form } from "react-bootstrap";
import Editor from "../../../../../components/CKEditor/Editor";
import { useEffect, useState, useRef } from "react";
import 'react-quill/dist/quill.snow.css';

const Post = () => {
  const [value, setValue] = useState('');
  const [document,setDocument] = useState();
  const documentRef = useRef()
  useEffect(()=>{
    documentRef.current.innerHTML = value;
  },[value])
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="label">Tiêu đề bài viết</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="discription">
          <Form.Label className="label">Tóm tắt bài viết</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label className="label">Nội dung bài viết</Form.Label>
          <Editor value={value} setValue={setValue}/>
        </Form.Group>
      </Form>
      <div className="ql-editor" ref={documentRef}>
      </div>
    </>
  );
};
export default Post;
