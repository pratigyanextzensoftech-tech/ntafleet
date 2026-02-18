import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Container } from "reactstrap";
import axios from "axios";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { fual_card } from "../../../api"; // your fuel card API endpoint
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useCompany,useSupplier } from "../../../Hooks/Dropdowns";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { cardStatus } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import { useForm } from "react-hook-form";
import { Row, Col, Card, CardBody } from "reactstrap";
import ViewForm from "./ViewForm";
const ViewFuelCards = () => {
  const [fuelCards, setFuelCards] = useState([]);
    const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const {data:company}=useCompany("")
  const {data:supplier}=useSupplier("")
  const [selectedRow, setSelectedRow] = useState(null);
  const[Edit,setEdit]=useState(false)
  // Pagination states
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
    const {
      control,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm({ });
const navigate=useNavigate()
  // Build column definitions

// const filteredData = fuelCards.filter((row) =>
//   Object.keys(filters).every((key) => {
//     if (!filters[key]) return true;
//     return (
//       row[key] &&
//       row[key].toString().toLowerCase().includes(filters[key])
//     );
//   })
// );
  const handleSearch = (formData) => {
    console.log("🔍 Filters received:", formData);
    setFilters(formData); // save filters
    setCurrentPage(1); // reset to first page
    fetchData(1, perPage, formData); // fetch new data immediately
  };

const handleFilterChange = (column, value) => {
  const updatedFilters = {
    ...filters,
    [column]: value.toLowerCase(),
  };

  setFilters(updatedFilters);
  fetchData(currentPage, perPage, updatedFilters);
};

  useEffect(() => {
    const columns = [
      { key: "card", label: "Card",width:"200px" },
      { key: "policy", label: "Policy",width:"100px" },
      { key: "unit", label: "Unit",width:"100px" },
      { key: "pin", label: "PIN",width:"80px" },
      { key: "driverName", label: "Driver Name"},
      { key: "companyName", label: "Company Name" ,width:"250px"},
      { key: "supplierName", label: "Supplier Name"  },
      { key: "suspicious", label: "Suspicious" },
      { key: "lastLogin", label: "Last Login" },
      { key: "loginBefore", label: "Login Before",  },
      { key: "status", label: "Status",width:"100px" },
      {
        key: "Action",
         searchable: false,
        label: "Action",
        cell: (row) => (
          <div className="position-relative dropdown-action">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={() =>
                setOpenRowId(openRowId === row.id ? null : row.id)
              }
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
                  minWidth: 150,
                  padding: "5px 0",
                }}
              >
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={(e) => handleEdit(e,row)}
                >
                  <FaEdit /> Edit
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
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ].map((col) => ({
      name: (
      
          <div
            className="d-flex align-items-center justify-content-start"
            style={{ height: "40px" }}
          >
            {col.label}
            
          </div>
  
      
      ),
      selector: (row) => row[col.key],
      sortable: true,
      width:col.width,
      wrap: true,
      cell: col.cell,
      ignoreRowClick: col.ignoreRowClick,
      allowOverflow: col.allowOverflow,
      button: col.button,
    }));

    setTableColumns(columns);
  }, [openRowId, company, supplier, cardStatus]);

  // Fetch paginated data
  const fetchData = async (page = 1, perPage = 10,filters = {}) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;
      const params = { draw, start, length,  ...filters   };

      const res = await axios.get(fual_card, { params });
      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const mappedData = responseData.map((item) => ({
        id: item.card_id,
        card: item.card_no,
        policy: item.policy,
        unit: item.unit_number,
        pin: item.pin_number,
        driverName: item.driver_name,
        companyName: item.company_name,
        supplierName: item.supplier_name,
        suspicious: item.susp_comp,
        lastLogin: item.last_login,
        loginBefore: item.loginbefore,
        status: item.status,
      }));

      setFuelCards(mappedData);
      setTotalRows(res.data.recordsTotal || res.data.total || 0);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching fuel card data", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage);
  };

  // Action handlers
   const handleEdit = async (e, row) => {
    console.log(row)
  try {
        const response = await axios.get(`${fual_card}/${row.id}`);
    
    console.log(response.data)

    setSelectedRow(response.data);
    setEdit(true);

    const encodedId = btoa(row.id); // encode ID

    navigate(`/edit-fuelCards/${encodedId}`, {
      state: { data: response.data }
    });

  } catch (error) {
    console.error("Error fetching full row data", error);
  }
};
  
   const handleDelete = (row) => {
    console.log(row)
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
        axios.delete(`${fual_card}/${row.id}`)
          .then(() => {
                  setFuelCards(fuelCards.filter((item) => item.id !== row.id));

            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
          });
      }
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Fragment>
      <Breadcrumbs parent="Fuel Cards" title="View Fuel Cards" />
      <Container fluid> 
         <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <ViewForm
                  btnTitle="Search Data"
                  btnTitle1="Reset"
                  onSearch={handleSearch}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Fuel Card List"
          loading={loading}
          tableColumns={tableColumns}
          tableData={fuelCards}
          downloadHeading="Download"
          download={true}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </Fragment>
  );
};

export default ViewFuelCards;
