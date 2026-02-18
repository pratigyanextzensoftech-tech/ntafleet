import React, { Fragment, useState } from "react";
import Select from "react-select";
import {
  groupBy,
  displayFeatureCheckBox,
  orderBy,
  fuelType,
  Reportcurrency,
  exportType,
  VolUnit,
  displayFeatureCheckBoxOwner
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  useCompany,
  useCountry,
  useStatesReport,
  useSupplier,
} from "../../../Hooks/Dropdowns";
import axios from "axios";
import InputText from "../../Forms/FormControl/formInput/InputText";
import { toast } from "react-toastify";
import Loader from "../../../Layout/Loader";
const CreateReport = ({
  title,
  type,
  supplier_ids,
  discount,
  company_type,
  api_name
}) => {

   const[page_break,setpage_break]=useState('0');
   const[show_taxes,setshow_taxes]=useState('0');
   const[exclude_tax,setexclude_tax]=useState('0');
   const[show_discount_details,setshow_discount_details]=useState('0');
   const[no_time,setno_time]=useState(0);   
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const { data: company } = useCompany();
  const { data: country } = useCountry();
  const { data: states } = useStatesReport();
  const { data: supplier } = useSupplier(supplier_ids);

  const {
    register,
    control,
    reset,
    handleSubmit,
    isValid,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      company: null, // required field
      country: null, // required field
      state: null, // required field
      volUnit: VolUnit.find((x) => x.value === "Gallon"),
      currency: Reportcurrency.find((x) => x.label === "USD"),
      fuelType: fuelType[0],
      orderBy: orderBy[0],
      groupBy: groupBy[0],
      supplier: [], // required array
      features: [], // optional array
      startDate: null, // required
      endDate: null, // required
      exportType: null, // required
      file: "", // required
      card: "", // required
      driverName: "", // required
      unitNo: "", // required
      city: "", // required
    },
  });
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const onSubmit = (data) => {
    const payload = {
    company_id: data?.company?.value ? data.company.value : "",
    company_name: data?.company?.label ? data.company.label : "",
    file_name: data?.file ? data.file : "",

    start_date: data?.startDate ? formatDate(data.startDate)+ " 00:00:00" : formatDate(new Date())+" 00:00:00",
    end_date: data?.endDate ? formatDate(data.endDate)+ " 23:59:59" : formatDate(new Date())+" 23:59:59",

    export_type: data?.exportType?.value ? data.exportType.value : "",
    supplier_ids: data?.supplier?.length ? data.supplier.join(",") : "",

    page_break: page_break,
    show_taxes: show_taxes,
    exclude_tax: exclude_tax,
    show_discount_details: show_discount_details,
    no_time: no_time,

    filter_by_country: data?.country?.label ? data.country.label : "",
    group_by: data?.groupBy?.value ? data.groupBy.value : "",
    order_by: data?.orderBy?.value ? data.orderBy.value : "",

    volume_unit: data?.volUnit?.value ? data.volUnit.value : "",
    fuel_type: data?.fuelType?.value ? data.fuelType.value : "",
    currency: data?.currency?.value ? data.currency.value : "",

    fuel_card: data?.card ? data.card : "",
    driver_name: data?.driverName ? data.driverName : "",
    unit_number: data?.unitNo ? data.unitNo : "",
    city: data?.city ? data.city : "",
    state: data?.state?.value ? data.state.value : "",

    amount: data?.amount ? Number(data.amount) : 0,
    retail_amount: data?.retail_amount ? Number(data.retail_amount) : 0,
    saving: data?.saving ? Number(data.saving) : 0,
    fees: data?.fees ? Number(data.fees) : 0,
    trans_count: 0,
    discount_usa: 0,
    discount_canada: 0,
    };
   console.log("Form Data:", payload); // ✅ This will print your inputs
    if (isValid) {
      setShowMessage(false);
    }
    axios.post(api_name, payload, { headers: { "Content-Type": "application/json" },      })
      .then((res) => {    toast.success(res.data.message);
       // reset();
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      {loading && <Loader loading={true} />}
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <legend>Cover transactions in date range</legend>
                <Row className="my-3">
                  <Col  xxl="9"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Company</InputGroupText>
                        <Controller
                          name="company"
                          rules={{
                            required: true,
                            message: "company Name is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={company}
                              className="form-control p-0 border-0"
                              placeholder="Select Company Name"
                            />
                          )}
                        />
                      </InputGroup>

                      {errors.company && (
                        <span className="text-danger">
                          {errors.company?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col> 
                  <Col  xxl="3"  md="6" sm="12">
                    <InputText
                      name="file"
                      label="Report File Name "
                      type="text"
                      register={register}
                      errors={errors}
                      rules={{ required: "Required" }}
                    />
                  </Col>
               
               
                  <Col xxl="4"  md="6" sm="12">
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col xs="3">
                            <InputGroupText>start Date</InputGroupText>
                          </Col>
                          <Col xs="9">
                            <Controller
                              name="startDate"
                              control={control}
                              rules={{ required: "start Date s Required" }}
                              render={({ field }) => (
                                <DatePicker
                                  className={`form-control `}
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                  dateFormat="yyyy-MM-dd"

                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                        {errors.startDate && (
                          <span className="text-danger">
                            {errors.startDate.message}
                          </span>
                        )}
                      </FormGroup>
                   
                  </Col>
                  <Col xxl="4"  md="6" sm="12">
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <Col xs="3">
                            <InputGroupText>End Date</InputGroupText>
                          </Col>
                          <Col xs="9">
                            <Controller
                              name="endDate"
                              control={control}
                              rules={{ required: "End Date is Required" }}
                              render={({ field }) => (
                                <DatePicker
                                  className={`form-control digits`}
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                  dateFormat="yyyy-MM-dd"

                                />
                              )}
                            />
                          </Col>
                        </InputGroup>

                        {errors.endDate && (
                          <span className="text-danger">
                            {errors.endDate.message}
                          </span>
                        )}
                      </FormGroup>
                   
                  </Col>
                  <Col xxl="4"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Export Type</InputGroupText>
                        <Controller
                          name="exportType"
                          rules={{ required: "Export type is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={exportType}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>
                      {errors.exportType && (
                        <span className="text-danger">
                          {errors.exportType.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </fieldset>
<Controller
  name="supplier"
  control={control}
  rules={{
    validate: (value) =>
      (value && value.length > 0) ||
      "Please select at least one supplier",
  }}
  render={({ field }) => {
    const { value, onChange } = field;

    const selectedValues = (value || []).map(String);

    const handleSupplierChange = (e) => {
      const { checked, value: val } = e.target;

      // 👉 Handle ALL checkbox
      if (val === "All") {
        if (checked) {
          const allSupplierValues = supplier.map((s) =>
            String(s.value)
          );
          onChange(allSupplierValues);
        } else {
          onChange([]);
        }
        return;
      }

      // 👉 Individual supplier logic
      let updated;
      if (checked) {
        updated = [...selectedValues, val];
      } else {
        updated = selectedValues.filter((v) => v !== val);
      }

      onChange(updated);
    };

    const allSelected =
      selectedValues.length === supplier.length;

    return (
      <>
        <fieldset className="inputField">
          <legend>
            Choose Supplier
            {/* 🔥 ALL checkbox inside legend (right side) */}
            <span className="ms-3">
              <input
                id="supplier-all"
                type="checkbox"
                value="All"
                checked={allSelected}
                onChange={handleSupplierChange}
              />
              <Label
                for="supplier-all"
                className="ms-1"
              
              >
                 checkbox All
              </Label>
            </span>
          </legend>

          <Row>
            {supplier.map((item, index) => (
              <Col key={index} xxl="3" md="4" sm="6"  xs="12">
                <div className="checkbox checkbox-dark">
                  <input
                    id={`supplier-checkbox-${index}`}
                    type="checkbox"
                    value={String(item.value)}
                    checked={selectedValues.includes(
                      String(item.value)
                    )}
                    onChange={handleSupplierChange}
                  />
                  <Label
                    for={`supplier-checkbox-${index}`}
                    className="ms-2"
                  >
                    {item.label}
                  </Label>
                </div>
              </Col>
            ))}
          </Row>

          {errors.supplier && (
            <span className="text-danger">
              {errors.supplier.message}
            </span>
          )}
        </fieldset>
      </>
    );
  }}
/>



              <Controller
                name="features"
                control={control}
                defaultValue={[]} 
                render={({ field }) => {
                  const { value, onChange } = field;
                  const handleFeatureChange = (e) => 
                  {
                  const { value: v, checked } = e.target; 
                  const updatedValues = checked? [...(value || []), v]: (value || []).filter((item) => item !== v);
                  if(e.target.value=="Page Break"){setpage_break(checked ? "1" : "0");}
                  if(e.target.value=="Show Taxes"){setshow_taxes(checked ? "1" : "0");}
                  if(e.target.value=="Exclude Tax"){setexclude_tax(checked ? "1" : "0");}
                  if(e.target.value=="Show Discount Details"){setshow_discount_details(checked ? "1" : "0");}
                  if(e.target.value=="No Time"){setno_time(checked ? "1" : "0");}


                  onChange(updatedValues);
               //   setFeatureState((prev) => ({[v]: checked ? "1" : "",}));

                  };

                  return (
                    <>
                      <fieldset>
                        <legend>Display features (optional)</legend>

                        <Row>
                          {discount==="Yes" &&(
 displayFeatureCheckBox.map((item, index) => (
                            <Col key={index} xxl="3" md="4" sm="6"  xs="12">
                              <div className="checkbox checkbox-dark">
                                <input
                                  id={`feature-${index}`}
                                  type="checkbox"
                                  value={item.value}
                                  checked={(value || []).includes(item.value)}
                                  onChange={handleFeatureChange}
                                />
                                <Label
                                  for={`feature-${index}`}
                                  className="ms-2"
                                >
                                  {item.label}
                                </Label>
                              </div>
                            </Col>
                          ))
                          )}
                          {discount==="No" &&(
 displayFeatureCheckBoxOwner.map((item, index) => (
                            <Col key={index} xxl="3" md="4" sm="6"  xs="12">
                              <div className="checkbox checkbox-dark">
                                <input
                                  id={`feature-${index}`}
                                  type="checkbox"
                                  value={item.value}
                                  checked={(value || []).includes(item.value)}
                                  onChange={handleFeatureChange}
                                />
                                <Label
                                  for={`feature-${index}`}
                                  className="ms-2"
                                >
                                  {item.label}
                                </Label>
                              </div>
                            </Col>
                          ))
                          )}
                        </Row>

                        {/* ERROR MESSAGE */}
                        {errors.features && (
                          <span className="text-danger small">
                            {errors.features.message}
                          </span>
                        )}
                      </fieldset>
                    </>
                  );
                }}
              />

              <fieldset>
                <legend>Display Filters (optional) </legend>
                <Row className="mt-3">
                  <Col xxl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>
                          Filter By Country{" "}
                          <span className="text-danger fw-bold mx-1">*</span>
                        </InputGroupText>
                        <Controller
                          name="country"
                          rules={{ required: "country Name is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={country}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>
                      {errors.country && (
                        <span className="text-danger">
                          {errors.country.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col xxl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Group By</InputGroupText>
                        <Controller
                          name="groupBy"
                          rules={{ required: "Group By is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={groupBy}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>

                      {errors.groupBy && (
                        <span className="text-danger">
                          {errors.groupBy?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col xxl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Order By </InputGroupText>
                        <Controller
                          name="orderBy"
                          rules={{ required: "Order By is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={orderBy}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>

                      {errors.orderBy && (
                        <span className="text-danger">
                          {errors.orderBy?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xxl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Volume Unit </InputGroupText>
                        <Controller
                          name="volUnit"
                          rules={{ required: "Vol Unit is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={VolUnit}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>

                      {errors.volUnit && (
                        <span className="text-danger">
                          {errors.volUnit?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xxl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Fuel Type </InputGroupText>
                        <Controller
                          name="fuelType"
                          rules={{ required: "country is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={fuelType}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>

                      {errors.fuelType && (
                        <span className="text-danger">
                          {errors.fuelType?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xxl="3"  md="6" sm="12">
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <InputGroupText>Currency </InputGroupText>
                        <Controller
                          name="currency"
                          rules={{ required: "currency is required" }}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={Reportcurrency}
                              className="form-control p-0 border-0"
                            />
                          )}
                        />
                      </InputGroup>

                      {errors.currency && (
                        <span className="text-danger">
                          {errors.currency?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </fieldset>

              <fieldset>
                <legend>Match by (optional) </legend>
                <Row className="mt-3">
                  <Col xxl="4"  md="6" sm="12">
                    <InputText
                      name="card"
                      label="Fuel Card "
                      type="text"
                      register={register}
                      errors={errors}
                     
                    />
                  </Col>

                  <Col xxl="4"  md="6" sm="12">
                    <InputText
                      name="driverName"
                      label="Driver Name "
                      type="text"
                      register={register}
                      errors={errors}
                      
                    />
                  </Col>

                  <Col xxl="4"  md="6" sm="12">
                    <InputText
                      name="unitNo"
                      label="Unit Number "
                      type="text"
                      register={register}
                      errors={errors}
                       
                    />
                  </Col>

                    <Col xxl="4"  md="6" sm="12">
                      <InputText
                        name="city"
                        label="City "
                        type="text"
                        register={register}
                        errors={errors}
                         
                      />
                    </Col>

                    <Col xxl="4"  md="6" sm="12">
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <InputGroupText>State</InputGroupText>
                          <Controller
                            name="state"
                           
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={states}
                                className="form-control p-0 border-0"
                                placeholder="select State"
                              />
                            )}
                          />
                        </InputGroup>
                        {errors.state && (
                          <span className="text-danger">
                            {errors.state.message}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                </Row>
              </fieldset>

              <Row>
                <Col xxl="9"  md="6" sm="12">
                  {showMessage && (
                    <marquee
                      direction="right"
                      className="text-danger mt-3 fw-bold"
                    >
                      All fields marked with * are mandatory.
                    </marquee>
                  )}
                </Col>

                <Col xxl="3"  md="6" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      Create Reports
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CreateReport;
