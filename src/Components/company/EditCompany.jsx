import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaBuilding, FaUser } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { CompanySupplierCheckbox } from "../Forms/FormWidget/FormSelect2/OptionDatas";
import { companyall, company as table_name, company } from "../../api";
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
import { useParams } from "react-router-dom";
const Index = () => {
  const { id } = useParams();
  const company_id = atob(decodeURIComponent(id));

  // const { data: companies, loading: companyLoading } = useCompany();
  const { data: salesman, loading: salesmanLoading } = useSalesman();
  const { data: suppliers, loading: supplierLoading } = useSupplier();
  const { data: essoRacks, loading: essoRackLoading } = useEssoRack();
  const { data: countries, loading: countryLoading } = useCountry();
  const [showMessage, setShowMessage] = useState(true);
 const [FullData, setFullData] = useState([]);
       const {
    reset,
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } =useForm({
  });
  useEffect(() => {
    axios
      .get(`${company}/${company_id}`)
      .then((res) => {
        setFullData(res.data);
        if (res.data) {
          console.log(res.data);
          
    setValue("company_name", res.data?.company_name);
    setValue("auth_location", res.data?.auth_location);
    setValue("address", res.data?.address);
    setValue("country", res.data?.country);
    setValue("last_name", res.data?.last_name);
    setValue("first_name", res.data?.first_name);
    setValue("special_instructions", res.data?.special_instructions);
    setValue( "love_daily_pricing",res.data.love_daily_pricing);
    setValue( "ul_daily_pricing_wtax",res.data.ul_daily_pricing_wtax);
    setValue( "ul_daily_pricing",res.data.ul_daily_pricing);
    setValue( "shell_pricing",res.data.shell_pricing);
    setValue( "pilot_pricing",res.data.pilot_pricing);
    setValue( "esso_daily_pricing_wtax",res.data.esso_daily_pricing_wtax);
    setValue( "esso_daily_pricing",res.data.esso_daily_pricing);
    setValue( "ta_daily_pricing",res.data.ta_daily_pricing);
    setValue( "love_daily_pricing",res.data.love_daily_pricing);
    setValue( "daily_pricing",res.data.daily_pricing);
     setValue("fees",res.data.fees);
   
    
  }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      if(FullData.length!==0){
const payload = {
        company_name: formData?.company_name || "",
        otp_phone: formData.otp_phone || "",
        address: formData.address || "",
        auth_location: formData.auth_location || "",
        country_name: formData?.country_name?.label,
        salesman_id:formData.salesman_id?.value ||0,
        phone: formData.phone || "",
        fax: formData.fax || "",
        mobile: formData.mobile || "",
        company_type: formData.company_type?.value || "0",
        country_id: formData.country_id?.value || "0",
        country: formData.country || "",
        policy_number: formData.policy_number || "",
        company_status: formData.company_status?.value || "",
        susp_comp: formData.susp_comp?.value || "",
        defd_mark_up: formData.defd_mark_up.value || "",
        daily_report: formData.daily_report.value || "",
        identifier: formData.identifier || "",
        irving: formData.irving || "",
        fees: formData?.fees || "",
        shell_pricing: formData.shell_pricing || "0",
        pilot_pricing: formData.pilot_pricing || "0",
        discount_canada: formData.discount_canada || "0",
        discount_usa: formData.discount_usa || "0",
        rack_ca: formData.rack_ca || "0",
        rack_us: formData.rack_us || "0",
        aoi: formData.aoi?.value ||"0",
        drivers_license: formData.drivers_license?.value || "",
        signed_agreement: formData.signed_agreement?.value || "",
        void_cheque: formData.void_cheque?.value || "",
        check_rebate: formData?.check_rebate?.value || "",
        retail_invoice: formData.retail_invoice || "",
        ta_retail_invoice: formData.ta_retail_invoice?.value || "",
        esso_retail_invoice: formData.esso_retail_invoice || "",
        esso_inv_type: formData.esso_inv_type?.value || "",
        cust_inv_type: formData.cust_inv_type?.value || "",
        ul_cust_inv_type: formData.ul_cust_inv_type?.value || "",
        ul_inv_type: formData.ul_inv_type?.value || "",
        esso_rcent: formData.esso_rcent || "0",
        ul_rcent: formData.ul_rcent || "0",
        esso_rack: formData.esso_rack || "0",
        esso_rack_on: formData.esso_rack_on?.value || "0",
        esso_rack_oon: formData.esso_rack_oon?.value || "0",
        fee: formData.fee || "",
        owner_operator_invoice: formData.owner_operator_invoice?.value || "",
        ul_owner_operator_invoice:
          formData.ul_owner_operator_invoice?.value || "",
        sw_owner_invoice: formData.sw_owner_invoice?.value || "",
        self_owner_invoice: formData.self_owner_invoice?.value || "",
        sw_customised_inv: formData.sw_customised_inv?.value || "",
        default_unit: formData.default_unit || "",
        default_driver: formData.default_driver || "",
        love_retail_invoice: formData.love_retail_invoice || "",
        supplier_fee: formData.supplier_fee || "",
        ibp_adjustment: formData.ibp_adjustment || "",
        pumping_fee: formData.pumping_fee || "",
        net_price: formData.net_price || "",
        daily_pricing: formData.daily_pricing || "",
        ta_daily_pricing: formData.ta_daily_pricing || "",
        esso_daily_pricing: formData.esso_daily_pricing || "",
        esso_daily_pricing_wtax: formData.esso_daily_pricing_wtax || "",
        love_daily_pricing: formData.love_daily_pricing?'Yes' : "",
        ul_daily_pricing: formData.ul_daily_pricing || "",
        ul_daily_pricing_wtax: formData.ul_daily_pricing_wtax || "",
        invoice_creation: formData.invoice_creation?.value || "",
        invoice_day: formData.invoice_day?.value || "",
        invoice_week: formData.invoice_week?.value || "",
        customer_type: formData.customer_type?.value || "",
        special_instructions: formData.special_instructions || "",
        first_name: formData.first_name || "",
        last_name: formData.last_name || "",
        card_discount: formData.card_discount.value || "",
        username: formData.username || "",

        password: formData.password || "",
        date: formData.date || "1970-01-01 00:00:00",
        esso_live: formData.esso_live || "",
        remarks: formData.remarks || "",
      };
      console.log(formData)
      console.log("📤 Submitting data:", payload);
      const res = await axios.put(`${company}/${company_id}`, payload);
      console.log("✅ API Response:", res.data);
      toast.success("Company Updated Succesfully");
      //reset(); // Reset the form on success
      }
      
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }   
  };
  return (
    <Fragment>
      <Breadcrumbs parent="company" title="Edit Company" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Edit Company" />
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
                              defaultValue={FullData?.company_name}
                              type="text"
                              {...register("company_name")}
                            />
                            
                          </InputGroup>
                          {/* {errors.company_name && (
                            <span className="text-danger">
                              Company Name is required
                            </span>
                          )} */}
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
                              defaultValue={FullData?.email}
                              disabled
                              {...register("email", {
                              
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          </InputGroup>
                       
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
                              defaultValue={FullData?.email2}

                              disabled
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
                               defaultValue={FullData?.other_email}

                              disabled
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
                              defaultValue={FullData?.otp_email}
                             disabled
                              type="email"
                              {...register("otp_email", {
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email format",
                                },
                              })}
                            />
                          </InputGroup>
                         
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
                              disabled
                              className="form-control"
                              defaultValue={FullData.otp_email2}

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
                              defaultValue={FullData.otp_phone}
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
                              type="text"
                               defaultValue={FullData.address}

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
                            <Input
                              className="form-control"
                              type="text"
                              defaultValue={FullData.auth_location}
                              name="auth_location"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        {/* <InputGroup className="mb-3">
                          <InputGroupText>Country</InputGroupText>
                          <Select
                            options={optionscountry}
                            className="form-control p-0 border-0"
                            name="country_name"


                          />
                        </InputGroup> */}
                         <DropDown
                          name="country_name"
                          label="Country" 
                          control={control}
                          setValue={setValue}
                          placeholder="Select Country"
                        defaultValueId={FullData.country_id }
                        options={countries} 
                        />
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="company_type"
                          label="Company Type" 
                          control={control}
                          setValue={setValue}
                          placeholder="Select Company Type"
                        defaultValueId={FullData.company_type}
                        options={optionscompany} 
                        />
                      
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>
                            <FaPhoneAlt className="mx-1" /> Phone
                          </InputGroupText>
                          <Input
                            className="form-control"
                            type="text"
                            name="phone"
                            defaultValue={FullData.phone}
                            placeholder="+1 (999) 999-9999"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>
                            <FaPhoneAlt className="mx-1 " /> Mobile
                          </InputGroupText>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue={FullData.mobile}
                            name="mobile"
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
                            <Input
                              className="form-control"
                              type="text"
                              name="fax"
                              defaultValue={FullData.fax}
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
                          setValue={setValue}
                          placeholder="Select SalesMan"
                          defaultValueId={FullData.salesman_id?FullData.salesman_id:0}
                          options={salesman} 
                        />
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> Policy Number</InputGroupText>
                            <Input
                              className="form-control"
                              type="text"
                              name="policy_number"
                              defaultValue={FullData.policy_number}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                         <DropDown
                          name="company_status"
                          label="Company Status" 
                          control={control}
                          setValue={setValue}
                          placeholder="Select Company Status"
                          defaultValueId={FullData.company_status}
                          options={companyStatus} 
                        />
                       
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
                            <Input
                              className="form-control"
                              type="text"
                              defaultValue={FullData.identifier}
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
                            <Input
                              className="form-control"
                              type="text"
                               defaultValue={FullData.irving}

                              name="irving"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                      
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText> Rack-Canada</InputGroupText>
                            <Input
                              className="form-control"
                              type="text"
                              defaultValue={FullData.rack_ca}
                              name="rack_ca"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Rack-USA</InputGroupText>
                            <Input
                              className="form-control"
                               defaultValue={FullData.rack_us}

                              type="text"
                              name="rack_us"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <DropDown
                          name="aoi"
                          label="AOI"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.aoi}
                          options={YesNo}
                        />
                    
                      </Col>
                      <Col sm="3">
                         <DropDown
                          name="drivers_license"
                          label="Drivers License"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.signed_agreement}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                            <DropDown
                          name="signed_agreement"
                          label="Signed Agreement"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.signed_agreement}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                               <DropDown
                          name="void_cheque"
                          label="Void Cheque"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.void_cheque}
                          options={YesNo}
                        />
                       
                      </Col>
                    </Row>
                    <Row >
                      <Col sm="3">
                        <DropDown
                          name="check_rebate"
                          label="Check Rebate"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.check_rebate}
                          options={YesNo}
                        />
                        
                       
                      </Col>
                      <Col sm="3">
                           <DropDown
                          name="retail_invoice"
                          label="FJ Rack Invoice"
                          control={control}
                        setValue={setValue}
                          defaultValueId={FullData.retail_invoice}
                          options={YesNo}
                        />
                      
                      </Col>
                      <Col sm="3">
                          <DropDown
                          name="ta_retail_invoice"
                          label="TA Petro Rack Invoice"
                             setValue={setValue}
                          control={control}
                          defaultValueId={FullData.ta_retail_invoice}
                          options={TaretailInvoice}
                        />
                      
                      </Col>
                      <Col sm="3">
                            <DropDown
                          name="esso_retail_invoice"
                          label="Esso Rack Invoice"
                             setValue={setValue}
                          control={control}
                          defaultValueId={FullData.esso_retail_invoice}
                          options={YesNo}
                        />
                     
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                       <DropDown
                          name="love_retail_invoice"
                          label="Loves Rack Invoice"
                             setValue={setValue}
                          control={control}
                          defaultValueId={FullData.ta_retail_invoice}
                          options={YesNo}
                        />
                      
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="supplier_fee"
                          label=" Show Supplier Fee (FJ)"
                          control={control}
                             setValue={setValue}
                          defaultValueId={FullData.supplier_fee}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                       <DropDown
                          name="ibp_adjustment"
                             setValue={setValue}
                          label="Show IBP Adjustment (TA)"
                          control={control}
                          defaultValueId={FullData.ibp_adjustment}
                          options={YesNo}
                        />
                      
                      </Col>
                      <Col sm="3">
                          <DropDown
                          name="pumping_fee"
                          label="Show Pumping Fee(LOVES)"
                             setValue={setValue}
                          control={control}
                          defaultValueId={FullData.pumping_fee}
                          options={YesNo}
                        />
                     
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                       <DropDown
                          name="net_price"
                          label="Show Net Price (ESSO)"
                             setValue={setValue}
                          control={control}
                          defaultValueId={FullData.net_price}
                          options={YesNo}
                        />
                   
                      </Col>
                      <Col sm="3">
                       <DropDown
                          name="esso_live"
                          label="Show (ESSO) Live Data"
                             setValue={setValue}
                          control={control}
                          defaultValueId={FullData.esso_live}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack"
                          label="ESSO Rack"
                          control={control}
                          placeholder="Select ESSO Rack"
                          defaultValueId={FullData.esso_rack}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="fee"
                          label="CADV FEE"
                             setValue={setValue}
                          control={control}
                          // placeholder="Select  Unit"
                          defaultValueId={FullData.fee}
                          options={YesNo}
                        />
                       
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                         <DropDown
                          name="sw_owner_invoice"
                          label="Show Owner Operator Invoice"
                             setValue={setValue}
                          control={control}
                          // placeholder="Select  Unit"
                          defaultValueId={FullData.sw_owner_invoice}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="self_owner_invoice"
                          label="Self Owner Operator Report"
                             setValue={setValue}
                          control={control}
                          // placeholder="Select  Unit"
                          defaultValueId={FullData.self_owner_invoice}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="sw_customised_inv"
                          label=" Show Customised Invoices"
                          control={control}
                             setValue={setValue}
                          placeholder="Select  Unit"
                          defaultValueId={FullData.sw_customised_inv}
                          options={YesNo}
                        />
                     
                      </Col>
                      <Col sm="3">
                       <DropDown
                          name="default_unit"
                          label="Default Unit"
                          control={control}
                             setValue={setValue}
                          placeholder="Select Default Unit"
                          defaultValueId={FullData.default_unit}
                          options={DefaultUnits}
                        />
                       
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <DropDown
                          name="default_driver"
                          label="Default Driver"
                          control={control}
                             setValue={setValue}
                          placeholder="Select Default Driver"
                          defaultValueId={FullData.default_driver}
                          options={DefaultUnits}
                        />
                    
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack_on"
                          label="ESSO Rack ON"
                          control={control}
                             setValue={setValue}
                          placeholder="Select ESSO Rack"
                          defaultValueId={FullData.esso_rack_on}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack_oon"
                          label="ESSO Rack OON"
                          control={control}
                             setValue={setValue}
                          placeholder="Select ESSO Rack"
                          defaultValueId={FullData.esso_rack_oon}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="susp_comp"
                          label="Suspicious Company"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.susp_comp}
                          options={YesNo}
                        />
                       
                       
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <DropDown
                          name="defd_mark_up"
                          label="DEFD Mark Up"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.defd_mark_up}
                          options={YesNo}
                        />
                       
                      </Col>
                      <Col sm="3">
                         <DropDown
                          name="daily_report"
                          label="Daily Volume Report"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.daily_report}
                          options={YesNo}
                        />
                        
                      </Col>
                    </Row>{" "}
                  </fieldset>

                  <Row className="mt-3">
                    <Col sm="12">
                      <fieldset>
                        <legend>Ultramar INVOICE TYPE</legend>
                        <Row className="mt-3">
                          <Col sm="6">
                           <DropDown
                          name="ul_inv_type"
                          label="Ultramar INVOICE TYPE"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.ul_inv_type}
                          options={YesNo}
                        />
                           
                          </Col>
                         
                          <Col sm="6">
                              <DropDown
                          name="ul_owner_operator_invoice"
                          label="Owner Operator Invoice"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.ul_owner_operator_invoice}
                          options={YesNo}
                        />
                        
                          </Col>
                          <Col sm="6">
                             <DropDown
                          name="ul_cust_inv_type"
                          label="Customized Invoice Type"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.ul_cust_inv_type}
                          options={customizedTypeType}
                        />
                           
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                    <Col sm="12">
                      <fieldset>
                        <legend>ESSO INVOICE TYPE</legend>
                        <Row className="my-3">
                          <Col sm="6">
                           <DropDown
                          name="esso_inv_type"
                          label="ESSO INVOICE TYPE"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.esso_inv_type}
                          options={invoiceType1}
                        />
                          
                          </Col>
                        
                          <Col sm="6">
                               <DropDown
                          name="owner_operator_invoice"
                          label="Owner Operator Invoice"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.owner_operator_invoice}
                          options={YesNo}
                        />
                          
                          </Col>
                          <Col sm="6">
                             <DropDown
                          name="cust_inv_type"
                          label="Customized Invoice Type"
                          setValue={setValue}
                          control={control}
                          defaultValueId={FullData.cust_inv_type}
                          options={customizedTypeType}
                        />
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                    <Col sm="12">
                      <fieldset>
                        <legend>Other Details</legend>
                        <Row className="mt-3">
                          <Col sm="3">
                            <DropDown
                              name="country_id"
                              label="Country"
                              control={control}
                              placeholder="Select Country"
                          setValue={setValue}
                          defaultValueId={FullData.country_id}
                              options={countries}
                            />
                          </Col>
                         
                          <Col sm="3">
                          
                            <FormGroup className="m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Discount For Canada
                                </InputGroupText>
                                <input
                                  className="form-control"
                                  name="discount_canada"
                                  type="text"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                         <Col sm="3">
  <div className="checkbox checkbox-dark">
    <Controller
      name="fees"
      control={control}
      render={({ field }) => (
        <Input
          id="checkbox1"
          type="checkbox"
          checked={field.value === "1"}
          onChange={(e) =>
            field.onChange(e.target.checked ? "1" : "0")
          }
        />
      )}
    />
    <Label for="checkbox1">Fees</Label>
  </div>
