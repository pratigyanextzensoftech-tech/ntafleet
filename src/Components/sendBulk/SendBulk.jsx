import React,{Fragment,useState,useEffect} from 'react'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import DataTableComponent from '../../Components/Tables/DataTable/DataTableComponent';

import BulkRetailInvoice from '../../Components/createInvoice/BulkRetailInvoice';
import SingleEssoForm from '../../Components/createEssoInvoice/SingleEssoForm';
import usePaginatedTable from "../../Hooks/usePagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { combine_invoice, owner_invoice, customized_invoice } from "../../api";
import {
  FaEdit,
  FaTrashAlt,
  FaFilePdf,
  FaFileExcel,
  FaEnvelope,
} from "react-icons/fa";
const SendBulk = () => {
   const [openRowId, setOpenRowId] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
 
    const columnsMap = {
      "Invoice # #": "invoice_id",
      Company: "company_name",
      "From ": "from",
      To: "to",
      "Due Date": "due_date",
      Total: "total",
      "Retail Total": "retail_price",
      Saving: "saving",
      Fees: "fees",
      "Tr Count": "tr_count",
      Country: "country",
      Supplier: "supplier_id",
      Mailed_By: "mailby",
      Mailed_On: "mail_on",
      "Show/Hide": "total_gln",
      Status: "status",
    };
  
    const {
      data,
      totalRows,
      loading,
      handlePageChange,
      handlePerRowsChange,
      handleSearch, // ✅ Added
      setData,
    } = usePaginatedTable({ apiUrl: combine_invoice, columnsMap });
  
    const {
      data: ownerdata,
      totalRows: ownerTotalRow,
      loading: ownerLoading,
      handlePageChange: ownerHandlePerChange,
      handlePerRowsChange: ownerHandlePerROwChange,
      handleSearch: ownerHandleSearch, // ✅ Added
      setData: handleSetData,
    } = usePaginatedTable({ apiUrl: owner_invoice, columnsMap });
  
    const {
      data: customizedData,
      totalRows: customizedTotalRow,
      loading: customizedLoading,
      handlePageChange: customizedHandlePageChange,
      handlePerRowsChange: customizedHandlePerRowsChange,
      handleSearch: customizedHandleSearch,
      setData: setCustomizedData,
    } = usePaginatedTable({ apiUrl: customized_invoice, columnsMap });
   useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row.id ? null : row.id)}
          >
            Action
          </button>

          {openRowId === row.id && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 160,
                padding: "5px 0",
              }}
            >
              <Link
                to={`/download_pdf/${btoa(row.id)}`}
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaFilePdf /> Download PDF
              </Link>

              <Link
                to={`/download_excel/${btoa(row.id)}`}
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaFileExcel /> Download Excel
              </Link>

              <button
                className="dropdown-item d-flex align-items-center text-primary"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaEnvelope /> Send Email
              </button>

              <button
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleDelete(row)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          )}
        </div>
      ),
    });

    setTableColumns(cols);
  }, [openRowId]);

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
    component: <DataTableComponent tableColumns={tableColumns}  tableData={data}/>,
  },
  {
    id: '2',
    label:"Sender Owner Operator Invoice",
    component: <DataTableComponent tableColumns={tableColumns}  tableData={data}/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component:<DataTableComponent tableColumns={tableColumns}  tableData={data}/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component: <DataTableComponent tableColumns={tableColumns}  tableData={data}/>,
  },
 
  
   {
    id: '5',
    label:"Send T-check Invoice",
    component:<DataTableComponent tableColumns={tableColumns}  tableData={data}/>,
  },
  
];
const SendBulkTab = [
  {
    id: '1',
    label:"Send Invoice",
    component: <SingleEssoForm btnTtitle="Search Invoice" title="Search Invoice" onSearch={handleSearch}/>,
  },
  {
    id: '2',
    label:"Send Owner Operator Invoice",
    component: <BulkRetailInvoice btnTtitle="Search Data" btn1Title="Reset"  title="Search Owner Operator Invoice"  onSearch={ownerHandleSearch}/>,
  },
  
  {
    id: '3',
    label: "Send MoneyCode Invoice",
    component: <SingleEssoForm btnTtitle="Search Data" title="Search MoneyCode Invoice"/>,
  },
   {
    id: '4',
    label:"Send Customized Invoice",
    component:  <BulkRetailInvoice btnTtitle="Search Data" btn1Title="Reset"  title="Search Customized Invoice"/>,
  },
 
  
   {
    id: '5',
    label:"Send T-check Invoice",
    component: <SingleEssoForm btnTtitle="Search Data" title="Search T-check Invoice"/>,
  },
  
];
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
          .delete(`${combine_invoice}/${row.id}`)
          .then(() => {
            setData((prevData) =>
              prevData.filter((item) => item.id !== row.id)
            );
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete record.", "error");
          });
      }
    });
  };
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
