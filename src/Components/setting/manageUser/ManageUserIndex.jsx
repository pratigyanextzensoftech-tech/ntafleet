import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  administrator as APINAME} from '../../../api/index'
import FormComponent from "./Form";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';


const ManageUserIndex = () => {
   const [selectedRow, setSelectedRow] = useState(null);
    const[Edit,setEdit]=useState(false)
   const[validation,setValidation]=useState(true)
  
  useEffect(() => { 
        const company = document.getElementById("company")?.value;
        const from = document.getElementById("from")?.value;
        const to = document.getElementById("to")?.value;
          GetDataTAble(from,to, company);
  }, []);

   const handleEdit = async(row) => {
    setValidation(false)
    console.log(row.id)
    try {
    const response = await axios.get(`${APINAME}/${row.id}`);
    setSelectedRow(response.data);     // ✅ full API object
    setEdit(true);
  } catch (error) {
    console.error("Error fetching full row data", error);
  }
  };
  const handleDelete = (row) => {
      const table = $("#example").DataTable();
    
    console.log(row)
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete user "${row.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // ✅ Call API to delete
      axios.delete(`${APINAME}/${row.id}`)
        .then((res) => {
          console.log(res);
          Swal.fire(
            'Deleted!',
            `User "${row.name}" has been deleted.`,
            'success'
          );
                     table.ajax.reload(null, false);

        })
        .catch((err) => {
          console.log(err);
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
    }
  });
};

  function GetDataTAble() {

     const columns = [
  { data: "id", title: "Invoice #" },
  { data: "name", title: "Name" },
  { data: "email", title: "Email" },
  { data: "phone", title: "Phone" },
  { data: "company", title: "Company" },
  { data: "added_by", title: "Added By" },
    {
  data: "company_login",
  title: "Company Login",
  orderable: false,
  render: function (data, type, row) {
    return `
      <select class="form-select form-select-sm status-change"
              data-id="${row.id}"
              data-field="company_login">
        <option value="1" ${data == 'Yes' ? "selected" : ""}>Yes</option>
        <option value="0" ${data == 'No' ? "selected" : ""}>No</option>
      </select>
    `;
  }
},
  {
  data: "status",
  title: "Status",
  orderable: false,
  render: function (data, type, row) {
    return `
       <select class="form-select form-select-sm status-change"
              data-id="${row.id}"
              data-field="status">
        <option value="Open" ${data == 0 ? "selected" : ""}>Active</option>
        <option value="Entered" ${data == 1 ? "selected" : ""}>Blocked</option>
      </select>
    `;
  }
},
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
        <i class="fa fa-cog me-1"></i>   Action
        </button>

        <ul class="dropdown-menu">
           <li>
            <button class="dropdown-item text-primary edit-btn">
              <i class="fa fa-edit me-2"></i> Edit
            </button>
          </li>
          <li>
            <button class="dropdown-item text-danger delete-btn"
                    data-id="${row.item_id}">
              <i class="fa fa-trash me-2"></i> Delete
            </button>
          </li>
          <li>
              <button class="dropdown-item text-info send-btn"
                  data-id="${row.id}">
            <i class="fa fa-paper-plane me-2"></i> Send Details
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
    Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
    "id": row.id,
   "name":row.name,
   "email":row.email,
   "phone":row.phone,
    "company":row.company,
    "added_by":row.added_by,
    "company_login":row.company_login,
   "status":row.status, 
    }));
    console.log(tableData);
    
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
    handleDelete(rowData);  

});

$(document).off("focus", ".status-change");
$(document).on("focus", ".status-change", function () {
  $(this).data("previous", $(this).val());
});


// Handle change for BOTH dropdowns
$(document).off("change", ".status-change");
$(document).on("change", ".status-change", function () {

  const table = $("#example").DataTable();
  const selectElement = $(this);

  const id = selectElement.data("id");
  const field = selectElement.data("field"); // 🔥 important
  const newValue = selectElement.val();
  const oldValue = selectElement.data("previous");
const message =
  field === "status"
    ? "Change  status?"
    : "Change Company Status?";

  Swal.fire({
    title: "Are you sure?",
    text:message,
    icon: "warning",
    showCancelButton: true,
  }).then(async (result) => {

    if (!result.isConfirmed) {
      selectElement.val(oldValue);
      return;
    }

    try {
await axios.put(`${APINAME}/${id}`, {
  id: id,
  [field]: field === "status" ? Number(newValue) : newValue
});
      table.ajax.reload(null, false);

      Swal.fire("Updated!", "Status changed successfully.", "success");

    } catch (error) {

      selectElement.val(oldValue);

      Swal.fire("Error!", "Something went wrong.", "error");
    }

  });

});

  }
   const refreshTable = () => {
   GetDataTAble()
  };
let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);
    GetDataTAble();
  }, 1000); // 500ms after last keystroke
}
  return (
    <Fragment>
      <Breadcrumbs parent="Manage User" title="Manage User" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add User" />
              <CardBody>
                <FormComponent   Edit={Edit}
  selectedRow={selectedRow} onDataAdded={refreshTable}
  setEdit={setEdit} validation={validation}/> 
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="User List"
        
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
                        <th>ID#</th>
                        <th>Name </th>
                        <th>Email </th>
                        <th> Phone </th>
                        <th>Company </th>
                        <th>Added By </th> 
                        <th>Company Login</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                       <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input6" id="6" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input7" id="7" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input8" id="8" onChange={handleInputChange} className="input-search"/></th>
                  </tr>
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

export default ManageUserIndex;