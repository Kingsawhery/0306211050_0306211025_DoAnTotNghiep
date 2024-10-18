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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  postProduct,
  getAllTypeClassify,
  getTypeClassifyDetail,
} from "../../../../../services/product";
import { ImageList, ImageListItem } from "@mui/material";
import DivClassify from "./DivClassify";
import { AddCircleOutline, Label } from "@mui/icons-material";
const CreateNewProduct = () => {
  const [listTypeClassify, setListTypeClassify] = useState([]);
  const [disable, setDisable] = useState({});
  const [detailData, setDetailData] = useState([
    {
      id: 0,
      label: "",
      data: [
        {
          id: 0,
          labelData: "",
          data: "",
        },
      ],
    },
  ]);
  const [listCategories, setListCategories] = useState([]);
  const [listSubCategories, setListSubCategories] = useState([]);
  const [imageDemo, setImageDemo] = useState([]);
  // const [imageFile, setImageFile] = useState({});
  const fileRef = useRef(null);
  const [data, setData] = useState({
    price: 1000,
    promotion: 0,
    category: "",
    subCategoryName: "",
    subCategory: "",
    name: "",
    stock: 0,
    image: "",
    fileImage: [],
    typeClassifies: [],
    typeClassifyDetail: [],
  });
  const [validateData, setValidation] = useState(false);
  const [state, setState] = useState(0);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(0);
  const [typeClassifyDetail, setTypeClassifyDetail] = useState([]);
  useEffect(() => {
    getAllNameCategory();
    getTypeClassify();
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
  const getTypeClassify = async () => {
    const listTypeClassify = await getAllTypeClassify();
    if (listTypeClassify) {
      setListTypeClassify(listTypeClassify);
    }
  };
  const getClassifyDetailData = async (id) => {
    const result = await getTypeClassifyDetail(id);
    if (
      result &&
      typeClassifyDetail.find((item) => item.id === id) === undefined
    ) {
      setTypeClassifyDetail([...typeClassifyDetail, { id: id, data: result }]);
      // console.log(typeClassifyDetail);
    }
  };
  const handleClearTypeClassifyDetail = (setDataTypeClassify) => {
    setDataTypeClassify([]);
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
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handleSubmit = async () => {
    try {
      
      const result = await postProduct({
    price: data.price,
    promotion: data.promotion,
    category: data.category,
    subCategoryName: data.subCategoryName,
    subCategory: data.subCategory,
    name: data.name,
    stock: data.stock,
    image: data.image,
    fileImage: data.fileImage,
    typeClassifies: data.typeClassifies,
    typeClassifyDetail: data.typeClassifyDetail,
    detailData: JSON.stringify(detailData)
      });
      
    } catch (e) {
      toast.dismiss();
      toast("Data is invalid!");
      console.log(e);
      
    }
  };
  const handleImageDemo = (e) => {
    try {
      console.log(e.target.files.length);
      for (let i = 0; i < e.target.files.length; i++) {
        let exe =
          e.target.files[i].name.split(".")[
            e.target.files[i].name.split(".").length - 1
          ];

        if (exe !== "png" && exe !== "jpeg" && exe !== "jpg") {
          continue;
        } else {
          setData((prevData) => ({
            ...prevData,
            image: e.target.files[0].name,
            fileImage: [...(prevData.fileImage || []), e.target.files[i]],
          }));
          setImageDemo((prevImages) => [
            ...prevImages,
            {
              fileName: e.target.files[i].name,
              img: URL.createObjectURL(e.target.files[i]),
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container className="div-cover">
        <Form className="form-add-product">
          <input
            className="d-none"
            ref={fileRef}
            type="file"
            onChange={handleImageDemo}
            multiple
          />
          {imageDemo.length > 0 ? (
            <ImageList
              sx={{ width: 500, height: 300 }}
              variant="quilted"
              cols={3}
              rowHeight={121}
            >
              {imageDemo.map((item, index) => (
                <ImageListItem key={index} cols={1} rows={1}>
                  <img
                    alt={item.fileName}
                    className="image-item"
                    style={
                      item.fileName == data.image
                        ? { border: "4px solid gray" }
                        : {}
                    }
                    src={item.img}
                    loading="lazy"
                    onClick={() => {
                      setData({ ...data, image: item.fileName });
                      console.log(data.image)
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <div
              className="add-new-image"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "#707070" }} />
            </div>
          )}

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProductName">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                onChange={handleData}
                name="name"
                style={{ width: "100%" }}
                type="ProductName"
                placeholder="Enter Product Name"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="formGridProductName"
              className="col-6"
            >
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
            <Form.Group
              as={Col}
              controlId="formGridProductName"
              className="col-6"
            >
              <Form.Select
                name="subCategory"
                onChange={(e) => {
                  const id = e.target.value;
                  const name = e.target.selectedOptions[0].getAttribute("name");
                  setData({ ...data, subCategory: id, subCategoryName: name });
                }}
                value={data.subCategory}
                disabled={categorySelected != 0 ? false : true}
                aria-label="Default select example"
              >
                <option value={0}>Danh mục con</option>
                {listSubCategories &&
                  listSubCategories.length > 0 &&
                  listSubCategories.map((item, index) => {
                    return (
                      <option  name={item.name} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group className="mb-4 col-6" controlId="formGridPrice1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={handleData}
                value={data.price}
                defaultValue={1000}
                name="price"
                placeholder="Enter price..."
                type="number"
                style={{ width: "100%" }}
                pattern="[0-9]*"
                min={1000}
              />
              {!data.price && !validateNumber(data.price) ? (
                <p className="text-danger error-message">
                  Vui lòng chỉ nhập số!
                </p>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group className="mb-2 col-6" controlId="formGridPromotion1">
              <Form.Label>Promotion</Form.Label>
              <Form.Control
                onChange={handleData}
                name="promotion"
                placeholder="Enter promotion..."
                type="number"
                pattern="[0-9]*"
                style={{ width: "100%" }}
                min={0}
                max={100}
              />
              {!data.promotion && !validateNumber(data.promotion) ? (
                <p className="text-danger error-message">
                  Vui lòng chỉ nhập số!
                </p>
              ) : (
                <></>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Tồn kho</Form.Label>
              <Form.Control
                style={{ width: "100%" }}
                name="stock"
                type="number"
                min={0}
                onChange={handleData}
                defaultValue={0}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phân loại</Form.Label>
              {/* <Form.Select
                // style={{ width: "100%" }}
                multiple
                name="type-classify"
                type="select"

                onChange={(e)=>{
                  if(data.typeClassifies.find(element => element == e.target.value)){
                    setData({...data,typeClassifies:[...data.typeClassifies.filter(num => num !== e.target.value)]})
                  }else{
                    setData({...data,typeClassifies:[...data.typeClassifies,e.target.value]})
                  }
                }}
                >
              {listTypeClassify.map(option => (
            <option style={data.typeClassifies.includes(`${option.id}`) ? {backgroundColor:"gray"} : {backgroundColor:"#ffffff"} } key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
          </Form.Select> */}
              <div className="classify" style={{ display: "flex" }}>
                <Form>
                  {listTypeClassify &&
                    listTypeClassify.length > 0 &&
                    listTypeClassify.map((item, index) => {
                      const id = item.id;
                      return (
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          value={item.id}
                          label={`${item.name}`}
                          disabled={disable[id]}
                          // disabled={}
                          onChange={(e) => {
                            if (
                              data.typeClassifies.find(
                                (element) => element == item.id
                              )
                            ) {
                              setData({
                                ...data,
                                typeClassifies: [
                                  ...data.typeClassifies.filter(
                                    (num) => num !== item.id
                                  ),
                                ],
                              });
                              setState(item.id);
                            } else {
                              setData({
                                ...data,
                                typeClassifies: [
                                  ...data.typeClassifies,
                                  item.id,
                                ],
                              });
                            }
                            setTypeClassifyDetail((prev) =>
                              prev.filter((i) => i.id !== item.id)
                            );
                            if (
                              typeClassifyDetail.find((i) => i.id == item.id) ==
                                undefined &&
                              !data.typeClassifies.includes(
                                Number(e.target.value)
                              )
                            ) {
                              getClassifyDetailData(item.id);
                            }
                          }}
                        />
                      );
                    })}
                </Form>
                {typeClassifyDetail &&
                  typeClassifyDetail.length > 0 &&
                  typeClassifyDetail.map((item, index) => {
                    return (
                      <DivClassify
                        disable={disable}
                        setDisable={setDisable}
                        state={state}
                        data={item}
                        dataCreate={data}
                        setDataCreate={setData}
                      />
                    );
                  })}
              </div>
            </Form.Group>
          </Row>
          <div className="detail">
            <Form.Label>Chi tiết sản phẩm</Form.Label>
            {detailData &&
              detailData.length > 0 &&
              detailData.map((detailDataItem, indexDetail) => {
                return (
                  <>
                    <Form.Group key={indexDetail} className="g-0">
                      <Col md={12}>
                        <Form.Label>Tên Phân Loại</Form.Label>
                        <div className="d-flex align-items-center name-detail">
                          <Form.Control
                            name={`name-detail-${indexDetail}`}
                            style={{ width: "100%" }}
                            type="text"
                            value={
                              detailData.find(
                                (item) => item.id === detailDataItem.id
                              ).label
                            }
                            onChange={(e) => {
                              setDetailData((prevState) =>
                                prevState.map((item) =>
                                  item.id === detailDataItem.id
                                    ? {
                                        ...item,
                                        label: e.target.value, // Cập nhật label
                                      }
                                    : item
                                )
                              );
                            }}
                          />
                          <AddCircleIcon
                            className="m-3 add-icon-detail-product"
                            onClick={() => {
                              setDetailData([
                                ...detailData,
                                {
                                  id: detailData.length,
                                  label: "",
                                  data: [
                                    {
                                      id: 0,
                                      labelData: "",
                                      data: "",
                                    },
                                  ],
                                },
                              ]);
                            }}
                          />
                        </div>
                      </Col>
                      {detailDataItem.data &&
                        detailDataItem.data.length > 0 &&
                        detailDataItem.data.map(
                          (detailDataDataItem, indexDetailSub) => {
                            return (
                              <>
                                <Row
                                  key={indexDetailSub}
                                  style={{ display: "flex" }}
                                >
                                  <Col mt md={6}>
                                    <Form.Label>
                                      Tên Chi Tiết Phân Loại
                                    </Form.Label>
                                    <div className="d-flex name-sub-detail">
                                      <Form.Control
                                        name={`name-sub-detail-${indexDetailSub}`}
                                        style={{ width: "100%" }}
                                        value={detailDataDataItem.labelData}
                                        type="text"
                                        onChange={(e) => {
                                          setDetailData((prevState) =>
                                            prevState.map((item) =>
                                              item.id === detailDataItem.id
                                                ? {
                                                    ...item,
                                                    data: item.data.map(
                                                      (subItem) =>
                                                        subItem.id ===
                                                        detailDataDataItem.id
                                                          ? {
                                                              ...subItem,
                                                              labelData:
                                                                e.target.value, // Cập nhật labelData
                                                            }
                                                          : subItem
                                                    ),
                                                  }
                                                : item
                                            )
                                          );
                                        }}
                                      />
                                      <AddCircleIcon
                                        className="m-3 add-icon-detail-product"
                                        onClick={() => {
                                          console.log(detailDataItem.id);
                                          setDetailData((prevState) =>
                                            prevState.map((item) =>
                                              item.id === detailDataItem.id
                                                ? {
                                                    ...item,
                                                    data: [
                                                      ...item.data,
                                                      {
                                                        id:
                                                          item.data.length + 1, // Tạo id mới cho đối tượng con
                                                        labelData: "",
                                                        data: "",
                                                      },
                                                    ],
                                                  }
                                                : item
                                            )
                                          );
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col md={6}>
                                    <Col key={indexDetailSub} md={12}>
                                      <Form.Label>Mô tả</Form.Label>
                                      <div className="d-flex name-sub-detail">
                                        <Form.Control
                                          name={`name-sub-sub-detail-${indexDetailSub}`}
                                          style={{ width: "100%" }}
                                          type="text"
                                          value={detailDataDataItem.data}
                                          onChange={(e) => {
                                            setDetailData((prevState) =>
                                              prevState.map((item) =>
                                                item.id === detailDataItem.id
                                                  ? {
                                                      ...item,
                                                      data: item.data.map(
                                                        (subItem) =>
                                                          subItem.id ===
                                                          detailDataDataItem.id
                                                            ? {
                                                                ...subItem,
                                                                data: e.target
                                                                  .value, // Cập nhật labelData
                                                              }
                                                            : subItem
                                                      ),
                                                    }
                                                  : item
                                              )
                                            );
                                          }}
                                        />{" "}
                                        {/* <AddCircleIcon
                                                    className="m-3 add-icon-detail-product"
                                                      /> */}
                                      </div>

                                      {/* Form control chiếm 50% */}
                                    </Col>
                                  </Col>
                                </Row>
                              </>
                            );
                          }
                        )}
                    </Form.Group>
                  </>
                );
              })}
          </div>
          <div className="div-btn">
            <Button
              onClick={handleSubmit}
              className="btn-submit"
              variant="primary"
            >
              Tạo
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default CreateNewProduct;
