import "../SubProd/DivClassifyAdmin.scss"

const DivClassifyAdmin = (props, ref) => {
    const { data, dataSelect, setDataSelect,dataSubProd, setData} = props;

    if (!data) return null;

    return data.id === 1 ? (
        <div className="div-classify" style={{ marginLeft: "12px", maxHeight: "400px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{data.name}</div>
            <div className="d-flex" style={{ maxWidth: "100%", flexWrap: "wrap" }}>
                {data.type_classify_details?.map((item) => {
                    const isSelected = dataSelect.find(group => group.id === data.id)?.data[0] === item.id;

                    return (
                        <div
                            key={item.id}
                            className={`div-classify-detail${isSelected ? " selected" : ""}`}
                            style={{
                                cursor: "pointer",
                                marginTop: "12px",
                                display: "flex",
                                border: dataSelect.find(group => group.id === data.id)?.data.includes(item.id)
                                ? "2px solid gray"
                                : "none"
                            }}
                            onClick={() => {
                                const existingGroup = dataSelect.find(group => group.id === data.id);
                                const isAlreadySelected = existingGroup?.data[0] === item.id;

                                if (isAlreadySelected) {
                                    // Bỏ chọn
                                    const updatedSelect = dataSelect.filter(group => group.id !== data.id);
                                    setDataSelect(updatedSelect);
                                } else {
                                    let updatedSelect = dataSelect.map(group =>
                                        group.id === data.id ? { id: data.id, data: [item.id] } : group
                                    );
                                    if (!existingGroup) {
                                        updatedSelect.push({ id: data.id, data: [item.id] });
                                    }
                                    setDataSelect(updatedSelect);
                                }
                            }}
                        >
                            <div
                                className="background-color"
                                style={{
                                    width: "60px",
                                    height: "30px",
                                    backgroundColor: item.color_code,
                                    color: "transparent",
                                }}
                            >.</div>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <div className="div-classify" style={{ marginLeft: "12px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{data.name}</div>
            <div className="d-flex" style={{ maxWidth: "100%", flexWrap: "wrap" }}>
                {data.type_classify_details?.map((item) => {
                    const isSelected = dataSelect.includes(item.id);
                    return (
                        <div
                            key={item.id}
                            className={`div-classify-detail div-classify-not-color${isSelected ? " selected" : ""}`}
                            style={{
                                cursor: "pointer",
                                marginTop: "12px",
                                display: "flex",
                                border: dataSelect.find(group => group.id === data.id)?.data.includes(item.id)
                                ? "2px solid gray"
                                : "none"
                            }}
                            onClick={() => {
                                const existingGroup = dataSelect.find(group => group.id === data.id);
                                const isAlreadySelected = existingGroup?.data[0] === item.id;

                                if (isAlreadySelected) {
                                        const updatedSelect = dataSelect.filter(group => group.id !== data.id);
                                    setDataSelect(updatedSelect);
                                } else {
                                    let updatedSelect = dataSelect.map(group =>
                                        group.id === data.id ? { id: data.id, data: [item.id] } : group
                                    );
                                    if (!existingGroup) {
                                        updatedSelect.push({ id: data.id, data: [item.id] });
                                    }
                                    setDataSelect(updatedSelect);
                                    setData({...dataSubProd, typeClassifyDetails:updatedSelect})
                                }
                            }}
                        >
                            <div style={{ marginLeft: "12px" }} className="name">{item.name}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DivClassifyAdmin;
