import "./HeaderAdmin.scss"
import { faBell, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const HeaderAdmin = () =>{
    return(
       <div className="header-admin">
       <div className="header-admin container">
       <div className="div-img-logo-admin">
            <img src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"/>
        </div>
        <div className="div-action-admin">
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faSignOut} />
        </div>
       </div> 
       </div>
       
    )
}
export default HeaderAdmin;