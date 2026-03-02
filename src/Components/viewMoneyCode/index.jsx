import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import axios from "axios";
import {  moneycode_invoice as APINAME,retail_invoice,invoice,download} from '../../api/index'
import ViewMoneyCodeForm from "./ViewMoneyCodeForm";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv,FaFilePdf } from "react-icons/fa";
import { formatDate } from "../../Hooks/Dropdowns";
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

const Index = () => {
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

  useEffect(() => {
        const from = document.getElementById("from")?.value;
        const to = document.getElementById("to")?.value;
        const company = document.getElementById("company")?.value;
      

      GetDataTAble(from,to,company);
  }, []);



 

  function GetDataTAble(from,to,company ) {
   const columns = [
  { data: "invoice_id", title: "Invoice#" },
  { data: "company_name", title: "Company" },
  { data: "from_date", title: "From Date" },
  { data: "to_date", title: " To Date" },
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total Due" },
  {
  data: "admin_status",
  title: "Status",
  orderable: false,
  render: function (data, type, row) {
    return `
      <select class="form-select form-select-sm status-change"
              data-id="${row.invoice_id}"
                data-type="${row.tp}"
              data-field="admin_status">
        <option value="Open" ${data == "Open" ? "selected" : ""}>Open</option>
        <option value="Entered" ${data == "Entered" ? "selected" : ""}>Entered</option>
        <option value="Close" ${data == "Close" ? "selected" : ""}>Close</option>
      </select>
    `;
  }
},
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {

    const viewUrl = `/card-admin/viewInvoice/ViewPdf/${btoa(row.invoice_id)}`;
    const downloadLink = row.fulldata.download_link || "#";

    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
         <i class="fa fa-cog me-1"></i>  Action
        </button>

        <ul class="dropdown-menu">

          <li>
            <a class="dropdown-item text-danger"
               href="${downloadLink}"
               target="_blank">
               <i class="fa fa-download me-2"></i> Download 
            </a>
          </li>

          <li>
            <a class="dropdown-item text-success"
               href="${viewUrl}"
               target="_blank">
               <i class="fa fa-eye me-2"></i> View
            </a>
          </li>

          <li>
            <button class="dropdown-item text-primary email-btn"
                    data-id="${row.invoice_id}">
              <i class="fa fa-envelope me-2"></i> Email
            </button>
          </li>

          <li>
            <button class="dropdown-item text-warning regenerate-btn"
                    data-id="${row.invoice_id}">
              <i class="fa fa-refresh me-2"></i> ReGenerate Invoice
            </button>
          </li>

          <li>
            <button class="dropdown-item text-danger delete-btn"
                  data-invoice="${row.invoice_id}">
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
  params.append("to", to?to: "");
  params.append("from", from?from :"");
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
     
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
      invoice_id: row.invoice_id,
      company_name: row.company_name,
      "from_date": formatDate(row.from_date),
      "to_date": formatDate(row.to_date),
      "due_date": row.due_date,
      "total": row.total,
      admin_status: row.admin_status,
        tp: row.tp,
        fulldata: row 
        
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

    setTotals({
      taxamt: 0,
      amtcad: 0,
      qtyltr: 0,
      qtygln: 0,
      amtusd: 0,
      fee: 0,
      amtreal: 0,
    });

    callback({
      draw: data.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
    });
  }
},
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

  const invoice_id = selectElement.data("id");
  const field = selectElement.data("field"); // 🔥 important
  const newValue = selectElement.val();
  const oldValue = selectElement.data("previous");

  Swal.fire({
    title: "Are you sure?",
    text: "Change Admin Status?",
    icon: "warning",
    showCancelButton: true,
  }).then(async (result) => {

    if (!result.isConfirmed) {
      selectElement.val(oldValue);
      return;
    }

    try {
let updateApi;


await axios.put(`${APINAME}/${invoice_id}`, {
  id: invoice_id,
  [field]: field === "mails" ? Number(newValue) : newValue
});
     

      table.ajax.reload(null, false);

      Swal.fire("Updated!", "Status changed successfully.", "success");

    } catch (error) {

      selectElement.val(oldValue);

      Swal.fire("Error!", "Something went wrong.", "error");
    }

  });

});

    $(document).on("click", ".delete-btn", function () {

  const invoiceId = $(this).data("invoice");
  const table = $("#example").DataTable();

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`${APINAME}/${invoiceId}`)
        .then(() => {

          Swal.fire('Deleted!', 'Record deleted successfully.', 'success');

          // 🔥 Reload DataTable from server
          table.ajax.reload(null, false);

        })
        .catch((err) => {

          Swal.fire('Error!', 'Failed to delete record.', 'error');
          console.error(err);

        });

    }

  });

});
  }

 const handleSearch = (formData) => {
    const from = formData.from ||"";
    const to = formData.to ||"";
 const company_id =  formData.company_id ||"";
    GetDataTAble(from ,to ,company_id); // fetch new data immediately
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
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='view MoneyCode' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="MoneyCode Invoices List" />
              <CardBody>
                <ViewMoneyCodeForm onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
              
                <HeaderCard
                  title="MoneyCode Invoices List"
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

export default Index;