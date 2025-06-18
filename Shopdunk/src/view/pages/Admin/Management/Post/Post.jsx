import "./Post.scss";
import { Button, Form } from "react-bootstrap";
import Editor from "../../../../../components/CKEditor/Editor";
import { useEffect, useState, useRef } from "react";
import {createPost} from "../../../../../services/postService"
import 'react-quill/dist/quill.snow.css';
import { ImageAspectRatio } from "@mui/icons-material";

const Post = () => {
  const [value, setValue] = useState('');
  const [document, setDocument] = useState();
  const documentRef = useRef(null);
  const uploadRef = useRef(null);

  const [fileDemo, setFileDemo] = useState("")
  const [data, setData] = useState({
    title: "",
    sum: "",
    content: "",
    fileUpload:{},
    image:"",
    listProductId:[]
  })
  const options = ['Apple', 'Banana', 'Orange', 'Mango'];
  const handleChangeProductFields = (event) => {
    console.log(event.target.selectedOption);
    
    setData({...data, listProductId:event.target.selectedOption});
  };
  const handleAddPost = async ()=>{
    try{
      const rs = await createPost(data);
      if(rs.err == "success"){
        alert(rs.message)
      }else{
        alert(rs.message)
      }
    }
    catch(e){
      console.log(e); 
    }
  }
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
        alert("Chỉ được tải lên hình ảnh!");
    } else {
        setData({ ...data, fileUpload: files[0],image:files[0].name });
        setFileDemo("");
        for (let i = 0; i < files.length; i++) {
            setFileDemo(URL.createObjectURL(files[i]));
        }
    }
};
  useEffect(() => {
    documentRef.current.innerHTML = value;
  }, [value])
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="label">Tiêu đề bài viết</Form.Label>
          <Form.Control onChange={(e) => {
            setData({ ...data, title: e.target.value })
          }} as="textarea" rows={3} />
        </Form.Group>
        <Form.Control style={{
          display:"none"
        }} type="file" multiple accept="image/*" onChange={handleFileChange} ref={uploadRef} />
        <ImageAspectRatio onClick={()=>{
          uploadRef.current.click();
        }} />
        {fileDemo !== "" && <img src={fileDemo}></img>}
        <Form.Group className="mb-3" controlId="discription">
          <Form.Label className="label">Tóm tắt bài viết</Form.Label>
          <Form.Control onChange={(e) => {
            setData({ ...data, sum: e.target.value })
          }} as="textarea" rows={3} />
        </Form.Group>
        <div>
    </div>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label className="label">Nội dung bài viết</Form.Label>
          <Editor value={data} setValue={setData} />
        </Form.Group>
      </Form>
      <div style={
        {
          width: "100%",
          display:"flex",
          justifyContent:"end"
        }
      }><Button onClick={()=>{
        handleAddPost();
        
      }}>Create</Button>
      </div>
      <div className="ql-editor" ref={documentRef}>
      </div>
    </>
  );
};
export default Post;
