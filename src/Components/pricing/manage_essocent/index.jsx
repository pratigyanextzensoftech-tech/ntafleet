import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Manage_EssoCent from "./Manage_EssoCent";
import { esso_cent } from "../../../api";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";

const Index = () => {
  useEffect(() => {
  const initTable = () => {
    if ($.fn.dataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    }

    $("#example").DataTable({
      processing: true,
      serverSide: true,
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,

      ajax: function (data, callback) {
        const params = new URLSearchParams();
        params.append("start", data.start);
        params.append("length", data.length);
        params.append("search", data.search.value || "");
        params.append("orderColumn", data.columns[data.order[0].column].data);
        params.append("orderDir", data.order[0].dir);

        fetch(`${esso_cent}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            callback({
              draw: data.draw,
              recordsTotal: json.recordsTotal || json.total || 0,
              recordsFiltered: json.recordsFiltered || json.total || 0,
              data: json.data || [],
            });
          })
          .catch(() => {
            callback({ draw: data.draw, recordsTotal: 0, recordsFiltered: 0, data: [] });
          });
      },

      columns: [
        { data: "id", title: "ID" },
        { data: "company_name", title: "Company Name" },
        { data: "pricing_date", title: "Pricing Date" },
        { data: "dated", title: "Dated" },
      ],
    });
  };

  // Delay to ensure DOM is ready
  const timeout = setTimeout(initTable, 300);

  return () => {
    clearTimeout(timeout);
    if ($.fn.dataTable.isDataTable("#example")) $("#example").DataTable().destroy(true);
  };
}, []); 

  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage Esso Cent Type" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Esso Cent List" />
              <CardBody>
                <table id="example" className="display table table-striped table-bordered nowrap" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Company Name</th>
                      <th>Pricing Date</th>
                      <th>Dated</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
