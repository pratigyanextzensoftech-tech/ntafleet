import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import {
  combine_invoice,
  owner_invoice,
  customized_invoice,
} from "../../api";
import OwnerOperator from "../viewInvoice/OwnerOperator";
import { FaFileExcel,FaFileCsv,FaFilePdf } from "react-icons/fa";
import ViewInvoiceForm from "../viewInvoice/ViewInvoiceForm";
import CustomizedInvoice from "../viewInvoice/CustomizedInvoice";
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { formatDate } from "../../Hooks/Dropdowns";
import { download } from "../../api";
import { downloadPdf } from "../../Hooks/Dropdowns";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
const ViewIndex = () => {
  const [filters, setFilters] = useState({});
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prev) => !prev);

  const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };

function handleDownload(type, invoiceType) {
   console.log(type);
   
const ids = []; 
$('.chk input[type="checkbox"]:checked').each(function () {  ids.push($(this).val());});

if (ids.length === 0) {
    const supplierValue = $('input[name="supplier"]').val();

console.log(supplierValue);
    if (supplierValue) {
      ids.push(supplierValue);
    }
  }

  if (ids.length === 0) {
    alert('Please select at least one supplier');
    return;
  }


 const IDSUP = ids.join(',');  
const from = $('#from').val();
const to = $('#to').val();
const country = $('input[name="country"]').val();
const company_id = $('input[name="company"]').val();
const invcat = $('input[name="invcat"]').val();
const invoice_type = $('input[name="invoiceType"]').val();
const show_hide = $('input[name="invoiceShow"]').val();  

 window.open(`${download}?type=${invoiceType}&format=${type}&supplier_id=${IDSUP}&from=${from}&to=${to}&country=${country}&company_id=${company_id}&invcat=${invcat}&invoice_type=${invoice_type}&show_hide=${show_hide}`, "_self");

}
  const getApiByTab = (tab) => {
    switch (tab) {
      case "1":
        return combine_invoice;
      case "2":
        return owner_invoice;
      case "3":
        return customized_invoice;
      default:
        return combine_invoice;
    }
  };

  const getTableIdByTab = (tab) => {
    switch (tab) {
      case "1":
        return "#invoiceCombine";
      case "2":
        return "#Ownerinvoice";
      case "3":
        return "#customizedTable";
      default:
        return "#invoiceCombine";
    }
  };
    const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${combine_invoice}/${row["Invoice#"]}`)
          .then(() => {
        //  GetDataTAble(api,tableId)
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete record.", "error");
          });
      }
    });
  };
//  useEffect(() => {
//  const deleteHandler = function (row) {
//     const id = $(this).data("id");

//     handleDelete(row); // ✅ call React function
//   };

//   $(document).on("click", ".delete-btn", deleteHandler);

//   return () => {
//     $(document).off("click", ".delete-btn", deleteHandler);
//   };

// }, []);



  const GetDataTAble = (api, tableId,from,to,company_id,country,invoice_type,invcat,show_hide,cust_inv_type,supplier) => {
    console.log(api)
   if ($.fn.DataTable.isDataTable(tableId)) {
  $(tableId).DataTable().clear().destroy();
}
   const columns =[
  { data: "invoice_display", title: "Invoice#" },
  { data: "company_name", title: "Company" },
 {
  data: null,
  title: "From - To",
  render: function (data, type, row) {
    
    const from = row.from || "";
    const to = row.to || "";
    return `${formatDate(from)} ${formatDate(to)}`;
  }
},
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total" },
  { data: "retail_price", title: "Retail Total" },
  { data: "saving", title: "Saving" },
  { data: "fees", title: " Fees" },
  { data: "tr_count", title: "Tr Count" },
  { data: "country", title: "Country" },
  { data: "supplier_name", title: "Supplier" },
  { data: "mail_by", title: "Mailed_By " },
  { data: "mail_on", title: "Mailed_On" },
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
 let btnType;

    if (api === combine_invoice) {
      btnType = "INV";
    } 
    else if (api === owner_invoice) {
      btnType = "OWNER";
    } 
    else if (api === customized_invoice) {
      btnType = "CUS";
    } 
       const viewUrl = `/card-admin/viewInvoice/ViewPdf/${btoa(row.invoice_id)}?type=${btnType}`;

    let actionItems = "";

    // 🔥 API based condition
    if (api===combine_invoice) {

      // FIRST API → 4 options
      actionItems = `
     <li>
  <button class="dropdown-item download-btn"
          data-link="${row.download_link}"
          data-id="${row.invoice_id}"
          data-type="${btnType}">
    <i class="fa fa-download me-2 text-danger"></i>
    Download
  </button>
