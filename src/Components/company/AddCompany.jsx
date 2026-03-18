import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaBuilding, FaUser } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import axios from 'axios';
import { toast } from 'react-toastify';
import { company as table_name } from '../../api'; 
import {
  optionscountry,
  YesNo,
  optionscompany,
  companyStatus,
  companyLoginAccess,
  optionscountry1,
  invoiceType,
  invoiceType1,
  invoiceCreation,
  invoiceDay,
  invoiceWeek,
  customerType,
  TaretailInvoice,
  DefaultUnits,
  customizedTypeType,
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
import { RiBuilding4Fill } from "react-icons/ri";
import HeaderCard from "../Common/Component/HeaderCard";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Container,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import DropDown from "../Forms/FormControl/formInput/DropDown";
import {
  useCompany,
  useSalesman,
  useSupplier,
  useEssoRack,
  useCountry,
} from "../../Hooks/Dropdowns";
import { company } from "../../api";
const Index = () => {
  // const { data: companies, loading: companyLoading } = useCompany();
  const { data: salesman, loading: salesmanLoading } = useSalesman();
  //const { data: suppliers, loading: supplierLoading } = useSupplier();
  const { data: essoRacks, loading: essoRackLoading } = useEssoRack();
  const { data: countries, loading: countryLoading } = useCountry();
  const [showMessage, setShowMessage] = useState(true);

  const {
    reset,
    register,
    setValue,
    control,
    handleSubmit,

    formState: { errors, isSubmitted, isValid },
  } = useForm();

 const onSubmit = async (formData) => {
  console.log(formData )
    try { 
      const payload = {  
        company_name: formData.company_name || '',
        email: formData.email || '',
        email2: formData.email2 || '',
        other_email: formData.other_email || '',
        otp_email: formData.otp_email || '',
        otp_email2: formData.otp_email2 || '',
        otp_phone: formData.otp_phone || '',
        logo: formData.logo || '',
        address: formData.address || '',
        street: formData.street || '',
        city: formData.city || '',
        location: formData.location || '',
        auth_location: formData?.auth_location || '',
        province: formData.province || '',
        postal_code: formData.postal_code || '',
        country_name: formData.country_name.label || '',
        phone: formData.phone || '',
        fax: formData.fax || '',
        mobile: formData.mobile || '',
        company_type: formData.company_type?.value || '0',
        website: formData.website || '',
        country_id: formData.country_id?.value || '0',
        country: formData.country || '',
        salesman_id: formData.salesman_id?.value || '0',
        policy_number: formData.policy_number || '',
        company_status: formData.company_status?.value || '', 
        susp_comp: formData.susp_comp?.value || '',
        defd_mark_up: formData?.defd_mark_up?.value || '',
        daily_report: formData?.daily_report?.value || '',
        identifier: formData?.identifier || '',
        irving: formData?.irving || '',
        fees: formData.fees || '',
        shell_pricing: formData.shell_pricing || '0',
        pilot_pricing: formData.pilot_pricing || '0', 
        discount_canada: formData.discount_canada || '0',
        discount_usa: formData.discount_usa || '0',
        rack_ca: formData.rack_ca || '0',
        rack_us: formData.rack_us || '0',
        aoi: formData?.aoi?.value || '',
        drivers_license: formData.drivers_license?.value || '',
        signed_agreement: formData?.signed_agreement?.value || '',
        void_cheque: formData?.void_cheque?.value || '',
        check_rebate: formData.check_rebate?.value || '',
        retail_invoice: formData.retail_invoice?.value || '',
        ta_retail_invoice: formData.ta_retail_invoice?.value || '',
        esso_retail_invoice: formData?.esso_retail_invoice?.value || '',
        esso_inv_type: formData?.esso_inv_type?.value || '',
        cen_inv_type: formData?.cen_inv_type?.value || '',
        cen_rcent: formData?.cen_rcent || 0.0,
        cen_owner_operator_invoice: formData.cen_owner_operator_invoice?.value || '',
        cen_cust_inv_type: formData.cen_cust_inv_type?.value || '',
        cust_inv_type: formData.cust_inv_type?.value || '',
        ul_cust_inv_type: formData.ul_cust_inv_type?.value || '',
        ul_inv_type: formData.ul_inv_type?.value || '',
        irv_inv_type: formData.irv_inv_type?.value || '',
        esso_rcent: formData.esso_rcent || '0',
        ul_rcent: formData.ul_rcent || '0',
        irv_rcent: formData.irv_rcent || '0',
        esso_rack: formData?.esso_rack?.value || '0',
        esso_rack_on: formData?.esso_rack_on?.value || '0',
        esso_rack_oon: formData?.esso_rack_oon?.value || '0',
        fee: formData?.fee?.value || '',
        owner_operator_invoice: formData?.owner_operator_invoice?.value || '',
        ul_owner_operator_invoice: formData?.ul_owner_operator_invoice?.value || '',
        sw_owner_invoice: formData?.sw_owner_invoice?.value || '',
        self_owner_invoice: formData?.self_owner_invoice?.value || '',
        sw_customised_inv: formData?.sw_customised_inv?.value || '',
        default_unit: formData?.default_unit?.value || '',
        default_driver: formData?.default_driver?.value || '',
        love_retail_invoice: formData?.love_retail_invoice?.value || '',
        supplier_fee: formData?.supplier_fee?.value || '',
        ibp_adjustment: formData?.ibp_adjustment?.value || '',
        pumping_fee: formData?.pumping_fee?.value || '',
        net_price: formData?.net_price?.value || '',
        daily_pricing: formData.daily_pricing || '',
        ta_daily_pricing: formData.ta_daily_pricing || '',
        esso_daily_pricing: formData.esso_daily_pricing || '',
        esso_daily_pricing_wtax: formData.esso_daily_pricing_wtax || '',
        love_daily_pricing: formData.love_daily_pricing || '',
        ul_daily_pricing: formData.ul_daily_pricing || '',
        cen_daily_pricing_wtax: formData.cen_daily_pricing_wtax || '',
         cen_daily_pricing: formData.cen_daily_pricing || '',
        ul_daily_pricing_wtax: formData.ul_daily_pricing_wtax || '',
        irv_daily_pricing: formData.irv_daily_pricing || '',
        irv_daily_pricing_wtax: formData?.irv_daily_pricing_wtax || '',
        invoice_creation: formData?.invoice_creation?.value || '',
        invoice_day: formData?.invoice_day?.value || '',
        invoice_week: formData?.invoice_week?.value || '',
        customer_type: formData?.customer_type?.value || '',
        special_instructions: formData?.special_instructions || '',
        first_name: formData?.first_name || '',
        last_name: formData?.last_name || '',
        card_discount: formData?.card_discount?.value || '',
        username: formData?.username || '',
        password: formData?.password || '',
        date: formData?.date || '1970-01-01 00:00:00',
        esso_live: formData?.esso_live?.value || '',
        remarks: formData?.remarks || '',
        rest_OTP: formData?.rest_OTP || '',
        last_login: formData?.last_login || '1970-01-01 00:00:00',
        lang: formData?.lang || '',
        lat: formData?.lat || '',
        login_failed: formData?.login_failed || '0',
        last_failed: formData?.last_failed || '1970-01-01 00:00:00', 
        added_on: new Date().toISOString().slice(0, 19).replace('T', ' '), 
      }; 

      console.log(payload);
      
      const res = await axios.post(table_name, payload);  
      toast.success("Company Add Succesfully") 
      reset(); // Reset the form on success
    }
     catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };
  return (
    <Fragment>
      <Breadcrumbs parent="company" title="Add Company" /> 
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Company" />
              <CardBody>
                <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                    <legend>Company Basic Information</legend>
                    <Row className="mt-3">
                      <Col sm="6">
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Company Name{" "}
                              <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <input
                              className="form-control"
                              name="company_name"
                              type="text"
                              {...register("company_name", { required: true })}
                            />
                          </InputGroup>
                          {errors.company_name && (
                            <span className="text-danger">
                              Company Name is required
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col sm="3">
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              <MdEmail className="mx-1" /> Email-1{" "}
                              <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <input
                              className="form-control"
                              name="email"
                              type="email"
                              {...register("email", {
                                required: "Email-1 is required",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.email && (
                            <span className="text-danger">
                              {errors.email?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className="m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              <MdEmail className="mx-1" /> Email-2
                            </InputGroupText>
                            <input
                              className="form-control"
                              name="email2"
                              type="email"
                              {...register("email2", {
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.email2 && (
                            <p className="text-danger">
                              {errors.email2?.message}
                            </p>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              <MdEmail className="mx-1 " /> Other Email
                            </InputGroupText>
                            <input
                              className="form-control"
                              name="other_email"
                              type="email"
                              {...register("other_email", {
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.other_email && (
                            <p className="text-danger">
                              {errors.other_email?.message}
                            </p>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              {" "}
                              <MdEmail className="mx-1 " /> Otp Email-1{" "}
                              <span className="text-danger fw-bold  mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <input
                              className="form-control"
                              name="otp_email"
                              type="email"
                              {...register("otp_email", {
                                required: "Otp Email-1 is required",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email format",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.otp_email && (
                            <p className="text-danger">
                              {errors.otp_email?.message}
                            </p>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              {" "}
                              <MdEmail className="mx-1 " /> Otp Email-2
                            </InputGroupText>
                            <input
                              name="otp_email2"
                              className="form-control"
                              type="email"
                              {...register("otp_email2", {
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email format",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.otp_email2 && (
                            <p>{errors.otp_email2?.message}</p>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              {" "}
                              <FaPhoneAlt className="mx-1 " />
                              Otp Phone
                            </InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                              name="otp_phone"
                              {...register("otp_phone", {
                                pattern: {
                                  value: /^[0-9]{10}$/, // ✅ 10 digit only
                                  message: "Phone number must be 10 digits",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.otp_phone && (
                            <span className="text-danger">
                              {errors.otp_phone.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              <FaBuilding className="mx-1 " /> Address
                            </InputGroupText>
                            <input
                              className="form-control"
                               {...register("address")}
                              type="text"
                              name="address"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> 
                              <RiBuilding4Fill className="mx-1 " /> Authorized
                              Location
                            </InputGroupText>
                            <input
                              className="form-control"
                                {...register("auth_location")}
                              type="text"
                              name="auth_location"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <InputGroup className="mb-3">
                          <InputGroupText>Country</InputGroupText>
                          <Controller
      name="country_name"
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Select
          {...field}
          options={countries}
          className="form-control p-0 border-0"
          placeholder="Select Country"
          value={field.value || null}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />

                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup className="mb-3">
                          <InputGroupText>Company Type</InputGroupText>
                          <Controller
      name="company_type"
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Select
          {...field}
          options={optionscompany}
          className="form-control p-0 border-0"
          placeholder="Select company type"
          value={field.value || null}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />

                          
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText> 
                            <FaPhoneAlt className="mx-1" /> Phone
                          </InputGroupText>
                          <input
                            className="form-control"
                            type="text"
                               {...register("phone")}
                            name="phone"
                            placeholder="+1 (999) 999-9999"
                          />
                         
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>
                       
                            <FaPhoneAlt className="mx-1 " /> Mobile
                          </InputGroupText>
                          <input
                            className="form-control"
                            type="text"
                            name="mobile"
                           {...register("mobile")}
                            placeholder="+1 (999) 999-9999"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              <FaPhoneAlt className="mx-1 " /> Fax
                            </InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                                {...register("fax")}
                              name="fax"
                              placeholder="+1 (999) 999-9999"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="salesman_id"
                          label="Sales Man"
                          control={control}
                          placeholder="Select SalesMan"
                          defaultValueId={0}
                          options={salesman}
                        />
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> Policy Number</InputGroupText>
                            <input
                              className="form-control"
                                {...register("policy_number")}
                              type="text"
                              name="policy_number"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Company Status</InputGroupText>
                          <Controller
      name="company_status"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={companyStatus}
          className="form-control p-0 border-0"
          placeholder="Select status"
          value={field.value}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              {" "}
                              Sub Fleet Identifier
                            </InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                                {...register("identifier")}
                              name="identifier"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              {" "}
                              Irving Sub Fleet Name
                            </InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                              {...register("irving")}
                              name="irving"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> Rack-Canada</InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                              name="rack_ca"
                            {...register("rack_ca")}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Rack-USA</InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                              name="rack_us"
                              {...register("rack_us")}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>AOI</InputGroupText>
                         <Controller
      name="aoi"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={YesNo}
          className="form-control p-0 border-0"
          placeholder="Select AOI"
          value={field.value}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Drivers License</InputGroupText>
                         <Controller
      name="drivers_license"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={YesNo}
          className="form-control p-0 border-0"
          placeholder="Select option"
          value={field.value}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Signed Agreement</InputGroupText>
                          <Controller
      name="signed_agreement"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={YesNo}
          className="form-control p-0 border-0"
          placeholder="Select option"
          value={field.value}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Void Cheque</InputGroupText>
                        <Controller
      name="void_cheque"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={YesNo}
          className="form-control p-0 border-0"
          placeholder="Select option"
          value={field.value}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Check Rebate</InputGroupText>
                             <Controller
        name="check_rebate"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>FJ Rack Invoice</InputGroupText>
                            <Controller
        name="retail_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              TA Petro Rack Invoice
                            </InputGroupText>
                            <Controller
        name="ta_retail_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={TaretailInvoice}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Esso Rack Invoice</InputGroupText>
                            <Controller
        name="esso_retail_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Loves Rack Invoice</InputGroupText>
                           <Controller
        name="love_retail_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show Supplier Fee (FJ)
                            </InputGroupText>
                             <Controller
        name="supplier_fee"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show IBP Adjustment (TA)
                            </InputGroupText>
                           <Controller
        name="ibp_adjustment"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show Pumping Fee(LOVES)
                            </InputGroupText>
                              <Controller
        name="pumping_fee"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show Net Price (ESSO)
                            </InputGroupText>
                            <Controller
        name="net_price"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show (ESSO) Live Data
                            </InputGroupText>
                          <Controller
        name="esso_live"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                         <DropDown
                          name="esso_rack"
                          label=" ESSO Rack"
                          control={control}
                          setValue={setValue}
                          placeholder="Select ESSO Rack"
                          defaultValueId={0}
                          options={essoRacks}
                        />
                           {/* <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                            ESSO Rack
                            </InputGroupText>
                          <Controller
        name="esso_rack"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={essoRacks}
            className="form-control p-0 border-0"
            placeholder="Select ESSO Rack"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                   */}
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>CADV FEE</InputGroupText>
                           <Controller
        name="fee"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show Owner Operator Invoice
                            </InputGroupText>
                           <Controller
        name="sw_owner_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Self Owner Operator Report
                            </InputGroupText>
                            <Controller
        name="self_owner_invoice"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value || null}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              Show Customised Invoices
                            </InputGroupText>
                              <Controller
        name="sw_customised_inv"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value || null}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Default Unit</InputGroupText>
                              <Controller
        name="default_unit"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select
            {...field}
            options={DefaultUnits}
            className="form-control p-0 border-0"
            placeholder="Select unit"
            value={field.value || null}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Default Driver</InputGroupText>
                            <Controller
        name="default_driver"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={DefaultUnits}
            className="form-control p-0 border-0"
            placeholder="Select driver"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack_on"
                          label="ESSO Rack"
                          control={control}
                          setValue={setValue}
                          placeholder="Select ESSO Rack"
                          defaultValueId={0}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack_oon"
                          label="ESSO Rack"
                        setValue={setValue}
                          control={control}
                          placeholder="Select ESSO Rack"
                          defaultValueId={0}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Suspicious Company</InputGroupText>
                            <Controller
        name="susp_comp"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>DEFD Mark Up</InputGroupText>
                               <Controller
        name="defd_mark_up"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Daily Volume Report</InputGroupText>
                          <Controller
        name="daily_report"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>{" "}
                  </fieldset>
                  <Row className="mt-3">
                    <Col sm="12">
                      <fieldset>
                        <legend>Ultramar INVOICE TYPE</legend>
                        <Row className="mt-3">
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Ultramar INVOICE TYPE
                                </InputGroupText>
                                <Controller
        name="ul_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={invoiceType1}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="3">
                                                     <FormGroup className="m-form__group">
                                                       <InputGroup>
                                                         <InputGroupText>
                                                           Discount Cent
                                                         </InputGroupText>
                                                         <input
                                                           className="form-control"
                                                           name="ul_rcent"
                                                          {...register("ul_rcent")}
                                                           type="text"
                                                         />
                                                       </InputGroup>
                                                     </FormGroup>
                                                   </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Owner Operator Invoice
                                </InputGroupText>
                                 <Controller
        name="ul_owner_operator_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Customized Invoice Type
                                </InputGroupText>
                               <Controller
        name="ul_cust_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={customizedTypeType}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                    
                    <Col sm="12">
                      <fieldset>
                        <legend>Irving INVOICE TYPE</legend>
                        <Row className="my-3">
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Irving INVOICE TYPE
                                </InputGroupText>

                                   <Controller
        name="irv_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={invoiceType1}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                           <Col sm="3">
                                                     <FormGroup className="m-form__group">
                                                       <InputGroup>
                                                         <InputGroupText>
                                                           Discount Cent
                                                         </InputGroupText>
                                                         <input
                                                           className="form-control"
                                                           name="irv_rcent"
                                                          {...register("irv_rcent")}
                                                           type="text"
                                                           
                                                           
                                                         />

                                                       </InputGroup>
                                                     </FormGroup>
                                                   </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Owner Operator Invoice
                                </InputGroupText>

                                    <Controller
        name="irv_owner_operator_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Customized Invoice Type
                                </InputGroupText>
                               <Controller
        name="irv_cust_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={customizedTypeType}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                          <Col sm="12">
                      <fieldset>
                        <legend>ESSO INVOICE TYPE</legend>
                        <Row className="my-3">
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  ESSO INVOICE TYPE
                                </InputGroupText>
                               <Controller
        name="esso_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={invoiceType1}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="3">
                                                     <FormGroup className="m-form__group">
                                                       <InputGroup>
                                                         <InputGroupText>
                                                           Discount Cent
                                                         </InputGroupText>
                                                         <input
                                                           className="form-control"
                                                           name="esso_rcent"
                                                          {...register("esso_rcent")}
                                                           type="text"
                                                         />
                                                       </InputGroup>
                                                     </FormGroup>
                                                   </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Owner Operator Invoice
                                </InputGroupText>
                                  <Controller
        name="owner_operator_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Customized Invoice Type
                                </InputGroupText>
                                <Controller
        name="cust_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={customizedTypeType}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                       <Col sm="12">
                      <fieldset>
                        <legend>CENOVUS INVOICE TYPE</legend>
                        <Row className="my-3">
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Cenovus INVOICE TYPE
                                </InputGroupText>
                                <Controller
        name="cen_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={invoiceType1}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                           <Col sm="3">
                                                     <FormGroup className="m-form__group">
                                                       <InputGroup>
                                                         <InputGroupText>
                                                           Discount Cent
                                                         </InputGroupText>
                                                         <input
                                                           className="form-control"
                                                           name="cen_rcent"
                                                           {...register("cen_rcent")}
                                                           type="text"
                                                         />
                                                       </InputGroup>
                                                     </FormGroup>
                                                   </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Owner Operator Invoice
                                </InputGroupText>

                                <Controller
        name="cen_owner_operator_invoice"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />

                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="3">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Customized Invoice Type
                                </InputGroupText>
                              
      <Controller
        name="cen_cust_inv_type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={customizedTypeType}
            className="form-control p-0 border-0"
            placeholder="Select invoice type"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                       
                    <Col sm="12">
                      <fieldset>
                        <legend>Other Details</legend>
                        <Row className="mt-3">
                          <Col sm="10">
                            <DropDown
                              name="country_id"
                              label="Country"
                              control={control}
                              placeholder="Select Country"
                              span={true}
                              defaultValueId={0}
                              rules={{message:"Country is Required"}}
                              errors={errors}
                              options={countries}
                            /> 
                                          
                          </Col>
                          <Col sm="2">
                            <div className="checkbox checkbox-dark">
                             <Controller
  name="fees"
  control={control}
  defaultValue={false}
  render={({ field }) => (
    <Input
      id="checkbox1"
      type="checkbox"
      checked={field.value === "1"}
      onChange={(e) => field.onChange(e.target.checked ? "1" : "")}
    />
  )}
/>
<Label for="checkbox1">Fees</Label>
                            </div>
                          </Col>
                                  
                        </Row>
                      </fieldset>
                    </Col>
                  </Row>

                     <fieldset>
                                     <legend>Daily Pricing</legend>
                                     <Row className="my-3">
                              <Col sm="3">
  <div className="checkbox checkbox-dark">
    <Controller
      name="daily_pricing"
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <Input
          {...field}
          id="daily_pricing"
          type="checkbox"
          checked={field.value=='Yes'}
          onChange={(e) => field.onChange(e.target.checked?'Yes':"")}
        />
      )}
    />
    <Label for="daily_pricing">FJ Daily Pricing PDF</Label>
  </div>
</Col>
                 
                                       <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="ta_daily_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox2"
                           type="checkbox"
                           checked={field.value === "Yes"}
                           onChange={(e) =>
                             field.onChange(e.target.checked ? "Yes" : "")
                           }
                         />
                       )}
                     />
                     <Label for="checkbox2">
                       Ta-Petro Daily Pricing PDF
                     </Label>
                   </div>
                 </Col>
                 
                                      <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="esso_daily_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox3"
                           type="checkbox"
                           checked={field.value === "Yes"}
                           onChange={(e) =>
                             field.onChange(e.target.checked ? "Yes" : "")
                           }
                         />
                       )}
                     />
                     <Label for="checkbox3">
                       ESSO Daily Pricing PDF (With Tax)
                     </Label>
                   </div>
                 </Col>
                 
                                     <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="esso_daily_pricing_wtax"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox4"
                           type="checkbox"
                           checked={field.value=="Yes"}
                           onChange={(e) =>
                             field.onChange(e.target.checked ? "Yes" : "")
                           }
                         />
                       )}
                     />
                     <Label for="checkbox4">
                       ESSO Daily Pricing PDF (Without Tax)
                     </Label>
                   </div>
                 </Col>
                 
                 
                                      <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="pilot_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox5"
                           type="checkbox"
                           checked={field.value=='1'}
                           onChange={(e) => field.onChange(e.target.checked?'1':"")}
                         />
                       )}
                     />
                     <Label for="checkbox5">Pilot Flying J</Label>
                   </div>
                 </Col>
                 
                                      <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="shell_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox6"
                           type="checkbox"
                           checked={field.value=='1'}
                           onChange={(e) => field.onChange(e.target.checked?'1':"")}
                         />
                       )}
                     />
                     <Label for="checkbox6">Shell Flying J</Label>
                   </div>
                 </Col>
                 
                 
                                       <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="ul_daily_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox7"
                           type="checkbox"
                           checked={field.value=='Yes'}
                           onChange={(e) => field.onChange(e.target.checked?'Yes':"")}
                         />
                       )}
                     />
                     <Label for="checkbox7">
                       Ultramar Daily Pricing PDF (With Tax)
                     </Label>
                   </div>
                 </Col>
                 
                                       <Col sm="3">
                                         <div className="checkbox checkbox-dark">
                                           <Controller
                                            name="ul_daily_pricing_wtax"
                                            control={control}
                                           render={({ field }) => (
                     <Input
                       id="checkbox8"
                       type="checkbox"
                       checked={field.value=='Yes'}
                       onChange={(e) => field.onChange(e.target.checked?'Yes':"")}
                     />
                   )}
                                           />
                                           <Label for="checkbox8">
                                             Ultramar Daily Pricing PDF (Without Tax)
                                           </Label>
                                         </div>
                                       </Col>
                 
                                       <Col sm="3">
                                         <div className="checkbox checkbox-dark">
                                           <Controller
                   name="love_daily_pricing"
                   control={control}
                   render={({ field }) => (
                     <Input
                       id="checkbox9"
                       type="checkbox"
                       checked={field.value=='Yes'}
                       onChange={(e) => field.onChange(e.target.checked?'Yes':"")}
                     />
                   )}
                 />
                 
                                           <Label for="checkbox9">Loves Daily Pricing PDF</Label>
                                         </div>
                                       </Col>
                                       <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="irv_daily_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox10"
                           type="checkbox"
                           checked={field.value=='Yes'}
                           onChange={(e) =>
                             field.onChange(e.target.checked?'Yes':'')
                           }
                         />
                       )}
                     />
                     <Label for="checkbox10">
                       Irving Daily Pricing PDF (With Tax)
                     </Label>
                   </div>
                 </Col>
                 
                   <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="irv_daily_pricing_wtax"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox11"
                           type="checkbox"
                           checked={field.value=='Yes'}
                           onChange={(e) =>
                             field.onChange(e.target.checked?"Yes":"")
                           }
                         />
                       )}
                     />
                     <Label for="checkbox11">
                       Irving Daily Pricing PDF (Without Tax)
                     </Label>
                   </div>
                 </Col>

                                    <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="Cen_daily_pricing"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox12"
                           type="checkbox"
                           checked={field.value=='Yes'}
                           onChange={(e) =>
                             field.onChange(e.target.checked?'Yes':'')
                           }
                         />
                       )}
                     />
                     <Label for="checkbox12">
                        Cenovus Daily Pricing PDF (With Tax)
                     </Label>
                   </div>
                 </Col>
                 
                   <Col sm="3">
                   <div className="checkbox checkbox-dark">
                     <Controller
                       name="cen_daily_pricing_wtax"
                       control={control}
                       render={({ field }) => (
                         <Input
                           id="checkbox13"
                           type="checkbox"
                           checked={field.value=='Yes'}
                           onChange={(e) =>
                             field.onChange(e.target.checked?"Yes":"")
                           }
                         />
                       )}
                     />
                     <Label for="checkbox13">
                       Cenovus Daily Pricing PDF (Without Tax)
                     </Label>
                   </div>
                 </Col>
                                     </Row>
                                   </fieldset>

                  <fieldset>
                    <legend>Invoice Setting</legend>
                    <Row className="mt-3 py-3">
                      {/* Invoice Creation */}
                      <Col sm="3">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupText>
                              Invoice Creation 
                              <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <Controller
                              name="invoice_creation"
                              control={control}
                              rules={{
                                required: "Invoice creation is required",
                              }}
                              render={({ field }) => (
                                <Select 
                                  {...field}
                                  options={invoiceCreation}
                                  className="form-control p-0 border-0"
                                  placeholder="Select option"
                                />
                              )}
                            />
                          </InputGroup>
                          {errors.invoice_creation && (
                            <span className="text-danger">
                              {errors.invoice_creation.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                      {/* Invoice Pay Day */}
                      <Col sm="3">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupText>Invoice Pay Day
                            <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <Controller
                              name="invoice_day"
                              control={control}
                              rules={{
                                required: "Invoice pay day is required",
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={invoiceDay}
                                  className="form-control p-0 border-0"
                                  placeholder="Select day"
                                />
                              )}
                            />
                          </InputGroup>
                          {errors.invoice_day && (
                            <span className="text-danger">
                              {errors.invoice_day.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                      {/* Invoice Week */}
                      <Col sm="3">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupText>
                              Invoice Week 
                             <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <Controller
                              name="invoice_week"
                              control={control}
                              rules={{ required: "Invoice week is required" }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={invoiceWeek}
                                  className="form-control p-0 border-0"
                                  placeholder="Select week"
                                />
                              )}
                            />
                          </InputGroup>
                          {errors.invoice_week && (
                            <span className="text-danger">
                              {errors.invoice_week.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                      {/* Customer Type */}
                      <Col sm="3">
                        <FormGroup>
                          <InputGroup>
                            <InputGroupText>
                              Customer Type{" "}
                              <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <Controller
                              name="customer_type"
                              control={control}
                              rules={{ required: "Customer type is required" }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={customerType}
                                  className="form-control p-0 border-0"
                                  placeholder="Select type"
                                />
                              )}
                            />
                          </InputGroup>
                          {errors.customer_type && (
                            <span className="text-danger">
                              {errors.customer_type.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText>Special Instructions</InputGroupText>
                          <input className="form-control" type="text"   {...register("special_instructions")} name="special_instructions"  />
                        </InputGroup>
                      </FormGroup>
                    </Row>
                  </fieldset>

                  <fieldset>
                    <legend>Contact Person Details</legend>
                    <Row className="mt-3">
                      <Col sm="6">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> 
                              <FaUser className="mx-1 " /> First Name 
                            </InputGroupText>
                            <input className="form-control" type="text" name="first_name"  {...register("first_name")}/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> 
                              <FaUser className="mx-1 " /> Last Name
                            </InputGroupText>
                            <input className="form-control" type="text" name="last_name" {...register("last_name")}/>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>

                  <fieldset>
                    <legend>Account Details</legend>
                    <Row className="mt-3">
                      <Col sm="4">
                        <FormGroup className=" m-form__group">
                          <InputGroup className="mb-3">
                            <InputGroupText>
                              Card Discount Sheet Menu
                            </InputGroupText> 
                             <Controller
        name="card_discount"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={YesNo}
            className="form-control p-0 border-0"
            placeholder="Select option"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> 
                              <FaUser className="mx-1 " /> Username
                              <span className="text-danger fw-bold  mx-1">
                                *
                              </span>
                            </InputGroupText>
                            <input
                              className="form-control"
                              type="text"
                              name="username"
                              {...register("username", { required: true })}
                            />
                          </InputGroup>
                          {errors.username && (
                            <span className="text-danger">
                              UserName is required
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText><RiLockPasswordFill className="mx-1 " /> Password   <span className="text-danger fw-bold  mx-1">
                                *
                              </span> </InputGroupText>
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              {...register("password", {
                                required: "Password is required",
                                
                              })}
                            />
                          </InputGroup>

                          {errors.password && (
                            <span className="text-danger">
                              {errors.password.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>
                  <Row>
                    <Col md="10">
                      {showMessage && (
                        <marquee
                          direction="right"
                          className="text-danger mt-3 fw-bold"
                        >
                          All fields marked with * are mandatory.
                        </marquee>
                      )}
                    </Col>
                    <Col md={{ size: 2 }}>
                      <div className="text-end">
                        <Btn
                          attrBtn={{
                            color: "primary",
                            className: "m-r-15",
                            type: "submit",
                          }}
                        >
                          Add Company
                        </Btn>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
