import React, { Fragment,useState,useEffect } from 'react'
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  Label
} from "reactstrap";
import { Btn } from '../../AbstractElements';
import { pricigSupplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useCompany, useSupplier } from '../../Hooks/Dropdowns';
import { DiscountType } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import InputText from '../Forms/FormControl/formInput/InputText';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Layout/Loader';
import usePaginatedTable from '../../Hooks/usePagination';
import { FaEnvelope,FaTrashAlt,FaFileExcel,FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
const MailPricingCommon = ({
  title,
  btnTitle,
  company_list,
  testingEmail,
  apiName,
  listapi,
  supplier,
  discountType,
  supplier_ids,
  tableTitle,
  tax,
table,invoiceType
}) => {
 const [selectedRows, setSelectedRows] = useState([]);
 const[filters,setFilters]=useState({})
  const [selectAll, setSelectAll] = useState(false);
  const { data: companies } = useCompany();
  const { data: supplierData } = useSupplier(supplier_ids);
  const [selectedValues, setSelectedValues] = useState([]);
const[loading,setLoading]=useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
 const userId=localStorage.getItem("userId")

 const onSubmit = (data) => {
  let companyValue = "";
   if (Array.isArray(data.selectedCompanies)) {
  if (data.selectedCompanies.includes("All Company")) {
    companyValue = "All";   // 🔥 If ALL is selected
  } else {
    companyValue = data.selectedCompanies.join(",");  // 🔥 Convert array → string
  }
}
  // console.log(data)
    setLoading(true);
    const basePayload = {
      company_id: company_list==="checkbox"? companyValue : "",
      supplier_id:  data.supplier.value,
      supplier:data.supplier.label,
      testing_email :testingEmail?data.testingEmail:"",
      tax: tax? tax:"No",
      pricing_date:data?.pricingDate? formatDate(data.pricingDate):"",
      invoice_type:discountType?data.DiscountType.value:"",
      added_by:userId
    };

    axios
      .post(apiName, basePayload, {
  params: basePayload})
      .then((res) => {  
        res.data.success?toast.success(res.data.message):toast.error(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });

    console.log("Final Payload Sent =>", basePayload);
  };
  
const handleSelectAll = (checked, data) => {
  setSelectAll(checked);

  if (!checked) {
    setSelectedRows([]);
    return;
  }

  // 1️⃣ Create comma-separated string
  const ids = data.map(row => row["ID #"]);

  setSelectedRows(ids); // store comma string if needed

};


 const handleSelectRow = (id) => {
  // 1️⃣ Toggle checkbox first
  const alreadySelected = selectedRows.includes(id);

  // Update selection immediately
  const newSelection = alreadySelected
    ? selectedRows.filter((rowId) => rowId !== id)
    : [...selectedRows, id];
  // const ids=newSelection.join(",")

  setSelectedRows(newSelection);
console.log(newSelection)
  // 2️⃣ Now show confirmation popup
 
};
  const [openRowId, setOpenRowId] = useState(null);
      const [tableColumns, setTableColumns] = useState([]);
      const columnsMap = {
        "ID #": "id",
        "Company": "company_name",
        "Pricing Date": "pricing_date",
        "Supplier": "supplier",
        "Entry_Count": "entry_count",
        "Added_By": "idby",
        "Added_On": "added_on",
        "Mailed_By": "mailby",
        "Mailed_On": "mail_on",
      };
 const columnWidths = {
  "ID #": "100px",
  "Company": "300px",
  "Pricing Date": "180px",
  "Supplier": "150px",
  "Entry_Count": "150px",
  "Added_By": "120px",
  "Added_On": "160px",
  "Mailed_By": "150px",
  "Mailed_On": "150px",
};
   
    const perPageValue=200
      const {
        data,
        totalRows,
        loading:essoLoading,
        handlePageChange,
        handlePerRowsChange,
        handleSearch, // ✅ Added
        setData,
      } = usePaginatedTable({ apiUrl: listapi, columnsMap,tax,invoiceType,perPageValue });
      useEffect(() => {
        console.log(data,"list")
    const cols = Object.keys(columnsMap).map((key) => {
    const colWidth = columnWidths[key]; 
    const colWidthPx = parseInt(colWidth, 10);
    return {
      name: (
        <div style={{ width: "100%" }}>
          <div className="d-flex align-items-end justify-content-start">
            {key}
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",                   
              maxWidth: colWidthPx - 10 + "px",// small padding
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
          selector: (row) => row[key],
          sortable: true,
          width:colWidth,
          wrap: true,
        }});
             cols.push({
  name: "View Pdf",
  width:"180px",
  cell: (row) => (
    <Link
      to={`/download_pdf/${btoa(row.id)}`}
      className="d-flex align-items-center text-primary"
      style={{ gap: "6px", textDecoration: "none" }}
      title="View PDF"
    >
      <FaDownload />
      <span>View PDF</span>
    </Link>
  ),
});
      cols.push({
        name: (
          <div className="d-flex align-items-center">
            <span className="me-2 fw-bold">Action</span>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked, data)}
            />
          </div>
        ),
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row["ID #"])}
            onChange={() => handleSelectRow(row["ID #"])}
          />
        ),
        width: "120px",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      });
  
        
    
        setTableColumns(cols);
      }, [openRowId,data, selectedRows, selectAll]);
      
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
        const handleClickOutside = (event) => {
          if (!event.target.closest(".dropdown-action")) {
            setOpenRowId(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
      const handleDelete = (id) => {
        console.log(data)
        const stringId=id.join(",")
        console.log(stringId)
      Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this record?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {

    if (result.isConfirmed) {
              axios.delete(`${listapi}/${stringId}`)
        .then(() => {
          setData((prev) => prev.filter((item) => item["ID #"] !== Number(stringId)));
          setSelectedRows([]); // or remove only that ID
          Swal.fire("Deleted!", "Record deleted successfully.", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete record.", "error");
        });
    } 
  });
      };
      const handleMail = (id) => {
        console.log(id)
        console.log(data)
        const stringId=id.join(",")
        console.log(stringId)
        if(invoiceType===null){
        invoiceType = data.fulldata?.tp;
          console.log(invoiceType)
        }
        const payload={
          mail_type:"PRICING",
          supplier:supplier,
          invoiceType:invoiceType,
          ids:stringId

        }
        console.log(payload)
      Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to Send the mail?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
    cancelButtonText: "Cancel",
  }).then((result) => {

   if (result.isConfirmed) {
  axios
    .post(listapi, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      setData((prev) =>
        prev.filter((item) => item["ID #"] !== Number(stringId))
      );
      setSelectedRows([]);
      Swal.fire("Successfully sent the mail", "", "success");
    })
    .catch(() => {
      Swal.fire("Error!", "Failed to send the mail.", "error");
    });
}

  });
      };
  return (
    <Fragment>
            {loading && <Loader loading={true} />}
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>

            <Form className="px-2" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                  <Col  xl="4"  md="6" sm="12">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col xs="4" >
                            <InputGroupText>Pricing Date</InputGroupText>
                          </Col>

                          <Col xs="8" >
                            <Controller
                              name="pricingDate"
                              control={control}
                            
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                   dateFormat="yyyy-MM-dd"
                                  portalId="root"
                                popperPlacement="bottom-start"
                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                      
                      </FormGroup>
                    </Row>
                  </Col>
                  <Col  xl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Supplier</InputGroupText>

                        <Controller
                          name="supplier"
                          control={control}
                       
                          render={({ field }) => {

                            // Auto select supplier when only 1 option
                            if (supplierData?.length === 1 && !field.value) {
                              field.onChange(supplierData[0]);
                            }

                            return (
                              <Select
                                {...field}
                                className="form-control p-0 border-0"
                                options={
                                  supplier_ids ? supplierData : pricigSupplier
                                }
                                placeholder="Select supplier"
                                value={field.value}
                                onChange={field.onChange}
                                 menuPortalTarget={document.body}
                          menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
                              />
                            );
                          }}
                        />
                      </InputGroup>

                  
                    </FormGroup>
                  </Col>
                <Col  className="text-end ms-auto">
                  <Btn
                    attrBtn={{
                      color: "primary",
                    
                      type: "submit",
                    }}
                  >
                    {btnTitle}
                  </Btn>
                </Col>

              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
     
        <DataTableComponent
          title={tableTitle && tableTitle || "Pricing PDF List (Without Tax) "}
          tableColumns={tableColumns}
          tableData={filteredData}
          loading={essoLoading}
          table={true}
          handleDelete={()=>handleDelete(selectedRows)}
          handleMail={()=>handleMail(selectedRows)}
          pagination
          paginationServer
         paginationRowsPerPageOptions={[ 200,300]}
          paginationTotalRows={totalRows}
          buttonTitle="Both"
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />  
    </Fragment>
  );
};

export default MailPricingCommon;
