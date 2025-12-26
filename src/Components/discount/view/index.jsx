import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import ViewForm from "./ViewForm";
import { FaTrashAlt, FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { discount_list } from "../../../api"; // ✅ Your API endpoint
import Swal from "sweetalert2";
const Index = () => {
  const [discountData, setDiscountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRowId, setOpenRowId] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({});
  const [draw, setDraw] = useState(1);

  // ✅ Fetch data
  const fetchDiscountData = async (page = 1, limit = 10, filtersData = filters) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit;
      const params = { draw, start, length: limit,
          ...filtersData, };
      const res = await axios.get(discount_list, { params });
      const data = Array.isArray(res.data.data) ? res.data.data : res.data;

      const formatted = data.map((item, index) => ({
        id: item.id || index + 1,
        company_name: item.company_name,
        start_date: item.start_date,
        end_date: item.end_date,
        country: item.country,
        supplier: item.supplier_name,
        cent_ca: item.discount_ca,
        total_ca: item.total_ca,
        retail_ca: item.retail_total_ca,
        qty_ca: item.fuel_unit_us,
        disc_ca: item.discount_amt_ca,
        cent_us: item.discount_us,
        total_us: item.total_us,
        retail_us: item.retail_total_us,
        qty_us: item.fuel_unit_ca,
        disc_us: item.discount_amt_us,
      }));

      setDiscountData(formatted);
      setTotalRows(res.data.recordsTotal || res.data.total || data.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching discount data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountData(currentPage, perPage,filters);
  }, [currentPage, perPage,filters]);

  // ✅ Dropdown actions
  const handleDownload = (row) => {
    console.log("Download PDF:", row);
  };

    const handleDelete = (e,row) => {
    console.log(row.id)
    e.preventDefault()
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
          axios.delete(`${discount_list}/${row.id}`)
            .then((res) => {
        setDiscountData((prevData) => prevData.filter((item) => item.id !== row.id));

              Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
                console.log(res.data)
  
            })
            .catch((error) => {
              Swal.fire('Error!', 'Failed to delete record.', 'error');
              console.log(error)
            });
        }
      });
    }; 

  const ActionDropdown = ({ row }) => (
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
            minWidth: 180,
            padding: "5px 0",
          }}
        >
          <button
            className="dropdown-item d-flex align-items-center"
            style={{ padding: "8px 12px", gap: "8px" }}
            onClick={() => handleDownload(row)}
          >
            <FaFilePdf /> Download PDF
          </button>

          <button
            className="dropdown-item d-flex align-items-center text-danger"
            style={{ padding: "8px 12px", gap: "8px" }}
            onClick={(e) => handleDelete(e,row)}
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) setOpenRowId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const columnHeader = ( label, columnKey ) => (
<div style={{ width: "100%" }}>
    <div className="d-flex align-items-end">
      {label}
    </div>
    <input
      type="text"
      className="mt-1"
      style={{
        width: "100%",
        height: "28px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "12px",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={(e) => handleFilterChange(columnKey, e.target.value)}
    />
  </div>
);
const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
const filteredData = discountData.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
);

 const tableColumns = [
  {
    name: columnHeader("ID#", "id"),
    selector: (row) => row.id,
    sortable: true,
    width: "90px",
  },
  {
    name: columnHeader("Company", "company_name"),
    selector: (row) => row.company_name,
    sortable: true,
    wrap: true,
    width: "250px",
  },
  {
    name: columnHeader("Start Date", "start_date"),
    selector: (row) => row.start_date,
    sortable: true,
    width: "150px",
  },
  {
    name: columnHeader("End Date", "end_date"),
    selector: (row) => row.end_date,
    sortable: true,
    width: "150px",
  },
  {
    name: columnHeader("Country", "country"),
    selector: (row) => row.country,
    sortable: true,
    width: "150px",
  },
  {
    name: columnHeader("Supplier", "supplier"),
    selector: (row) => row.supplier,
    sortable: true,
    width: "150px",
  },
  {
    name: columnHeader("Discount Cent (CA)", "cent_ca"),
    selector: (row) => row.cent_ca,
    sortable: true,
    width: "180px",
  },
  {
    name: columnHeader("Discount Cent (US)", "cent_us"),
    selector: (row) => row.cent_us,
    sortable: true,
    width: "180px",
  },
  {
    name: columnHeader("Total (CA)", "total_ca"),
    selector: (row) => row.total_ca,
    sortable: true,
    width: "120px",
  },
  {
    name: columnHeader("Total (US)", "total_us"),
    selector: (row) => row.total_us,
    sortable: true,
    width: "120px",
  },
  {
    name: columnHeader("Retail Total (CA)", "retail_ca"),
    selector: (row) => row.retail_ca,
    sortable: true,
    width: "170px",
  },
  {
    name: columnHeader("Retail Total (US)", "retail_us"),
    selector: (row) => row.retail_us,
    sortable: true,
    width: "170px",
  },
  {
    name: columnHeader("Qty (CA)", "qty_ca"),
    selector: (row) => row.qty_ca,
    sortable: true,
    width: "110px",
  },
  {
    name: columnHeader("Qty (US)", "qty_us"),
    selector: (row) => row.qty_us,
    sortable: true,
    width: "110px",
  },
  {
    name: columnHeader("Discount (CA)", "disc_ca"),
    selector: (row) => row.disc_ca,
    sortable: true,
    width: "150px",
  },
  {
    name: columnHeader("Discount (US)", "disc_us"),
    selector: (row) => row.disc_us,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    cell: (row) => <ActionDropdown row={row} />,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "100px",
  },
];



 const handleSearch = (formData) => {
    console.log("🔍 Filters received:", formData);
    setFilters(formData); // save filters
    setCurrentPage(1); // reset to first page
    fetchDiscountData(currentPage, perPage, formData); // fetch new data immediately
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="View Discounts" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <ViewForm btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Discount List"
          tableColumns={tableColumns}
          tableData={filteredData}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={(newPerPage, page) => {
            setPerPage(newPerPage);
            setCurrentPage(page);
          }}
          onChangePage={(page) => setCurrentPage(page)}
        />
      </Container>
    </Fragment>
  );
};

export default Index;
