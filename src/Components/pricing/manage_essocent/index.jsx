import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Manage_EssoCent from "./Manage_EssoCent";
import { esso_rack } from "../../../api";
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
        order: [[0, "asc"]],

        ajax: function (data, callback) {
          const params = new URLSearchParams();
          params.append("start", data.start);
          params.append("length", data.length);
          params.append("search", data.search.value || "");
          params.append("orderColumn", data.columns[data.order[0].column].data);
          params.append("orderDir", data.order[0].dir);

          fetch(`${esso_rack}?${params.toString()}`)
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
              callback({
                draw: data.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
              });
            });
        },

        columns: [
          { data: "id", title: "ID" , width: "50px",    },
          { data: "name", title: "Name" },
          { data: "val", title: "Value" },
          { data: "ord", title: "Ord" },

          // ✅ FIXED — always remove trailing zeros
          {
            data: "rack",
            title: "Default_Rack",
            
            render: function (data) {
              if (data === null || data === undefined || data === "") return "";
                return Number(data).toFixed(4);
              //return parseFloat(1.1000).toString(); // removes extra zeros
            },
          },

          {
            data: null,
            title: "Action",
             width: "120px",    
            orderable: false,
            searchable: false,
            render: function (data) {
              return `
                <button class="btn btn-primary btn-sm edit-btn" data-id="${data.id}">
                  Edit
                </button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${data.id}">
                  Delete
                </button>
              `;
            },
          },
        ],
      });
    };

    const timeout = setTimeout(initTable, 300);

    // ✅ EDIT ACTION
    $("#example").on("click", ".edit-btn", function () {
      const id = $(this).data("id");
      alert("Edit ID: " + id);
    });

    // ✅ DELETE ACTION
    $("#example").on("click", ".delete-btn", function () {
      const id = $(this).data("id");

      if (window.confirm("Are you sure you want to delete this record?")) {
        fetch(`${esso_rack}/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((json) => {
            alert(json.message || "Deleted Successfully");
            $("#example").DataTable().ajax.reload(null, false);
          })
          .catch(() => alert("Delete failed"));
      }
    });

    return () => {
      clearTimeout(timeout);
      if ($.fn.dataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy(true);
      }
    };
  }, []);

  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage Esso Cent Type" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Esso Cent Type" />
              <CardBody>
                <Manage_EssoCent btnTitle="Add Esso Cent Type" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Esso Cent List" />
              <CardBody>
                <table
                  id="example"
                  className="display table table-striped table-bordered nowrap"
                  style={{ width: "100%" }}
                >
                  <thead></thead>
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
