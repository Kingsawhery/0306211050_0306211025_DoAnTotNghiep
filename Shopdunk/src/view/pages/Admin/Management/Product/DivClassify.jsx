import { useState } from "react"
import "../Product/CreateNewProduct.scss"

const DivClassify = (props, ref) => {    
    const [dataSelect, setDataSelect] = useState([]);
    
    const handleData = (id) => {
        if (dataSelect.includes(id)) {
            setDataSelect([...dataSelect.filter(num => num !== id)]);
            setDataCreate({
                ...dataCreate,
                typeClassifyDetail: [
                    ...dataCreate.typeClassifyDetail.filter(num => num !== id),
                ],
            });
            if (dataSelect.length === 1) {
                setDisable({...disable, [data.id]: false});
            }
        } else {
            setDataSelect([...dataSelect, id]);
            setDataCreate({
                ...dataCreate,
                typeClassifyDetail: [
                    ...dataCreate.typeClassifyDetail, id
                ],
            });
            setDisable({...disable, [data.id]: true});
        }
    }

    const { state, data, dataCreate, setDataCreate, setDisable, disable } = props;

    useState(() => {
        console.log(state, data.id);
        
        if (state === data.id) {
            console.log(state, data.id, "he");
            // setDataSelect([]);
        }
    }, [state]);

    useState(() => {
        setDisable({...disable, [data.id]: false});
    }, []);
    
    // Đóng component ở đây
    return (
        data && data.id === 1 ? (
            <div className="div-classify" style={{marginLeft: "12px"}}>
                {data && data.data && data.data.map((item) => (
                    <div
                        style={dataSelect.includes(item.id) ? { cursor: "pointer", border: "2px solid gray", marginTop: "12px", display: "flex" } : { cursor: "pointer", marginTop: "12px", display: "flex" }}
                        key={item.id}
                        className="div-classify-detail"
                        onClick={() => { handleData(item.id); }}
                    >
                        <div className="background-color" style={{ color: `${item.color_code}`, width: "60px", height: "30px", backgroundColor: `${item.color_code}` }}>.</div>
                        <div style={{ marginLeft: "12px" }} className="name">{item.name}</div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="div-classify" style={{marginLeft: "12px"}}>
                {data && data.data && data.data.map((item) => (
                    <div
                        style={dataSelect.includes(item.id) ? { cursor: "pointer", border: "2px solid gray", marginTop: "12px", display: "flex" } : { cursor: "pointer", marginTop: "12px", display: "flex" }}
                        key={item.id}
                        className="div-classify-detail"
                        onClick={() => { handleData(item.id); }}
                    >
                        <div style={{ marginLeft: "12px" }} className="name">{item.name}</div>
                    </div>
                ))}
            </div>
        )
    );
}

export default DivClassify;
