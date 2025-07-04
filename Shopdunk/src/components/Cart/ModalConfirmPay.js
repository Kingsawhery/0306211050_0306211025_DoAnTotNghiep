import { NavLink, useNavigate } from "react-router-dom";
import { Modal,Button } from "react-bootstrap";

const ModalConfirmPay = (props) => {
  const navigate = useNavigate();
const handleCreate = () =>{
  props.setShowModal(false);
  props.handleCreateInvoice();
  // navigate("/");
}
  return (
    <div
      className="modal show modal-confirm-pay"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButto onClick={()=>props.setShowModal(false)}>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Bạn xác nhận thanh toán online với số tiền {props.price}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCreate}>OK</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
export default ModalConfirmPay;
