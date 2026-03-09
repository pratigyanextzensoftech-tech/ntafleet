import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  tcheck_invoice as APINAME,download,send_mail} from '../../../api/index'
import View from './View'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv } from "react-icons/fa";
import Swal from "sweetalert2";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import { formatDate } from "../../../Hooks/Dropdowns";
import { downloadPdf } from "../../../Hooks/Dropdowns";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const ViewTcheck = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[FormData,setFormData]=useState([])
  const toggle = () => setDropdownOpen((prev) => !prev);
  
  useEffect(() => { 
        const company = document.getElementById("company")?.value;
        const from = document.getElementById("from")?.value;
        const to = document.getElementById("to")?.value;
          GetDataTAble(from,to, company);
  }, []);

  function GetDataTAble(from,to,company) {

     const columns = [
  { data: "invoice_id", title: "Invoice #" },
  { data: "company_name", title: "Company" },
  { data: "from_date", title: "From Date" },
  { data: "to_date", title: "To Date" },
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total Due" },
    {
  data: "mails",
  title: "Show_Hide",
  orderable: false,
  render: function (data, type, row) {
    return `
      <select class="form-select form-select-sm status-change"
              data-id="${row.invoice_id}"
              data-field="mails">
        <option value="1" ${data == 1 ? "selected" : ""}>Show</option>
        <option value="0" ${data == 0 ? "selected" : ""}>Hide</option>
      </select>
    `;
  }
},
  {
  data: "admin_status",
  title: "Status",
  orderable: false,
  render: function (data, type, row) {
    return `
       <select class="form-select form-select-sm status-change"
              data-id="${row.invoice_id}"
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
    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown">
         <i class="fa fa-cog me-1"></i>   Action
        </button>

        <ul class="dropdown-menu">

          <li>
            <a href="#" 
              class="dropdown-item download-btn text-primary"
              data-link="${row.download_link}"
                 data-id="${row.invoice_id}">
              <i class="fa fa-download"></i> Download
            </a>
          </li>

          <li>
            <a href="/card-admin/viewInvoice/ViewPdf/${btoa(row.invoice_id)}"
              target="_blank"
              class="dropdown-item text-success">
              <i class="fa fa-eye"></i> View
            </a>
          </li>

          <li>
            <a href="#"
              class="dropdown-item email-btn text-info"
              data-id="${row.invoice_id}">
              <i class="fa fa-envelope"></i> Email
            </a>
          </li>

          <li>
            <a href="#"
              class="dropdown-item regenerate-btn text-warning"
              data-id="${row.invoice_id}">
              <i class="fa fa-file-invoice"></i> Re-generate Invoice
            </a>
          </li>

          <li>
            <a href="#"
              class="dropdown-item delete-btn text-danger"
              data-id="${row.invoice_id}">
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
  params.append("company_id", company?company:"");
  params.append("from", from?from:"");
  params.append("to", to?to:"");
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
    // ✅ Map table data
    const tableData = tableRes.data.map((row) => ({
    "invoice_id": row.invoice_id,
   "company_name":row.company_name,
   "from_date":formatDate(row.from_date),
   "to_date":formatDate(row.to_date),
    "due_date":row.due_date,
    "admin_status":row.admin_status,
    "mails":row.mails,
   "total":row.total, 
   "download_link":row.download_link    
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
$(document).on("click", ".delete-btn", function (e) {
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

          // If serverSide true
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
    $(document).off("click", ".email-btn");

    $(document).on("click", ".email-btn", function () {
      const invoiceId = $(this).data("id");
      const supplierId = $(this).data("supplier");
      // 🔥 decide invoiceType

      const payload = {
        mail_type: "INVOICE",
        supplier: supplierId,
        invoiceType: "TCHECK",
        ids: invoiceId,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to send the mail?",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${send_mail}`, payload)
            .then(() => {
              Swal.fire("Successfully sent the mail", "", "success");
            })
            .catch(() => {
              Swal.fire("Error!", "Failed to send the mail.", "error");
            });
        }
      });
    });
       $(document).off("click", ".regenerate-btn");

    $(document).on("click", ".regenerate-btn", function () {
      const invoiceId = $(this).data("id");
      // 🔥 decide invoiceType

      const payload = {
        invoiceType: "TCHECK",
        ids: invoiceId,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to Regenerate?",
        icon: "warning",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${APINAME}/regenerate`, payload)
            .then(() => {
              Swal.fire("Successfully sent the mail", "", "success");
            })
            .catch(() => {
              Swal.fire("Error!", "Failed to send the mail.", "error");
            });
        }
      });
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
const message =
  field === "mails"
    ? "Change Show / Hide status?"
    : "Change Admin Status?";

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

  }

 const handleSearch = (formData) => {
 const company =  formData.company_id ||"";
 const from =  formData.from ||"";
 const to =  formData.to ||"";
 console.log(formData);
 

    GetDataTAble(from,to ,company); // fetch new data immediately
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
      <Breadcrumbs parent='Tcheck' title='T-Check Invoices List'/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                  <View btnTitle="search Data" onSearch={handleSearch} />
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="T-Check Invoices List"
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

           <DropdownItem className="text-success"  onClick={() => handleDownload("Quickbooks","OWNER")}>
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

export default ViewTcheck;