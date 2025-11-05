import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DownloadEssoCentForm from "../manage_essocent/Manage_EssoCent";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { loc_group_Essogroup as APINAME, Esso_cent_Data } from "../../../api";

const Index = () => {
  const [dynamicColumns, setDynamicColumns] = useState([]);

  // Step 1: Fetch dynamic column names from API
  useEffect(() => {
    fetch(APINAME)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const names = data.map((item) => item.name);
          setDynamicColumns(names);
        } else {
          console.error("APINAME response is not an array:", data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Step 2: Initialize DataTable
  useEffect(() => {
    if (dynamicColumns.length === 0) return;

    if ($.fn.dataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    }

    const columns = [
      { data: "company_name", title: "Company Name" },
      { data: "pricing_date", title: "Pricing Date" },
      { data: "Action", title: "Action" },
      // Dynamic columns
      ...dynamicColumns.map((col, idx) => ({
        data: `col_${idx}`,
        title: col,
      })),
      {
        data: null,
        title: "Action",
        orderable: false,
      
      },
    ];

    $("#example").DataTable({
      processing: true,
      serverSide: true,
      responsive: true,
      scrollX: true,
      ajax: function (data, callback) {
        fetch(Esso_cent_Data)
          .then((res) => res.json())
          .then((json) => {
            let rows = [];

            // Normalize response to array
            if (Array.isArray(json)) rows = json;
            else if (json && Array.isArray(json.data)) rows = json.data;
            else if (json) rows = [json];

            // Map API data to table columns
            const tableData = rows.map((row) => {
              const obj = {
                company_name: row[0], // First column
                pricing_date: row[1],
                Action:row[2] // Second column
              };
              dynamicColumns.forEach((col, idx) => {
                obj[`col_${idx}`] = row[idx + 3] || ""; // remaining dynamic columns
              });

              console.log(row)
              return obj;
            });

            callback({
              draw: data.draw,
              recordsTotal: tableData.length,
              recordsFiltered: tableData.length,
              data: tableData,
            });

            // Attach click events for action buttons
            $("#example .update-btn").off("click").on("click", function () {
              const rowData = $("#example").DataTable().row($(this).closest("tr")).data();
              alert(`Update ${rowData.company_name}`);
            });
          })
          .catch((err) => {
            console.error("Error fetching table data:", err);
            callback({ draw: data.draw, recordsTotal: 0, recordsFiltered: 0, data: [] });
          });
      },
      columns: columns,
      pageLength: 10,
      ordering: true,
      searching: true,
    });

    return () => {
      if ($.fn.dataTable.isDataTable("#example")) $("#example").DataTable().destroy(true);
    };
  }, [dynamicColumns]);

  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="ESSO Cent Headings Table" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Download ESSO Cent" />
              <CardBody>
                <DownloadEssoCentForm btnTitle="Search" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="ESSO Cent Headings" />
              <CardBody>
                <div className="table-responsive">
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Pricing Date</th>
                        <th>Action</th>
                        {dynamicColumns.map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
