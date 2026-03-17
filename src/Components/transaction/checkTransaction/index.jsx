import React, { Fragment, useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import TransactionList from "../transactionList/TransactionList";
import CheckTransaction from "./CheckTransaction";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import { transactions,transactions_missed,transactions_invoiced } from "../../../api";
import { download } from "../../../api";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FaFileExcel,FaFileCsv,FaFilePdf } from "react-icons/fa";
const Index = () => {
    const[FormData,setFormData]=useState([])
     const [dropdownOpen, setDropdownOpen] = useState(false);
           const toggle = () => setDropdownOpen((prev) => !prev);
    const columns = [
  { data: "card_no", title: "CARD" },
  { data: "company_name", title: "Company" },
  { data: "supplier_name", title: "Suppliers" },
  { data: "tran_date", title: "Date" },
  { data: "tran_time", title: "Time" },
  { data: "invoice", title: "Invoice" },
  { data: "unit", title: "Unit" },
  { data: "driver_name", title: "Driver Name" },
  { data: "city", title: "City" },
  { data: "state_prov", title: "State" },
  { data: "fees", title: "Fees" },
  { data: "item", title: "Item" },
  { data: "unit_price", title: "Unit Price" },
  { data: "tax_unit_price", title: "Tax Unit Price" },
  { data: "qty", title: "Qty" },
  { data: "amt", title: "Amt" },
  { data: "tax_amt", title: "Tax Amount" },
  { data: "currency", title: "Currency" },
];

const AllTrans=[
{ data:"card_no",title:"Card#"},
{ data:"company_name",title:"Company"},
{ data:"supplier_name",title:"Supplier"},
{ data:"tran_date",title:"Date"},
{ data:"item",title:"Item"},
{ data:"qty",title:"Qty"},
{ data:"amt",title:"Amt"},
]
        useEffect(() => {
          const company_id = document.getElementsByName("company")[0]?.value;
          const from = document.getElementsByName("from")[0]?.value;
          const to = document.getElementsByName("to")[0]?.value;
          const unit = document.getElementsByName("unitNo")[0]?.value;
          const state_prov = document.getElementsByName("stateProv")[0]?.value;
          const card_no = document.getElementsByName("cardNo")[0]?.value;
          const currency = document.getElementsByName("currency")[0]?.value;
          const item = document.getElementsByName("items")[0]?.value;
          const invoice_type = document.getElementsByName("type")[0]?.value;
          const invoice_status = document.getElementsByName("status")[0]?.value;
          const supplier_id = document.getElementsByName("supplier")[0]?.value;
        GetDataTAble("All_trans", transactions, AllTrans,from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id);
        GetDataTAble("trans", transactions_invoiced, AllTrans, from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id);
        GetDataTAble("missing_trans", transactions_missed, columns, from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id);
    }, []);
  
    function GetDataTAble(tableId, apiUrl, columns,from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id) { 
        const tableSelector = `#${tableId}`;
        if ($.fn.DataTable.isDataTable(tableSelector)) {
      $(tableSelector).DataTable().destroy();
      $(tableSelector).empty();
    }  
      $(tableSelector).DataTable({
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
    params.append("company_id", company_id?company_id:"");
    params.append("from", from?from:"");
    params.append("to", to?to:"");
    params.append("unit", unit?unit:"");
    params.append("state_prov", state_prov?state_prov:"");
    params.append("card_no", card_no?card_no:"");
    params.append("currency", currency?currency:"");
    params.append("item", item?item:"");
    params.append("invoice_type", invoice_type?invoice_type:"");
    params.append("invoice_status", invoice_status?invoice_status:"");
    params.append("supplier_id", supplier_id?supplier_id:"");
     Object.keys(searchValues).forEach((key) => {
      params.append(key, searchValues[key] || "");
    });
   
    try {
   const response = await fetch(`${apiUrl}?${params.toString()}`);
      const tableRes = await response.json();
      // 🔥 Call both APIs together
      // ✅ Map table data
      const tableData = tableRes.data.map((row) => ({
      id: row.id,
      card_no: row.card_no,
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
  
    }
  const handleSearch = (formData) => {
    console.log("🔍 Filters received:", formData);
    const from =formData.from;
    const to =formData.to ;
    const state_prov =formData.state_prov ;
    const unit =formData.unit ;
    const card_no =formData.card_no ;
    const company_id =formData.company_id ;
    const currency =formData.currency ;
    const item =formData.item ;
    const invoice_type =formData.invoice_type ;
    const invoice_status =formData.invoice_status ;
    const supplier_id =formData.supplier_id ;
   
    setFormData(formData)
    GetDataTAble("All_trans", transactions, AllTrans,from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id);
    GetDataTAble("trans", transactions_invoiced, AllTrans,from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id);
    GetDataTAble("missing_trans", transactions_missed,columns,from,to,state_prov,unit,card_no,company_id,currency,item,invoice_type,invoice_status,supplier_id);
  };
  let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
    const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;
       const supplier = Array.from(
  document.querySelectorAll('input[name="supplier"]:checked')
).map(cb => cb.value);

console.log(supplier);
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);

       GetDataTAble();


  }, 1000); // 500ms after last keystroke
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
      <Breadcrumbs parent="Transaction" title=" Check Transactions" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <CheckTransaction btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="6">
            <Card>
                                  <HeaderCard title="All Transaction List" />
                                   <CardBody>
                                             

            <table
                                                        id="All_trans"
                                                        className="display table table-striped table-bordered nowrap"
                                                        style={{ width: "100%" }}
                                                      >
                                                        <thead>
                                                          <tr>
                                                             <th>Card#</th>
                                                            <th>Company </th>
                                                            <th>Supplier </th>
                                                            <th> Date </th>
                                                            <th>Item </th>
                                                            <th>Qty </th>
                                                            <th>Amt </th>
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
                  </tr>
                                                        <tbody></tbody>
            </table>
            </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
                                  <HeaderCard title=" Invoiced Transaction List" />
                                   <CardBody>
            <table
                                                        id="trans"
                                                        className="display table table-striped table-bordered nowrap"
                                                        style={{ width: "100%" }}
                                                      >
                                                        <thead>
                                                          <tr>
                                                           <th>Card#</th>
                                                            <th>Company </th>
                                                            <th>Supplier </th>
                                                            <th> Date </th>
                                                            <th>Item </th>
                                                            <th>Qty </th>
                                                            <th>Amt </th>
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
                  </tr>
                                                        <tbody></tbody>
            </table>
</CardBody>
</Card>
          </Col>
        </Row>
        <Row className="mt-3">
           <Card>
                                  <HeaderCard title="Missed Transaction List"           renderDropdown={() => (
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
   <DropdownItem className="text-success"   onClick={() => handleDownload("NewCSV")}>
                       <FaFileCsv/> Download New CSV
                       </DropdownItem>
               
                       <DropdownItem className="text-info"   onClick={() => handleDownload("PDF")}>
                         <FaFilePdf/> Download Pdf
                       </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    </>
  )}/>
                                   <CardBody>
           <table
                    id="missing_trans"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>CARD</th>
                        <th>Company </th>
                        <th>Suppliers </th>
                        <th>Date </th>
                        <th>Time </th>
                        <th>Invoice </th> 
                        <th>Unit</th>
                        <th>Driver_Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Fees</th>
                        <th>Item</th>
                        <th>Unit_Price</th>
                        <th>Tax_Unit_Price</th>
                        <th>Qty</th>
                        <th>Amt</th>
                        <th>TaxAmt</th>
                        <th>Currency</th>
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
                    <th><input type="text" name="input18" id="18" onChange={handleInputChange} className="input-search"/></th>
                  
                    <td></td>
                  </tr>
                    <tbody></tbody>
                  </table>
                  </CardBody>
                  </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