</Col>

                          {/* <Col sm="12">
                            <FormGroup className="m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Discount For USA
                                </InputGroupText>
                                <input
                                  className="form-control"
                                  name="discount_usa"
                                  type="text"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col> */}
                        </Row>
                      </fieldset>
                    </Col>
                  </Row>
                                 

  <Row>
   <fieldset>
  <legend>Fee Setting Check All</legend>

  <Row>
    {suppliers.map((item, index) => (
      <Col key={index} sm="6">
        <fieldset>
          <legend>{item.label} Check All </legend>

          <div className="checkbox checkbox-dark">

            {/* 👉 If ESSO MOBIL – show only 1 checkbox */}
            {item.label === "ESSO MOBIL" ? (
              <>
                <Input
                  id={`esso-${index}`}
                  type="checkbox"
                  name="pricing"
                  className="mx-3"
                  value="1"
                />
                <Label for={`esso-${index}`}>E-85</Label>
              </>
            ) : (
              /* 👉 Otherwise show all checkbox list */
              CompanySupplierCheckbox.map((v, i) => (
                <Fragment key={i}>
                  <Input
                    id={`chk-${index}-${i}`}
                    type="checkbox"
                    name="pricing"
                    className="mx-3"
                    value="1"
                  />
                  <Label for={`chk-${index}-${i}`}>{v.label}</Label>
                </Fragment>
              ))
            )}

          </div>
        </fieldset>
      </Col>
    ))}
  </Row>

