import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  money_code as APINAME,download} from '../../../api/index'
import MoneyCodeListForm from './MoneyCodeListForm'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv } from "react-icons/fa";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import {Btn} from "../../../AbstractElements";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const MoneyCode = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[FormData,setFormData]=useState([])
  const toggle = () => setDropdownOpen((prev) => !prev);
  let selectedRows = [];
  useEffect(() => {
      
        const company = document.getElementById("company")?.value;
        const from = document.getElementById("from")?.value;
        const to = document.getElementById("to")?.value;
        const unit = document.getElementById("unit")?.value;
      GetDataTAble(from,to, company,unit);
  }, []);

  function GetDataTAble(from,to,company,unit) { 
     const columns = [
  { data: "Ref", title: "Ref#" },
  { data: "company_name", title: "Company" },
  { data: "Name", title: "Name" },
  { data: "Voided", title: "Voided" },
  { data: "IssuedTo", title: "Issued To" },
  { data: "IssuedDate", title: "Issued Date" },
  { data: "OriginalAmt", title: "Original Amt" },
  { data: "BillDate", title: "Bill Date" },
  { data: "CheckNum", title: "Check Num" },
  { data: "DateUsed", title: "Date Used" },
  { data: "Currency", title: "Currency" }, 
  { data: "status", title: "Status" }, 
  { data: "Notes", title: "Notes" }, 
 {
  data: null,
  title: `
    Delete 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.id}">
    `;
  }
},
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {
    console.log(row);
    
  const url = `/card-admin/editMoney_code_List/${btoa(row.id)}`;
  return `
    <div class="dropdown">
      <button class="btn btn-sm btn-success dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown">
        <i class="fa fa-cog me-1"></i> Action
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
  params.append("from", from?from:"");
  params.append("to", to?to:"");
  params.append("unit", unit?unit:"");
   Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
    "id":row.id,
    "Ref": row.Ref,
   "company_name":row.company_name,
   "Name":row.Name,
   "Voided":row.Voided,
    "IssuedTo":row.IssuedTo,
   "IssuedDate":row.IssuedDate,
   "OriginalAmt":row.OriginalAmt,
    "BillDate":row.BillDate,
    "CheckNum":row.CheckNum,
     "DateUsed":row.DateUsed,
    "Currency":row.Currency,
    "status":row.status,     
    "Notes":row.Notes,     
       
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

 $(document)
  .off("change", "#select-all")
  .on("change", "#select-all", function () {

    const checked = $(this).is(":checked");

    $(".row-checkbox").prop("checked", checked);

    if (checked) {
      selectedRows = $(".row-checkbox").map(function () {
        return $(this).val();
      }).get();
    } else {
      selectedRows = [];
    }

    console.log("Selected:", selectedRows);
  });
  $(document)
  .off("change", ".row-checkbox")
  .on("change", ".row-checkbox", function () {

    const id = $(this).val();

    if ($(this).is(":checked")) {
      if (!selectedRows.includes(id)) {
        selectedRows.push(id);
      }
    } else {
      selectedRows = selectedRows.filter(item => item !== id);
      $("#select-all").prop("checked", false);
    }

    // Auto check select-all if all selected
    if ($(".row-checkbox:checked").length === $(".row-checkbox").length) {
      $("#select-all").prop("checked", true);
    }

    console.log("Selected:", selectedRows);
  });
  $('#example').on('draw.dt', function () {

  $(".row-checkbox").each(function () {
    if (selectedRows.includes($(this).val())) {
      $(this).prop("checked", true);
    }
  });

});
  }

 const handleSearch = (formData) => {
 const company =  formData.company_id ||"";
 const from =  formData.from ||"";
 const to =  formData.to ||"";
 const unit =  formData.unit ||"";
 console.log(formData);
 

    GetDataTAble(from,to ,company,unit); // fetch new data immediately
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

function handleDeleteSelected() {

  if (selectedRows.length === 0) {
    Swal.fire("Warning!", "Please select at least one record.", "warning");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${selectedRows.length} selected records?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete them!"
  }).then((result) => {

    if (result.isConfirmed) {

    
       axios.delete( `${APINAME}/${selectedRows}`, { ids: selectedRows })
      .then(() => {

        Swal.fire("Deleted!", "Records deleted successfully.", "success");

        selectedRows = [];
        $("#select-all").prop("checked", false);

        $("#example").DataTable().ajax.reload(null, false);

      })
      .catch(() => {
        Swal.fire("Error!", "Failed to delete records.", "error");
      });

    }

  });

}
let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
     const company = document.getElementById("company")?.value;
        const from = document.getElementById("from")?.value;
        const to = document.getElementById("to")?.value;
        const unit = document.getElementById("unit")?.value;
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);
    GetDataTAble(from,to,company,unit);
  }, 1000); // 500ms after last keystroke
};
  return (
    <Fragment>
      <Breadcrumbs parent='Money Code' title='Money Code List '/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                      <MoneyCodeListForm btntitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="Money Code List"
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

      </DropdownMenu>
    </Dropdown>

    </>
  )}
                  download={true}
                />
             
              <CardBody>
                  <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Money Code</Btn>
                  {/* <Btn attrBtn={{ color: "secondary", className: "ms-2" }}>Download Money Code</Btn> */}
                </div>
          <div style={{"width":"100%", "overflow":"auto"}} >
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Ref#</th>
                        <th>Company </th>
                        <th>Name </th>
                        <th> Voided </th>
                        <th>Issued To </th>
                        <th>Issued Date </th> 
                        <th>Original Amt</th>
                        <th>Bill Date</th>
                        <th>Check Num</th>
                        <th>Date Used</th>
                        <th>Currency</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Delete</th>
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
                    <th><input type="text" name="input12" id="12" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input13" id="13" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input14" id="14" onChange={handleInputChange} className="input-search"/></th>
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

export default MoneyCode;