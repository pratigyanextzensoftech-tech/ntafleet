import React,{Fragment,useState,useEffect} from 'react'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import {Btn} from '../../AbstractElements';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import Swal from "sweetalert2";
import axios from "axios";
import CreateInvoiceCommon from '../createInvoice/CreateInvoiceCommon';
import { combine_invoice, owner_invoice, customized_invoice,moneycode_invoice,tcheck_invoice } from "../../api";
import $ from "jquery";
import "datatables.net";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import { formatDate } from '../../Hooks/Dropdowns';
const Index = () => {
   const [openRowId, setOpenRowId] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
    const [showTable,setShowTable]=useState(false)
    const [selectedIds, setSelectedIds] = useState([]);
    const[selectedData,setSelectdData]=useState([])
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const[filters,setFilters]=useState({})
      const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };

    const getApiByTab = (tab) => {
      switch (tab) {
        case "1":
          return combine_invoice;
        case "2":
          return owner_invoice;
        case "3":
          return moneycode_invoice;
           case "4":
          return customized_invoice;
           case "5":
          return tcheck_invoice;
       
      }
    };
  
    const getTableIdByTab = (tab) => {
      switch (tab) {
        case "1":
          return "#invoiceCombine";
        case "2":
          return "#Ownerinvoice";
        case "3":
          return "#moneycodeTable";
        case "4":
          return "#customized";
          case "5":
          return "#tcheck";
      }
    };


