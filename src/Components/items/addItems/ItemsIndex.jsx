import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  items as APINAME,download} from '../../../api/index'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv } from "react-icons/fa";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import AddItems from "./AddItems";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const ItemIndex = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[FormData,setFormData]=useState([])
    const [selectedRow, setSelectedRow] = useState(null);
    const[Edit,setEdit]=useState(false)

  const toggle = () => setDropdownOpen((prev) => !prev);
  useEffect(() => {
      GetDataTAble();
  }, []);
const handleEdit =async (row)=>{
     try {
    const response = await axios.get(`${APINAME}/${row.id}`);
    setSelectedRow(response.data);     // ✅ full API object
    setEdit(true);
  } catch (error) {
    console.error("Error fetching full row data", error);
  }
    
  }
 const handleDelete = (row) => {

  const table = $("#example").DataTable();

  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`${APINAME}/${row.id}`)
        .then(() => {

          Swal.fire(
            "Deleted!",
            "Record deleted successfully.",
            "success"
          );

          // ✅ Important for DataTable
          table.ajax.reload(null, false);

        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete record.", "error");
        });

    }

  });

};
  function GetDataTAble( ) {
     const columns = [
  { data: "id", title: "Id #" },
  { data: "company_name", title: "Company" },
  { data: "name", title: "Name" },
  { data: "email", title: "Email" },
  { data: "otp_email", title: "OTP Email" },
  { data: "card_discount", title: "Discount_Sheet_Menu" },
  { data: "added_by", title: "Added_By" },
  { data: "added_on", title: "Added_On" },
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {


    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
          Action
        </button>

        <ul class="dropdown-menu">

           <li>
            <button class="dropdown-item text-primary edit-btn">
              <i class="fa fa-edit me-2"></i> Edit
            </button>
          </li>

          <li>
            <button class="dropdown-item text-danger delete-btn"
                    data-id="${row.company_id}"
                    data-name="${row.company_name}">
              <i class="fa fa-trash me-2"></i> Delete
            </button>
          </li>

        </ul>
      </div>
    `;
  }
}
];

    $("#example").DataTable({
      serverSide: true,
      destroy: true,
      processing: true,
      paging: true,
      searching: true,
      ordering: true,
     scrollX: true,
         scrollCollapse: true,
          fixedColumns: { leftColumns: 1},
      pageLength: 10,
      columns: columns,
    
      columnDefs: [
        {
          targets: "_all",
          orderable: false,
        },
        {
          targets: [0, 1], // allow ordering only here
          orderable: true,
        },
      ],

    ajax: async function (data, callback) {
  const params = new URLSearchParams();
  params.append("start", data.start);
  params.append("length", data.length);
  params.append("search", data.search.value || "");
  params.append("orderColumn", data.columns[data.order[0].column].data);
  params.append("orderDir", data.order[0].dir);
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
     
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
      "id":row.id,
    "company_id": row.company_id,
   "company_name":row.company_name,
   "name":row.name,
   "email":row.email,
    "otp_email":row.otp_email,
   "card_discount":row.card_discount,
    "added_by":row.added_by,
    "added_on":row.added_on,
    
    }));
    callback({
      draw: data.draw,
      recordsTotal: tableRes.recordsTotal,
      recordsFiltered: tableRes.recordsFiltered,
      data: tableData,
    });
  }
  catch (error) {

    console.error("Error:", error);
    callback({
      draw: data.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
    });
  }
},
    });
const table = $("#example").DataTable();

// EDIT
$(document)
  .off("click", ".edit-btn")
  .on("click", ".edit-btn", function () {

    const rowData = table.row($(this).closest("tr")).data();
console.log(rowData);

    handleEdit(rowData);   // 🔥 call your function

});

// DELETE
$(document)
  .off("click", ".delete-btn")
  .on("click", ".delete-btn", function () {

    const rowData = table.row($(this).closest("tr")).data();

    handleDelete(rowData);  // 🔥 call your function

});
  }
   const refreshTable = () => {
   GetDataTAble()
  };


  return (
    <Fragment>
      <Breadcrumbs parent="Items" title="Manage Item" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Item" />
              <CardBody>
                <AddItems Edit={Edit}
                selectedRow={selectedRow}
                setEdit={setEdit} btnTitle="Add Item" onDataAdded={refreshTable}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="Items List "
              
                />
             
              <CardBody>
          <div style={{"width":"100%", "overflow":"auto"}} >
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Invoice#</th>
                        <th>Company </th>
                        <th>From Date </th>
                        <th> To Date </th>
                        <th>Due Date </th>
                        <th>Total Due </th> 
                        <th>Status</th>
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

export default ItemIndex;