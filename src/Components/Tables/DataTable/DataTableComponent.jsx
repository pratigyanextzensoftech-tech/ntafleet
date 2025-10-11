import React, { Fragment, useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import Loader from '../../../Layout/Loader';
import { AlignJustify } from 'react-feather';

const DataTableComponent = ({ tableData, tableColumns, title, loading }) => {
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

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${selectedRows.map(r => r.title || r.companyName)}?`
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
        {title && (
          <div className='p-2 my-3 bg-primary'>
            <HeaderCard title={title} />
          </div>
        )}

        {selectedRows.length !== 0 && (
          <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
            <H4 attrH4={{ className: 'text-muted m-0' }}>Delete Selected Data..!</H4>
            <Btn attrBtn={{ color: 'danger', onClick: handleDelete }}>Delete</Btn>
          </div>
        )}

        {/* ✅ Table container with loader overlay */}
        <div className="table-responsive p-3 position-relative" style={{ minHeight: "550px"}}>
          

          <DataTable
            data={data}
            columns={tableColumns}
            pagination
            striped
            center
            highlightOnHover
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleDelete}
            customStyles={customStyles}
            progressPending={loading} // optional built-in loader prop
            progressComponent={  
              
     <Loader loading={loading}/>
      }

          />
        </div>
      </div>
    </Fragment>
  );
};

export default DataTableComponent;
