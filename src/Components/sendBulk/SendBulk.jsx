import React,{Fragment,useState,useEffect} from 'react'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import usePaginatedTable from "../../Hooks/usePagination";
import Swal from "sweetalert2";
import axios from "axios";
import CreateInvoiceCommon from '../createInvoice/CreateInvoiceCommon';
import { combine_invoice, owner_invoice, customized_invoice,moneycode_invoice,tcheck_invoice,invoice } from "../../api";
const SendBulk = () => {
   const [openRowId, setOpenRowId] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
    const [showTable,setShowTable]=useState(false)
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const[selectedData,setSelectdData]=useState([])
    const [selectAll, setSelectAll] = useState(false);
    const[filters,setFilters]=useState({})
    

   const handleSelectAll = (checked, data) => {
  setSelectAll(checked);

  if (!checked) {
    setSelectedIds([]);
    setSelectedRows([]);
    return;
  }

  setSelectedIds(data.map((row) => row["Invoice#"]));
  setSelectedRows(data);
};

const handleSelectRow = (row) => {
  const id = row["Invoice#"];

  const alreadySelected = selectedIds.includes(id);

  if (alreadySelected) {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    setSelectedRows((prev) =>
      prev.filter((r) => r["Invoice#"] !== id)
    );
  } else {
    setSelectedIds((prev) => [...prev, id]);
    setSelectedRows((prev) => [...prev, row]);
  }
};

const handleMail = ({
  rows = [],
  Api,
  defaultInvoiceType,
  supplier,
  mail_type,
}) => {
  if (!rows.length) {
    Swal.fire("Warning", "Please select at least one record.", "warning");
    return;
  }
console.log(rows)
  // const ids = rows[0]?.fulldata.invoice_id;
  const ids = rows.map(row => row?.fulldata?.invoice_id).join(",");

  let invoice_type = defaultInvoiceType;

  if (invoice_type===null) {
    invoice_type = rows[0]?.fulldata?.tp;
    console.log(invoice_type)
  }
 

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
        setSelectedIds([]);
        setSelectedRows([]);
        setSelectAll(false);
      });
    }
  });
};

    const columnsMap = {
      "Invoice#": "invoice_id",
      Company: "company_name",
      "From": "from",
      To: "to",
      "Due Date": "due_date",
      Total: "total",
      "Retail Total": "retail_price",
      Saving: "saving",
      Country: "country",
      Supplier: "supplier_id",
      Status: "status",
    };
     const OwnercolumnsMap = {
      "Invoice#": "invoice_id",
      Company: "company_name",
      "From": "from",
      To: "to",
      "Due Date": "due_date",
      Total: "total",
      "Retail Total": "retail_price",
      Saving: "saving",
      Fees: "fees",
      "Tr Count": "tr_count",
      Country: "country",
      Supplier: "supplier_id",
      Status: "status",
    };
    const moneyCodecolumnsMap = {
      "Invoice#": "invoice_id",
      Company: "company_name",
      "From":"from_date",
      "To":"to_date",
      "Due Date": "due_date",
      Total: "total",
      Status: "status",
    };
    const ownerColumnWidths  = {
  "Invoice#": "130px",
  Company: "300px",
  "From": "110px",
  To: "110px",
  "Due Date": "130px",
  Total: "60px",
  "Retail Total": "160px",
  Saving: "100px",
   Fees: "100px",
  "Tr Count": "130px",
  Country: "100px",
  Supplier: "100px",
  Status: "110px",
};

