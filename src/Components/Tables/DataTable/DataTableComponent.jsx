import React, { Fragment, useCallback, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Btn, H4 } from '../../../AbstractElements';
import {Card,CardBody} from 'reactstrap'
const DataTableComponent = ({tableData,tableColumns}) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet, setToggleDelet] = useState(false);
    const [data, setData] = useState(tableData);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
            setToggleDelet(!toggleDelet);

            setData(data.filter((item) => selectedRows.filter((elem) => elem.id === item.id).length > 0 ? false : true));
            setSelectedRows('');
        }
    };
    return (
        <Fragment>
         <Card className="shadow-lg my-3">
    <CardBody>
        {(selectedRows.length !== 0) &&
            <div className="d-flex align-items-center justify-content-between bg-light-info p-2">
                <H4 attrH4={{ className: 'text-muted m-0' }}>Delete Selected Data..!</H4>
                <Btn attrBtn={{ color: 'danger', onClick: handleDelete }}>Delete</Btn>
            </div>
        }

        <div className="table-responsive p-3">
            <DataTable
                data={data}
                columns={tableColumns}
                pagination
                selectableRows
                striped
                center
                highlightOnHover
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleDelet}
            />
        </div>
    </CardBody>
</Card>

        </Fragment>
    )
}
export default DataTableComponent