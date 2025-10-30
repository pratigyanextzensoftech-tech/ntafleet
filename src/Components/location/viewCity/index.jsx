import React, { Fragment,useEffect,useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ViewCityForm from './ViewCityForm';
import qs from "qs";
import axios from "axios";
import { city as APINAME } from "../../../api";
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from "../../../Hooks/usePagination";
const Index = () => {
    const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  // ✅ Column mapping between UI and API
  const columnsMap = {
    "City ID": "city_id",
    "City Name": "city_name",
    "State": "state_name",
    "Abbreviation": "abbreviation",
    "Country": "country_name",
  
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

  // ✅ Build column definitions for DataTable
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

    // Add Status column

    // ✅ Add Actions column at the end
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
                minWidth: 180,
                padding: "5px 0",
              }}
            >
              {/* Download */}

              {/* Edit */}
              <button
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEdit(row)}
              >
                <FaEye /> Edit
              </button>
              {/* Delete */}
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

  // ✅ Action handlers
  const handleEdit = (row) => alert("Edit " + row.id);
  const handleDelete = (row) => alert("Delete " + row.id);
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage City' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add City" />
              <CardBody>
                <ViewCityForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent title="City List " tableColumns={tableColumns} tableData={data} />
      </Container>
    </Fragment>
  );
};

export default Index;