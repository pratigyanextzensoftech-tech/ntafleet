import React,{Fragment,useEffect} from 'react'
import HeaderCard from '../Common/Component/HeaderCard'
import { Breadcrumbs } from '../../AbstractElements';
import { Row,Col,CardBody,Card,Container } from 'reactstrap';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const ViewPdf = () => {
   const { id } = useParams();
const { state } = useLocation();
   const InvoiceId = atob(decodeURIComponent(id));
  console.log("Encoded:", id);
  console.log("Decoded:", InvoiceId);
   
  return (
    <Fragment>
          <Breadcrumbs parent="Invoice" title="View Invoice" />
          <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <HeaderCard title="View  Invoice " />
                    <iframe
          src={state?.downloadLinkUrl?state?.downloadLinkUrl:""}
          width="100%"
          height="700px"
          title="Invoice PDF"
        />
                  </Card>
                  </Col>
                  </Row>
                  </Container>
                  </Fragment>
  )
}

export default ViewPdf
