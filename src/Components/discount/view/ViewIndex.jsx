import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  discount_list as APINAME} from '../../../api/index'
import ViewForm from "./ViewForm";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { formatDate } from "../../../Hooks/Dropdowns";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';

const ViewIndex = () => {
  useEffect(() => {
        const start = document.getElementById("start")?.value;
        const end = document.getElementById("end")?.value;
        const company = document.getElementById("company")?.value;
        const country = document.getElementById("country")?.value;
        const supplier = document.getElementById("supplier")?.value;
      GetDataTAble(company,start,end,country,supplier);
  }, []);

  function GetDataTAble(company,start,end,country,supplier ) {
   const columns = [  
  { data: "id", title: "ID#" },
  { data: "company_name", title: "Company" },
  { data: "start_date", title: "Start Date" },
  { data: "end_date", title: " End Date" },
  { data: "country", title: "Country" },
  { data: "supplier_name", title: "Supplier" },
  { data: "discount_ca", title: "Discount Cent (CA)" },
  { data: "discount_us", title: "Discount Cent (US)" },
  { data: "total_ca", title: "Total (CA)" },
  { data: "total_us", title: "Total (US)" },
  { data: "retail_total_ca", title: "Retail Total (CA)" },
  { data: "retail_total_us", title: "Retail Total (US)" },
  { data: "fuel_unit_us", title: "Qty (CA)" },
  { data: "fuel_unit_ca", title: "Qty (US)" },
  { data: "discount_amt_ca", title: "Discount (CA)" },
  { data: "discount_amt_us", title: "Discount (US)" },
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
    params.append("company", company);
    params.append("start_date", start);
    params.append("end_date", end);
    params.append("country", country);
    params.append("supplier", supplier);
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
      id: row.id,
      company_name: row.company_name,
      "start_date": formatDate(row.start_date),
      "end_date": formatDate(row.end_date),
      country: row.country,
      supplier_name: row.supplier_name,
      discount_ca: row.discount_ca,
      discount_us: row.discount_us,
      total_ca: row.total_ca,
        total_us: row.total_us,
        retail_total_ca: row.retail_total_ca ,
        retail_total_us: row.retail_total_us ,
        fuel_unit_ca: row.fuel_unit_ca ,
        fuel_unit_us: row.fuel_unit_us ,
        discount_amt_ca: row.discount_amt_ca ,
        discount_amt_us: row.discount_amt_us 
        
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

 const handleSearch = (formData) => {
    const start = formData.start_date ||"";
    const end = formData.end_date ||"";
 const company =  formData.company_id ||"";
 const country =  formData.country ||"";
 const supplier =  formData.supplier_id ||"";
    GetDataTAble(company,start,end,country,supplier); // fetch new data immediately
  };

   let debounceTimer; // define outside the function so it persists
const searchValues = {};
   const handleInputChange = (e) => {
     const start = document.getElementById("start")?.value;
        const end = document.getElementById("end")?.value;
        const company = document.getElementById("company")?.value;
        const country = document.getElementById("country")?.value;
        const supplier = document.getElementById("supplier")?.value;
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);
    GetDataTAble(company,start,end,country,supplier);
  }, 1000); // 500ms after last keystroke
}
   
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="View Discounts"  />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
               <ViewForm btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
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
                        <th>Company</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Country</th>
                        <th>Supplier</th>
                        <th>Discount Cent (CA)</th>
                        <th>Discount Cent (US)</th>
                        <th>Total (CA)</th>
                        <th>Total (US)</th>
                        <th>Retail Total (CA)</th>
                        <th>Retail Total (US)</th>
                        <th>Qty (CA)</th>
                        <th>Qty (US)</th>
                        <th>Discount (CA)</th>
                        <th>Discount (US)</th>
                        <th>Action</th>
                        </tr>
                
                    </thead>
                         <tr>
                        <th><input type="text" name="input1" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input2" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input3" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input4" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input5" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input6" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input7" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input8" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input9" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input10" className="input-search"  onChange={handleInputChange}/></th>
                        <th><input type="text" name="input10" className="input-search"  onChange={handleInputChange}/></th>
                        <th><input type="text" name="input11" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input12" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input13" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input14" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input15" className="input-search" onChange={handleInputChange}/></th>
                        <th><input type="text" name="input16" className="input-search" onChange={handleInputChange}/></th>
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

export default ViewIndex;