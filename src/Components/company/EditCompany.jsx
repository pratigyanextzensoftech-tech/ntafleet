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
  } = useForm();
  useEffect(() => {
    axios
      .get(`${company}/${company_id}`)
      .then((res) => {
        setFullData(res.data);
        console.log(res.data);
        // reset({
        //   company_name: res.data.company_name || "",
        //   email: res.data.email || "",
        //   email2: res.data.email2 || "",
        //   other_email: res.data.other_email || "",
        //   otp_email: res.data.otp_email || "",
        //   otp_email2: res.data.otp_email2 || "",
        //   otp_phone: res.data.otp_phone || "",
        //   logo: res.data.logo || "",
        //   address: res.data.address || "",
        //   street: res.data.street || "",
        //   city: res.data.city || "",
        //   location: res.data.location || "",
        //   auth_location: res.data.auth_location || "",
        //   province: res.data.province || "",
        //   postal_code: res.data.postal_code || "",
        //   country_name: res.data.country_name || "",
        //   phone: res.data.phone || "",
        //   fax: res.data.fax || "",
        //   mobile: res.data.mobile || "",
        //   company_type: res.data.company_type?.value || "0",
        //   website: res.data.website || "",
        //   country_id: res.data.country_id?.value || "0",
        //   country: res.data.country || "",
        //   salesman_id: res.data.salesman_id?.value || "0",
        //   policy_number: res.data.policy_number || "",
        //   company_status: res.data.company_status?.value || "",
        //   susp_comp: res.data.susp_comp?.value || "",
        //   defd_mark_up: res.data.defd_mark_up || "",
        //   daily_report: res.data.daily_report || "",
        //   identifier: res.data.identifier || "",
        //   irving: res.data.irving || "",
        //   fees: res.data.fees || "",
        //   shell_pricing: res.data.shell_pricing || "0",
        //   pilot_pricing: res.data.pilot_pricing || "0",
        //   discount_canada: res.data.discount_canada || "0",
        //   discount_usa: res.data.discount_usa || "0",
        //   rack_ca: res.data.rack_ca || "0",
        //   rack_us: res.data.rack_us || "0",
        //   aoi: res.data.aoi || "",
        //   drivers_license: res.data.drivers_license || "",
        //   signed_agreement: res.data.signed_agreement || "",
        //   void_cheque: res.data.void_cheque || "",
        //   check_rebate: res.data.check_rebate || "",
        //   retail_invoice: res.data.retail_invoice || "",
        //   ta_retail_invoice: res.data.ta_retail_invoice || "",
        //   esso_retail_invoice: res.data.esso_retail_invoice || "",
        //   esso_inv_type: res.data.esso_inv_type?.value || "",
        //   cust_inv_type: res.data.cust_inv_type?.value || "",
        //   ul_cust_inv_type: res.data.ul_cust_inv_type?.value || "",
        //   ul_inv_type: res.data.ul_inv_type?.value || "",
        //   esso_rcent: res.data.esso_rcent || "0",
        //   ul_rcent: res.data.ul_rcent || "0",
        //   esso_rack: res.data.esso_rack || "0",
        //   esso_rack_on: res.data.esso_rack_on || "0",
        //   esso_rack_oon: res.data.esso_rack_oon || "0",
        //   fee: res.data.fee || "",
        //   owner_operator_invoice: res.data.owner_operator_invoice?.value || "",
        //   ul_owner_operator_invoice:
        //     res.data.ul_owner_operator_invoice?.value || "",
        //   sw_owner_invoice: res.data.sw_owner_invoice?.value || "",
        //   self_owner_invoice: res.data.self_owner_invoice?.value || "",
        //   sw_customised_inv: res.data.sw_customised_inv?.value || "",
        //   default_unit: res.data.default_unit || "",
        //   default_driver: res.data.default_driver || "",
        //   love_retail_invoice: res.data.love_retail_invoice || "",
        //   supplier_fee: res.data.supplier_fee || "",
        //   ibp_adjustment: res.data.ibp_adjustment || "",
        //   pumping_fee: res.data.pumping_fee || "",
        //   net_price: res.data.net_price || "",
        //   daily_pricing: res.data.daily_pricing || "",
        //   ta_daily_pricing: res.data.ta_daily_pricing || "",
        //   esso_daily_pricing: res.data.esso_daily_pricing || "",
        //   esso_daily_pricing_wtax: res.data.esso_daily_pricing_wtax || "",
        //   love_daily_pricing: res.data.love_daily_pricing || "",
        //   ul_daily_pricing: res.data.ul_daily_pricing || "",
        //   ul_daily_pricing_wtax: res.data.ul_daily_pricing_wtax || "",
        //   invoice_creation:
        //     invoiceCreation.find(
        //       (opt) => opt.value === res.data.invoice_creation
        //     ) || null,
        //   invoice_day:
        //     invoiceDay.find((opt) => opt.value === res.data.invoice_day) ||
        //     null,

        //   invoice_week:
        //     invoiceWeek.find((opt) => opt.value === res.data.invoice_week) ||
        //     null,
        //   customer_type:
        //     customerType.find((opt) => opt.value === res.data.customer_type) ||
        //     null,

        //   special_instructions: res.data.special_instructions || "",
        //   first_name: res.data.first_name || "",
        //   last_name: res.data.last_name || "",
        //   card_discount: res.data.card_discount || "",
        //   username: res.data.username || "",
        //   password: res.data.password || "",
        //   date: res.data.date || "1970-01-01 00:00:00",
        //   esso_live: res.data.esso_live || "",
        //   remarks: res.data.remarks || "",
        //   rest_OTP: res.data.rest_OTP || "",
        //   last_login: res.data.last_login || "1970-01-01 00:00:00",
        //   lang: res.data.lang || "",
        //   lat: res.data.lat || "",
        //   login_failed: res.data.login_failed || "0",
        //   last_failed: res.data.last_failed || "1970-01-01 00:00:00",
        //   added_on: new Date().toISOString().slice(0, 19).replace("T", " "),
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      // Create request payload (if needed, map keys)
      const payload = {
        company_name: formData.company_name || "",
        otp_phone: formData.otp_phone || "",
        address: formData.address || "",
        auth_location: formData.auth_location || "",
        country_name: formData.country_name || "",
        phone: formData.phone || "",
        fax: formData.fax || "",
        mobile: formData.mobile || "",
        company_type: formData.company_type?.value || "0",
        country_id: formData.country_id?.value || "0",
        country: formData.country || "",
        policy_number: formData.policy_number || "",
        company_status: formData.company_status?.value || "",
        susp_comp: formData.susp_comp?.value || "",
        defd_mark_up: formData.defd_mark_up || "",
        daily_report: formData.daily_report || "",
        identifier: formData.identifier || "",
        irving: formData.irving || "",
        fees: formData.fees || "",
        shell_pricing: formData.shell_pricing || "0",
        pilot_pricing: formData.pilot_pricing || "0",
        discount_canada: formData.discount_canada || "0",
        discount_usa: formData.discount_usa || "0",
        rack_ca: formData.rack_ca || "0",
        rack_us: formData.rack_us || "0",
        aoi: formData.aoi || "",
        drivers_license: formData.drivers_license || "",
        signed_agreement: formData.signed_agreement || "",
        void_cheque: formData.void_cheque || "",
        check_rebate: formData.check_rebate || "",
        retail_invoice: formData.retail_invoice || "",
        ta_retail_invoice: formData.ta_retail_invoice || "",
        esso_retail_invoice: formData.esso_retail_invoice || "",
        esso_inv_type: formData.esso_inv_type?.value || "",
        cust_inv_type: formData.cust_inv_type?.value || "",
        ul_cust_inv_type: formData.ul_cust_inv_type?.value || "",
        ul_inv_type: formData.ul_inv_type?.value || "",
        esso_rcent: formData.esso_rcent || "0",
        ul_rcent: formData.ul_rcent || "0",
        esso_rack: formData.esso_rack || "0",
        esso_rack_on: formData.esso_rack_on || "0",
        esso_rack_oon: formData.esso_rack_oon || "0",
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
        love_daily_pricing: formData.love_daily_pricing || "",
        ul_daily_pricing: formData.ul_daily_pricing || "",
        ul_daily_pricing_wtax: formData.ul_daily_pricing_wtax || "",
        invoice_creation: formData.invoice_creation?.value || "",
        invoice_day: formData.invoice_day?.value || "",
        invoice_week: formData.invoice_week?.value || "",
        customer_type: formData.customer_type?.value || "",
        special_instructions: formData.special_instructions || "",
        first_name: formData.first_name || "",
        last_name: formData.last_name || "",
        card_discount: formData.card_discount || "",
        username: formData.username || "",
        password: formData.password || "",
        date: formData.date || "1970-01-01 00:00:00",
        esso_live: formData.esso_live || "",
        remarks: formData.remarks || "",
      };
      console.log("📤 Submitting data:", payload);
      const res = await axios.put(`${company}/${company_id}`, payload);
      console.log("✅ API Response:", res.data);
      toast.success("Company Updated Succesfully");
      //reset(); // Reset the form on success
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
                              defaultValue={FullData.company_name}
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
                              defaultValue={FullData.email}
                              disabled
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
                              disabled
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
                              disabled
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
                            <Input
                              className="form-control"
                              type="text"
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
                        defaultValueId={FullData.country}
                        options={countries} 
                        />
                      </Col>
                      <Col sm="3">
                        <InputGroup className="mb-3">
                          <InputGroupText>Company Type</InputGroupText>
                          <Select
                            options={optionscompany}
                            className="form-control p-0 border-0"
                            name="company_type"
                          />
                        </InputGroup>
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
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Company Status</InputGroupText>
                          <Select
                            options={companyStatus}
                            className="form-control p-0 border-0"
                            name="company_status"
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
                            <Input
                              className="form-control"
                              type="text"
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
                              type="text"
                              name="rack_us"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>AOI</InputGroupText>
                          <Select
                            options={YesNo}
                            className="form-control p-0 border-0"
                            name="aoi"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Drivers License</InputGroupText>
                          <Select
                            options={YesNo}
                            className="form-control p-0 border-0"
                            name="drivers_license"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Signed Agreement</InputGroupText>
                          <Select
                            options={YesNo}
                            className="form-control p-0 border-0"
                            name="signed_agreement"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="3">
                        <InputGroup>
                          <InputGroupText>Void Cheque</InputGroupText>
                          <Select
                            options={YesNo}
                            className="form-control p-0 border-0"
                            name="void_cheque"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Check Rebate</InputGroupText>
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="check_rebate"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>FJ Rack Invoice</InputGroupText>
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="retail_invoice"
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
                            <Select
                              options={TaretailInvoice}
                              className="form-control p-0 border-0"
                              name="ta_retail_invoice"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Esso Rack Invoice</InputGroupText>
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="esso_retail_invoice"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="love_retail_invoice"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="supplier_fee"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="ibp_adjustment"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="pumping_fee"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="net_price"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="esso_live"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack"
                          label="ESSO Rack"
                          control={control}
                          placeholder="Select ESSO Rack"
                          defaultValueId={0}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>CADV FEE</InputGroupText>
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="fee"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="sw_owner_invoice"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="self_owner_invoice"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="sw_customised_inv"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Default Unit</InputGroupText>
                            <Select
                              options={DefaultUnits}
                              className="form-control p-0 border-0"
                              name="default_unit"
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
                            <Select
                              options={DefaultUnits}
                              className="form-control p-0 border-0"
                              name="default_driver"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack_on"
                          label="ESSO Rack"
                          control={control}
                          placeholder="Select ESSO Rack"
                          defaultValueId={0}
                          options={essoRacks}
                        />
                      </Col>
                      <Col sm="3">
                        <DropDown
                          name="esso_rack_oon"
                          label="ESSO Rack"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="susp_comp"
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
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="defd_mark_up"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col sm="3">
                        <FormGroup className=" m-form__group">
                          <InputGroup>
                            <InputGroupText>Daily Volume Report</InputGroupText>
                            <Select
                              options={YesNo}
                              className="form-control p-0 border-0"
                              name="daily_report"
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
                          <Col sm="6">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Ultramar INVOICE TYPE
                                </InputGroupText>
                                <Select
                                  options={invoiceType1}
                                  className="form-control p-0 border-0"
                                  name="ul_inv_type"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                         
                          <Col sm="6">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Owner Operator Invoice
                                </InputGroupText>
                                <Select
                                  options={YesNo}
                                  className="form-control p-0 border-0"
                                  name="ul_owner_operator_invoice"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="6">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Customized Invoice Type
                                </InputGroupText>
                                <Select
                                  options={customizedTypeType}
                                  className="form-control p-0 border-0"
                                  name="ul_cust_inv_type"
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
                          <Col sm="6">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  ESSO INVOICE TYPE
                                </InputGroupText>

                                <Select
                                  options={invoiceType1}
                                  className="form-control p-0 border-0"
                                  name="esso_inv_type"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        
                          <Col sm="6">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Owner Operator Invoice
                                </InputGroupText>

                                <Select
                                  options={YesNo}
                                  className="form-control p-0 border-0"
                                  name="owner_operator_invoice"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col sm="6">
                            <FormGroup className=" m-form__group">
                              <InputGroup>
                                <InputGroupText>
                                  Customized Invoice Type
                                </InputGroupText>
                                <Select
                                  options={customizedTypeType}
                                  className="form-control p-0 border-0"
                                  name="cust_inv_type"
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
                          <Col sm="3">
                            <DropDown
                              name="country_id"
                              label="Country"
                              control={control}
                              placeholder="Select Country"
                          setValue={setValue}
                            defaultValue={countries?.find(opt => opt.value === FullData.country) || null}
                              options={countries}
                            />
                          </Col>
                          <Col sm="3">
                            <div className="checkbox checkbox-dark">
                              <Input
                                id="checkbox1"
                                type="checkbox"
                                name="fees"
                                value="1"
                              />
                              <Label for="checkbox1">Fees</Label>
                            </div>
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
          <legend>{item.label} Check All</legend>

          <div className="checkbox checkbox-dark">

            {/* 👉 If ESSO MOBIL – show only 1 checkbox */}
            {item.label === "ESSO MOBIL" ? (
              <>
                <Input
                  id={`esso-${index}`}
                  type="checkbox"
                  name="ta_daily_pricing"
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
                    name="ta_daily_pricing"
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
                          <Input
                            id="checkbox1"
                            type="checkbox"
                            name="daily_pricing"
                            value="1"
                          />
                          <Label for="checkbox1">FJ Daily Pricing PDF</Label>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox2"
                            type="checkbox"
                            name="ta_daily_pricing"
                            value="1"
                          />
                          <Label for="checkbox2">
                            Ta-Petro Daily Pricing PDF
                          </Label>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox3"
                            type="checkbox"
                            name="esso_daily_pricing"
                            value="1"
                          />
                          <Label for="checkbox3">
                            ESSO Daily Pricing PDF (With Tax)
                          </Label>
                        </div>
                      </Col>

                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox4"
                            type="checkbox"
                            name="esso_daily_pricing_wtax"
                            value="1"
                          />
                          <Label for="checkbox4">
                            ESSO Daily Pricing PDF (Without Tax)
                          </Label>
                        </div>
                      </Col>

                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox5"
                            type="checkbox"
                            name="pilot_pricing"
                            value="1"
                          />
                          <Label for="checkbox5">Pilot Flying J</Label>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox6"
                            type="checkbox"
                            name="shell_pricing"
                            value="1"
                          />
                          <Label for="checkbox6">Shell Flying J</Label>
                        </div>
                      </Col>

                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox7"
                            type="checkbox"
                            name="ul_daily_pricing"
                            value="1"
                          />
                          <Label for="checkbox7">
                            Ultramar Daily Pricing PDF (With Tax)
                          </Label>
                        </div>
                      </Col>

                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox8"
                            type="checkbox"
                            name="ul_daily_pricing_wtax"
                            value="1"
                          />
                          <Label for="checkbox8">
                            Ultramar Daily Pricing PDF (Without Tax)
                          </Label>
                        </div>
                      </Col>

                      <Col sm="3">
                        <div className="checkbox checkbox-dark">
                          <Input
                            id="checkbox9"
                            type="checkbox"
                            name="love_daily_pricing"
                            value="1"
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
