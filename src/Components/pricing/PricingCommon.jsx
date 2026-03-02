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
import HeaderCard from '../Common/Component/HeaderCard';
import {Card,CardBody} from 'reactstrap'
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
import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net";
import { downloadPdf } from "../../Hooks/Dropdowns";
import { Link } from 'react-router-dom';

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
  search,
  tax,
  table,
  taxOption,
  validation, rackus,
  tableTitle,
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
      added_by:userId||"",
    };

axios
  .post(apiName, basePayload, {
    params: basePayload,
  })
  .then((res) => {
    res.data.success
      ? toast.success(res.data.message)
      : toast.error(res.data.message);

    setLoading(false);
  })
  .catch((err) => {
    toast.error(err.message || "Something went wrong");
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

  const [openRowId, setOpenRowId] = useState(null);
      const [tableColumns, setTableColumns] = useState([]);
    const columnsMap = taxOption === false
  ? {
      "ID #": "id",
      "Company": "company_name",
      "Pricing Date": "pricing_date",
      "Supplier": "supplier",
      "Entry_Count": "entry_count",
      "Added_By": "added_by_name",
      "Added_On": "added_on",
      "Mailed_By": "mailed_by",
      "Mailed_On": "mail_on",
    }
  : {
      "ID #": "id",
      "Company": "company_name",
      "Pricing Date": "pricing_date",
      "Supplier": "supplier",
      "Entry_Count": "entry_count",
      "Tax Option": "without_tax",
      "Added_By": "added_by_name",
      "Added_On": "added_on",
      "Mailed_By": "mailed_by",
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

const handleBulkDelete = () => {

  const table = $("#pricingTable").DataTable();
  let ids = [];

  $(".row-checkbox:checked").each(function () {
    ids.push($(this).val());
  });

  if (ids.length === 0) {
    Swal.fire("Warning!", "Please select at least one record.", "warning");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${ids.length} record(s)?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {

    if (result.isConfirmed) {

      Promise.all(
        ids.map(id => axios.delete(`${listapi}/${id}`))
      )
      .then(() => {

        // Remove rows from DataTable
        $(".row-checkbox:checked").each(function () {
          table.row($(this).closest("tr")).remove().draw();
        });

        Swal.fire("Deleted!", "Record(s) deleted.", "success");

      })
      .catch(() => {
        Swal.fire("Error!", "Delete failed.", "error");
      });

    }
  });
};

 useEffect(() => {

  const tableId = `#pricingTable`;

  setTimeout(() => {

    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().clear().destroy();
    }

    const table = $(tableId).DataTable({
      data: data,
    processing: true,
     serverSide: false,
      columns: [
        ...Object.keys(columnsMap).map((key) => ({
          data: key,
          title: key
        })),

        // ✅ Checkbox Column
      {
  data: "id",
  title: `Delete <input type="checkbox" id="select-all">`,
  orderable: false,
  render: function (data) {
    return `<input type="checkbox" class="row-checkbox" value="${data}">`;
  }
},

        // ✅ Action Column
        {
          data: null,
          title: "Action",
          orderable: false,
          render: function (row) {
            return `
              <div class="dropdown">
                <button class="btn btn-sm btn-success dropdown-toggle"
                        data-bs-toggle="dropdown">
                  <i class="fa fa-cog me-1"></i> Action
                </button>

                <ul class="dropdown-menu">

                  <li>

                       <button class="dropdown-item download-btn"
          data-link="${row.fulldata.download_link}">
    <i class="fa fa-download me-2 text-danger"></i>
    Download Pdf
  </button>
                  </li>

                  <li>
                    <a class="dropdown-item"
                       target="_blank"
                       href="/card-admin/download_excel/${btoa(row.fulldata.id)}">
                       <i class="fa fa-user-shield text-primary me-2"></i>
                       View Admin Pdf
                    </a>
                  </li>

                  <li>
                    <button class="dropdown-item email-btn"
                            data-id="${row.fulldata.id}">
                       <i class="fa fa-envelope text-success me-2"></i>
                       Email Pricing Pdf
                    </button>
                  </li>

                  <li>
                    <button class="dropdown-item testing-email-btn"
                            data-id="${row.fulldata.id}">
                       <i class="fa fa-envelope text-info me-2"></i>
                       Testing Email Pricing Pdf
                    </button>
                  </li>

                </ul>
              </div>
            `;
          }
        }

      ],
      pageLength: perPageValue || 10,
      destroy: true
    });
$(document).off("change", "#select-all");
$(document).on("change", "#select-all", function () {
  $(".row-checkbox").prop("checked", $(this).prop("checked"));
});
$(document).on("click", "#delete-selected", function () {

  let table = $("#pricingTable").DataTable();
  let ids = [];

  $(".row-checkbox:checked").each(function () {
    ids.push($(this).val());
  });

  if (ids.length === 0) {
    Swal.fire("Warning!", "Please select at least one record.", "warning");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${ids.length} record(s)?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {

    if (result.isConfirmed) {

      // Loop delete API
      Promise.all(
        ids.map(id => axios.delete(`${listapi}/${id}`))
      ).then(() => {

        // Remove rows from table directly
        $(".row-checkbox:checked").each(function () {
          table.row($(this).closest("tr")).remove().draw();
        });

        Swal.fire("Deleted!", "Record(s) deleted.", "success");

      }).catch(() => {
        Swal.fire("Error!", "Delete failed.", "error");
      });

    }
  });

});
$(document).off("click", ".download-btn");

$(document).on("click", ".download-btn", function () {

  const link = $(this).data("link");
  // Create minimal row object (if needed)
  // 🔥 Call your existing function
  downloadPdf(link);

});

  }, 0);

}, [data]);

useEffect(() => {

  $(document).off("click", ".email-btn");

  $(document).on("click", ".email-btn", function () {
    const id = $(this).data("id");
    console.log("Email clicked:", id);
  });

  return () => {
    $(document).off("click", ".email-btn");
  };

}, []);

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest(".dropdown-action")) {
            setOpenRowId(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
  
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
                                    portalId="root"
                                    popperPlacement="bottom-start"
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
                                  menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                onChange={field.onChange}
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
                               menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
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
                               menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                onChange={field.onChange}
                                 styles={{
                menuPortal: base => ({
                  ...base,
                  zIndex: 99999
                })
              }}
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
                                    portalId="root"
                                    popperPlacement="bottom-start"
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
                                    portalId="root"
                                    popperPlacement="bottom-start"
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
 <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title={tableTitle}
//                   renderDropdown={() => (
//     <>
//        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle
//         tag="span"
//         className="px-2 text-white"
//         style={{ cursor: "pointer" }}
//       >
//         <i className="fa fa-download me-1"></i> Download
//       </DropdownToggle>

//       <DropdownMenu   style={{ minWidth: 160 }}>
//         <DropdownItem className="text-primary"   onClick={() => handleDownload("Excel")}>
//           <FaFileExcel/> Download Excel
//         </DropdownItem>

//         <DropdownItem className="text-danger"   onClick={() => handleDownload("CSV")}>
//           <FaFileCsv/> Download CSV
//         </DropdownItem>

//       </DropdownMenu>
//     </Dropdown>

//     </>
//   )}
//                   download={true}
                />
             
              <CardBody>
                  <div className='text-end mb-3'>
                 <Btn
  attrBtn={{
    color: "danger",
    onClick: handleBulkDelete
  }}
>
  Delete Pricing
</Btn>
                </div>
      {table !== false && (
  <div className="table-responsive mt-4">
    <table
      id={`pricingTable`}
      className="table table-bordered table-striped"
      style={{ width: "100%" }}
    >
      <thead>
        <tr>
          {Object.keys(columnsMap).map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Delete</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
)}
        
       </CardBody>
                                </Card>
                               </Col>
                               </Row>   
    </Fragment>
  );
};

export default PricingCommon;
