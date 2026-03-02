import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  discount_sheet as APINAME} from '../../../api/index'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { formatDate } from "../../../Hooks/Dropdowns";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import DiscountSheetForm from "./DiscountSheet";


const DiscountSheetIndex = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[FormData,setFormData]=useState([])
  const toggle = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
      
      GetDataTAble();
  }, []);

  function GetDataTAble( ) {
   const columns = [  
  { data: "id", title: "ID#" },
  { data: "company_name", title: "Company" },
  { data: "start_date", title: "Start Date" },
  { data: "end_date", title: " End Date" },
  { data: "discount_percent", title: "Discount Cent" },
  { data: "discount_for", title: "Discount For" },
  { data: "litres", title: "Litres" },
  { data: "gallons", title: "Gallons" },
  { data: "discount_usd", title: "Discount(USD)" },
  { data: "discount_cad", title: "Discount(CAD)" },
  { data: "added_by", title: "Added_By" },
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {

    const viewUrl = `/card-admin/viewInvoice/ViewPdf/${btoa(row.invoice_id)}`;

    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
         <i class="fa fa-cog me-1"></i>  Action
        </button>

        <ul class="dropdown-menu">
              <li>
  <button class="dropdown-item download-btn"
          data-link="${row}">
    <i class="fa fa-download me-2 text-danger"></i>
    Download Sheet
  </button>
</li>
       <li>
  <button class="dropdown-item download-btn"
          data-link="${row}">
    <i class="fa fa-download me-2 text-danger"></i>
    Download Sheet Detailed
  </button>
</li>
  <li>
       <button class="dropdown-item email-btn"
          data-id="${row.id}">
    <i class="fa fa-envelope me-2 text-primary"></i>
    Email
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
      id: row.id,
      company_name: row.company_name,
      "start_date": formatDate(row.start_date),
      "end_date": formatDate(row.end_date),
      discount_percent: row.discount_percent,
      discount_for: row.discount_for,
      litres: row.litres,
      gallons: row.gallons,
      discount_usd: row.discount_usd,
        discount_cad: row.discount_cad,
    added_by: row.added_by ,  
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
  $(document).off("click", ".delete-btn");
  
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
  
      if (result.isConfirmed) {
  
        axios.delete(`${APINAME}/${id}`)
          .then(() => {
              $("#example").DataTable().ajax.reload(null, false);  
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete record.", "error");
          });
  
      }
    });
  
  });
  }


  const refreshTable = () => {
  $("#example").DataTable().ajax.reload(null, false);
};
   
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="Manage Discount Sheet"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Discount Sheet" />
              <CardBody>
              <DiscountSheetForm btnTitle="Create" onDataAdded={refreshTable}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
              
                <HeaderCard
                  title="Discount Sheet List"
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
                        <th>Company </th>
                        <th>Start Date </th>
                        <th>End Date </th>
                        <th>Discount Cent </th>
                        <th>Discount For </th>
                        <th>Litres</th> 
                        <th>Gallons</th>
                        <th>Discount(USD)</th>
                        <th>Discount(CAD)</th>
                        <th>Added_By</th>
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

export default DiscountSheetIndex;