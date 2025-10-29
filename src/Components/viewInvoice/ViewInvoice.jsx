import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { invoice, owner_invoice, customized_invoice } from "../../api";
import BulkRetailInvoice from "../createInvoice/BulkRetailInvoice";
import SingleRetailMulti from "../createInvoice/SingleRetailMulti";
import OwnerOperator from "../viewInvoice/OwnerOperator";
import ViewInvoiceForm from "../viewInvoice/ViewInvoiceForm";
import CustomizedInvoice from "../viewInvoice/CustomizedInvoice";
import { tableColumns, dummytabledata } from "../../Data/Table/Defaultdata";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import usePaginatedTable from "../../Hooks/usePagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaFilePdf,
  FaFileExcel,
  FaEnvelope,
} from "react-icons/fa";

const ViewInvoice = () => {
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
  } = usePaginatedTable({ apiUrl: invoice, columnsMap });

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

  const View_Invoice = [
    {
      id: "1",
      label: "View Invoices",
      component: <ViewInvoiceForm title="Invoice Filters" />,
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: <OwnerOperator title="Owner Operator Invoice Filters" />,
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: <CustomizedInvoice title="Customised Invoice Filters" />,
    },
  ];
  const View_Invoice_Table = [
    {
      id: "1",
      label: "View Invoices",
      component: (
        <DataTableComponent
          title="Invoices List "
          tableColumns={tableColumns}
          tableData={data}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      ),
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: (
        <DataTableComponent
          title="Invoices List "
          tableColumns={tableColumns}
          tableData={ownerdata}
          loading={ownerLoading}
          pagination
          paginationServer
          paginationTotalRows={ownerTotalRow}
          onChangeRowsPerPage={ownerHandlePerROwChange}
          onChangePage={ownerHandlePerChange}
        />
      ),
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: (
        <DataTableComponent
          title="Invoices List "
          tableColumns={tableColumns}
          tableData={customizedData}
          loading={customizedLoading}
          pagination
          paginationServer
          paginationTotalRows={customizedTotalRow}
          onChangeRowsPerPage={customizedHandlePerRowsChange}
          onChangePage={customizedHandlePageChange}
        />
      ),
    },
  ];
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
          .delete(`${invoice}/${row.id}`)
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
      <Breadcrumbs parent="Invoice" title="View Invoice" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Invoice Filter" />
              <CardBody>
                <BasicTabCard tabContent={View_Invoice} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Invoice List" />
              <CardBody>
                <BasicTabCard tabContent={View_Invoice_Table} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ViewInvoice;
