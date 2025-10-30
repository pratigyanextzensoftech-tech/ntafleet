import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { combine_invoice, owner_invoice, customized_invoice } from "../../api";
import OwnerOperator from "../viewInvoice/OwnerOperator";
import ViewInvoiceForm from "../viewInvoice/ViewInvoiceForm";
import CustomizedInvoice from "../viewInvoice/CustomizedInvoice";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import usePaginatedTable from "../../Hooks/usePagination";
import { Link } from "react-router-dom";
import {
  FaTrashAlt,
  FaFilePdf,
  FaFileExcel,
  FaEnvelope,
} from "react-icons/fa";

const ViewInvoice = () => {
  const [openRowId, setOpenRowId] = useState(null);

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

  // ✅ Combine Invoice
  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch,
    setData,
    handleDelete,
  } = usePaginatedTable({ apiUrl: combine_invoice, columnsMap });

  // ✅ Owner Operator Invoice
  const {
    data: ownerdata,
    totalRows: ownerTotalRow,
    loading: ownerLoading,
    handlePageChange: ownerHandlePerChange,
    handleDelete: ownerHandleDelete,
    handlePerRowsChange: ownerHandlePerROwChange,
    handleSearch: ownerHandleSearch,
    setData: handleSetData,
  } = usePaginatedTable({ apiUrl: owner_invoice, columnsMap });

  // ✅ Customized Invoice
  const {
    data: customizedData,
    totalRows: customizedTotalRow,
    loading: customizedLoading,
    handlePageChange: customizedHandlePageChange,
    handlePerRowsChange: customizedHandlePerRowsChange,
    handleSearch: customizedHandleSearch,
    setData: setCustomizedData,
    handleDelete: customizedHandleDelete,
  } = usePaginatedTable({ apiUrl: customized_invoice, columnsMap });

  // ✅ Helper to create dynamic columns for each API
  const createColumns = (handleDeleteFn) => {
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
                onClick={() => handleDeleteFn(row)} // ✅ Correct delete fn per table
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          )}
        </div>
      ),
    });

    return cols;
  };

  // ✅ Separate column sets for each table
  const combineColumns = createColumns(handleDelete);
  const ownerColumns = createColumns(ownerHandleDelete);
  const customizedColumns = createColumns(customizedHandleDelete);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Filter Tabs
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

  // ✅ Table Tabs
  const View_Invoice_Table = [
    {
      id: "1",
      label: "View Invoices",
      component: (
        <DataTableComponent
          title="Invoices List"
          tableColumns={combineColumns}
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
          title="Owner Operator Invoices"
          tableColumns={ownerColumns}
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
          title="Customised Invoices"
          tableColumns={customizedColumns}
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
