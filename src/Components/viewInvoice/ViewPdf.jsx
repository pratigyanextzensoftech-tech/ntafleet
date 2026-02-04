import React, { Fragment,useEffect,useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Card, Container } from "reactstrap";
import HeaderCard from "../Common/Component/HeaderCard";
import { Breadcrumbs } from "../../AbstractElements";
import { combine_invoice } from "../../api";
import axios from "axios";
const ViewPdf = () => {
  const[downlodLink,setDownloadLink]=useState('')
  const { id } = useParams();
  const location = useLocation();

  const invoiceId = atob(decodeURIComponent(id));
  const pdfUrl = new URLSearchParams(location.search).get("pdf");
  useEffect(()=>{
axios.get(`${combine_invoice}/${invoiceId}`)
.then((res)=>{
  console.log(res.data);
  setDownloadLink(res.data.download_link)
})
  },[])

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="View Invoice" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title={`View Invoice ${invoiceId}`} />
              <iframe
                src={downlodLink}
                width="100%"
                height="700px"
                title="Invoice PDF"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ViewPdf;
