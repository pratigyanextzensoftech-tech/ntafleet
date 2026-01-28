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
import { FaEnvelope,FaTrashAlt,FaFileExcel,FaFilePdf,FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
const PricingCommon = ({
  title,
  btnTitle,
  csvFile,
  fromUpto,
  pricingDate,
  company,
  company_list,
  testingEmail,
  apiName,
  listapi,
  supplier,
  discountType,
  supplier_ids,
  tax,
  validation, rackus,
  rackca,invoiceType
}) => {
 const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { data: companies } = useCompany();
  const[showTable,setShowTable]=useState(false)
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
  setShowTable(true)
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
      supplier_id:  data?.supplier?.value||"",
      supplier:data?.supplier?.label || "",
      testing_email :testingEmail?data.testingEmail:"",
      tax: tax? tax:"No"||"",
      pricing_date:data?.pricingDate? formatDate(data.pricingDate):"",
      invoice_type:discountType?data.DiscountType.value:"",
      added_by:userId||""
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
    const handleCheckboxChange = (value, field) => {
    
    const allValues = companies.map((c) => c.value); // all possible
    const companyValues = allValues.filter((v) => v !== "All Company"); // only companies
    let updated = [...selectedValues];

    if (value === "All Company") {
      // ✅ Clicked ALL → toggle everything
      if (updated.includes("All Company")) {
        updated = []; // unselect all
      } else {
        updated = ["All Company", ...companyValues]; // select all
      }
    } else {
      // ✅ Clicked a normal company
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated.push(value);
      }

      // If all companies are selected, add ALL
      const onlyCompanies = updated.filter((v) => v !== "All Company");
      const isAllSelected = companyValues.every((v) =>
        onlyCompanies.includes(v)
      );

      if (isAllSelected) {
        updated = ["All Company", ...companyValues];
      } else {
        updated = updated.filter((v) => v !== "All Company");
      }
    }

    
    setSelectedValues(updated);
    field.onChange(updated);
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
                Action
              </button>
    
              {openRowId === row["ID #"] && (
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
                  <Link
                    to={`/download_pdf/${btoa(row.id)}`}
                    className="dropdown-item d-flex align-items-center text-danger"
                    style={{ padding: "8px 12px", gap: "8px" }}
                  >
                    <FaFilePdf /> View Pdf
                  </Link>
    
                  <Link
                    to={`/download_excel/${btoa(row.id)}`}
                    className="dropdown-item d-flex align-items-center text-success"
                    style={{ padding: "8px 12px", gap: "8px" }}
                  >
                    <FaFileExcel /> View Admin Pdf
                  </Link>
    
                  <button
                    className="dropdown-item d-flex align-items-center text-primary"
                    style={{ padding: "8px 12px", gap: "8px" }}
    
                  >
                    <FaEnvelope />Email Pricing Pdf
                  </button>
    
                  <button
                    className="dropdown-item d-flex align-items-center text-danger"
                    style={{ padding: "8px 12px", gap: "8px" }}
                  >
                    <FaTrashAlt /> Testing Email Pricing Pdf
                  </button>
                </div>
              )}
    
            </div>
          ),
        });
        
    
        setTableColumns(cols);
      }, [openRowId,data, selectedRows, selectAll]);
    
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
  return (
    <Fragment>
            {loading && <Loader loading={true} />}
      
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>

            <Form className="px-2" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">

                {/* PRICING DATE */}
                {pricingDate === true && (
                  <Col  xl="4"  md="6" sm="12">
                    <Row>
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col xs="4" md="5" lg="4">
                            <InputGroupText>Pricing Date</InputGroupText>
                          </Col>

                          <Col xs="8" md="7" lg="8">
                            <Controller
                              name="pricingDate"
                              control={control}
                              rules={
                                validation
                                  ? { required: "Required" }
                                  : {}
                              }
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                   dateFormat="yyyy-MM-dd"
                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                        {validation && errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                  </Col>
                )}
{rackus==true &&(
      <Col  xl="4"  md="6" sm="12">
      <InputText
            name="rackus"
            label="Rack US"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
          </Col>
)}
{rackca==true &&(
      <Col  xl="4"  md="6" sm="12">
      <InputText
            name="rackca"
            label="Rack CA"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
          </Col>
)}
                {/* SUPPLIER */}
                {supplier === true && (
                  <Col  xl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Supplier</InputGroupText>

                        <Controller
                          name="supplier"
                          control={control}
                          rules={
                            validation
                              ? { required: "Supplier is required" }
                              : {}
                          }
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
                              />
                            );
                          }}
                        />
                      </InputGroup>

                      {validation && errors.supplier && (
                        <span className="text-danger">
                          {errors.supplier.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {/* DISCOUNT TYPE */}
                {discountType === true && (
                  <Col  xl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Discount Type</InputGroupText>

                        <Controller
                          name="DiscountType"
                          control={control}
                          rules={
                            validation
                              ? { required: "Required" }
                              : {}
                          }
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="form-control p-0 border-0"
                              options={DiscountType}
                              placeholder="Select Discount "
                              onChange={field.onChange}
                              value={field.value}
                            />
                          )}
                        />
                      </InputGroup>

                      {validation && errors.DiscountType && (
                        <span className="text-danger">
                          {errors.DiscountType.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {testingEmail === true && (
                  <Col  xl="4"  md="6" sm="12">
                  
                    <InputText
            name="testingEmail"
            label="Testing Email"
            type="text"
            register={register}
            errors={errors}
            rules={ validation
                              ?{ required: "Required" }:{}}
            
          />
                            </Col>

                )}

                {/* CSV FILE */}
                {csvFile === true && (
                  <Col  xl="4"  md="6" sm="12">
                    <Row className='mb-3'>
                      <Col xs="3" className="pe-0">
                        <InputGroupText>CSV File</InputGroupText>
                      </Col>

                      <Col xs="9" className="px-0">
                        <Input
                          style={{ border: "1px solid #ccc" }}
                          className="form-control"
                          type="file"
                          {...register("csvFile")}
                        />
                      </Col>
                    </Row>
                  </Col>
                )}

                {/* COMPANY */}
                {company === true && (
                  <Col  xl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Company</InputGroupText>

                        <Controller
                          name="company"
                          control={control}
                          rules={
                            validation
                              ? { required: "Company is required" }
                              : {}
                          }
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={companies}
                              className="form-control p-0 border-0"
                              placeholder="Select company"
                            />
                          )}
                        />
                      </InputGroup>

                      {validation && errors.company && (
                        <span className="text-danger">
                          {errors.company.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                )}

                {/* PRICING FROM / UPTO */}
                {fromUpto === true && (
                  <>
                    {/* FROM DATE */}
                    <Col  xl="4"  md="6" sm="12">
                      <Row>
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <Col  xs="4">
                              <InputGroupText>Pricing From</InputGroupText>
                            </Col>

                            <Col sm="8">
                              <Controller
                                name="pricingFrom"
                                control={control}
                                rules={
                                  validation
                                    ? { required: "Required" }
                                    : {}
                                }
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>

                          {validation && errors.pricingFrom && (
                            <span className="text-danger">
                              {errors.pricingFrom.message}
                            </span>
                          )}
                        </FormGroup>
                      </Row>
                    </Col>

                    <Col  xl="4"  md="6" sm="12">
                      <Row>
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <Col  xs="4">
                              <InputGroupText>Pricing Upto</InputGroupText>
                            </Col>

                            <Col xs="8">
                              <Controller
                                name="pricingUpto"
                                control={control}
                                rules={
                                  validation
                                    ? { required: "Required" }
                                    : {}
                                }
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>

                          {validation && errors.pricingUpto && (
                            <span className="text-danger">
                              {errors.pricingUpto.message}
                            </span>
                          )}
                        </FormGroup>
                      </Row>
                    </Col>
                     
                  </>
                )}
 {company_list === "checkbox" && (
                  <Col sm="12">
                    <fieldset>
                      <legend>Choose Company </legend>
                      {
                        <Controller
                          name="selectedCompanies"
                          control={control}
                          rules={{ required: "Select at least one company" }}
                          render={({ field }) => (
                            <Row>
                              <Col  xl="4"  lg="6" sm="12">
                                <div className="checkbox checkbox-dark">
                                  <input
                                    type="checkbox"
                                    id="checkbox-0"
                                    value="All Company"
                                    
                                    checked={selectedValues.includes(
                                      "All Company"
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange("All Company", field)
                                    }
                                  />
                                  <Label for={`checkbox-0`} className="ms-2 ">
                                    All Company
                                  </Label>
                                </div>
                              </Col>

                              {companies.map((item, index) => (
                                <Col  xl="4"  lg="6" sm="12" key={index}>
                                  <div className="checkbox checkbox-dark">
                                    <input
                                      type="checkbox"
                                      id={`checkbox-${index}`}
                                      value={item.value}
                                      checked={selectedValues.includes(
                                        item.value
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(item.value, field)
                                      }
                                    />
                                    <Label
                                      for={`checkbox-${index}`}
                                      className="ms-2 "
                                    >
                                      {item.label}
                                    </Label>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          )}
                        />
                      }
                    </fieldset>
                  </Col>
                )}
                {/* SUBMIT BUTTON */}
                <Col className="text-end">
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
      {/* {table!==false &&( */}
        <>
        <DataTableComponent
          title="Pricing PDF List (Without Tax) "
          tableColumns={tableColumns}
          tableData={data}
          loading={essoLoading}
          table={showTable}
          handleDelete={()=>handleDelete(selectedRows)}
          pagination
          paginationServer
          buttonTitle="Delete Pricing"
         paginationRowsPerPageOptions={[ 200,300]}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
        </>
      {/* )
    } */}
        
    </Fragment>
  );
};

export default PricingCommon;