</fieldset>

                  </Row>

                  <fieldset>
                    <legend>Daily Pricing</legend>
                    <Row className="my-3">
                      <Col sm="3">
  <div className="checkbox checkbox-dark">
    <Controller
      name="daily_pricing"
      control={control}
      render={({ field }) => (
        <Input
          id="checkbox1"
          type="checkbox"
          checked={field.value === "Yes"}
          onChange={(e) =>
            field.onChange(e.target.checked ? "Yes" : "")
          }
        />
      )}
    />
    <Label for="checkbox1">FJ Daily Pricing PDF</Label>
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
          checked={!!field.value}
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
                          defaultValue={FullData.ul_daily_pricing==='Yes'}
                          render={({ field }) => (
    <Input
      id="checkbox8"
      type="checkbox"
      checked={field.value}
      onChange={(e) => field.onChange(e.target.checked)}
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
  defaultValue={FullData?.love_daily_pricing === "Yes"}
  render={({ field }) => (
    <Input
      id="checkbox9"
      type="checkbox"
      checked={field.value}
      onChange={(e) => field.onChange(e.target.checked)}
    />
  )}
/>

                          <Label for="checkbox9">Loves Daily Pricing PDF</Label>
                        </div>
                      </Col>
                    </Row>
                  </fieldset>

                  <fieldset>
                    <legend>Invoice Setting</legend>
                    <Row className="mt-3 py-3">
                      {/* Invoice Creation */}
                      <Col sm="3">
                        {/* <DropDown
                          name="country_name"
                          label="Invoice Creation" 
                          control={control}
                          setValue={setValue}
                          placeholder="Select Country"
                        defaultValueId={FullData.country_id }
                        options={countries} 
                        /> */}
                        <FormGroup>
                          <InputGroup>
                            <InputGroupText>
                              Invoice Creation
                              <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                               {FullData.invoice_creation && (
                            <Controller
                              name="invoice_creation"
                              control={control}
                               defaultValue={invoiceCreation?.find(opt => opt.value === FullData.invoice_creation) || null}

                              rules={{required: "Invoice creation is required",
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={invoiceCreation}
                                  className="form-control p-0 border-0"
                                  placeholder="Select option"
                                  value={field.value}
                                 onChange={(val) => field.onChange(val)}
                                />
                              )}
                            />
                               )}
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
                            <InputGroupText>Invoice Pay Day</InputGroupText>
                            {FullData.invoice_day && (
                            <Controller
                              name="invoice_day"
                              control={control}
                              rules={{
                                required: "Invoice pay day is required",
                              }}
                               defaultValue={invoiceDay?.find(opt => opt.value === FullData.invoice_day) || null}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={invoiceDay}
                                  className="form-control p-0 border-0"
                                  placeholder="Select day"
                                    value={field.value}
                                 onChange={(val) => field.onChange(val)}
                                />
                              )}
                            />
                            )}
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
                            <InputGroupText>Invoice Week</InputGroupText>
                            <Controller
                              name="invoice_week"
                              control={control}
                              rules={{ required: "Invoice week is required" }}
                                 defaultValue={invoiceWeek?.find(opt => opt.value === FullData.invoice_week) || null}
                              render={({ field }) => (
                                
                                <Select
                                  {...field}
                                  options={invoiceWeek}
                                  className="form-control p-0 border-0"
                                  placeholder="Select week"
                                    value={field.value}
                                 onChange={(val) => field.onChange(val)}
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
                              defaultValue={customerType?.find(opt => opt.value === FullData.customer_type) || null}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={customerType}
                                  className="form-control p-0 border-0"
                                  placeholder="Select type"
                                    value={field.value}
                                 onChange={(val) => field.onChange(val)}
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
                          <Input
                            className="form-control"
                            type="text"
                            name="special_instructions"
                            defaultValue={FullData.special_instructions}
                          />
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
                            <Input
                              className="form-control"
                              type="text"
                              defaultValue={FullData.first_name}
                              name="first_name"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>
                              <FaUser className="mx-1 " /> Last Name
                            </InputGroupText>
                            <Input
                              className="form-control"
                              type="text"
                              defaultValue={FullData.last_name}
                              name="last_name"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>

                  <fieldset>
                    <legend>Account Details</legend>
                    <Row className="mt-3">
                    
                      <Col sm="4">
                      
                        <FormGroup>
                          <InputGroup>
                            <InputGroupText>
                              Card Discount Sheet Menu
                              <span className="text-danger fw-bold mx-1">
                                *
                              </span>
                            </InputGroupText>
                               {FullData.card_discount && (
                            <Controller
                              name="card_discount"
                              control={control}
                               defaultValue={YesNo?.find(opt => opt.value === FullData.card_discount) || null}
                              rules={{required: "Discount is required",
                              }}
                             
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
                               )}
                          </InputGroup>
                          {errors.invoice_creation && (
                            <span className="text-danger">
                              {errors.invoice_creation.message}
                            </span>
                          )}
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
                              value={FullData.email}
                             disabled
                              {...register("username")}
                            />
                          </InputGroup>
                          {errors.username && (
                            <span className="text-danger">
                              UserName is required
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
                          Update Company
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
