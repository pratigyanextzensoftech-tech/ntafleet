import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { Container } from "reactstrap";
import { Company } from "../../api";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";

const ViewCompany = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null); // track open dropdown
const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold", // make header bold
      fontSize: "14px",
      color: "#333",       // optional: change color
    },
  },
};
  const handleEdit = (row) => console.log("Edit:", row);
  const handleLogin = (row) => console.log("Login:", row);
  const handleDelete = (row) => {
    if (window.confirm(`Delete "${row.companyName}"?`)) {
      setCompanyData(companyData.filter((item) => item.id !== row.id));
      setOpenRowId(null);
    }
  };

  useEffect(() => {
      setLoading(true); // start loader
    axios
      .get(Company)
      .then((res) => {
        const apiData = Array.isArray(res.data) ? res.data : res.data.data || [];
        const filteredData = apiData.map((item) => ({
          id: item.company_id,
          companyName: item.company_name,
          firstName: item.first_name,
          lastName: item.last_name,
          address: item.address,
          suspicious: item.susp_comp,
          lastLogin: item.last_login,
          loginBefore: "",
          latitude: item.lat,
          longitude: item.lang,
          Status: item.company_status,
        }));
        setCompanyData(filteredData);

        const columns = [
          { key: "id", label: "Sr.No." },
          { key: "companyName", label: "Company Name" },
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" },
          { key: "address", label: "Address" },
          { key: "suspicious", label: "Suspicious Company" },
          { key: "lastLogin", label: "Last Login" },
          { key: "loginBefore", label: "Login Before" },
          { key: "latitude", label: "Latitude" },
          { key: "Status", label: "Status" },
          {
            key: "Action",
            label: "Action",
            cell: (row) => (
              <div className="position-relative">
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
                      onClick={() => handleEdit(row)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      style={{ padding: "8px 12px", gap: "8px" }}
                      onClick={() => handleLogin(row)}
                    >
                      <FaSignInAlt /> Login
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
          name: col.label,
          selector: (row) => row[col.key],
          sortable: true,
          wrap: true,
          cell: col.cell,
          ignoreRowClick: col.ignoreRowClick,
          allowOverflow: col.allowOverflow,
          button: col.button,
        }));

        setTableColumns(columns);
         setLoading(false);
      })
      .catch((err) => console.error(err));
      const handleClickOutside = (event) => {
    // If the click is outside any dropdown button or menu, close the open dropdown
    if (!event.target.closest(".dropdown-action")) {
      setOpenRowId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, [openRowId]);

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Company List" />
      <Container fluid>
        <HeaderCard title="Company List" />
        <DataTableComponent
          title="Company List"
          loading={loading}
          tableColumns={tableColumns}
          tableData={companyData}
        />
      </Container>
    </Fragment>
  );
};

export default ViewCompany;
