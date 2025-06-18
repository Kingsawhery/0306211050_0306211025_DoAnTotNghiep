import "./EditPost.css";
import { Button, Form } from "react-bootstrap";
import Editor from "../../../../../components/CKEditor/Editor";
import { useEffect, useState, useRef } from "react";
import { createPost, getPostPage, pustPost } from "../../../../../services/postService";
import { ImageAspectRatio } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, ClipLoader, RiseLoader, RotateLoader, SkewLoader } from "react-spinners";

const EditPost = () => {
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    sum: "",
    fileUpload: {},
    image: "",
    listProductId: [],
  });

  const { id } = useParams();
  const uploadRef = useRef(null);
  const documentRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      const rs = await getPostPage(id);
      if (rs) {
        setData({
          title: rs.title,
          sum: rs.summary,
          image: rs.image,
          fileUpload: {},
          id: id,
        });
        setContent(rs.content);
      }
    };
    fetchPost();
  }, [id]);

//   useEffect(() => {
//     documentRef.current.innerHTML = content;
//   }, [content]);

  const handleChangeFile = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
      alert("Chỉ được tải lên hình ảnh!");
      return;
    }

    const file = imageFiles[0];
    setData({ ...data, fileUpload: file, image: file.name });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdatePost = async () => {
    try {
      const rs = await pustPost(data, content);
      if(rs.err==="success"){
      alert(rs.message);
        navigate("/admin/tin-tuc")
      }else{
        alert(rs.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="label">Tiêu đề bài viết</Form.Label>
          <Form.Control
            value={data.title}
            as="textarea"
            rows={3}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Form.Group>

        <Form.Control
          type="file"
          accept="image/*"
          multiple
          ref={uploadRef}
          onChange={handleChangeFile}
          style={{ display: "none" }}
        />

        {previewImage ? (
          <div className="div-post-img-admin">
            <img
              src={previewImage}
              alt="preview"
              onClick={() => uploadRef.current.click()}
            />
            <div className="cover"><SkewLoader/></div>
          </div>
        ) : (
          <ImageAspectRatio
            className="upload-icon"
            onClick={() => uploadRef.current.click()}
          />
        )}

        <Form.Group className="mb-3">
          <Form.Label className="label">Tóm tắt bài viết</Form.Label>
          <Form.Control
            value={data.sum}
            as="textarea"
            rows={3}
            onChange={(e) => setData({ ...data, sum: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">Nội dung bài viết</Form.Label>
          <Editor value={content} setValue={setContent} />
        </Form.Group>
      </Form>

      <div className="btn-submit">
        <Button onClick={handleUpdatePost}>Cập nhật</Button>
      </div>

      {/* <div className="ql-editor" ref={documentRef}></div> */}
    </>
  );
};

export default EditPost;