const moneyCodeColumnWidths = {
  "Invoice#": "160px",
  "Company":"450px",
  "From": "250px",
  To: "270px",
  "Due Date": "200px",
  Total: "160px",
  Status: "150px",
};

    const columnWidths = {
  "Invoice#": "130px",
  Company: "300px",
  "From ": "150px",
    To: "150px",
  "Due Date": "170px",
  Total: "110px",
  "Retail Total": "140px",
  Saving: "100px",
  Country: "150px",
  Supplier: "130px",
  Status: "110px",
};

      const perPageValue=200
      
    const {
      data,
      totalRows,
      loading,
      handlePageChange,
      handlePerRowsChange,
       handleSearch,
      setData,
    } = usePaginatedTable({ apiUrl: combine_invoice, columnsMap,perPageValue });
  
    const {
      data: ownerdata,
      totalRows: ownerTotalRow,
      loading: ownerLoading,
      handlePageChange: ownerHandlePerChange,
      handlePerRowsChange: ownerHandlePerROwChange,
       handleSearch:OwnerFormSearch,      // ✅ Added
      setData: handleSetData,
    } = usePaginatedTable({ apiUrl: owner_invoice, columnsMap,perPageValue });
   const {
      data: moneyCodedata,
      totalRows: moneycodeTotalRow,
      loading: moneycodeLoading,
      handlePageChange: moneycodeHandlePerChange,
      handlePerRowsChange: moneyHandlePerROwChange,
       handleSearch:moneycodeFormSearch,
      setData: setmoneycodeData,
    } = usePaginatedTable({ apiUrl: moneycode_invoice, columnsMap,perPageValue });
    const {
      data: customizedData,
      totalRows: customizedTotalRow,
      loading: customizedLoading,
      handlePageChange: customizedHandlePageChange,
      handlePerRowsChange: customizedHandlePerRowsChange,
       handleSearch:customizedFormSearch,
      setData: setCustomizedData,
    } = usePaginatedTable({ apiUrl: customized_invoice, columnsMap,perPageValue });
     const {
      data: tcheckdata,
      totalRows: tcheckTotalRow,
      loading: tcheckLoading,
      handlePageChange: tcheckHandlePerChange,
      handlePerRowsChange: tcheckHandlePerROwChange,
      handleSearch:tcheckFormSearch,
      setData: settcheckData,
    } = usePaginatedTable({ apiUrl: tcheck_invoice, columnsMap,perPageValue });

  const applyFilters = (tableData, filters) => {
  return tableData.filter((row) =>
    Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return (
        row[key] &&
        row[key].toString().toLowerCase().includes(filters[key])
      );
    })
  );
};

 const filteredCombineData = applyFilters(data, filters);
const filteredOwnerData = applyFilters(ownerdata, filters);
const filteredmoneyCodeData = applyFilters(moneyCodedata, filters);
const filteredCustomizedData = applyFilters(customizedData, filters);
const filteredTcheckData = applyFilters(tcheckdata, filters);
 const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};

const getTableColumns = (tableData,columnmap,colWidth) => {
  return [
    ...Object.keys(columnmap).map((label) => ({
      name: (
        <div className='w-100'>
          <div className="fw-bold">{label}</div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",
              height: "28px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) =>
              handleFilterChange(label, e.target.value) // ✅ CLIENT SIDE
            }
          />
        </div>
      ),
      selector: (row) => row[label],
      sortable: true,
      width: colWidth[label],
      wrap: true,
    })),

    {
      name: (
        <div className="d-flex align-items-center">
          <span className="me-2 fw-bold">Action</span>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) =>
              handleSelectAll(e.target.checked, tableData)
            }
          />
        </div>
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row["Invoice#"])}
          onChange={() => handleSelectRow(row)}
        />
      ),
      width: "120px",
      ignoreRowClick: true,
    },
  ];
};

