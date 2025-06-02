import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const ModalChangePrice = ({ show, onHide, onSubmit, newPrice, setNewPrice, setOpenChangePrice }) => {
    const [displayPrice, setDisplayPrice] = useState("");

    useEffect(() => {
        if (!newPrice) {
            setDisplayPrice("");
        } else {
            setDisplayPrice(Number(newPrice).toLocaleString("vi-VN"));
        }
    }, [newPrice]);

    const handleChange = (e) => {
        const raw = e.target.value.replace(/\D/g, ""); // loại ký tự không phải số
        setNewPrice(raw); // set lại giá trị thật
        setDisplayPrice(
            raw ? Number(raw).toLocaleString("vi-VN") : ""
        ); // set hiển thị có dấu chấm
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thay đổi giá sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nhập giá mới (VNĐ):</Form.Label>
                        <Form.Control
                            type="text"
                            value={displayPrice}
                            onChange={handleChange}
                            inputMode="numeric"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        onSubmit()
                        setOpenChangePrice(false);

                    }}
                    disabled={newPrice}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalChangePrice;
