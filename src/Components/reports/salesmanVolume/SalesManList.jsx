import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  salesman_volume as APINAME,download} from '../../../api/index'
import SalesmanVol from './SalesmanVol'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv } from "react-icons/fa";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import { formatDate } from "../../../Hooks/Dropdowns";
import { downloadPdf } from "../../../Hooks/Dropdowns";
const SalesManList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[FormData,setFormData]=useState([])
  const toggle = () => setDropdownOpen((prev) => !prev);
  
  useEffect(() => {
      GetDataTAble();
  }, []);

  function GetDataTAble() {
     const columns = [
  { data: "id", title: "ID #" },
  { data: "salesman_id", title: "Salesman" },
  { data: "date_from", title: "Start Date" },
  { data: "date_to", title: "End_Date" },
  { data: "country", title: "Country" },
  { data: "supplier_id", title: "Supplier" },
  { data: "total_ltr", title: "Total ltr" },
  { data: "total_gln", title: "Total Gln" },

{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {
    console.log(row);
    
    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown">
          <i class="fa fa-cog me-1"></i> Action
        </button>

        <ul class="dropdown-menu">

          <li>
            <a href="#" 
              class="dropdown-item download-btn text-primary"
                 >
              <i class="fa fa-download"></i> Download  PDF
            </a>
          </li>

          <li>
           <li>
            <a href="#" 
              class="dropdown-item download-btn text-success"
                 >
              <i class="fa fa-download"></i> Download  EXCEL
            </a>
          </li>


          <li>
            <a href="#"
              class="dropdown-item email-btn text-info"
              data-id="${row.id}">
              <i class="fa fa-envelope"></i> Email
            </a>
          </li>

      

          <li>
            <a href="#"
              class="dropdown-item delete-btn text-danger"
              data-id="${row.id}">
              <i class="fa fa-trash"></i> Delete
            </a>
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
   "salesman_id":row.salesman_id,
   "date_from":formatDate(row.date_from),
   "date_to":formatDate(row.date_to),
   "country":formatDate(row.country),
    "supplier_id":row.supplier_id,
   "total_ltr":row.total_ltr, 
   "total_gln":row.total_gln    
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
$(document)
  .off("click", ".delete-btn")
  .on("click", ".delete-btn", function (e) {

    e.preventDefault();

    const id = $(this).data("id");
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

        axios.delete(`${APINAME}/${id}`)
          .then(() => {

            Swal.fire("Deleted!", "Record deleted successfully.", "success");

            // reload table without resetting pagination
            table.ajax.reload(null, false);

          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete record.", "error");
          });
      }
    });

});
$(document)
  .off("click", ".download-btn")   // remove old handler
  .on("click", ".download-btn", function (e) {
    e.preventDefault();

    const link = $(this).data("link");
    const invoiceId = $(this).data("id");

    downloadPdf(link, invoiceId);
  });





  }


    function handleDownload(type) {
const ids = []; 
let esso_ftp='';
$('.chk input[type="checkbox"]:checked').each(function () {  ids.push($(this).val()); if($(this).val()==='100'){esso_ftp="Yes";} });

if (ids.length === 0) {  alert('Please select at least one item');  return;}
 const IDSUP = ids.join(',');  
const from = $('#from').val();
const to = $('#to').val();
const state_prov = $('input[name="state_prov"]').val();
const unit = $('input[name="unit"]').val();
const card_no = $('input[name="card_no"]').val();
const company = $('input[name="company"]').val();
const currency = $('input[name="currency"]').val();  
const items = $('input[name="items"]').val();  
const status = $('input[name="status"]').val();  
const invoice_type = $('input[name="invoice_type"]').val(); 

console.log(from,to,state_prov,unit,card_no,company,currency,items,status,invoice_type)
 window.open(`${download}?type=TRANSACTION&format=${type}&supplier_id=${IDSUP}&from=${from}&to=${to}&state_prov=${state_prov}&unit=${unit}&card_no=${card_no}&company_id=${company}&currency=${currency}&item=${items}&invoiced=${status}&invoice_type=${invoice_type}&esso_ftp=${esso_ftp}`, "_self");

} 
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
};
const refreshTable=()=>{
  GetDataTAble();
}
  return (
    <Fragment>
      <Breadcrumbs parent='Reports' title='Salesman Volume Report'/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Salesman Report" />
              <CardBody>
                <SalesmanVol btnTitle="Create Volume Report" onSearch={refreshTable}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                 title="Salesman Report List"
             
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
                        <th>Salesman </th>
                        <th>Start Date </th>
                        <th> End Date </th>
                        <th>Country </th>
                        <th>Supplier </th> 
                        <th>Total Ltr</th>
                        <th>Total Gln</th>
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

export default SalesManList;