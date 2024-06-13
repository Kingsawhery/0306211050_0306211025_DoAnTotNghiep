import { PacmanLoader } from "react-spinners";
 const Loader = () =>{
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"700px"}}>
        <PacmanLoader  color="#36d7b7" size={100}/>
        </div>
    )
}
export default Loader;