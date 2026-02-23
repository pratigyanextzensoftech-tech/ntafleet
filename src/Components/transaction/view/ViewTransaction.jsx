import React, { Fragment, useState, useEffect,useRef } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { transactions,tranaction_total } from "../../../api";
import ViewForm from "./ViewForm";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaFileExcel,FaFileCsv,FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { download } from "../../../api";
import {H6} from "../../../AbstractElements";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import qs from "qs"; // npm install qs
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
  const handleDelete = (e, row,FormData) => {
    e.preventDefault();
       const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;
           const supplier = Array.from(
  document.querySelectorAll('input[name="supplier"]:checked')
).map(cb => cb.value);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${transactions}/${row.id}`)
          .then(res => {
            // setData(prev => prev.filter(item => item.id !== row.id));
             GetDataTAble(from,to,supplier,FormData);
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
          })
          .catch(err => {
            Swal.fire("Error!", "Failed to delete record.", "error");
            console.error(err);
          });
      }
    });
  };
  useEffect(() => {
 const deleteHandler = function (e) {
    e.preventDefault();
    const id = $(this).data("id");

    handleDelete(e, { id }); // ✅ call React function
  };

  $(document).on("click", ".delete-btn", deleteHandler);

  return () => {
    $(document).off("click", ".delete-btn", deleteHandler);
  };

}, []);
  useEffect(() => {
        const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;
       const supplier = Array.from(
  document.querySelectorAll('input[name="supplier"]:checked')
).map(cb => cb.value);

console.log(supplier);
      GetDataTAble(from,to,supplier,FormData);
  }, []);


  function GetDataTAble(from,to,supplier,formData ) {
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
  params.append("unit", formData?.unit?formData?.unit:"");
  params.append("to", to);
  params.append("supplier_id", supplier);
  params.append("state_prov", formData?.state_prov?formData?.state_prov:"");
  params.append("item", formData?.item?formData?.item:"");
  params.append("invoiced", formData?.invoiced?formData?.invoiced:"");
  params.append("invoice_type", formData?.invoice_type?formData?.invoice_type:"");
  params.append("from", from);
  params.append("currency", formData?.currency?formData?.currency:"");
  params.append("card_no", formData?.card_no?formData?.card_no:"");
  try {

    // 🔥 Call both APIs together
    const [tableRes, totalRes] = await Promise.all([
      fetch(`${transactions}?${params.toString()}`).then(res => res.json()),
      axios.get(tranaction_total, { params })
    ]);

    // ✅ Set totals
    setTotals({
      taxamt: Number(totalRes.data.taxamt || 0),
      amtcad: Number(totalRes.data.amtcad || 0),
      qtyltr: Number(totalRes.data.qtyltr || 0),
      qtygln: Number(totalRes.data.qtygln || 0),
      amtusd: Number(totalRes.data.amtusd || 0),
      fee: Number(totalRes.data.fee || 0),
      amtreal: Number(totalRes.data.amtreal || 0),
    });

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

  } catch (error) {

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
  }
  // ✅ Handle search/filter submit from form
  const handleSearch = (formData) => {
    console.log("🔍 Filters received:", formData);
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
       const supplier = Array.from(
  document.querySelectorAll('input[name="supplier"]:checked')
).map(cb => cb.value);
    setFormData(formData)
    GetDataTAble(from,to,supplier,formData); // fetch new data immediately
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
      <Breadcrumbs parent="Transaction" title="View Transaction" />
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
                  title="Transactions List"
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

        <DropdownItem className="text-success"   onClick={() => handleDownload("NewCSV")}>
        <FaFileCsv/> Download New CSV
        </DropdownItem>

        <DropdownItem className="text-info"   onClick={() => handleDownload("PDF")}>
          <FaFilePdf/> Download Pdf
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
                    <tbody></tbody>
                  </table>
                </div>
                   {totals && (
                                  <Row>
                                    <Col sm="12">
                                      <hr />
                                      <Row>
                                        <Col sm="1">
                                          <H6>Total:</H6>
                                        </Col>
                                        <Col sm="11">
                                          <Row>
                                            <Col sm="6">
                                              <Row>
                                                <Col sm="1">
                                                  <H6>USA:</H6>
                                                </Col>
                                                <Col
                                                  sm="11"
                                                  className="d-flex justify-content-start"
                                                >
                                                  <span style={{ marginRight: "15px" }}>
                                                    <strong>Fees:</strong> {totals.fee}
                                                  </span>
                                                  <span style={{ marginRight: "15px" }}>
                                                    <strong>Quantity:</strong>{" "}
                                                    {totals.qtygln}
                                                  </span>
                                                  <span style={{ marginRight: "15px" }}>
                                                    <strong>Amount:</strong> {totals.amtusd}
                                                  </span>
                                                </Col>
                                              </Row>
                                            </Col>
                                            <Col sm="6">
                                              <Row>
                                                <Col sm="1">
                                                  <H6>CAD:</H6>
                                                </Col>
                                                <Col
                                                  sm="11"
                                                  className="d-flex justify-content-start"
                                                >
                                                  <span style={{ marginRight: "15px" }}>
                                                    Tax Amount: {totals.taxamt}
                                                  </span>
                                                  <span style={{ marginRight: "15px" }}>
                                                    Quantity: {totals.qtyltr}
                                                  </span>
                                                  <span style={{ marginRight: "15px" }}>
                                                    Amount: {totals.amtcad}
                                                  </span>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                )}
                                </CardBody>
                                </Card>
                               </Col>
                               </Row>            
      </Container>
    </Fragment>
  );
};

export default Index;
