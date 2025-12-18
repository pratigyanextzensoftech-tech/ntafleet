import React, { Fragment, useState,useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Container,
  Card,CardBody,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import DatePicker from "react-datepicker";
import { useCompany } from "../../../Hooks/Dropdowns";
import usePaginatedTable from "../../../Hooks/usePagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { owner_rack_cent } from "../../../api";
import InputText from "../../Forms/FormControl/formInput/InputText";
const RackCentList = ({ title, btnTitle,apiname }) => {
  const {data:company}=useCompany()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  const [openRowId, setOpenRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
      const [tableColumns, setTableColumns] = useState([]);
      const columnsMap = {
        "ID #": "id",
        "Company Name": "company_name",
        "Pricing Date": "pricing_date",
        "	Rack-ON": "rack_ca",
        "Rack-QC,PQ": "rack_qc",
        "	Rack-Other": "rack_us",
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
      } = usePaginatedTable({ apiUrl: apiname, columnsMap });
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
            checked={selectedRows.includes(row["ID #"])}
            onChange={() => handleSelectRow(row["ID #"])}
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
                onClick={() => setOpenRowId(openRowId === row["ID #"] ? null : row["ID #"])}
              >
                Update
              </button>

            </div>
          ),
        });
        
    
        setTableColumns(cols);
      }, [openRowId,data, selectedRows, selectAll]);
      const handleSelectAll = (checked, data) => {
        setSelectAll(checked);
      
        if (!checked) {
          setSelectedRows([]);
          return;
        }
      const handleDelete=()=>{
      
      }
        // 1️⃣ Create comma-separated string
        const ids = data.map(row => row["ID #"]);
        const idString = ids.join(",");   // <-- THIS YOU WANT
        console.log("Final String:", idString);
      
        setSelectedRows(idString); // store comma string if needed
      
        // 2️⃣ SWAL Confirmation
        Swal.fire({
          title: "Are you sure?",
          text: `Do you want to delete all ${ids.length} selected records?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete all!",
          cancelButtonText: "Cancel",
        }).then((result) => {
      
          if (result.isConfirmed) {
      
            // 3️⃣ API CALL — send comma string
            axios
              .post(`${""}/bulk-delete`, { ids: idString })
              .then(() => {
                
                // remove deleted rows
                setData(prev => prev.filter(row => !ids.includes(row["ID #"])));
      
                setSelectedRows("");
                setSelectAll(false);
      
                Swal.fire("Deleted!", "All selected records have been deleted.", "success");
              })
              .catch(() => {
                Swal.fire("Error!", "Failed to delete selected records.", "error");
              });
      
          } else {
            // ❌ Cancel → uncheck all
            setSelectedRows("");
            setSelectAll(false);
          }
        });
      };
      
      
      
      
       const handleSelectRow = (id) => {
        // 1️⃣ Toggle checkbox first
        const alreadySelected = selectedRows.includes(id);
      
        // Update selection immediately
        const newSelection = alreadySelected
          ? selectedRows.filter((rowId) => rowId !== id)
          : [...selectedRows, id];
      
        setSelectedRows(newSelection);
      
        // 2️⃣ Now show confirmation popup
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
            // 3️⃣ Delete the item
            axios
              .delete(`${""}/${id}`)
              .then(() => {
                setData((prev) => prev.filter((item) => item["ID #"] !== id));
                setSelectedRows([]); // or remove only that ID
                Swal.fire("Deleted!", "Record deleted successfully.", "success");
              })
              .catch(() => {
                Swal.fire("Error!", "Failed to delete record.", "error");
              });
      
          } else {
            // 4️⃣ User canceled → revert checkbox state
            setSelectedRows((prev) =>
              alreadySelected
                ? [...prev, id] // user unchecked but canceled → re-check
                : prev.filter((rowId) => rowId !== id) // user checked but canceled → un-check
            );
          }
        });
      };
  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
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
            
                <Row className="mt-3">
                    <Col sm="3">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Company</InputGroupText>
                        <Controller
                          name="company"
                          control={control}
                          rules={{ required: "company is required" }}
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

                      {errors.company && (
                        <span className="text-danger">
                          {errors.company.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="5">
                            <InputGroupText>Pricing from Date</InputGroupText>
                          </Col>
                          <Col sm="7
                          ">
                            <Controller
                              name="pricingDate"
                              control={control}
                              rules={{ required: " Required" }}
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

                        {errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                  </Col>
                  <Col sm="3">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col sm="5">
                            <InputGroupText>Pricing Upto Date</InputGroupText>
                          </Col>
                          <Col sm="7">
                            <Controller
                              name="pricingDate"
                              control={control}
                              rules={{ required: " Required" }}
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

                        {errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                  </Col>
<Col sm="3">
 <InputText
            name="rackon"
            label="Rack On"
            type="text"
            register={register}
            errors={errors}
            // rules={ { required: "Required" }}
            
          />
</Col>
                  <Col sm="3">
                    <div className="text-end">
                      <Btn
                        attrBtn={{
                          color: "primary",
                          className: "m-r-15",
                          type: "submit",
                        }}
                      >
                        {btnTitle}
                      </Btn>
                    </div>
                  </Col>
                </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
  <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>

        <DataTableComponent
          title="Pricing PDF List"
          tableColumns={tableColumns}
          tableData={data}
          loading={essoLoading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
        
              </CardBody>
              </Card></Col>
              </Row ></Container>

    </Fragment>
  );
};

export default RackCentList;
