import React, { Fragment, useState,useEffect } from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import ViewMoneyCodeForm from './ViewMoneyCodeForm'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import {  moneycode_invoice as APINAME,retail_invoice,invoice} from '../../api/index'
import usePaginatedTable from '../../Hooks/usePagination';
import { downloadPdf } from '../../Hooks/Dropdowns';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaRedoAlt,
  FaTrashAlt,
} from "react-icons/fa";
const ViewMoneyCode = () => {
 const [openRowId, setOpenRowId] = useState(null);
     const [filters, setFilters] = useState({});
  const [tableColumns, setTableColumns] = useState([]);
   const handleChange = (row, field, value) => {
    console.log(row)
    // 1️⃣ Optimistic UI update
    setData((prevData) =>
      prevData.map((item) =>
        item["Invoice #"] === row["Invoice #"]
          ? { ...item, [field]: value }
          : item
      )
    );
  
    // 2️⃣ Prepare payload
    const payload = {
      id: row["Invoice #"],
      [field]: value,
    };
  
    // 3️⃣ Choose API
    const apiUrl =
      row.tp === "Retail"
        ? retail_invoice
        : invoice;
  
    // 4️⃣ PUT API call
    axios
      .put(`${apiUrl}/${row["Invoice #"]}`, payload)
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
const columnWidths = {
  "Invoice #": "120px",
  "Company": "600px",
  "From Date": "200px",
  "To Date": "200px",
  "Due Date": "200px",
  "Total Due": "200px",
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
   const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
  const filteredData = data.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
);
  useEffect(() => {
       const cols = Object.keys(columnsMap)
  .filter((key) => key !== "Id")
  .map((key) => {
    const colWidth = columnWidths[key]; 
    const colWidthPx = parseInt(colWidth, 10);

    return {
      name: (
        <div style={{ width: "100%" }}>
          <div className="d-flex align-items-end justify-content-start">
            {key}
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",                   
              maxWidth: colWidthPx - 10 + "px",// small padding
              height: "28px",
              border:"none",
              borderRadius:"5px",
              boxSizing: "border-box"
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          />
        </div>
      ),
      selector: (row) => row[key],
      sortable: true,
      width:colWidth,
      wrap: true,
    }});

cols.push({
  name: (
    <div >
      <div className="d-flex align-items-end justify-content-start fw-bold">
        Status
      </div>

      <input
        type="text"
        className="mt-2"
        style={{
          width: "100%",
          height: "28px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) =>
          handleFilterChange("status", e.target.value)
        }
      />
    </div>
  ),

  selector: (row) => row.admin_status,
  sortable: true,
width:"150px",
  cell: (row) => (
    <select
      className="form-select form-select-sm"
      value={row.admin_status}
      onChange={(e) =>
        handleChange(row, "status", e.target.value)
      }
    >
      <option value="Open">Open</option>
      <option value="Entered">Entered</option>
      <option value="Close">Close</option>
    </select>
  ),
});

 cols.push({
  name: "Action",
  cell: (row) => (
    <div className="position-relative dropdown-action">
      <button
        className="btn btn-sm btn-primary px-2"
        onClick={() =>
          setOpenRowId(openRowId === row["Invoice #"] ? null : row["Invoice #"])
        }
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
  label: "Download PDF",
  icon: <FaDownload />,
  type: "download",
  color: "text-danger",
  href: "#",
  onClick:()=>downloadPdf(row?.fulldata?.download_link)
},
            {
              label: "View",
              icon: <FaEye />,
              to: `/viewInvoice/ViewPdf/${btoa(row["Invoice #"])}`,
              state: { downloadLinkUrl: row.fulldata.download_link },
              color: "text-success",
              type: "link",
            },
            {
              label: "Email",
              icon: <FaEnvelope />,
              color: "text-primary",
              // onClick: () => handleEmail(row),
            },
            {
              label: "ReGenerate Invoice",
              icon: <FaRedoAlt />,
              color: "text-warning",
              // onClick: () => handleRegenerate(row),
            },
            {
              label: "Delete",
              icon: <FaTrashAlt />,
              onClick: (e) => handleDelete(e, row),
              color: "text-danger",
            },
          ].map((action, index) => {
  if (action.type === "link") {
    return (
      <Link
        key={index}
        to={action.to}
        state={action.state}
        className={`dropdown-item d-flex align-items-center ${action.color}`}
        style={{ padding: "8px 12px", gap: "8px" }}
      >
        {action.icon} {action.label}
      </Link>
    );
  }

  if (action.type === "download") {
    return (
      <a
        key={index}
        href={action.href}
        download
        target="_blank"
        rel="noopener noreferrer"
        className={`dropdown-item d-flex align-items-center ${action.color}`}
        style={{ padding: "8px 12px", gap: "8px", cursor: "pointer" }}
      >
        {action.icon} {action.label}
      </a>
    );
  }

  return (
    <button
      key={index}
      className={`dropdown-item d-flex align-items-center ${action.color}`}
      style={{ padding: "8px 12px", gap: "8px" }}
      onClick={action.onClick}
    >
      {action.icon} {action.label}
    </button>
  );
})}
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
 
  const handleDelete = (e,row) => {
    e.preventDefault();
    console.log(row["Invoice #"]);

    console.log(data.find((item)=>item["Invoice #"]==row["Invoice #"]));
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
        axios.delete(`${APINAME}/${row["Invoice #"]}`)
          .then(() => {
                setData(prev => prev.filter(item => item["Invoice #"] !== row["Invoice #"]));

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
          tableData={filteredData}
          loading={loading}
          pagination
          downloadHeading="download"
          download={true}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} />
      </Container>
    </Fragment>
  )
}

export default ViewMoneyCode
