import React, { Fragment, useState, useEffect,useMemo } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import {
  combine_invoice,
  owner_invoice,
  customized_invoice,
  retail_invoice,
  invoice,
  download,
} from "../../api";
import OwnerOperator from "../viewInvoice/OwnerOperator";
import ViewInvoiceForm from "../viewInvoice/ViewInvoiceForm";
import CustomizedInvoice from "../viewInvoice/CustomizedInvoice";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import { downloadPdf } from "../../Hooks/Dropdowns";
import usePaginatedTable from "../../Hooks/usePagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";
import {
  FaTrashAlt,
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
} from "react-icons/fa";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const ViewIndex = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [btntp, setbtntp] = useState("INV");
  const [activeTab, setActiveTab] = useState("1");

  // const [tableColumns, setTableColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

    const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };
  let API_URL="";
const tab=getActiveTabFromUrl();
  if(tab==1)
  {API_URL= combine_invoice;}
  else if(tab==2){API_URL= owner_invoice;}
  else if(tab==3){API_URL= customized_invoice;}
const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
  } = usePaginatedTable({ apiUrl: API_URL });
  const toggle = () => setDropdownOpen((prev) => !prev);

  const getApiByTab = (tabId) => {
  switch (tabId) {
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

 
  function GetDataTAble(from,to,supplier,formData,api ) {
   const columns = [
  { data: "invoice_id", title: "Invoice#" },
  { data: "company_name", title: "Company" },
  { data: "from", title: "From" },
  { data: "to", title: "To" },
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total" },
  { data: "Retail Total", title: "retail_price" },
  { data: "saving", title: "Saving" },
  { data: "fees", title: " Fees" },
  { data: "tr_count", title: "Tr Count" },
  { data: "country", title: "Country" },
  { data: "supplier_name", title: "Supplier" },
  { data: "mail_by", title: "Mailed_By " },
  { data: "mail_on", title: "Mailed_On" },
   {
    data: "mails",
    title: "Show/Hide",
    orderable: false,
    render: function (data, type, row) {
      return `
        <select class="form-select form-select-sm show-hide"
                data-id="${row.invoice_id}">
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
        <select class="form-select form-select-sm admin-status"
                data-id="${row.invoice_id}">
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

  const url = `/card-admin/edit-transaction/${btoa(row.id)}`;
  return `
    <div class="dropdown">
      <button class="btn btn-sm btn-success dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown">
        Action
      </button>

      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item"
             href="${url}">
             <i class="fa fa-edit me-2 text-primary"></i> Edit
          </a>
        </li>

        <li>
          <button class="dropdown-item delete-btn text-danger"
                  data-id="${row.id}">
            <i class="fa fa-trash me-2"></i> Delete
          </button>
        </li>
      </ul>
    </div>
  `;
},
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
          fixedColumns: { leftColumns: 1, rightColumns: 1},
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
  params.append("company_id", formData?.company_id?formData?.company_id:"");
  params.append("to", to);
  params.append("from", from);
  params.append("supplier_id", supplier);
  params.append("state_prov", formData?.state_prov?formData?.state_prov:"");
  params.append("item", formData?.item?formData?.item:"");
  params.append("invoiced", formData?.invoiced?formData?.invoiced:"");
  params.append("invoice_type", formData?.invoice_type?formData?.invoice_type:"");
  params.append("currency", formData?.currency?formData?.currency:"");
  params.append("card_no", formData?.card_no?formData?.card_no:"");
  try {

  const response = await fetch(`${api}?${params.toString()}`);
  const json = await response.json();

  const tableData = json.data.map((row) => ({
    id: row.id,
    Company: row.company,
    company_name: row.company_name,
    supplier_name: row.supplier_name,
    tran_date: row.tran_date,
    tran_time: row.tran_time,
    invoice: row.invoice,
    unit: row.unit,
    driver_name: row.driver_name,
    city: row.city,
    state_prov: row.state_prov,
    fees: row.fees,
    item: row.item,
    unit_price: row.unit_price,
    tax_unit_price: row.tax_unit_price,
    qty: row.qty,
    amt: row.amt,
    tax_amt: row.tax_amt,
    currency: row.currency,
  }));

  callback({
    draw: data.draw,
    recordsTotal: json.recordsTotal,
    recordsFiltered: json.recordsFiltered,
    data: tableData,
  });

} catch (error) {

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
  }
useEffect(() => {
  const api = getApiByTab(activeTab);
      GetDataTAble("from","to","supplier","formData",api);
}, [activeTab]);
 

  // const getTableSetter = (source) => {
  //   if (source === combine_invoice) {
  //     setbtntp("INV");
  //     return setData;
  //   }
  //   if (source === owner_invoice) {
  //     setbtntp("OWNER");
  //     return handleSetData;
  //   }
  //   if (source === customized_invoice) {
  //     setbtntp("CUS");
  //     return setCustomizedData;
  //   }
  //   return setData;
  // };

  // const handleShowHideChange = (fullRow, source) => {
  //   const mails = $("#mails_" + fullRow.invoice_id).val();
  //   const admin_status = $("#admin_status_" + fullRow.invoice_id).val();
  //   const setTableData = getTableSetter(source);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Change Show / Hide status?",
  //     icon: "warning",
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setTableData((prev) =>
  //         prev.map((row) =>
  //           row.fulldata.invoice_id === fullRow.invoice_id
  //             ? {
  //                 ...row,
  //                 fulldata: {
  //                   ...row.fulldata,
  //                   mails: mails,
  //                   admin_status: admin_status,
  //                 },
  //               }
  //             : row,
  //         ),
  //       );
  //       let api;

  //       if (fullRow.tp === "Retail") api = invoice;
  //       else if (fullRow.tp === "Rack") api = retail_invoice;
  //       else if (source === owner_invoice) api = owner_invoice;
  //       else if (source === customized_invoice) api = customized_invoice;
  //       else {
  //         api = invoice;
  //         setbtntp("INV");
  //       }
  //       // 3️⃣ API call

  //       const update_status = {
  //         id: fullRow.invoice_id,
  //         mails: Number(mails),
  //         admin_status: admin_status,
  //       };
  //       console.log("update_status : ", update_status);

  //       axios.put(`${api}/${fullRow.invoice_id}`, update_status).catch(() => {
  //         setTableData((prev) =>
  //           prev.map((row) =>
  //             row.fulldata.invoice_id === fullRow.invoice_id
  //               ? {
  //                   ...row,
  //                   fulldata: {
  //                     ...row.fulldata,
  //                     mails: mails,
  //                     admin_status: admin_status,
  //                   },
  //                 }
  //               : row,
  //           ),
  //         );
  //       });
  //     }

  //     // 2️⃣ Decide API
  //   });
  // };
  // const getActiveTabFromUrl = () => {
  //   const params = new URLSearchParams(window.location.search);
  //   return params.get("tab") || "1";
  // };

  // const handleMail = (row) => {
  //   console.log(row);
  //   const activeTab = getActiveTabFromUrl();

  //   let api;
  //   if (activeTab === "1") api = combine_invoice;
  //   else if (activeTab === "2") api = owner_invoice;
  //   else if (activeTab === "3") api = customized_invoice;
  //   else api = combine_invoice;

  //   const payload = {
  //     mail_type: "INVOICE",
  //     supplier: row.fulldata.supplier_id,
  //     invoiceType:
  //       api === combine_invoice
  //         ? row?.fulldata?.tp
  //         : api === owner_invoice
  //           ? "OWNER"
  //           : api === customized_invoice
  //             ? "CUSTUM"
  //             : null,

  //     ids: row["Invoice#"],
  //   };

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you really want to send the mail?",
  //     icon: "warning",
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .post(`${api}/send-mail`, payload)
  //         .then(() => {
  //           Swal.fire("Successfully sent the mail", "", "success");
  //         })
  //         .catch(() => {
  //           Swal.fire("Error!", "Failed to send the mail.", "error");
  //         });
  //     }
  //   });
  // };

 
  // const applyFilters = (tableData, filters) => {
  //   return tableData.filter((row) =>
  //     Object.keys(filters).every((key) => {
  //       if (!filters[key]) return true;
  //       return (
  //         row[key] && row[key].toString().toLowerCase().includes(filters[key])
  //       );
  //     }),
  //   );
  // };
  function handleDownload(type, filters) {
   
const ids = []; 
$('.chk input[type="checkbox"]:checked').each(function () {  ids.push($(this).val());});

if (ids.length === 0) {  alert('Please select at least one item');  return;}

 const IDSUP = ids.join(',');  
const from = $('#from').val();
const to = $('#to').val();
const country = $('input[name="country"]').val();
const company_id = $('input[name="company"]').val();
const invcat = $('input[name="category"]').val();
const invoice_type = $('input[name="invoiceType"]').val();
const show_hide = $('input[name="invoiceShow"]').val();  

 window.open(`${download}?type=INVOICE&format=${type}&supplier_id=${IDSUP}&from=${from}&to=${to}&country=${country}&company_id=${company_id}&invcat=${invcat}&invoice_type=${invoice_type}&show_hide=${show_hide}`, "_self");

}

  const View_Invoice = [
    {
      id: "1",
      label: "View Invoices",
      component: (
        <ViewInvoiceForm title="Invoice Filters" onSearch={handleSearch} />
      ),
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: (
        <OwnerOperator
          title="Owner Operator Invoice Filters"
          onSearch={handleSearch}
        />
      ),
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: (
        <CustomizedInvoice
          title="Customised Invoice Filters"
          onSearch={handleSearch}
        />
      ),
    },
  ];
//    const tableColumns = useMemo(() => {
//   const cols = Object.keys(columnsMap)
//     .filter((key) => key !== "Id")
//     .map((key) => ({
//       name: key,
//       selector: (row) => row[key],
//       sortable: true,
//       width: columnWidths[key],
//       wrap: true,
//     }));
//     cols.push({
//       name: (
//         <div style={{ width: "100%" }}>
//           <div className="d-flex align-items-end justify-content-start">
//             Show/Hide
//           </div>
        
//         </div>
//       ),
//       cell: (row) => (
//         <select
//           className="form-select form-select-sm"
//           id={`mails_${row.fulldata.invoice_id}`}
//           value={String(row.fulldata.mails)} 
//           onChange={(e) => handleShowHideChange(row.fulldata, row.source)}
//        >
//          <option value="1">Show</option>          <option value="0">Hide</option>
//         </select>
//       ),
//    width: "100px",
//     });

//     cols.push({
//       name: (
//         <div style={{ width: "100%" }}>
//           <div className="d-flex align-items-end justify-content-start">
//             Status
//           </div>
        
//         </div>
//       ),
//       cell: (row) => (
//         <select
//           className="form-select form-select-sm"
//           id={`admin_status_${row.fulldata.invoice_id}`}
//           value={row.fulldata.admin_status}
//           onChange={(e) => handleShowHideChange(row.fulldata, row.source)}
//         >
//           <option value="Open">Open</option>
//           <option value="Entered">Entered</option>
//           <option value="Close">Close</option>
//         </select>
//       ),
//       width: "120px",
//     });


//   cols.push({
//     name: "Action",
//     cell: (row) => (
//       <Dropdown
//         isOpen={openRowId === row["Invoice#"]}
//         toggle={() =>
//           setOpenRowId(
//             openRowId === row["Invoice#"] ? null : row["Invoice#"]
//           )
//         }
//         direction="up"
//       >
//         <DropdownToggle caret size="sm">
//           Action
//         </DropdownToggle>

//         <DropdownMenu  style={{ zIndex: 9999 }}   end>
//           <DropdownItem
//             toggle={false}
//             onClick={(e) => {
//               e.stopPropagation();
//               downloadPdf(
//                 row.fulldata.download_link,
//                 btntp,
//                 row
                
//               );
//             }}
//           >
//             <FaDownload className="me-2" /> Download
//           </DropdownItem>

//            <DropdownItem
//           className="text-primary"          onClick={() => handleMail(row)}        >
//           <FaEnvelope className="me-2" /> Email
//         </DropdownItem>
//         <DropdownItem
//           className="text-primary"
//           onClick={() => handleMail(row)}>    
//           <FaEnvelope className="me-2" /> Regenerate Invoice</DropdownItem>
//        <DropdownItem divider />
//         <DropdownItem   
//         className="text-danger" 
//           onClick={() => handleDelete(row)}>
//           <FaTrashAlt className="me-2" /> Delete       </DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     ),
//     ignoreRowClick: true,
//     allowOverflow: true,
//     button: true,
//   });

//   return cols;
// }, [columnsMap, columnWidths, openRowId]);
  const View_Invoice_Table = [
    {
      id: "1",
      label: "View Invoices",
      component: (
      <div>
      <table id="invoiceTable" className="table table-bordered w-100">
        <thead>
          <tr>
            <th>Invoice#</th>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Due Date</th>
            <th>Total</th>
            <th>Retail Total </th>
            <th>Saving</th>
            <th>Fees</th>
            <th>Tr Count</th>
            <th>Country</th>
            <th>Supplier</th>
            <th>Mailed By</th>
            <th>Mailed On</th>
            <th>Show/Hide </th>
            <th>Status</th>
            <th>Action </th>
          </tr>
        </thead>
      </table>
    </div>
        
      ),
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: (
       <table id="invoiceTable" className="table table-bordered w-100">
        <thead>
          <tr>
            <th>Invoice#</th>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Due Date</th>
            <th>Total</th>
            <th>Retail Total </th>
            <th>Saving</th>
            <th>Fees</th>
            <th>Tr Count</th>
            <th>Country</th>
            <th>Supplier</th>
            <th>Mailed By</th>
            <th>Mailed On</th>
            <th>Show/Hide </th>
            <th>Status</th>
            <th>Action </th>
          </tr>
        </thead>
      </table>
      ),
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: (
       <table id="invoiceTable" className="table table-bordered w-100">
        <thead>
          <tr>
            <th>Invoice#</th>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Due Date</th>
            <th>Total</th>
            <th>Retail Total </th>
            <th>Saving</th>
            <th>Fees</th>
            <th>Tr Count</th>
            <th>Country</th>
            <th>Supplier</th>
            <th>Mailed By</th>
            <th>Mailed On</th>
            <th>Show/Hide </th>
            <th>Status</th>
            <th>Action </th>
          </tr>
        </thead>
      </table>
      ),
    },
  ];

//   useEffect(() => {
//    const cols = Object.keys(columnsMap)
//       .filter((key) => key !== "Id")
//       .map((key) => {
//         const colWidth = columnWidths[key];
//         const colWidthPx = parseInt(colWidth, 10);
//         return {
//           name: (
//             <div style={{ width: "100%" }}>
//               <div className="d-flex align-items-end justify-content-start">
//                 {key}
//               </div>
//               <input
//                 type="text"
//                 className="mt-2"
//                 style={{
//                   width: "100%",
//                   // maxWidth: colWidthPx - 10 + "px",// small padding
//                   height: "28px",
//                   border: "none",
//                   borderRadius: "5px",
//                   boxSizing: "border-box",
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//                 onMouseDown={(e) => e.stopPropagation()}
//                 onChange={(e) => handleFilterChange(key, e.target.value)}
//               />
//             </div>
//           ),
//           selector: (row) => {
//             if (key === "From " || key === "To") {
//               return row[key].split(" ")[0];
//             }
//             return row[key];
//           },
//           sortable: true,
//           width: colWidth,
//           wrap: true,
//         };
//       });
//     cols.push({
//       name: (
//         <div style={{ width: "100%" }}>
//           <div className="d-flex align-items-end justify-content-start">
//             Show/Hide
//           </div>
//           <input
//             type="text"
//             className="mt-2"
//             style={{
//               width: "100%",
//  maxWidth: colWidthPx - 10 + "px",// small padding
//               height: "28px",
//               border: "none",
//               borderRadius: "5px",
//               boxSizing: "border-box",
//             }}
//             onClick={(e) => e.stopPropagation()}
//             onMouseDown={(e) => e.stopPropagation()}
//             onChange={(e) => handleFilterChange("Show/Hide", e.target.value)}
//           />
//         </div>
//       ),
//       cell: (row) => (
//         <select
//           className="form-select form-select-sm"
//           id={`mails_${row.fulldata.invoice_id}`}
//           value={String(row.fulldata.mails)} 
//           onChange={(e) => handleShowHideChange(row.fulldata, row.source)}
//        >
//          <option value="1">Show</option>          <option value="0">Hide</option>
//         </select>
//       ),
//    width: "100px",
//     });

//     cols.push({
//       name: (
//         <div style={{ width: "100%" }}>
//           <div className="d-flex align-items-end justify-content-start">
//             Status
//           </div>
//           <input
//             type="text"
//             className="mt-2"
//             style={{
//               width: "100%",
//               // maxWidth: colWidthPx - 10 + "px",
//               height: "28px",
//               border: "none",
//               borderRadius: "5px",
//               boxSizing: "border-box",
//             }}
//             onClick={(e) => e.stopPropagation()}
//             onMouseDown={(e) => e.stopPropagation()}
//             onChange={(e) => handleFilterChange("Show/Status", e.target.value)}
//           />
//         </div>
//       ),
//       cell: (row) => (
//         <select
//           className="form-select form-select-sm"
//           id={`admin_status_${row.fulldata.invoice_id}`}
//           value={row.fulldata.admin_status}
//           onChange={(e) => handleShowHideChange(row.fulldata, row.source)}
//         >
//           <option value="Open">Open</option>
//           <option value="Entered">Entered</option>
//           <option value="Close">Close</option>
//         </select>
//       ),
//       width: "120px",
//     });
//  cols.push({
//   name: "Action",
//   cell: (row) => (
//     <Dropdown
//       isOpen={openRowId === row["Invoice#"]}
//       toggle={() =>
//         setOpenRowId(
//           openRowId === row["Invoice#"] ? null : row["Invoice#"]
//         )
//       }
//       direction="up"  
//     >
//       <DropdownToggle 
//         caret
//         size="sm"
//         color="white"
//         className="px-2 bg-primaty"
//       >
//         Action
//       </DropdownToggle>

//       <DropdownMenu end style={{ minWidth: 160 }}>





//         <DropdownItem
//           tag={Link}
//           to={`/viewInvoice/ViewPdf/${btoa(
//             row.fulldata.invoice_id
//           )}`}
//           target="_blank"
//           className="text-success"
//         >
//           <FaEye className="me-2" /> View
//         </DropdownItem>

//         <DropdownItem
//           className="text-primary"
//           onClick={() => handleMail(row)}
//         >
//           <FaEnvelope className="me-2" /> Email
//         </DropdownItem>

//         <DropdownItem
//           className="text-primary"
//           onClick={() => handleMail(row)}
//         >
//           <FaEnvelope className="me-2" /> Regenerate Invoice
//         </DropdownItem>

//         <DropdownItem divider />

//         <DropdownItem
//           className="text-danger"
//           onClick={() => handleDelete(row)}
//         >
//           <FaTrashAlt className="me-2" /> Delete
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   ),
//   ignoreRowClick: true,
//   allowOverflow: true,
//   button: true,
//   minWidth: "160px",
// });


//     setTableColumns(cols);
//   }, [openRowId]);


  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest(".dropdown-action")) {
  //       setOpenRowId(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // const handleDelete = (row) => {
  //   console.log(data);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: `Do you really want to delete ?`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .delete(`${combine_invoice}/${row["Invoice#"]}`)
  //         .then(() => {
  //           setData((prevData) =>
  //             prevData.filter((item) => item["Invoice#"] !== row["Invoice#"]),
  //           );
  //           Swal.fire("Deleted!", "Record deleted successfully.", "success");
  //         })
  //         .catch(() => {
  //           Swal.fire("Error!", "Failed to delete record.", "error");
  //         });
  //     }
  //   });
  // };

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="View Invoice" />
      <Container fluid={true}>
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
