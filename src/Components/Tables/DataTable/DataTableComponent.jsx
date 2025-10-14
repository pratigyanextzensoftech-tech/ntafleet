import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import Loader from '../../../Layout/Loader';

const DataTableComponent = ({
  tableData,
  tableColumns,
  title,
  loading,
  paginationTotalRows,
  onChangePage,
  onChangeRowsPerPage
}) => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState(tableData);

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        color: "#333",
      },
    },
  };

  // ✅ Update local data when new data arrives from API
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
      setData(data.filter((item) => !selectedRows.some((row) => row.id === item.id)));
      setSelectedRows([]);
    }
  };

  return (
    <Fragment>
      <div style={{ border: "1px solid #ccc", padding: "5px 5px", borderRadius: "3px" }}>
        {/* ✅ Title section */}
        {title && (
          <div className="p-2 my-3 bg-primary">
            <HeaderCard title={title} />
          </div>
        )}

        {/* ✅ Delete bar */}
        {selectedRows.length !== 0 && (
          <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
            <H4 attrH4={{ className: 'text-muted m-0' }}>Delete Selected Data..!</H4>
            <Btn attrBtn={{ color: 'danger', onClick: handleDelete }}>Delete</Btn>
          </div>
        )}

        {/* ✅ DataTable container */}
        <div className="table-responsive p-3 position-relative" style={{ minHeight: "550px" }}>
          <DataTable
            data={data}
            columns={tableColumns}
            striped
            center
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={paginationTotalRows} // ✅ total rows from API
            onChangePage={onChangePage} // ✅ page change event
            onChangeRowsPerPage={onChangeRowsPerPage} // ✅ rows per page event
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleDelete}
            customStyles={customStyles}
            progressPending={loading} // ✅ built-in loading
            progressComponent={<Loader loading={loading} />} // ✅ custom loader
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DataTableComponent;
