import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  linamar_esso_loc as APINAME} from '../../../api/index'
import LinamarForm from './LinamarForm';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import { formatDate } from "../../../Hooks/Dropdowns";
const LinamarEssoIndex = () => {
   const [selectedRow, setSelectedRow] = useState(null);
    const[Edit,setEdit]=useState(false)
   const[validation,setValidation]=useState(true)
  
  useEffect(() => {   
          GetDataTAble();
  }, []);

   const handleEdit = async(row) => {
    setValidation(false)
    console.log(row)
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
    text: `Do you really want to delete "?`,
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
            ` "${row.esso_location}" has been deleted.`,
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
  { data: "id", title: "ID " },
  { data: "esso_location", title: "Esso Location" },
  { data: "fj_location", title: "Flying J Location" },
  { data: "site_id", title: "Flying J Site ID" },
  { data: "loc_id", title: "Flying J Location ID " },
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
                    data-id="${row.id}">
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
      targets: 0,          // 👈 ID column
      className: "text-start"
    },
    {
      targets: "_all",
      orderable: false,
    },
    {
      targets: [0, 1],     // allow ordering only here
      orderable: true,
    }
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
   "esso_location":row.esso_location,
   "fj_location":row.fj_location,
    "site_id":row.site_id,
    "loc_id":row.loc_id,
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
      <Breadcrumbs parent='Location' title='Manage Linamar Esso Location'/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Linamar Esso Location " />
              <CardBody>
                   <LinamarForm onDataAdded={refreshTable} Edit={Edit}
                  selectedRow={selectedRow}
                  setEdit={setEdit}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                   title="Linamar Esso Location List"
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
                        <th> ID</th>
                        <th>Esso Location </th>
                        <th> Flying J Location </th>
                        <th>Flying J Site ID </th>
                        <th>Flying J Location ID  </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                     <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
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

export default LinamarEssoIndex;