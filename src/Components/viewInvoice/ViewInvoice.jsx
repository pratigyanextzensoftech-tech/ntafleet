import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import {
  combine_invoice,
  owner_invoice,
  customized_invoice,
  retail_invoice,
  invoice,
} from "../../api";
import OwnerOperator from "../viewInvoice/OwnerOperator";
import ViewInvoiceForm from "../viewInvoice/ViewInvoiceForm";
import CustomizedInvoice from "../viewInvoice/CustomizedInvoice";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import usePaginatedTable from "../../Hooks/usePagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";
import { FaTrashAlt, FaDownload, FaEye, FaEnvelope } from "react-icons/fa";

const ViewInvoice = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);
  const [filters, setFilters] = useState({});

  const columnsMap = {
    "Invoice#": "invoice_id",
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
    Supplier: "supplier_name",
    Mailed_By: "mail_by",
    Mailed_On: "mail_on",
  };
  const columnWidths = {
    "Invoice#": "120px",
    Company: "200px",
    "From ": "140px",
    To: "140px",
    "Due Date": "130px",
    Total: "120px",
    "Retail Total": "140px",
    Saving: "120px",
    Fees: "80px",
    "Tr Count": "110px",
    Country: "140px",
    Supplier: "120px",
    Mailed_By: "100px",
    Mailed_On: "120px",
  };

  const getTableSetter = (source) => {
    if (source === combine_invoice) return setData;
    if (source === owner_invoice) return handleSetData;
    if (source === customized_invoice) return setCustomizedData;
    return setData;
  };

  const handleShowHideChange = (fullRow, source) => {
    const mails = $("#mails_" + fullRow.invoice_id).val();
    const admin_status = $("#admin_status_" + fullRow.invoice_id).val();
    const setTableData = getTableSetter(source);
    Swal.fire({
      title: "Are you sure?",
      text: "Change Show / Hide status?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData((prev) =>
          prev.map((row) =>
            row.fulldata.invoice_id === fullRow.invoice_id
              ? {
                  ...row,
                  fulldata: {
                    ...row.fulldata,
                    mails: mails,
                    admin_status: admin_status,
                  },
                }
              : row,
          ),
        );
        let api;
        if (fullRow.tp === "Retail") api = invoice;
        else if (fullRow.tp === "Rack") api = retail_invoice;
        else if (source === owner_invoice) api = owner_invoice;
        else if (source === customized_invoice) api = customized_invoice;
        else api = invoice;
        // 3️⃣ API call

        const update_status = {
          id: fullRow.invoice_id,
          mails: Number(mails),
          admin_status: admin_status,
        };
        console.log("update_status : ", update_status);

        axios.put(`${api}/${fullRow.invoice_id}`, update_status).catch(() => {
          setTableData((prev) =>
            prev.map((row) =>
              row.fulldata.invoice_id === fullRow.invoice_id
                ? {
                    ...row,
                    fulldata: {
                      ...row.fulldata,
                      mails: mails,
                      admin_status: admin_status,
                    },
                  }
                : row,
            ),
          );
        });
      }

      // 2️⃣ Decide API
    });
  };
  const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };

  const handleMail = (row) => {
    console.log(row);
    const activeTab = getActiveTabFromUrl();

    let api;
    if (activeTab === "1") api = combine_invoice;
    else if (activeTab === "2") api = owner_invoice;
    else if (activeTab === "3") api = customized_invoice;
    else api = combine_invoice;

    const payload = {
      mail_type: "INVOICE",
      supplier: row.fulldata.supplier_id,
      invoiceType:
        api === combine_invoice
          ? row?.fulldata?.tp
          : api === owner_invoice
            ? "OWNER"
            : api === customized_invoice
              ? "CUSTUM"
              : null,

      ids: row["Invoice#"],
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to send the mail?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${api}/send-mail`, payload)
          .then(() => {
            Swal.fire("Successfully sent the mail", "", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to send the mail.", "error");
          });
      }
    });
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
  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value.toLowerCase(),
    }));
  };
  const applyFilters = (tableData, filters) => {
    return tableData.filter((row) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return (
          row[key] && row[key].toString().toLowerCase().includes(filters[key])
        );
      }),
    );
  };

  const filteredCombineData = applyFilters(data, filters);
  const filteredOwnerData = applyFilters(ownerdata, filters);
  const filteredCustomizedData = applyFilters(customizedData, filters);
  const View_Invoice = [
    {
      id: "1",
      label: "View Invoices",
      component: (
        <ViewInvoiceForm title="Invoice Filters" onSearch={handleSearch} />
      ),
    },
    {
      id: "2",
      label: "View Owner Operator Invoices",
      component: (
        <OwnerOperator
          title="Owner Operator Invoice Filters"
          onSearch={ownerHandleSearch}
        />
      ),
    },
    {
      id: "3",
      label: "View Customised Invoices",
      component: (
        <CustomizedInvoice
          title="Customised Invoice Filters"
          onSearch={customizedHandleSearch}
        />
      ),
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
          tableData={filteredCombineData}
          loading={loading}
          downloadHeading="Download"
          download={true}
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
          downloadHeading="Download"
          download={true}
          tableData={filteredOwnerData}
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
          downloadHeading="Download"
          download={true}
          tableColumns={tableColumns}
          tableData={filteredCustomizedData}
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

  const downloadPdf = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const filename = url.split("/").pop().split("?")[0];
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

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
                  // maxWidth: colWidthPx - 10 + "px",// small padding
                  height: "28px",
                  border: "none",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              />
            </div>
          ),
          selector: (row) => row[key],
          sortable: true,
          width: colWidth,
          wrap: true,
        };
      });
    cols.push({
      name: (
        <div style={{ width: "100%" }}>
          <div className="d-flex align-items-end justify-content-start">
            Show/Hide
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",
              // maxWidth: colWidthPx - 10 + "px",// small padding
              height: "28px",
              border: "none",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange("Show/Hide", e.target.value)}
          />
        </div>
      ),
      cell: (row) => (
        <select
          className="form-select form-select-sm"
          id={`mails_${row.fulldata.invoice_id}`}
          value={String(row.fulldata.mails)} // ✅ correct source
          onChange={(e) => handleShowHideChange(row.fulldata, row.source)}
        >
          <option value="1">Show</option>
          <option value="0">Hide</option>
        </select>
      ),
      width: "100px",
    });

    cols.push({
      name: (
        <div style={{ width: "100%" }}>
          <div className="d-flex align-items-end justify-content-start">
            Status
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",
              // maxWidth: colWidthPx - 10 + "px",// small padding
              height: "28px",
              border: "none",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange("Show/Status", e.target.value)}
          />
        </div>
      ),
      cell: (row) => (
        <select
          className="form-select form-select-sm"
          id={`admin_status_${row.fulldata.invoice_id}`}
          value={row.fulldata.admin_status}
          onChange={(e) => handleShowHideChange(row.fulldata, row.source)}
        >
          <option value="Open">Open</option>
          <option value="Entered">Entered</option>
          <option value="Close">Close</option>
        </select>
      ),
      width: "120px",
    });
    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() =>
              setOpenRowId(
                openRowId === row["Invoice#"] ? null : row["Invoice#"],
              )
            }
          >
            Action
          </button>

          {openRowId === row["Invoice#"] && (
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
              <a
                href="#"
                onClick={() => downloadPdf(row.fulldata.download_link)}
                rel="noopener noreferrer"
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaDownload /> Download
              </a>

              <Link
                to={`/viewInvoice/ViewPdf/${btoa(row.fulldata.invoice_id)}`}
                state={{ downloadLinkUrl: row.fulldata.download_link }}
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaEye /> View
              </Link>

              <button
                className="dropdown-item d-flex align-items-center text-primary"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleMail(row)}
              >
                <FaEnvelope /> Email
              </button>
              <button
                className="dropdown-item d-flex align-items-center text-primary"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleMail(row)}
              >
                <FaEnvelope /> Regenrate Invoice
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
    console.log(data);
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
          .delete(`${combine_invoice}/${row["Invoice#"]}`)
          .then(() => {
            setData((prevData) =>
              prevData.filter((item) => item["Invoice#"] !== row["Invoice#"]),
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
