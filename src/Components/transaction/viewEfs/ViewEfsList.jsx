import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import {  transactions_efs as APINAME,download} from '../../../api/index'
import ViewEfs from './ViewEfs'
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

const ViewEfsList = () => {
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
        const state_prov = document.getElementById("stateProv")?.value;
        const unit = document.getElementById("unit")?.value;
        const company = document.getElementById("company")?.value;
        const cardNo = document.getElementById("cardNo")?.value;
        const currency = document.getElementById("currency")?.value;
        const items = document.getElementById("items")?.value;
        const invoice_type = document.getElementById("invType")?.value;
        const supplier = document.querySelector('[name="supplier"]')?.value;      

      GetDataTAble(from,to,state_prov,unit,cardNo,company,currency,items,invoice_type,supplier);
  }, []);

  function GetDataTAble(from,to,company,state_prov,unit,cardNo,currency,items,invoice_type,supplier ) {
     const columns = [
  { data: "card_no", title: "Card" },
  { data: "company_name", title: "Company Name" },
  { data: "supplier_name", title: "Supplier" },
  { data: "tran_date", title: " Date" },
  { data: "tran_time", title: " Time" },
  { data: "invoice", title: "Invoice" },
  { data: "unit", title: "Unit" },
  { data: "driver_name", title: "Driver Name" },
  { data: "city", title: "City" },
  { data: "state_prov", title: "State" },
  { data: "fees", title: "Fees" },
  { data: "item", title: "Item" },
  { data: "unit_price", title: "Unit Price" },
  { data: "qty", title: "Qty" },
  { data: "amt", title: "Amt" },
  { data: "amt", title: "Tax Amt" },
  { data: "currency", title: "Currency" },
 
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
       <i class="fa fa-cog me-1"></i>    Action
        </button>

        <ul class="dropdown-menu">

          <li>
            <button class="dropdown-item text-primary edit-btn"
                    data-id="${row.id}">
              <i class="fa fa-edit me-2"></i> Edit
            </button>
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
  params.append("to", to?to: "");
  params.append("state_prov", state_prov?state_prov :"");
  params.append("unit", unit?unit :"");
  params.append("currency", currency?currency :"");
  params.append("cardNo", cardNo?cardNo :"");
  params.append("items", items?items :"");
  params.append("invoice_type", invoice_type? invoice_type:"");
  params.append("supplier", supplier?supplier :"");
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
    "card_no": row.card_no,
   "company_name":row.company_name,
   "supplier_name":row.supplier_name,
   "tran_date":row.tran_date,
    "tran_time":row.tran_time,
   "invoice":row.invoice,
    "unit":row.unit,
    "driver_name":row.driver_name,
    "city":row.city,
   "state_prov":row.state_prov,
  "fees":row.fees,
   "item":row.item,
   "unit_price":row.unit_price,
    "qty":row.qty,
  "amt":row.amt,
    "amt":row.amt,
    "currency":row.currency,
        
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
 $(document).off("click", ".delete-btn").on("click", ".delete-btn", function () {

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

          // ✅ If serverSide true
          table.ajax.reload(null, false);

        })
        .catch((err) => {

          Swal.fire("Error!", "Failed to delete record.", "error");
          console.error(err);

        });

    }

  });

});
  }

 const handleSearch = (formData) => {
    const from = formData.from ||"";
    const to = formData.to ||"";
 const company =  formData.company_id ||"";
 const state_prov =  formData.state_prov ||"";
 const unit =  formData.unit ||"";
 const cardNo =  formData.cardNo ||"";
 const currency =  formData.currency ||"";
 const items =  formData.items ||"";
 const invoice_type =  formData.invoice_type ||"";
 const supplier =  formData.supplier ||"";

    GetDataTAble(from ,to,company,state_prov,unit,cardNo,currency,items,invoice_type,supplier); // fetch new data immediately
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

 

    GetDataTAble();
  }, 1000); // 500ms after last keystroke
};
  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title="EFS Transactions List" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <ViewEfs onSearch={handleSearch} btnTitle="Search Data" btnTitle1="Reset"/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="EFS Transactions List"
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
                    <th><input type="text" name="input12" id="12" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input13" id="13" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input14" id="14" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input15" id="15" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input16" id="16" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input17" id="17" onChange={handleInputChange} className="input-search"/></th>
                  
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

export default ViewEfsList;