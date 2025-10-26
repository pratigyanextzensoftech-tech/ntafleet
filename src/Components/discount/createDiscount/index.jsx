import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container,Row,Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import Create from './Create';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import axios from 'axios';
import { FaTrashAlt, FaFilePdf } from 'react-icons/fa';
import { discount_list } from '../../../api';

const Index = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRowId, setOpenRowId] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  // Fetch data
  const fetchDiscounts = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit;
      const params = { draw, start, length: limit };
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

      setDiscounts(formatted);
      setTotalRows(res.data.recordsTotal || res.data.total || data.length);
      setDraw(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts(currentPage, perPage);
  }, [currentPage, perPage]);

  // Dropdown actions
  const handleDownload = (row) => console.log('Download PDF:', row);
  const handleDelete = (row) => {
    if (window.confirm(`Delete discount entry ID ${row.id}?`)) {
      setDiscounts(prev => prev.filter(item => item.id !== row.id));
    }
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
            padding: '5px 0',
          }}
        >
          <button
            className="dropdown-item d-flex align-items-center"
            style={{ padding: '8px 12px', gap: '8px' }}
            onClick={() => handleDownload(row)}
          >
            <FaFilePdf /> Download PDF
          </button>

          <button
            className="dropdown-item d-flex align-items-center text-danger"
            style={{ padding: '8px 12px', gap: '8px' }}
            onClick={() => handleDelete(row)}
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      )}
    </div>
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-action')) setOpenRowId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Table columns
  const tableColumns = [
    { name: "ID#", selector: (row) => row.id, sortable: true, width: "100px" },
    { name: "Company", selector: (row) => row.company_name, sortable: true, wrap: true, width: "150px" },
    { name: "Start_Date", selector: (row) => row.start_date, sortable: true, wrap: true, width: "150px" },
    { name: "End_Date", selector: (row) => row.end_date, sortable: true, wrap: true, width: "150px" },
    { name: "Country", selector: (row) => row.country, sortable: true, wrap: true, width: "150px" },
    { name: "Supplier", selector: (row) => row.supplier, sortable: true, wrap: true, width: "150px" },

    { name: "Discount Cent (CA)", selector: (row) => row.cent_ca, sortable: true, wrap: true, width: "200px" },
    { name: "Discount Cent (US)", selector: (row) => row.cent_us, sortable: true, wrap: true, width: "200px" },

    { name: "Total (CA)", selector: (row) => row.total_ca, sortable: true, wrap: true, width: "150px" },
    { name: "Total (US)", selector: (row) => row.total_us, sortable: true, wrap: true, width: "150px" },

    { name: "Retail Total (CA)", selector: (row) => row.retail_ca, sortable: true, wrap: true, width: "200px" },
    { name: "Retail Total (US)", selector: (row) => row.retail_us, sortable: true, wrap: true, width: "200px" },

    { name: "Qty (CA)", selector: (row) => row.qty_ca, sortable: true, wrap: true, width: "150px" },
    { name: "Qty (US)", selector: (row) => row.qty_us, sortable: true, wrap: true, width: "150px" },

    { name: "Discount (CA)", selector: (row) => row.disc_ca, sortable: true, wrap: true, width: "150px" },
    { name: "Discount (US)", selector: (row) => row.disc_us, sortable: true, wrap: true, width: "150px" },

    { name: "Action", cell: (row) => <ActionDropdown row={row} />, ignoreRowClick: true, allowOverflow: true, button: true, width: "100px" },
  ];

  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="Create Single Discount" /> 
         <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Single Discount" />
              <CardBody>
                 <Create btnTitle="Create" onCreateSuccess={() => fetchDiscounts(currentPage, perPage)} />
              </CardBody>
            </Card>
          </Col>
        </Row>
 

        <DataTableComponent
          title="Discount List"
          tableColumns={tableColumns}
          tableData={discounts}
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
