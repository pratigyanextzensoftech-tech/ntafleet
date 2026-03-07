import React, { Fragment,useState,useEffect } from 'react'
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Card,CardBody
} from "reactstrap";
import { Btn } from '../../AbstractElements';
import { pricigSupplier } from '../Forms/FormWidget/FormSelect2/OptionDatas';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useCompany, useSupplier } from '../../Hooks/Dropdowns';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Layout/Loader';
import Swal from "sweetalert2";
import HeaderCard from '../Common/Component/HeaderCard';
import $ from "jquery";
import "datatables.net";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
const MailPricingCommonIndex = ({
  title,
  btnTitle,
  company_list,
  testingEmail,
  listapi,
  supplier,
  discountType,
  supplier_ids,
  tableTitle,
  tax,
  taxOption,
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
      // company_id: company_list==="checkbox"? companyValue : "",
      supplier_id:  data.supplier.value,
      supplier:data.supplier.label,
      // testing_email :testingEmail?data.testingEmail:"",
      // tax: tax? tax:"No",
      pricing_date:data?.pricingDate? formatDate(data.pricingDate):"",
      // invoice_type:discountType?data.DiscountType.value:"",
      // added_by:userId
    };

    axios.post(listapi, basePayload, {
  params: basePayload})
      .then((res) => {  
        res.data.success?toast.success(res.data.message):toast.error(res.data.message);
        console.log(res.data.success)
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
 


   
useEffect(() => {

  const timer = setTimeout(() => {

    if ($.fn.DataTable.isDataTable("#pricingTable")) {
      $("#pricingTable").DataTable().destroy();
    }

  // 🔹 Base columns
  let columns = [
    { data: "id" },
    { data: "company_name" },
    { data: "pricing_date" },
    { data: "supplier" },
    { data: "entry_count" },
  ];

   if (taxOption===true) {
  columns.push({
    data: "without_tax",
    title: "Tax Option"
  });
}
  

  // 🔹 Remaining columns
  columns.push(
    { data: "added_by_name" },
    { data: "added_on" },
    { data: "mailed_by" },
    { data: "mail_on" },
    {
      data: "download_link",
      render: function (data) {
        return `
          <a href="${data}" target="_blank">
            View PDF
          </a>
        `;
      }
    },
     {
  data: null,
  title: `
    Action 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.id}">
    `;
  }
},
  );

  const table = $("#pricingTable").DataTable({
    serverSide: true,
      processing: true,
      paging: true,
      searching: true,
      destroy:true,
      ordering: true,
       scrollX: true,
      scrollCollapse: true,
      fixedColumns: { leftColumns: 1},
    pageLength: 200,
    
    ajax: {
      url: listapi,
      type: "GET",
      data: function (d) {
        d.tax = tax;
        d.invoiceType = invoiceType;
      }
    },

    columns: columns
  });
    $(document).off("change", ".row-checkbox").on("change", ".row-checkbox", function () {

  const id = $(this).val();

  if ($(this).is(":checked")) {
    setSelectedRows(prev => [...new Set([...prev, id])]);
  } else {
    setSelectedRows(prev => prev.filter(item => item !== id));
  }

});
$(document).off("change", "#select-all").on("change", "#select-all", function () {

  const checked = $(this).prop("checked");

  let ids = [];

  $(".row-checkbox").each(function () {
    $(this).prop("checked", checked);

    if (checked) {
      ids.push($(this).val());
    }
  });

  setSelectedRows(checked ? ids : []);

});

   }, 200);
   

   return () => clearTimeout(timer);

}, [listapi, tax, invoiceType]);

     const handleDelete = (ids) => {

  if(ids.length === 0){
    Swal.fire("Please select at least one record");
    return;
  }

  const stringId = ids.join(",");
console.log(stringId)
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this record?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`${listapi}/${stringId}`)
      .then(() => {

        Swal.fire("Deleted!", "Record deleted successfully.", "success");

        setSelectedRows([]);

        $("#pricingTable").DataTable().ajax.reload();

      });

    }

  });

};

const handleMail = (ids) => {

  if (ids.length === 0) {
    Swal.fire("Please select at least one record");
    return;
  }

  const stringId = ids.join(",");

  const payload = {
    mail_type: "PRICING",
    supplier: supplier,
    invoiceType: invoiceType,
    ids: stringId
  };
console.log(payload);

  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to send the mail?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes!",
  }).then((result) => {

    if (result.isConfirmed) {

      axios.post(listapi, payload)
      .then(() => {

        Swal.fire("Successfully sent the mail", "", "success");

        setSelectedRows([]);

        $("#pricingTable").DataTable().ajax.reload();

      });

    }

  });

};
  return (
    <Fragment>
            {loading && <Loader loading={true} />}
             <Card>
              <CardBody> 
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
     </CardBody> 
     </Card>

       <Card>
              <CardBody> 
                              <HeaderCard title={title} />
   <Row className='my-3'>
                          <Col sm="6" className="mb-3 text-start">
                            <button
                              onClick={() => handleDelete(selectedRows)}
                              className="btn btn-secondary px-3 "
                            >
                              {" "}
                              Delete Pricing
                            </button>
                          </Col>
                          <Col sm="6" className="mb-3 text-end">
                            <button
                              onClick={() => handleMail(selectedRows)}
                              className="btn btn-secondary px-3 "
                            >
                              {" "}
                              Send Mail
                            </button>
                          </Col>
                        </Row>
       <table id="pricingTable" className="display nowrap" style={{width:"100%"}}>
  <thead>
  <tr>
    <th>ID</th>
    <th>Company</th>
    <th>Pricing Date</th>
    <th>Supplier</th>
    <th>Entry Count</th>
{taxOption===true && <th>Tax Option</th>}
    <th>Added By</th>
    <th>Added On</th>
    <th>Mailed By</th>
    <th>Mailed On</th>
    <th>View PDF</th>
    <th>Select</th>
  </tr>
</thead>
</table>
</CardBody>
</Card>
    </Fragment>
  );
};

export default MailPricingCommonIndex;
