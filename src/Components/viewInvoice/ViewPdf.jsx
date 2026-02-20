import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Card, Container } from "reactstrap";
import HeaderCard from "../Common/Component/HeaderCard";
import { Breadcrumbs } from "../../AbstractElements";
import { combine_invoice } from "../../api";
import axios from "axios";

const ViewPdf = () => {
  const [downloadLink, setDownloadLink] = useState("");

  const { id } = useParams();
  const location = useLocation();

  const invoiceId = atob(decodeURIComponent(id));

  // ✅ Get type from query params
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  console.log("Invoice ID:", invoiceId);
  console.log("Button Type:", type);

  useEffect(() => {
    axios
      .get(`${combine_invoice}/${invoiceId}`, {
        params: { type: type }, // 👈 sending type to backend (optional)
      })
      .then((res) => {
        setDownloadLink(res.data.download_link);
      });
  }, [invoiceId, type]); // ✅ add dependencies

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="View Invoice" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title={`View Invoice ${invoiceId}`} />
              <iframe
                src={downloadLink}
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
