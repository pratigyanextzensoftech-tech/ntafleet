import React, { Fragment, useState,useEffect } from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import {  money_code as APINAME,download,moneycode_invoice_detail,miss_moneycode} from '../../../api/index'
import MoneyCodeList from '../moneyCodeList/MoneyCodeListForm'
import $ from "jquery";
import "datatables.net";
import "datatables.net";
import "datatables.net-fixedcolumns";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FaFileExcel,FaFileCsv } from "react-icons/fa";

const Index = () => {
      const [dropdownOpen, setDropdownOpen] = useState(false);
       const toggle = () => setDropdownOpen((prev) => !prev);
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

];

const AllMoney_code_col=[
{ data:"Ref",title:"Ref#"},
{ data:"company_name",title:"Company"},
{ data:"IssuedTo",title:"Issued To"},
{ data:"IssuedDate",title:"Issued Dated"},
{ data:"OriginalAmt",title:"Original Amt"},
]


       useEffect(() => {
        const company = document.getElementById("company")?.value;
        const from = document.getElementById("from")?.value;
        const to = document.getElementById("to")?.value;
        const unit = document.getElementById("unit")?.value;
      GetDataTAble("All_MoneyCode",APINAME , AllMoney_code_col, from,to, company,unit);
      GetDataTAble("InvoiceMoney_code",moneycode_invoice_detail , AllMoney_code_col, from,to, company,unit);
      GetDataTAble("missing_money_code",miss_moneycode, columns, from,to, company,unit);
  }, []);

  function GetDataTAble(tableId, apiUrl, columns,from,to,company,unit) { 
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
  params.append("company_id", company?company:"");
  params.append("from", from?from:"");
  params.append("to", to?to:"");
  params.append("unit", unit?unit:"");
   Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
 
  try {
 const response = await fetch(`${apiUrl}?${params.toString()}`);
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

  }
 const handleSearch = (formData) => {
 const company =  formData.company_id ||"";
 const from =  formData.from ||"";
 const to =  formData.to ||"";
 const unit =  formData.unit ||"";
 console.log(formData);
     GetDataTAble("All_MoneyCode",APINAME,  AllMoney_code_col, from,to, company,unit);
      GetDataTAble("InvoiceMoney_code", moneycode_invoice_detail, AllMoney_code_col, from,to, company,unit);
      GetDataTAble("missing_money_code",miss_moneycode , columns, from,to, company,unit);
  };
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
     return (
          <Fragment>
               <Breadcrumbs parent='Money Code' title=' Check MoneyCode' />
               <Container fluid={true}> 
                    <Row>
                         <Col sm="12">
                              <Card>
                                   <HeaderCard title="Filters" />
                                   <CardBody>
                                        <MoneyCodeList btntitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
                                   </CardBody>
                              </Card>
                         </Col>
                    </Row>

                    <Row>
                         <Col sm="6">
                              <Card>
                                   <HeaderCard title="All MoneyCode List" />
                                   <CardBody>
                                      
                                              <div style={{"width":"100%", "overflow":"auto"}} >
                                                      <table
                                                        id="All_MoneyCode"
                                                        className="display table table-striped table-bordered nowrap"
                                                        style={{ width: "100%" }}
                                                      >
                                                        <thead>
                                                          <tr>
                                                            <th>Ref#</th>
                                                            <th>Company </th>
                                                            <th>Issued To </th>
                                                            <th> Issued Date </th>
                                                            <th>Original Amt </th>
                                                          
                                                          </tr>
                                                        
                                                        </thead>
                                                                                                                     <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                  </tr>
                                                        <tbody></tbody>
                                                      </table>
                                                    </div>
                                                   
                                                                   
                                   </CardBody>
                              </Card>
                         </Col>
                         <Col sm="6">
                              <Card>
                                   <HeaderCard title="Invoiced MoneyCode List" />
                                   <CardBody>
                                          <div style={{"width":"100%", "overflow":"auto"}} >
                                                      <table
                                                        id="InvoiceMoney_code"
                                                        className="display table table-striped table-bordered nowrap"
                                                        style={{ width: "100%" }}
                                                      >
                                                        <thead>
                                                          <tr>
                                                             <th>Ref#</th>
                                                            <th>Company </th>
                                                            <th>Issued To </th>
                                                            <th> Issued Date </th>
                                                            <th>Original Amt </th>
                                                          </tr>
                                                        
                                                        </thead>
                                                            <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                  </tr>
                                                        <tbody></tbody>
                                                      </table>
                                                    </div>
                                   </CardBody>
                              </Card>
                         </Col>

                          <Col sm="12">
                              <Card>
                                      <HeaderCard
                  title="Missing MoneyCode List"
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
                />
                                   <CardBody>
                                          <div style={{"width":"100%", "overflow":"auto"}} >
                                                      <table
                                                        id="missing_money_code"
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
     )
}

export default Index
