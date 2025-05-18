import { UploadFile, UploadFileOutlined, UploadFileSharp } from '@mui/icons-material';
import { ImageListItem } from '@mui/material';
import { useRef, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { uploadChangeStatus } from '../../../../../services/invoiceService';

function ModalUpload(props) {
    const uploadRef = useRef(null);
    const [fileDemo, setFileDemo] = useState([])
    const [showImage, setShowImage] = useState(false)
    const [dataUpload,setDataUpload] = useState({
        invoiceCode:props.invoiceCode,
        username:props.username,
        fileUpload:[],
    })
    const handleUploadFile = async() =>{
        if(dataUpload.fileUpload.length > 0 && dataUpload.invoiceCode !== "" && dataUpload.username !== "")
        {
            const rs = await uploadChangeStatus(dataUpload);
            if(rs){
                alert("Chuyển trang thái sang đã xác nhận thành công!");
                props.handleGetAllInvoiceByStatus();
                props.setShowFileUpload(false);
            }
        }
    }
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        console.log(files[0]);
        const imageFiles = files.filter(file => file.type.startsWith("image/"));

  if (imageFiles.length !== files.length) {
    alert("Chỉ được tải lên hình ảnh!");
    
  }else{
    setDataUpload({...dataUpload, fileUpload: files})
    try {
        setFileDemo([])
        for(let i = 0; i < files.length ; i++)
        {
            setFileDemo((prevImages) => [
                ...prevImages,
                {
                  fileName: files[i].name,
                  img: URL.createObjectURL(files[i]),
                },
              ]);
        }
            
          
      } catch (e) {
        console.log(e);
      }

  }
       
        
    };

    return (
        <div className='modal-upload-covercover'

            style={{
                backgroundColor: "#ffffff",
                height: "500px",
                padding: "12px",
                width: "400px",
                borderRadius: "12px",
                border: "1px solid gray"
            }}
        >
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control as="textarea" placeholder="Ghi chú"
                        style={{
                            width: "100%",
                            height: "140%",
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Hình ảnh</Form.Label>
                    <div className='upload-file-pic'
                        style={{
                            height: "250px",
                            width: "100%",
                            border: "1px solid gray",
                            borderRadius: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <div className="main-upload-file"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                alignItems: "center"
                            }}

                        >
                            <h6>Tải hình ảnh thanh toán lên</h6>
                            <UploadFileOutlined style={{ fontSize: "40px" }} />
                            <Button style={{
                                background: "#4f85d4"
                            }}
                                onClick={
                                    () => {
                                        uploadRef.current.click();
                                    }
                                }
                            >Browse File</Button>
                            {dataUpload.fileUpload.length > 0 ? <p onClick={() => {
                                setShowImage(true)
                            }}>Xem hình ảnh</p> : <></>}
                        </div>
                        {showImage && <div className="fileDemo"
                            onClick={() => {
                                setShowImage(false)
                            }}
                            style={{
                                position: "absolute",
                                height: "820px",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backdropFilter: "blur(10px)"
                            }}
                        >
                            <div onClick={(e) => e.stopPropagation()}>
                                <ImageList
                                    sx={{ width: 500, height: 450 }}
                                    variant="quilted"
                                    cols={2}
                                    rowHeight={300}
                                    
                                >
                                    {fileDemo.length > 0 && fileDemo.map((item) => (
                                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                            <img
                                                // {...srcset(item.img, 121, item.rows, item.cols)}
                                                srcset={item.img}
                                                alt={item.title}
                                                loading="lazy"
                                                style={{
                                                    objectFit:"contain"
                                                }}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>

                            </div>
                        </div>
                        }
                    </div>
                    <Form.Control type="file" rows={4}
                        ref={uploadRef}
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{

                            display: "none",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Form.Group>
            </Form>
            <div className=''
            style={{
                display:"flex",
                flexDirection:"row-reverse"
            }}>
                <Button onClick={()=>{
                    handleUploadFile();
                    // console.log(dataUpload);
                    
                }}>Next</Button>
            </div>
        </div>

    );
}
export default ModalUpload;