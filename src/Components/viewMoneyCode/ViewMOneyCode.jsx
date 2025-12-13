import React, { Fragment, useState,useEffect } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { View_Invoice_Table } from '../../Data/tab/ViewInvoiceTable'
import ViewMoneyCodeForm from './ViewMoneyCodeForm'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import {  moneycode_invoice as APINAME,retail_invoice,invoice} from '../../api/index'
import usePaginatedTable from '../../Hooks/usePagination';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  FaFilePdf,
  FaFileExcel,
  FaEnvelope,
  FaRedoAlt,
  FaTrashAlt,
} from "react-icons/fa";
const ViewMoneyCode = () => {
 const [openRowId, setOpenRowId] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);
   const handleChange = (row, field, value) => {
    console.log(row)
    // 1️⃣ Optimistic UI update
    setData((prevData) =>
      prevData.map((item) =>
        item.id === row.id
          ? { ...item, [field]: value }
          : item
      )
    );
  
    // 2️⃣ Prepare payload
    const payload = {
      id: row.id,
      [field]: value,
    };
  
    // 3️⃣ Choose API
    const apiUrl =
      row.tp === "Retail"
        ? retail_invoice
        : invoice;
  
    // 4️⃣ PUT API call
    axios
      .put(`${apiUrl}/${row.id}`, payload)
      .then((res) => {
        console.log("Updated successfully:", res.data);
      })
      .catch((err) => {
        console.error("Update failed:", err);
  
        // 🔁 rollback on failure
        setData((prevData) =>
          prevData.map((item) =>
            item["Invoice  #"] === row["Invoice  #"]
              ? { ...item, [field]: row[field] }
              : item
          )
        );
      });
  };
  const columnsMap = {
    "Invoice #": "invoice_id",
    "Company":"company_name",
    "From Date": "from_date",
    "To Date": "to_date",
    "Due Date": "due_date",
    "Total Due": "total",
   
  };

  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
  } = usePaginatedTable({ apiUrl: APINAME, columnsMap });
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));
     cols.push({
      name: "Status",
      cell: (row) => (
        <select
          className="form-select form-select-sm"

            value={row.admin_status}  
          onChange={(e) => handleChange(row, "status", e.target.value)}  >
          <option value="Open">Open</option>
          <option value="Entered">Entered</option>
          <option value="Close">Close</option>

        </select>
      ),
      width: "140px",
    });
    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row["Invoice #"] ? null : row["Invoice #"])}
          >
            Action
          </button>

      {openRowId === row["Invoice #"] && (
  <div
    className="position-absolute bg-white border rounded shadow"
    style={{
      zIndex: 1000,
      right: 0,
      marginTop: 5,
      minWidth: 180,
      padding: "5px 0",
    }}
  >
    {[
      {
        label: "Download",
        icon: <FaFilePdf />,
        to: `/download_pdf/${btoa(row["Invoice #"])}`,
        color: "text-danger",
        type: "link",
      },
      {
        label: "View",
        icon: <FaFileExcel />,
        to: `/download_excel/${btoa(row["Invoice #"])}`,
        color: "text-success",
        type: "link",
      },
      {
        label: "Email",
        icon: <FaEnvelope />,
       
        color: "text-primary",
      },
      {
        label: "ReGenerate Invoice",
        icon: <FaRedoAlt />,
        color: "text-warning",
      },
      {
        label: "Delete",
        icon: <FaTrashAlt />,
        onClick: (e) => handleDelete(e, row),
        color: "text-danger",
      },
    ].map((action, index) =>
      action.type === "link" ? (
        <Link
          key={index}
          to={action.to}
          className={`dropdown-item d-flex align-items-center ${action.color}`}
          style={{ padding: "8px 12px", gap: "8px" }}
        >
          {action.icon} {action.label}
        </Link>
      ) : (
        <button
          key={index}
          className={`dropdown-item d-flex align-items-center ${action.color}`}
          style={{ padding: "8px 12px", gap: "8px" }}
          onClick={action.onClick}
        >
          {action.icon} {action.label}
        </button>
      )
    )}
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
  useEffect(() => {
       if (data?.length) {
         const normalized = data.map((item) => ({
           ...item,
           id: item["Invoice #"], 
          
         }));
     
         setData(normalized);
       }
     }, [data]);
  const handleDelete = (e,row) => {
    e.preventDefault();
    console.log(row.id);

    console.log(data.find((item)=>item.id==row.id));
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${APINAME}/${row.id}`)
          .then(() => {
                setData(prev => prev.filter(item => item.id !== row.id));

            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
          })
          .catch((err) => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
            console.log(err)
          });
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumbs parent='Invoice' title='view MoneyCode' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="MoneyCode Invoices List" />
              <CardBody>
                <ViewMoneyCodeForm onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        

        <DataTableComponent title="MoneyCode Invoices List"  tableColumns={tableColumns}
          tableData={data}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} />
      </Container>
    </Fragment>
  )
}

export default ViewMoneyCode
