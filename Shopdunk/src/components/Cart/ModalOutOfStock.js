import { NavLink } from "react-router-dom";
import { Modal,Button } from "react-bootstrap";
const ModalOutOfStock = (props) => {
console.log(props);

  return (
    <div
      className="modal  modal-confirm-pay"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Các món sau đây đã hết hàng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.listOutOfStock.map((item,index)=>{
            return(
          <div>
            <p key={index}>{item.name} tồn kho hiện tại: {item.stock}</p>
          </div>  
          )
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{
            props.setShowModal(false);
          }}>OK</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
export default ModalOutOfStock;
