import React, { Fragment, useCallback, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Btn, H4 } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import Loader from "../../../Layout/Loader";

const DataTableComponent = ({
  tableData,
  tableColumns,
  title,
  loading,
  paginationTotalRows,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        color: "#333",
      },
    },
  };

  // ✅ Sync data when parent updates
  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  // ✅ Handle selected rows
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  // ✅ Handle delete (local only)
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${selectedRows.map(
          (r) => r.title || r.companyName
        )}?`
      )
    ) {
      setToggleDelete(!toggleDelete);
      setData(
        data.filter((item) => !selectedRows.some((row) => row.id === item.id))
      );
      setSelectedRows([]);
    }
  };

  // ✅ Calculate total pages
  const totalPages = Math.ceil(paginationTotalRows / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onChangePage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    onChangeRowsPerPage(newPerPage, page);
  };

  return (
    <Fragment>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "5px 5px",
          borderRadius: "3px",
        }}
      >
        {title && (
          <div className="p-2 my-3 bg-primary">
            <HeaderCard title={title} />
          </div>
        )}

        {selectedRows.length !== 0 && (
          <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
            <H4 attrH4={{ className: "text-muted m-0" }}>
              Delete Selected Data..!
            </H4>
            <Btn attrBtn={{ color: "danger", onClick: handleDelete }}>
              Delete
            </Btn>
          </div>
        )}

        <div
          className="table-responsive p-3 position-relative"
          style={{ minHeight: "550px" }}
        >
          <DataTable
            data={data}
            columns={tableColumns}
            striped
            center
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={paginationTotalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleDelete}
            customStyles={customStyles}
            progressPending={loading}
            progressComponent={<Loader loading={loading} />}
          />

          {/* ✅ Show total pages */}
          <div className="text-end text-muted mt-2">
            Page {currentPage} of {totalPages || 1}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DataTableComponent;
