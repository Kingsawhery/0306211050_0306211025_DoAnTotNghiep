import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import "./CreateNewProduct.scss";
import { Container, FormSelect } from "react-bootstrap";
import { getAllCategoryNames } from "../../../../../services/categoryService";
import { getSubCategoryByCategoryId } from "../../../../../services/subCategory";
import { useEffect, useState } from "react";
import { validateNumber } from "../../../../../function/validate";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { postProduct } from "../../../../../services/product";
const CreateNewProduct = () => {
  const [listCategories, setListCategories] = useState([]);
  const [listSubCategories, setListSubCategories] = useState([]);
  const [imageDemo,setImageDemo] = useState("");
  const [imageFile,setImageFile] = useState({});
  const fileRef = useRef(null);
  const [data, setData] = useState({
    price:0,
    promotion:0,
    category:"",
    subCategoryName:"",
    subCategory:"",
    name:"",
    stock:0,
    image:""
  });
  const [validateData,setValidation] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(0);
  useEffect(() => {
    getAllNameCategory();
  }, []);
  useEffect(() => {
    getSubCategoriesName();
    setData({ ...data, subCategory: 0 });
  }, [categorySelected]);
  const getAllNameCategory = async () => {
    const listNames = await getAllCategoryNames();
    if (listNames) {
      setListCategories(listNames);
    }
  };
  const getSubCategoriesName = async () => {
    const listNames = await getSubCategoryByCategoryId(categorySelected);
    if (listNames) {
      setListSubCategories(listNames);
    }
  };
  const handleData = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(validateNumber(data.price));
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async() =>{
    try{
      const result  = await postProduct(data);

    }catch(e){
      toast("Data is invalid!")
    }
    

  }
  const handleImageDemo = (e) =>{
    try{
      const exe = e.target.files[0].name.split(".")[e.target.files[0].name.split(".").length - 1]

      if(exe === "png" || exe === "jpeg" || exe === "jpg" ){
        if (e.target.files[0]) {
          setData({
            ...data,
            image: e.target.files[0].name,
            fileImage:e.target.files[0]
          });
        }
        let preview = URL.createObjectURL(e.target.files[0]);
        setImageDemo(preview);
      }
      
     
    }catch(e){
      console.log(e);
    } 
  
  }

  return (
    <>
      <Container className="div-cover">
        
        <Form className="form-add-product">
        <input className="d-none" ref={fileRef} type="file" onChange={handleImageDemo}/>
        {imageDemo !== "" ? <img className="image-demo" src={imageDemo}/>:<div className="add-new-image" onClick={()=>{
        fileRef.current.click();
        }}>
        <FontAwesomeIcon icon={faPlus} style={{color: "#707070",}} />
      </div>}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProductName">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
              onChange={handleData}
                name="name"
                type="ProductName"
                placeholder="Enter Product Name"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProductName" className="col-6">
              <Form.Select
                name="category"
                aria-label="Default select example"
                onChange={(e) => {
                  setCategorySelected(e.target.value);
                  handleData(e);
                }}
              >
                <option value={0}>Danh mục</option>
                {listCategories &&
                  listCategories.length > 0 &&
                  listCategories.map((item, index) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridProductName" className="col-6">
              <Form.Select
                name="subCategory"
                onChange={(e)=>{
                  const id = e.target.value;
                  const name = e.target.selectedOptions[0].getAttribute("name");    
                  setData({...data,subCategory:id,subCategoryName:name})
                }}
                value={data.subCategory}
                disabled={categorySelected != 0 ? false : true}
                aria-label="Default select example"
              >
                <option value={0}>Danh mục con</option>
                {listSubCategories &&
                  listSubCategories.length > 0 &&
                  listSubCategories.map((item, index) => {
                    return <option  name={item.name} value={item.id}>{item.name}</option>;
                  })}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group className="mb-2 col-6" controlId="formGridPrice1" >
              <Form.Label >Price</Form.Label>
              <Form.Control
              onChange={handleData}
                name="price"
                placeholder="Enter price..."
                type="number"
                pattern="[0-9]*"
              />
              {!data.price && !validateNumber(data.price) ? (<p className="text-danger error-message">Vui lòng chỉ nhập số!</p>):<></>}
            </Form.Group>

            <Form.Group className="mb-2 col-6" controlId="formGridPromotion1">
              <Form.Label >Promotion</Form.Label>
              <Form.Control
              onChange={handleData}
                name="promotion"
                placeholder="Enter promotion..."
                type="number"
                pattern="[0-9]*"
              />
              {!data.promotion && !validateNumber(data.promotion) ? (<p className="text-danger error-message">Vui lòng chỉ nhập số!</p>):<></>}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Control name="stock" type="number" onChange={handleData}/>
            </Form.Group>
          </Row>
            <div className="div-btn">
            <Button onClick={handleSubmit} className="btn-submit" variant="primary" >
            Tạo
          </Button>
            </div>
          
        </Form>
      </Container>
    </>
  );
};
export default CreateNewProduct;
