import React,{Fragment,useState,useEffect} from 'react'
import { Breadcrumbs } from '../../AbstractElements'
import HeaderCard from '../Common/Component/HeaderCard'
import DataTableComponent from '../Tables/DataTable/DataTableComponent'
import NotificationForm from './NotificationForm'
import { notification as APINAME } from '../../api'
import { Container,Row,Col,Card,CardBody } from "reactstrap";
import usePaginatedTable from '../../Hooks/usePagination'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FaEnvelope,FaTrashAlt } from 'react-icons/fa'
const Index = () => {
     const [openRowId, setOpenRowId] = useState(null);
         const [tableColumns, setTableColumns] = useState([]);
         const [selectedRow, setSelectedRow] = useState(null);         
          const[Edit,setEdit]=useState(false)
            const [filters, setFilters] = useState({});
            const stripHtml = (html) => {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

                   const columnsMap = {
        "ID #": "id",
        "Title": "title",
        "Notification": "notification",
        "Added_By": "idby", 
        "Added_On": "dated",
        "Status":"status"
      
                };
                   const {
                      data,
                      totalRows,
                      loading,
                      handlePageChange,
                      handlePerRowsChange,
                      handleSearch, // ✅ Added
                      setData,
                      fetchData
                    } = usePaginatedTable({ apiUrl: APINAME, columnsMap });
       
             
       
           
            const handleFilterChange = (column, value) => {
        setFilters((prev) => ({
          ...prev,
          [column]: value.toLowerCase(),
        }));
      };
       const filteredData = data.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
); 
     useEffect(() => {
      const cols = Object.keys(columnsMap).map((key) => {

    return {
      name: (
        <div style={{ width: "100%",                    
            }}>
          <div className="d-flex align-items-end justify-content-start">
            {key}
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",                   
              height: "28px",
              border:"none",
              borderRadius:"5px",
              boxSizing: "border-box"
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          />
        </div>
      ),
 cell:
        key === "Notification"
          ? (row) => (
              <div
                className="notification-content"
                dangerouslySetInnerHTML={{ __html: row[key] }}
              />
            )
          : (row) => row[key],

      sortable: true,
      wrap: true,
    };
  });
       cols.push({
         name: "Action",
         width:"116px",
         cell: (row) => (
           <div className="position-relative dropdown-action">
             <button
               className="btn btn-sm btn-primary px-2"
               onClick={() => setOpenRowId(openRowId === row["City ID"] ? null : row["City ID"])}
             >
               Action
             </button>
   
             {openRowId === row["City ID"]&& (
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
               
                 <button
                   className="dropdown-item d-flex align-items-center text-primary"
                   style={{ padding: "8px 12px", gap: "8px" }}
      onClick={() => handleEdit(row)}
                 >
                   <FaEnvelope /> Edit
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
    
      const handleEdit = async(row) => {
 try {
    const response = await axios.get(`${APINAME}/${row["ID #"]}`);
    setSelectedRow(response.data);     // ✅ full API object
    setEdit(true);
  } catch (error) {
    console.error("Error fetching full row data", error);
  }
    }; 
     const handleDelete = (row) => {
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
           axios.delete(`${APINAME}/${row["ID #"]}`)
             .then(() => {
               setData((prevData) => prevData.filter((item) => item[["ID #"]] !== row["ID #"]));
               Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
             })
             .catch(() => {
               Swal.fire('Error!', 'Failed to delete record.', 'error');
             });
         }
       });
     };
        const refreshTable = () => {
    fetchData(); // fetch latest data
  };

  return (
    <Fragment>
      <Breadcrumbs parent="Notification" title="Manage Notification" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Notification" />
              <CardBody>
                <NotificationForm btnTitle="Add Notification" onDataAdded={refreshTable} Edit={Edit}
  selectedRow={selectedRow}
  setEdit={setEdit}/>
              </CardBody>
            </Card>
          </Col>
        </Row> 
        <DataTableComponent
          title="Notification List"
       tableColumns={tableColumns}
        tableData={filteredData}  
         progressPending={loading}
          pagination
            loading={loading}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </Fragment>
  )
}

export default Index
