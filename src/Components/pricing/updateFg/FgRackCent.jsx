import React, { Fragment, useState,useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import { useCompany } from "../../../Hooks/Dropdowns";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import usePaginatedTable from "../../../Hooks/usePagination";
import InputText from "../../Forms/FormControl/formInput/InputText";
import axios from "axios";
import Swal from "sweetalert2";
const FgRackCent = ({ title, btnTitle,apiName }) => {
  const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [tableColumns, setTableColumns] = useState([]);
    const[loading,setLoading]=useState(false)
    
  const {data:company}=useCompany()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
     const columnsMap = {
        "Sr.": "id",
        "Company Name": "company_name",
        "Pricing Date": "pricing_date",
        "Rack-Canada": "rack_ca",
        "Rack-USA": "rack_us",
        "Added_By": "idby",
        "Added_On": "dated",
      };
     const {
          data,
          totalRows,
          loading:essoLoading,
          handlePageChange,
          handlePerRowsChange,
          handleSearch, // ✅ Added
          setData,
        } = usePaginatedTable({ apiUrl: apiName, columnsMap });
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
              axios.delete(`${apiName}/${stringId}`)
        .then(() => {
          setData((prev) => prev.filter((item) => item["Sr."] !== Number(stringId)));
          setSelectedRows([]); // or remove only that ID
          Swal.fire("Deleted!", "Record deleted successfully.", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete record.", "error");
        });
    } 
  });
      };
 useEffect(() => {
        console.log(data,"list")
        const cols = Object.keys(columnsMap).map((key) => ({
          name: key,
          selector: (row) => row[key],
          sortable: true,
          wrap: true,
        }));
      cols.push({
        name: (
          <div className="d-flex align-items-center">
            <span className="me-2 fw-bold">Delete</span>
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
            checked={selectedRows.includes(row["Sr."])}
            onChange={() => handleSelectRow(row["Sr."])}
          />
        ),
        width: "120px",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      });
        cols.push({
          name: "Action",
          cell: (row) => (
            <div className="position-relative dropdown-action">
              <button
                className="btn btn-sm btn-primary px-2" 
              >
                Update
              </button>
    
         
    
            </div>
          ),
        });
        
    
        setTableColumns(cols);
      }, [data, selectedRows, selectAll]);
      const handleSelectAll = (checked, data) => {
  setSelectAll(checked);

  if (!checked) {
    setSelectedRows([]);
    return;
  }

  // 1️⃣ Create comma-separated string
  const ids = data.map(row => row["Sr."]);

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
 const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    console.log("Form Data:", data);
     setLoading(true);
        const basePayload = {
          company_id: data.company.value,
          rack_us: data.rackca,
          rack_ca: data.rackca,
          pricing_date:data?.pricingDate? formatDate(data.pricingDate):"",
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
    
        console.log("Final Payload Sent =>", basePayload); // ✅ This will print your inputs
  };
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "5px 5px",
                  bprderRadius: "3px",
                  marginBottom: "10px",
                }}
              >
                <Row className="mt-3">
                  <Col  xl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Company</InputGroupText>
                        <Controller
                          name="company"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={company}
                              className="form-control p-0 border-0"
                              placeholder="Select a country"
                            />
                          )}
                        />
                      </InputGroup>

                      
                    </FormGroup>
                  </Col>
                  <Col  xl="4"  md="6" sm="12">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col xs="4" md="5" xl="4" >
                            <InputGroupText>Pricing Date</InputGroupText>
                          </Col>
                          <Col xs="8" md="7" xl="8">
                            <Controller
                              name="pricingDate"
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  className={`form-control `}
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                       
                      </FormGroup>
                    </Row>
                  </Col>
                  <Col  xl="4"  md="6" sm="12">
                 <InputText
                           name="rackus"
                           label="Rack US"
                           type="text"
                           register={register}
                           errors={errors}
                          
                           
                         />
                  </Col>
               
                  <Col  xl="4"  md="6" sm="12">
                   <InputText
            name="rackca"
            label="Rack CA"
            type="text"
            register={register}
            
          />
                  </Col>
                  <Col className="ms-auto" xl="8"  md="12" sm="12">
                    <div  className="text-end">
                      <Btn
                        attrBtn={{
                          color: "primary",
                          type: "submit",
                        }}
                      >
                        {btnTitle}
                      </Btn>
                    </div>
                  </Col>
                </Row>
              </div>
            </Form>
          </fieldset>
        </Col>
      </Row>
 <DataTableComponent
          title="Multiple FG Rack Cent Entry "
          tableColumns={tableColumns}
          tableData={data}
          loading={essoLoading}
          table={true}
          pagination
          buttonTitle="Delete Rack Cent"
           handleDelete={()=>handleDelete(selectedRows)}
           download={true}
           downloadHeading="Download"
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      
    
    </Fragment>
  );
};

export default FgRackCent;
