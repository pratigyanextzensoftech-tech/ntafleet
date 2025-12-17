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
     const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = (checked, data) => {
  console.log(data)
  setSelectAll(checked);
  if (!checked) {
    setSelectedRows([]);
    return;
  }
  // 1️⃣ Create comma-separated string
  const ids = data?.map(row => row["Invoice#"]);
  setSelectedRows(ids); // store comma string if needed

};

 const handleSelectRow = (data) => {
  console.log(data)
const id=data["Invoice#"]
console.log(id)
  // console.log(data.id)
  // console.log(selectedRows)
  // 1️⃣ Toggle checkbox first
  const alreadySelected = selectedRows.includes(id);

  // Update selection immediately
  const newSelection = alreadySelected
    ? selectedRows.filter((rowId) => rowId != id)
    : [...selectedRows, id];
  // const ids=newSelection.join(",")

  setSelectedRows(newSelection);
console.log(newSelection)
  // 2️⃣ Now show confirmation popup
 
};
const handleMail = ({
  rows = [],
  Api,
  defaultInvoiceType,
  supplier
}) => {
  console.log(rows);
console.log(defaultInvoiceType);
console.log(Api)
console.log(supplier);
  if (!rows.length) {
    Swal.fire("Warning", "Please select at least one record.", "warning");
    return;
  }

  const ids = rows.map(r => r["Invoice#"]);

  // ✅ FIRST TAB → derive invoice_type from tp
  let invoice_type = defaultInvoiceType;
  if (!defaultInvoiceType) {
    // assume same tp for selected rows
    invoice_type = rows[0]?.fulldata?.tp; // "Retail" | "Rack"
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
        supplier
      })
      .then(() => {
        Swal.fire("Success", "Mail sent successfully", "success");
        setSelectedRows([]);
        setSelectAll(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to send mail", "error");
      });
    }
  });
};

    const columnsMap = {
      "Invoice#": "invoice_id",
      Company: "company_name",
      "From ": "from_date",
      To: "to_date",
      "Due Date": "due_date",
      Total: "total",
      "Retail Total": "retail_price",
      Saving: "saving",
      Fees: "fees",
      "Tr Count": "tr_count",
      Country: "country",
      Supplier: "supplier_id",
      // Mailed_By: "mailby",
      // Mailed_On: "mail_on",
      // "Show/Hide": "total_gln",
      Status: "status",
    };
      const perPageValue=200
      
    const {
      data,
      totalRows,
      loading,
      handlePageChange,
      handlePerRowsChange,
      handleSearch, // ✅ Added
      setData,
    } = usePaginatedTable({ apiUrl: invoice, columnsMap,perPageValue });
  
    const {
      data: ownerdata,
      totalRows: ownerTotalRow,
      loading: ownerLoading,
      handlePageChange: ownerHandlePerChange,
      handlePerRowsChange: ownerHandlePerROwChange,
      handleSearch: ownerHandleSearch, // ✅ Added
      setData: handleSetData,
    } = usePaginatedTable({ apiUrl: owner_invoice, columnsMap,perPageValue });
   const {
      data: moneyCodedata,
      totalRows: moneycodeTotalRow,
      loading: moneycodeLoading,
      handlePageChange: moneycodeHandlePerChange,
      handlePerRowsChange: moneyHandlePerROwChange,
      handleSearch: moneycodeHandleSearch, // ✅ Added
      setData: setmoneycodeData,
    } = usePaginatedTable({ apiUrl: moneycode_invoice, columnsMap,perPageValue });
    const {
      data: customizedData,
      totalRows: customizedTotalRow,
      loading: customizedLoading,
      handlePageChange: customizedHandlePageChange,
      handlePerRowsChange: customizedHandlePerRowsChange,
      handleSearch: customizedHandleSearch,
      setData: setCustomizedData,
    } = usePaginatedTable({ apiUrl: customized_invoice, columnsMap,perPageValue });
     const {
      data: tcheckdata,
      totalRows: tcheckTotalRow,
      loading: tcheckLoading,
      handlePageChange: tcheckHandlePerChange,
      handlePerRowsChange: tcheckHandlePerROwChange,
      handleSearch: tcheckHandleSearch, // ✅ Added
      setData: settcheckData,
    } = usePaginatedTable({ apiUrl: tcheck_invoice, columnsMap,perPageValue });
   useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

        cols.push({
        name: (
          <div className="d-flex align-items-center">
            <span className="me-2 fw-bold">Action</span>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked, data)}
            />
          </div>
        ),
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row["Invoice#"])}
            onChange={() => handleSelectRow(row)}
          />
        ),
        width: "120px",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      });

    setTableColumns(cols);
  }, [openRowId,selectedRows, selectAll, data]);

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
          ids: selectedRows,
          mail_type:"INVOICE",
          Api: combine_invoice,
        defaultInvoiceType: null,
          supplier:"ESSO"
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      }
       paginationRowsPerPageOptions={[ 200,300]} table={true} 
       buttonTitle="Send Mail"
        loading={loading} 
       totalRows= {totalRows}
        tableColumns={tableColumns} 
        setData={setData}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
         tableData={data} />,
  },
  {
    id: '2',
    label:"Sender Owner Operator Invoice",
    component: <DataTableComponent  handleMail={() =>
        handleMail({
          ids: selectedRows,
          mail_type:"INVOICE",
          Api: owner_invoice,
          defaultInvoiceType:"owner",
          supplier:"ESSO"
          
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      } loading={ownerLoading}
      handlePageChange={ownerHandlePerChange}
      setData={handleSetData}
      handlePerRowsChange={ownerHandlePerROwChange} totalRows={ownerTotalRow} tableColumns={tableColumns}  tableData={ownerdata} paginationRowsPerPageOptions={[ 200,300]} table={true} buttonTitle="Send Mail"/>,
  },

  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component:<DataTableComponent  handleMail={() =>
        handleMail({
          ids: selectedRows,
          mail_type:"INVOICE",
          Api: combine_invoice,
          defaultInvoiceType:"MONEYCODE",
          supplier:"ESSO"
          
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      } loading={moneycodeLoading} 
      handlePageChange={moneycodeHandlePerChange}
      setData={setmoneycodeData}
      handlePerRowsChange={moneyHandlePerROwChange}
      totalRows={moneycodeTotalRow} tableColumns={tableColumns}  tableData={moneyCodedata} paginationRowsPerPageOptions={[ 200,300]} table={true} buttonTitle="Send Mail"/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component: <DataTableComponent 
    handleMail={() =>
        handleMail({
          ids: selectedRows,
          mail_type:"INVOICE",
          Api: combine_invoice,
          defaultInvoiceType:"CUSTUM",
          supplier:"ESSO"
          
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      }  
      tableColumns={tableColumns} 
      setData={setmoneycodeData}
      handlePerRowsChange={customizedHandlePageChange}
      handlePageChange={customizedHandlePageChange}
      loading={customizedLoading} totalRows={customizedTotalRow}  tableData={customizedData} paginationRowsPerPageOptions={[ 200,300]} table={true} buttonTitle="Send Mail"/>,
  },
 
  
   {
    id: '5',
    label:"Send T-check Invoice",
    component:<DataTableComponent   handleMail={() =>
        handleMail({
          ids: selectedRows,
          mail_type:"INVOICE",
          Api: combine_invoice,
          defaultInvoiceType:"TCHECK",
          supplier:"ESSO"
          // ✅ dynamic API
           // ✅ refresh correct tab
        })
      }   
     tableColumns={tableColumns}
     handlePerRowsChange={tcheckHandlePerROwChange}
     setData={settcheckData}
     handlePageChange={tcheckHandlePerChange}
     loading={tcheckLoading} totalRows={tcheckTotalRow} tableData={tcheckdata} paginationRowsPerPageOptions={[ 200,300]} table={true} buttonTitle="Send Mail"/>,
  },
  
];
const SendBulkTab = [
  {
    id: '1',
    label:"Send Invoice",
    component: <SingleEssoForm loading={loading} company_list="false"  btnTtitle="Search Invoice" title="Search Invoice" onSearch={handleSearch} />,
  },
  {
    id: '2',
    label:"Send Owner Operator Invoice",
    component: <CreateInvoiceCommon validation={false}  company_list="list" loading={ownerLoading}
 supplier_ids="6"  cust_inv_dropdown={true}   country_id="1" owner_operator_invoice="Yes" invoice_type_dropdown={true}  invoice_type="RG" btnTtitle="Search Data" btn1Title="Reset"  title="Search Owner Operator Invoice"  onSearch={ownerHandleSearch}/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component: <CreateInvoiceCommon validation={false}  loading={customizedLoading} company_list="list" suplier_list={false} btnTtitle="Search Data" title="Search MoneyCode Invoice" onSearch={ownerHandleSearch}/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:  <CreateInvoiceCommon invoice_creation="" invoice_type="" cust_inv_type="RG" validation={false} company_list="list" cust_inv_dropdown={true}
 supplier_ids="6,3" invoice_category_dropdown={true}   country_id="" invoice_type_dropdown={true}   btnTtitle="Search Data" btn1Title="Reset"  title="Search Customized Invoice" onSearch={customizedHandleSearch}/>,
  },
 
   {
    id: '5',
    label:"Send T-check Invoice",
    component: <CreateInvoiceCommon validation={false} company_list="list" suplier_list={false}  btnTtitle="Search Data" title="Search T-check Invoice" onSearch={ownerHandleSearch}/>,
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