</li>

        <li>
        <a class="dropdown-item"
               href="${viewUrl}"
               target="_blank"
               rel="noopener noreferrer">
              <i class="fa fa-eye me-2 text-success"></i>
              View
            </a>
        </li>

        <li>
       <button class="dropdown-item email-btn"
          data-id="${row.invoice_id}"
          data-supplier="${row.supplier_id}"
          data-tp="${row.tp || ''}"
          data-api="${api}">
    <i class="fa fa-envelope me-2 text-primary"></i>
    Email
  </button>
        </li>

        <li>
          <button class="dropdown-item regenerate-btn"
                  data-id="${row.invoice_id}">
            <i class="fa fa-sync me-2 text-info"></i>
            Regenerate
          </button>
        </li>
          <li>
           <button class="dropdown-item delete-btn text-danger"
                   data-id="${row.invoice_id}"
                data-api="${api}">
            <i class="fa fa-trash me-2"></i>
            Delete
          </button>
        </li>
      `;

    } 
    else if (api===owner_invoice) {

      // SECOND API → 5 options
      actionItems = `
     <li>
  <button class="dropdown-item download-btn"
          data-link="${row.download_link}"
          data-id="${row.invoice_id}"
          data-type="${btnType}">
    <i class="fa fa-download me-2 text-danger"></i>
    Download
  </button>
</li>
           <li>
          <button class="dropdown-item download-btn"
                  data-link="${row.download_link}"
                  data-id="${row.invoice_id}">
            <i class="fa fa-download me-2 text-danger"></i>
            Download CSV EXCEl
          </button>
        </li>

        <li>
          <a class="dropdown-item"
               href="${viewUrl}"
               target="_blank"
               rel="noopener noreferrer">
              <i class="fa fa-eye me-2 text-success"></i>
              View
            </a>
        </li>

        <li>
        <button class="dropdown-item email-btn"
          data-id="${row.invoice_id}"
          data-supplier="${row.supplier_id}"
          data-tp="${row.tp || ''}"
          data-api="${api}">
    <i class="fa fa-envelope me-2 text-primary"></i>
    Email
  </button>
        </li>

        <li>
          <button class="dropdown-item regenerate-btn"
                  data-id="${row.invoice_id}">
            <i class="fa fa-sync me-2 text-info"></i>
            Regenerate
          </button>
        </li>
          <li>
          <button class="dropdown-item delete-btn text-danger"
                   data-id="${row.invoice_id}"
                data-api="${api}">
            <i class="fa fa-trash me-2"></i>
            Delete
          </button>
        </li>
      `;
    }
else if(api===customized_invoice){
     actionItems = `
      <li>
  <button class="dropdown-item download-btn"
          data-link="${row.download_link}"
          data-id="${row.invoice_id}"
          data-type="${btnType}">
    <i class="fa fa-download me-2 text-danger"></i>
    Download
  </button>
