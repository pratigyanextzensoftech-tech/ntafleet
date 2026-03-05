import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  country as APINAME} from '../../../api/index'
import CountryForm from './CountryForm';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import { formatDate } from "../../../Hooks/Dropdowns";
const ViewCountryIndex = () => {
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
    const response = await axios.get(`${APINAME}/${row.country_id}`);
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
    text: `Do you really want to delete  "${row.country_name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // ✅ Call API to delete
      axios.delete(`${APINAME}/${row.country_id}`)
        .then((res) => {
          console.log(res);
          Swal.fire(
            'Deleted!',
            ` "${row.country_name}" has been deleted.`,
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
  { data: "country_id", title: "Country ID " },
  { data: "country_name", title: "Country Name" },
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
                    data-id="${row.country_id}">
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
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
    "country_id": row.country_id,
    "country_name":row.country_name,
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

  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Country'/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Country"/>
              <CardBody>
                   <CountryForm  onDataAdded={refreshTable} Edit={Edit}
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
                  title="Country List"
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
                        <th>Country ID</th>
                        <th>Country Name </th>
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

export default ViewCountryIndex;