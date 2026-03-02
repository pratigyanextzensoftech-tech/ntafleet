import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  discount_list as APINAME} from '../../../api/index'
import Create from './Create';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { formatDate } from "../../../Hooks/Dropdowns";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';

const ViewIndex = () => {
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
  { data: "country", title: "Country" },
  { data: "supplier_name", title: "Supplier" },
  { data: "discount_ca", title: " Cent (CA)" },
{ data: "total_ca", title: "Total (CA)" },
{ data: "retail_total_ca", title: "Retail (CA)" },
{ data: "fuel_unit_ca", title: "Qty (CA)" },
  { data: "discount_amt_ca", title: "Disc(CA)" },
  { data: "discount_us", title: "Cent (US)" },
  { data: "total_us", title: "Total (US)" },
  { data: "retail_total_us", title: "Retail (US)" },
  { data: "fuel_unit_us", title: "Qty (US)" },
  { data: "discount_amt_us", title: "Disc(US)" },
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
    Download Pdf
  </button>
</li>


          <li>
           <button class="dropdown-item delete-btn text-danger" data-id="${row.id}">
            <i class="fa fa-trash me-2"></i> Delete</button>
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
     const tableData = tableRes.data.map((row) => ({
      id: row.id,
      company_name: row.company_name,
      "start_date": formatDate(row.start_date),
      "end_date": formatDate(row.end_date),
      country: row.country,
      supplier_name: row.supplier_name,
      discount_ca: row.discount_ca,
    total_ca: row.total_ca,
    retail_total_ca: row.retail_total_ca ,
    fuel_unit_ca: row.fuel_unit_ca ,
    discount_amt_ca: row.discount_amt_ca ,
    discount_us: row.discount_us,
    total_us: row.total_us,
     retail_total_us: row.retail_total_us ,
     fuel_unit_us: row.fuel_unit_us ,
        discount_amt_us: row.discount_amt_us 
     }))

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
const reloadTable = () => {
  $("#example").DataTable().ajax.reload(null, false);
};

   
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="View Discounts"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
               <Create btnTitle="Create"  onDataAdded={reloadTable}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
              
                <HeaderCard
                  title="Discount List"
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
                        <th>Country </th>
                        <th>Supplier </th>
                        <th>Cent (CA) </th> 
                        <th>Total (CA)</th>
                        <th>Retail (CA)</th>
                         <th>Qty (CA)</th>
                        <th>Disc (CA)</th>
                        <th>Cent (US)</th>
                         <th>Retail (US)</th>
                        <th>Qty (US)</th>
                        <th>Disc (US)</th>
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

export default ViewIndex;