const handleMail = ({
  rows = [],
  Api,
  defaultInvoiceType,
  supplier,
  mail_type,
}) => {
console.log(rows);
console.log(Api);
console.log(defaultInvoiceType);
console.log(supplier);
console.log(mail_type);

  if (!rows.length) {
    Swal.fire("Warning", "Please select at least one record.", "warning");
    return;
  }

  const ids = rows.join(",");

  let invoice_type = defaultInvoiceType || "";

  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure want to send mail?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Send Mail!",
  }).then((result) => {

    if (result.isConfirmed) {

      axios.post(Api, {
        ids,
        invoice_type,
        supplier,
        mail_type,
      })
      .then(() => {

        Swal.fire("Success", "Mail sent successfully", "success");

        setSelectedRows([]);

        $("#select-all").prop("checked", false);
        $(".row-checkbox").prop("checked", false);

      });

    }

  });

};
const combineColumns = [
  { data: "invoice_id", title: "Invoice#" },
  { data: "company_name", title: "Company" },
  {
    data: null,
    title: "From - To Date",
    render: (data, type, row) => `${formatDate(row.from)} ${formatDate(row.to)}`
  },
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total" },
  { data: "retail_price", title: "Retail Total" },
  { data: "saving", title: "Saving" },
  { data: "country", title: "Country" },
  { data: "supplier_name", title: "Supplier" },
  { data: "status", title: "Status" },
   {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},
];
const ownerColumns = [
  { data: "invoice_id", title: "Invoice#" },
  { data: "company_name", title: "Company" },
  {
    data: null,
    title: "From - To Date",
    render: (data, type, row) => `${formatDate(row.from)} ${formatDate(row.to)}`
  },
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total" },
  { data: "retail_price", title: "Retail Total" },
  { data: "saving", title: "Saving" },
  { data: "fees", title: "Fees" },
  { data: "tr_count", title: "Tr Count" },
  { data: "country", title: "Country" },
  { data: "supplier_name", title: "Supplier" },
    { data: "status", title: "Status" },
       {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},

];
const moneycodeColumns = [
  { data: "invoice_id", title: "Invoice#" },
  { data: "company_name", title: "Company" },
  {
    data: null,
    title: "From - To Date",
    render: (data, type, row) => `${formatDate(row.from)} ${formatDate(row.to)}`
  },
  { data: "due_date", title: "Due Date" },
  { data: "total", title: "Total Due" },
    { data: "status", title: "Status" },
     {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.invoice_id}">
    `;
  }
},

];

  const GetDataTAble = (api, tableId) => {
    console.log(api)
   if ($.fn.DataTable.isDataTable(tableId)) {
  $(tableId).DataTable().clear().destroy();
}
let columns;
if(api===combine_invoice || api===customized_invoice){
    columns=combineColumns
}
else if (api === owner_invoice) {
    columns= ownerColumns;
  }
  else if (api === moneycode_invoice || api === tcheck_invoice) {
    columns= moneycodeColumns;
  }
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


        try {
          const response = await fetch(`${api}?${params.toString()}`);
          const json = await response.json();
     const tableData = json.data.map((row) => (
      
    {
      invoice_id: row.invoice_id,
      company_name: row.company_name,
      from: row.from,
      to: row.to,
      due_date: row.due_date,
      total: row.total,
      retail_price: row.retail_price,
      saving: row.saving,
      country: row.country,
      supplier_name: row.supplier_name,
      status: row.status,
      fees: row.fees,
      tr_count: row.tr_count,
   
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
    let selected = [];
    $(document)
  .off("change", "#select-all")
  .on("change", "#select-all", function () {

    const checked = $(this).is(":checked");
  const ids = [];
     $(".row-checkbox").each(function () {

    $(this).prop("checked", checked);

    if (checked) {
      ids.push($(this).val());
    }

  });

  setSelectedRows(ids);

});
 $(document)
.off("change", ".row-checkbox")
.on("change", ".row-checkbox", function () {

  const id = $(this).val();

  setSelectedRows((prev) => {

    if ($(this).is(":checked")) {

      if (!prev.includes(id)) {
        return [...prev, id];
      }

      return prev;

    } else {

      return prev.filter(item => item !== id);

    }

  });

});

  };

useEffect(() => {
  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);
  setTimeout(() => {
    GetDataTAble(api, tableId);
  }, 200);
   return () => {
  if ($.fn.DataTable.isDataTable(tableId)) {
    $(tableId).DataTable().clear().destroy();
  }
};
}, [window.location.search]);

      
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const SendBulkTable = [ 
  {
    id: '1',
    label:"Send Invoice",
    component: (
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Send Invoice"
        />
        <CardBody>
             <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: () =>
      handleMail({
       rows: selectedRows,
       Api: combine_invoice,
       defaultInvoiceType: null,
       supplier: "",
       mail_type: "INVOICE",
     }), }}>Send Mail</Btn>
                </div>
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
    id: '2',
    label:"Sender Owner Operator Invoice",
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Send Invoice"
        />
        <CardBody>
              <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: () =>
     handleMail({
               rows: selectedRows,
               Api: owner_invoice,
               defaultInvoiceType:"owner",
               supplier:"",
               mail_type:"INVOICE",
     
               // ✅ dynamic API
                // ✅ refresh correct tab
             }) }}>Send Mail</Btn>
                </div>
          <table
            id="Ownerinvoice"
            className="table table-bordered w-100"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
) ,
  },

  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Send Invoice"
        />
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: () =>
     handleMail({
               rows: selectedRows,
               Api: combine_invoice,
               defaultInvoiceType:"MONEYCODE",
               supplier:"",
               mail_type:"INVOICE",
             
             })}}>Send Mail</Btn>
                </div>
          <table
            id="moneycodeTable"
            className="table table-bordered w-100"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
),
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Send Invoice"
        />
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: () =>
       handleMail({
               rows: selectedRows,
               Api: combine_invoice,
               defaultInvoiceType:"CUSTUM",
               supplier:"",
               mail_type:"INVOICE",
               
               // ✅ dynamic API
                // ✅ refresh correct tab
             })}}>Send Mail</Btn>
                </div>
          <table
            id="customized"
            className="table table-bordered w-100"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
) ,
  },
   {
    id: '5',
    label:"Send T-check Invoice",
    component:(
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Send Invoice"
        />
        <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: () =>
        handleMail({
                rows: selectedRows,
                Api: combine_invoice,
                defaultInvoiceType:"TCHECK",
                supplier:"",
                mail_type:"INVOICE",
                // ✅ dynamic API
                 // ✅ refresh correct tab
              })
             }}>Send Mail</Btn>
                </div>
          <table
            id="tcheck"
            className="table table-bordered w-100"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
),
  },
  
];
   const handleSearch = (formData) => {
     const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);

    console.log("🔍 Filters received:", formData);

  
    GetDataTAble(api, tableId); // fetch new data immediately
  };
const SendBulkTab = [
  {
    id: '1',
    label:"Send Invoice",
    component: <SingleEssoForm  company_list="false"  btnTtitle="Search Invoice" title="Search Invoice" onSearch={handleSearch} setShowTable={setShowTable} />,
  },
  {
    id: '2',
    label:"Send Owner Operator Invoice",
    component: <CreateInvoiceCommon setShowTable={setShowTable}  validation={false}  company_list="list" 
 supplier_ids="6"  cust_inv_dropdown={true}   country_id="1" owner_operator_invoice="Yes" invoice_type_dropdown={true}  invoice_type="RG" btnTtitle="Search Data" btn1Title="Reset"  title="Search Owner Operator Invoice"  onSearch={handleSearch}/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component: <CreateInvoiceCommon setShowTable={setShowTable} validation={false}  company_list="list" suplier_list={false} btnTtitle="Search Data" title="Search MoneyCode Invoice" onSearch={handleSearch}/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:  <CreateInvoiceCommon setShowTable={setShowTable} invoice_creation="" invoice_type="" cust_inv_type="RG" validation={false} company_list="list" cust_inv_dropdown={true}
 supplier_ids="6,3" invoice_category_dropdown={true}   country_id="" invoice_type_dropdown={true}   btnTtitle="Search Data" btn1Title="Reset"  title="Search Customized Invoice" onSearch={handleSearch}/>,
  },
 
   {
    id: '5',
    label:"Send T-check Invoice",
    component: <CreateInvoiceCommon setShowTable={setShowTable} validation={false} company_list="list" suplier_list={false}  btnTtitle="Search Data" title="Search T-check Invoice" onSearch={handleSearch}/>,
  },
  
];

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Send Bulk Invoice" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Send Bulk Invoice" />
              <CardBody>
                <BasicTabCard tabContent={SendBulkTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Send Bulk Invoice" />
              <CardBody>
                <BasicTabCard tabContent={SendBulkTable} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment> 
               
  )
}

export default Index