</li>

        <li>
         <a class="dropdown-item"
               href="${viewUrl}"
               target="_blank"
               rel="noopener noreferrer">
              <i class="fa fa-eye me-2 text-success"></i>
              View
            </a>
        </li>

        <li>
         <button class="dropdown-item email-btn"
          data-id="${row.invoice_id}"
          data-supplier="${row.supplier_id}"
          data-tp="${row.tp || ''}"
          data-api="${api}">
    <i class="fa fa-envelope me-2 text-primary"></i>
    Email
  </button>
        </li>

         <button class="dropdown-item delete-btn text-danger"
                 data-id="${row.invoice_id}"
                data-api="${api}">
            <i class="fa fa-trash me-2"></i>
            Delete
          </button>
      
      `;
}
     return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
          Action
        </button>
        <ul class="dropdown-menu">
          ${actionItems}
        </ul>
      </div>
    `;  
  }
}
];
    $(tableId).DataTable({
      serverSide: true,
      processing: true,
      paging: true,
      searching: true,
      destroy:true,
      ordering: true,
       scrollX: true,
      scrollCollapse: true,
      fixedColumns: { leftColumns: 1},
      pageLength: 10,
 columns: columns, 
      ajax: async function (data, callback) {
        const params = new URLSearchParams();
        params.append("start", data.start);
        params.append("length", data.length);
        params.append("search", data.search.value || "");
  params.append("to", to||"");
  params.append("from", from ||"");
  params.append("supplier_id", supplier ||"");
  params.append("company_id",company_id ||"");
  params.append("country", country);
  params.append("invcat", invcat ||"");
  params.append("invoice_type", invoice_type || "");
  params.append("show_hide", show_hide ||"");
  params.append("cust_inv_type", cust_inv_type || "");

        try {
          const response = await fetch(`${api}?${params.toString()}`);
          const json = await response.json();
     const tableData = json.data.map((row) => (
  
      {
      id:row.id,
      invoice_id: row.invoice_id,
    invoice_display: row.tp === "Rack" ? `${row.invoice_type}-${row.invoice_id}`: `NTA-${row.invoice_id}`,
      company_name: row.company_name,
      from: row.from,
      to: row.to,
      due_date: row.due_date,
      total: row.total,
      retail_price: row.retail_price ||0,
      saving: row.saving,
      fees: row.fees,
      tr_count: row.tr_count,
      country: row.country,
      supplier_name: row.supplier_name,
      mail_by: row.mail_by|| null,
      mail_on: row.mail_on,
      mails: row.mails,
      admin_status: row.admin_status,
      download_link:row.download_link,
      id: row.id
    }));
    console.log(tableData)
          callback({
            draw: data.draw,
            recordsTotal: json.recordsTotal,
            recordsFiltered: json.recordsFiltered,
            data: tableData,
          });
        } catch (error) {
          console.error(error);
          callback({
            draw: data.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          });
        }
      },

  
    });
   // Store previous value
$(document).off("focus", ".status-change");
$(document).on("focus", ".status-change", function () {
  $(this).data("previous", $(this).val());
});


