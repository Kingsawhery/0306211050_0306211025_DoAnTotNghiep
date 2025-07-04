
import {Helmet} from "react-helmet"
import TopSubProducts from "./Dashboard/Top10SubProd";
import { Col, Row } from "react-bootstrap";
import TopProducts from "./Dashboard/Top10Prod";
import TopUsers from "./Dashboard/Top10User";
import TopSubCate from "./Dashboard/Top10SubCate";
import TopBrand from "./Dashboard/Top10Brand";
import TopInvoices from "./Dashboard/Top10Invoice";
const AdminPage = () =>{
    return(
       <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
      </Helmet>
      <Row className="mb-4">
  <Col xs={12} md={6}>
    <TopSubProducts />
  </Col>
  <Col xs={12} md={6}>
    <TopProducts />
  </Col>
</Row>

<Row>
  <Col xs={12}>
    <TopUsers />
  </Col>
</Row>
<Row>
  <Col xs={6}>
    <TopSubCate />
  </Col>
  <Col xs={6}>
    <TopBrand />
  </Col>
</Row>
<Row>
  <Col xs={12}>
    <TopInvoices />
  </Col>
</Row>
       </> 
    )
}
export default AdminPage;