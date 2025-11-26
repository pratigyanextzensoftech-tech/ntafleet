import React, { Fragment, useEffect,useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Manage_EssoCent from "./Manage_EssoCent";
import axios from "axios";
import { esso_rack } from "../../../api";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";
const Index = () => {
   const [selectedRow, setSelectedRow] = useState(null);
    const[Edit,setEdit]=useState(false)
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
      <div class="position-relative action-dropdown" style="display:inline-block;">
        <button
          class="btn btn-sm btn-primary px-2 toggle-dropdown"
          data-id="${data.id}"
          style="padding: 2px 8px; font-size: 13px;"
        >
          Action
        </button>
        <div
          class="dropdown-menu-custom bg-white border rounded shadow-sm"
          style="
            display:none;
            position:absolute;
            right:0;
            margin-top:5px;
            min-width:140px;
            padding:5px 0;
            z-index:1000;
          "
        >
          <a href="#" class="dropdown-item-custom text-success edit-btn d-flex align-items-center" data-id="${data.id}" style="padding:8px 12px; gap:8px; text-decoration:none;">
            <i class="fa fa-edit"></i> Edit
          </a>
          <a href="#" class="dropdown-item-custom text-danger delete-btn d-flex align-items-center" data-id="${data.id}" style="padding:8px 12px; gap:8px; text-decoration:none;">
            <i class="fa fa-trash"></i> Delete
          </a>
        </div>
      </div>
    `;
  },
}


,
        ],
      });
    };
// Handle Action dropdown toggle
$(document).on("click", ".toggle-dropdown", function (e) {
  e.stopPropagation();
  const $btn = $(this);
  const $menu = $btn.siblings(".dropdown-menu-custom");

  // Close other open dropdowns first
  $(".dropdown-menu-custom").not($menu).hide();

  // Toggle only this one
  $menu.toggle();
});

// Close dropdown when clicking outside
$(document).on("click", function (e) {
  if (!$(e.target).closest(".action-dropdown").length) {
    $(".dropdown-menu-custom").hide();
  }
});


// Close dropdown if clicked outside
$(document).on("click", function () {
  $(".dropdown-menu-custom").hide();
});

    const timeout = setTimeout(initTable, 300);

    // ✅ EDIT ACTION
    $("#example").on("click", ".edit-btn",async  function () {
      const id = $(this).data("id");
        try {
    const response = await axios.get(`${esso_rack}/${id}}`);
    setSelectedRow(response.data);     // ✅ full API object
    setEdit(true);
  } catch (error) {
    console.error("Error fetching full row data", error);
  }
    });

    // ✅ DELETE ACTION
   $("#example").on("click", ".delete-btn", function () {
  const id = $(this).data("id");

  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this record?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform delete only if confirmed
      fetch(`${esso_rack}/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => {
          Swal.fire("Deleted!", json.message || "Record has been deleted.", "success");
          $("#example").DataTable().ajax.reload(null, false);
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete record.", "error");
        });
    }
  });
});


    return () => {
      clearTimeout(timeout);
      if ($.fn.dataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy(true);
      }
    };
  }, []);
   const refreshTable = () => {
    if ($.fn.dataTable.isDataTable("#example")) {
      $("#example").DataTable().ajax.reload(null, false); // reload table
    }
  };
const handleAdd=(data)=>{
console.log(data,"data")
 refreshTable();

}
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Manage Esso Cent Type" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Esso Cent Type" />
              <CardBody>
                <Manage_EssoCent btnTitle="Add Esso Cent Type" onDataAdded={refreshTable} handleAdd={handleAdd} Edit={Edit}
  selectedRow={selectedRow}
  setEdit={setEdit}/>
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