// Handle change for BOTH dropdowns
$(document).off("change", ".status-change");
$(document).on("change", ".status-change", function () {

  const table = $(tableId).DataTable();
  const selectElement = $(this);

  const invoice_id = selectElement.data("id");
  const field = selectElement.data("field"); // 🔥 important
  const newValue = selectElement.val();
  const oldValue = selectElement.data("previous");

  Swal.fire({
    title: "Are you sure?",
    text: "Change status?",
    icon: "warning",
    showCancelButton: true,
  }).then(async (result) => {

    if (!result.isConfirmed) {
      selectElement.val(oldValue);
      return;
    }

    try {

      await axios.put(`${api}/${invoice_id}`, {
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

$(document).off("click", ".delete-btn");

$(document).on("click", ".delete-btn", function () {

  const table = $(tableId).DataTable();
  const invoiceId = $(this).data("id");
  const apiUrl = $(this).data("api");   // 🔥 dynamic api

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

      axios.delete(`${apiUrl}/${invoiceId}`)
        .then(() => {

          // ✅ reload table without resetting page
          table.ajax.reload(null, false);

          Swal.fire("Deleted!", "Record deleted successfully.", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete record.", "error");
        });

    }
  });

});

$(document).off("click", ".email-btn");

$(document).on("click", ".email-btn", function () {

  const invoiceId = $(this).data("id");
  const supplierId = $(this).data("supplier");
  const tpValue = $(this).data("tp");
  const apiUrl = $(this).data("api");

  // 🔥 decide invoiceType
  let invoiceType;

  if (apiUrl === combine_invoice) {
    invoiceType = tpValue;
  } 
  else if (apiUrl === owner_invoice) {
    invoiceType = "OWNER";
  } 
  else if (apiUrl === customized_invoice) {
    invoiceType = "CUSTUM";
  }

  const payload = {
    mail_type: "INVOICE",
    supplier: supplierId,
    invoiceType: invoiceType,
    ids: invoiceId
  };

  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to send the mail?",
    icon: "warning",
    showCancelButton: true,
  }).then((result) => {

    if (result.isConfirmed) {

      axios.post(`${apiUrl}/send-mail`, payload)
        .then(() => {
          Swal.fire("Successfully sent the mail", "", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to send the mail.", "error");
        });

    }

  });

});
$(document).off("click", ".download-btn");

$(document).on("click", ".download-btn", function () {

  const link = $(this).data("link");
  const invoiceId = $(this).data("id");
  const btnType = $(this).data("type");

  // Create minimal row object (if needed)
  const row = {
    invoice_id: invoiceId
  };
console.log(link);
console.log(btnType);
console.log(row);

  // 🔥 Call your existing function
  downloadPdf(link, btnType, row);

});
  };



useEffect(() => {
  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);
  const from = document.getElementById("from").value ||"";
        const to = document.getElementById("to").value ||"";
        const company_id = document.getElementById("company_id").value ||"";
        const country = document.getElementById("country").value ||"";
        const invoice_type = document.getElementById("invoice_type").value ||"";
        const invcat = document.getElementById("invcat").value ||"";
        const show_hide = document.getElementById("show_hide").value ||"";
        const cust_inv_type = document.getElementById("customised")?.value ||"";
       const supplier = Array.from(
  document.querySelectorAll('input[name="supplier"]:checked')
).map(cb => cb.value);

console.log(supplier);
  setTimeout(() => {
    GetDataTAble(api, tableId,from ,to,company_id,country,invoice_type,invcat,show_hide,cust_inv_type,supplier);
  }, 200);

  return () => {
  if ($.fn.DataTable.isDataTable(tableId)) {
    $(tableId).DataTable().clear().destroy();
  }
};
}, [window.location.search]);

   const handleSearch = (formData) => {
     const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);

    console.log("🔍 Filters received:", formData);

    const from = formData.from ||"";
    const to = formData.to ||"";
       const supplier =  formData.supplier_id ;
 const company_id =  formData.company_id ||"";
        const country =formData.country ||"";
        const invoice_type = formData.invoice_type ||"";
        const invcat = formData.invcat ||"";
        const show_hide = formData.show_hide ||"";
        const cust_inv_type = formData.cust_inv_type ||"";
    GetDataTAble(api, tableId,from,to,company_id,country,invoice_type,invcat,show_hide,cust_inv_type,supplier); // fetch new data immediately
  };

  const View_Invoice = [
    {
      id: "1",
      label: "View Invoices",
      component: <ViewInvoiceForm onSearch={handleSearch} title="Invoice Filters" />,
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: <OwnerOperator onSearch={handleSearch} title="Owner Operator Invoice Filters" />,
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: <CustomizedInvoice onSearch={handleSearch} title="Customised Invoice Filters" />,
    },
  ];

  /* ---------------- TABLE TABS ---------------- */

  const View_Invoice_Table = [
    {
      id: "1",
      label: "View Invoices",
         
     component: (
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Invoices List"
          renderDropdown={() => (
             <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                           <DropdownToggle
                             tag="span"
                             className="px-2 text-white"
                             style={{ cursor: "pointer" }}
                           >
                             <i className="fa fa-download me-1"></i> Download
                           </DropdownToggle>
           
                           <DropdownMenu style={{ minWidth: 160 }}>
                             <DropdownItem
                               className="text-primary"
                               onClick={() => handleDownload("Excel","INVOICE")}
                             >
                               <FaFileExcel /> Download Excel
                             </DropdownItem>
           
                             <DropdownItem
                               className="text-danger"
                               onClick={() => handleDownload("CSV","INVOICE")}
                             >
                               <FaFileCsv /> Download CSV
                             </DropdownItem>
           
                             <DropdownItem
                               className="text-success"
                               onClick={() => handleDownload("Quickbooks","INVOICE")}
                             >
                               <FaFileCsv /> Download Quickbooks CSV
                             </DropdownItem>
           
                             <DropdownItem
                               className="text-warning"
                               onClick={() => handleDownload("Canada_Quickbooks","INVOICE")}
                             >
                               <FaFilePdf /> Download Canada Quickbooks
                             </DropdownItem>
                             <DropdownItem
                               className="text-primary"
                               onClick={() => handleDownload("Quickbooks_New","INVOICE")}
                             >
                               <FaFileCsv /> Download Quickbooks CSV new
                             </DropdownItem>
                             <DropdownItem
                               className="text-danger"
                               onClick={() => handleDownload("Quickbooks_Detailed","INVOICE")}
                             >
                               <FaFileCsv /> Download Detailed Quickbooks CSV
                             </DropdownItem>
                           </DropdownMenu>
                         </Dropdown>
          )}
          download={true}
        />

        <CardBody>
          <table
            id="invoiceCombine"
            className="table table-bordered w-100"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
),
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title=" Owner Transactions List"
          renderDropdown={() => (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                           <DropdownToggle
                             tag="span"
                             className="px-2 text-white"
                             style={{ cursor: "pointer" }}
                           >
                             <i className="fa fa-download me-1"></i> Download
                           </DropdownToggle>
           
                           <DropdownMenu style={{ minWidth: 160 }}>
                             <DropdownItem className="text-primary"  onClick={() => handleDownload("Excel","OWNER")}>
                               <FaFileExcel /> Download Excel
                             </DropdownItem>
           
                             <DropdownItem className="text-danger"  onClick={() => handleDownload("CSV","OWNER")}>
                               <FaFileCsv /> Download CSV
                             </DropdownItem>
           
                             <DropdownItem className="text-success"  onClick={() => handleDownload("Quickbooks","OWNER")}>
                               <FaFileCsv /> Download Quickbooks CSV
                             </DropdownItem>
           
                             <DropdownItem className="text-warning" onClick={() => handleDownload("Canada_Quickbooks","OWNER")}>
                               <FaFilePdf /> Download Canada Quickbooks
                             </DropdownItem>
                           </DropdownMenu>
                         </Dropdown>
          )}
          download={true}
        />

        <CardBody>
        <table id="Ownerinvoice" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: ( <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title=" Customized Transactions List"
          renderDropdown={() => (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                          <DropdownToggle
                            tag="span"
                            className="px-2 text-white"
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa fa-download me-1"></i> Download
                          </DropdownToggle>
          
                          <DropdownMenu style={{ minWidth: 160 }}>
                            <DropdownItem className="text-primary" onClick={() => handleDownload("Excel","CUSTOMIZE")}>
                              <FaFileExcel /> Download Excel
                            </DropdownItem>
          
                            <DropdownItem className="text-danger"  onClick={() => handleDownload("CSV","CUSTOMIZE")}>
                              <FaFileCsv /> Download CSV
                            </DropdownItem>
          
                            <DropdownItem className="text-success" onClick={() => handleDownload("Quickbooks","CUSTOMIZE")}>
                              <FaFileCsv /> Download Quickbooks CSV
                            </DropdownItem>
          
                            <DropdownItem className="text-warning" onClick={() => handleDownload("Canada_Quickbooks","CUSTOMIZE")}>
                              <FaFilePdf /> Download Canada Quickbooks
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
          )}
          download={true}
        />

        <CardBody>

        <table id="customizedTable" className="table table-bordered w-100" />
        </CardBody>
          </Card>
    </Col>
  </Row>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="View Invoice" />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Invoice Filter" />
              <CardBody>
                <BasicTabCard tabContent={View_Invoice} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <BasicTabCard tabContent={View_Invoice_Table} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ViewIndex;