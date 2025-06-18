import "../ProductDetail/ClassifyDetailDiv.scss"
const ClassifyDetailDiv = (props) =>{
    const {data} = props;    
    return(
<div className="div-specification-item" style={{width:"420px"}}>
        {data && data.length > 0 && data.map((item)=>{
            console.log(data[0].data)
return(
    <div className="box-specifi" style={{
      width:"400px"
    }}>
    <div className="name-classify">
      <h3>{item.label}</h3>
    </div>
    {item.data.map((subItem)=>{
        return(
            <ul class="text-specifi active">
      <li>
        <aside>
          <strong>{subItem.labelData}</strong>
        </aside>
        <aside>
          <span class="">{subItem.data}</span>
        </aside>
      </li>
     
    </ul>
        )
        
    })}
   
  </div>
)
        })}
  
  
</div>
    )
}

export default ClassifyDetailDiv;