useEffect(() => {
  setSelectedRows([]);
  setSelectAll(false);
}, [data, ownerdata, moneyCodedata, customizedData, tcheckdata]);

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
    component: <DataTableComponent 
    handleMail={() =>
      handleMail({
  rows: selectedRows,
  Api: combine_invoice,
  defaultInvoiceType: null,
  supplier: "",
  mail_type: "INVOICE",
})
      }
       paginationRowsPerPageOptions={[ 200,300]} table={showTable} 
       buttonTitle="Send Mail"
        loading={loading} 
       totalRows= {totalRows}
  tableColumns={getTableColumns(data,columnsMap,columnWidths)}
       setData={setData}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
         tableData={filteredCombineData} />,
  },
  {
    id: '2',
    label:"Sender Owner Operator Invoice",
    component: <DataTableComponent  handleMail={() =>
        handleMail({
          rows: selectedRows,
          Api: owner_invoice,
          defaultInvoiceType:"owner",
          supplier:"",
          mail_type:"INVOICE",

          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      } loading={ownerLoading}
      handlePageChange={ownerHandlePerChange}
      setData={handleSetData}
      handlePerRowsChange={ownerHandlePerROwChange} totalRows={ownerTotalRow}   tableColumns={getTableColumns(filteredCombineData,OwnercolumnsMap,ownerColumnWidths)} 
    tableData={filteredOwnerData} paginationRowsPerPageOptions={[ 200,300]} table={showTable} buttonTitle="Send Mail"/>,
  },

  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component:<DataTableComponent  handleMail={() =>
        handleMail({
          rows: selectedRows,
          Api: combine_invoice,
          defaultInvoiceType:"MONEYCODE",
          supplier:"",
          mail_type:"INVOICE",
        
        })
      } 
      loading={moneycodeLoading} 
      handlePageChange={moneycodeHandlePerChange}
      setData={setmoneycodeData}
      handlePerRowsChange={moneyHandlePerROwChange}
      totalRows={moneycodeTotalRow} 
      tableColumns={getTableColumns(filteredmoneyCodeData,moneyCodecolumnsMap,moneyCodeColumnWidths)} 
      tableData={filteredmoneyCodeData}
      paginationRowsPerPageOptions={[ 200,300]}
      table={showTable}
      buttonTitle="Send Mail"/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component: <DataTableComponent 
    handleMail={() =>
        handleMail({
          rows: selectedRows,
          Api: combine_invoice,
          defaultInvoiceType:"CUSTUM",
          supplier:"",
          mail_type:"INVOICE",
          
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      }  
 tableColumns={getTableColumns(filteredCustomizedData,columnsMap,columnWidths)}      setData={setmoneycodeData}
      handlePerRowsChange={customizedHandlePageChange}
      handlePageChange={customizedHandlePageChange}
      loading={customizedLoading} totalRows={customizedTotalRow}  tableData={filteredCustomizedData} paginationRowsPerPageOptions={[ 200,300]} table={showTable} buttonTitle="Send Mail"/>,
  },
   {
    id: '5',
    label:"Send T-check Invoice",
    component:<DataTableComponent   handleMail={() =>
        handleMail({
          rows: selectedRows,
          Api: combine_invoice,
          defaultInvoiceType:"TCHECK",
          supplier:"",
          mail_type:"INVOICE",
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      }   
  tableColumns={getTableColumns(filteredTcheckData,moneyCodecolumnsMap,moneyCodeColumnWidths)} showTable={showTable}    handlePerRowsChange={tcheckHandlePerROwChange}
     setData={settcheckData}
     handlePageChange={tcheckHandlePerChange}
     loading={tcheckLoading} totalRows={tcheckTotalRow} tableData={filteredTcheckData} paginationRowsPerPageOptions={[ 200,300]} table={showTable} buttonTitle="Send Mail"/>,
  },
  
];
const SendBulkTab = [
  {
    id: '1',
    label:"Send Invoice",
    component: <SingleEssoForm loading={loading} company_list="false"  btnTtitle="Search Invoice" title="Search Invoice" onSearch={handleSearch} setShowTable={setShowTable} />,
  },
  {
    id: '2',
    label:"Send Owner Operator Invoice",
    component: <CreateInvoiceCommon setShowTable={setShowTable}  validation={false}  company_list="list" loading={ownerLoading}
 supplier_ids="6"  cust_inv_dropdown={true}   country_id="1" owner_operator_invoice="Yes" invoice_type_dropdown={true}  invoice_type="RG" btnTtitle="Search Data" btn1Title="Reset"  title="Search Owner Operator Invoice"  onSearch={OwnerFormSearch}/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component: <CreateInvoiceCommon setShowTable={setShowTable} validation={false}  loading={moneycodeLoading} company_list="list" suplier_list={false} btnTtitle="Search Data" title="Search MoneyCode Invoice" onSearch={moneycodeFormSearch}/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:  <CreateInvoiceCommon setShowTable={setShowTable} invoice_creation="" invoice_type="" cust_inv_type="RG" validation={false} company_list="list" cust_inv_dropdown={true}
 supplier_ids="6,3" invoice_category_dropdown={true}   country_id="" invoice_type_dropdown={true}   btnTtitle="Search Data" btn1Title="Reset"  title="Search Customized Invoice" onSearch={customizedFormSearch}/>,
  },
 
   {
    id: '5',
    label:"Send T-check Invoice",
    component: <CreateInvoiceCommon setShowTable={setShowTable} validation={false} company_list="list" suplier_list={false}  btnTtitle="Search Data" title="Search T-check Invoice" onSearch={tcheckFormSearch}/>,
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

export default SendBulk
