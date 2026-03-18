import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  fual_card as APINAME,download} from '../../../api/index'
import ViewForm from './ViewForm'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv } from "react-icons/fa";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const ViewFuelCard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[FormData,setFormData]=useState([])
  const toggle = () => setDropdownOpen((prev) => !prev);
    const [totals, setTotals] = useState({
    taxamt: 0,
    amtcad: 0,
    qtyltr: 0,
    qtygln: 0,
    amtusd: 0,
    fee: 0,
    amtreal: 0,
  });
   const cardNo = document.getElementById("card_no")?.value;
        const supplier = document.getElementById("supplier")?.value;
        const  policy= document.getElementById("policy")?.value;
        const unit = document.getElementById("unit")?.value;
        const pin = document.getElementById("pin")?.value;
        const d_name = document.getElementById("driver_name")?.value;
        const company = document.getElementById("company")?.value;
        const status = document.getElementById("status")?.value;
  useEffect(() => {
     
      GetDataTAble(cardNo,supplier,policy,unit,pin,d_name,company,status);
  }, []);

  function GetDataTAble(cardNo,supplier,policy,unit,pin,d_name,company,status) {
     const columns = [
  { data: "card_id", title: "Card" },
  { data: "policy", title: "Policy" },
  { data: "unit_number", title: "Unit" },
  { data: "pin_number", title: "Pin" },
  { data: "driver_name", title: "Driver Name" },
  { data: "company_name", title: "Compny Name" },
  { data: "supplier_name", title: "Supplier Name" },
  { data: "susp_comp", title: "Suspicious" },
  { data: "last_login", title: "Last Login" },
  { data: "loginbefore", title: "Login Before" },
  { data: "status", title: "Status" }, 
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {
  const url = `/card-admin/edit-fuelCards/${btoa(row.card_id)}`;
  return `
    <div class="dropdown">
      <button class="btn btn-sm btn-success dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown">
      <i class="fa fa-cog me-1"></i>  Action
      </button>

      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item"
             href="${url}">
             <i class="fa fa-edit me-2 text-primary"></i> Edit
          </a>
        </li>

          <li>
            <button class="dropdown-item text-danger delete-btn"
                    data-id="${row.card_id}">
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
  params.append("company_id", company?company:"");
  params.append("unit", unit?unit :"");
  params.append("cardNo", cardNo?cardNo :"");
  params.append("policy", policy?policy :"");
  params.append("d_name", d_name?d_name :"");
  params.append("pin", pin?pin :"");
  params.append("status", status?status :"");
  params.append("supplier_id", supplier?supplier :"");
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
    "card_id": row.card_id,
   "policy":row.policy,
   "unit_number":row.unit_number,
   "pin_number":row.pin_number,
    "driver_name":row.driver_name,
   "company_name":row.company_name,
    "supplier_name":row.supplier_name,
    "susp_comp":row.susp_comp,
     "last_login":row.last_login,
    "loginbefore":row.loginbefore,
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
$(document)
  .off("click", ".delete-btn")
  .on("click", ".delete-btn", function () {

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

            // 🔥 If serverSide true
            table.ajax.reload(null, false);

          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete record.", "error");
          });

      }

    });

});

  }

 const handleSearch = (formData) => {
 const company =  formData?.company_id ||"";
 const unit =  formData?.unit_number ||"";
 const cardNo =  formData?.card_no ||"";
 const policy =  formData?.policy ||"";
 const pin =  formData?.pin_number ||"";
 const d_name =  formData?.driver_name ||"";
 const status =  formData?.status ||"";
 const supplier =  formData?.supplier_id ||"";
    console.log(formData)
    GetDataTAble(cardNo,supplier,policy,unit,pin,d_name,company,status); // fetch new data immediately
  };
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

    const company_id = document.querySelector('[name=company]')?.value || "";
    const company_status = document.querySelector('[name=status]')?.value || "";

    GetDataTAble(cardNo,supplier,policy,unit,pin,d_name,company,status);
  }, 1000); // 500ms after last keystroke
};
  return (
    <Fragment>
      <Breadcrumbs parent="View Fual Cards" title="View Fual Cards" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                   <ViewForm
                  btnTitle="Search Data"
                  btnTitle1="Reset"
                  onSearch={handleSearch}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="Fuel Card List"
                  renderDropdown={() => (
    <>
       <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        className="px-2 text-white"
        style={{ cursor: "pointer" }}
      >
        <i className="fa fa-download me-1"></i> Download
      </DropdownToggle>

      <DropdownMenu   style={{ minWidth: 160 }}>
        <DropdownItem className="text-primary"   onClick={() => handleDownload("Excel")}>
          <FaFileExcel/> Download Excel
        </DropdownItem>

        <DropdownItem className="text-danger"   onClick={() => handleDownload("CSV")}>
          <FaFileCsv/> Download CSV
        </DropdownItem>

        <DropdownItem className="text-success" onClick={() => handleDownload("Quickbooks","INVOICE")} >
            <FaFileCsv /> Download Quickbooks CSV
         </DropdownItem>

      </DropdownMenu>
    </Dropdown>

    </>
  )}
                  download={true}
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
                       <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input6" id="6" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input7" id="7" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input8" id="8" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input9" id="9" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input10" id="10" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input11" id="11" onChange={handleInputChange} className="input-search"/></th>
                  
                    <td></td>
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

export default ViewFuelCard;