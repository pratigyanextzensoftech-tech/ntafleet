import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import {
  optionscompany,
  Upload_Supplier,
  currency,
  YesNo,
  InvoiceStatus,
  cardStatus,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import InputText from "../../Forms/FormControl/formInput/InputText";
import { useCountry } from "../../../Hooks/Dropdowns";
import { useLocation,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fual_card } from "../../../api";
import axios from "axios";
import { toast } from "react-toastify";
import { fual_card as APINAME,fual_card_update } from "../../../api"; // your fuel card API endpoint
import { useCompany, useSupplier } from "../../../Hooks/Dropdowns";
import Loader from "../../../Layout/Loader";
const Index = () => {
  const { data: supplierOption } = useSupplier();
  const[oldData,setOldData]=useState([])
  const[loading,setLoading]=useState(false)
  const { state } = useLocation();
  const navigate=useNavigate()
   const { id } = useParams();
    const Id = atob(decodeURIComponent(id));
  // const rowData = state?.data;
  console.log("Received Edit Data:", Id);
  const { data } = useCompany();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
 useEffect(() => {
  const fetchFuelCard = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${fual_card}/${Id}`);
      if (res.data) {
        reset({
          cardNo: res.data.card_no,
          policyNo: res.data.policy,
          unitNo: res.data.unit_number,
          pinNo: res.data.pin_number,
          driverName: res.data.driver_name,
          driverMobile: res.data.d_mobile1,
          driverMobile2: res.data.d_mobile2,

          company: {
            value: res.data.company_id,
            label: res.data.company_name,
          },
          supplier: {
            value: res.data.supplier_id,
            label: res.data.supplier_name,
          },
          cardStatus: {
            value: res.data.status,
            label: res.data.status,
          },
        });
        setLoading(false)
setOldData(res.data)
      }
    } catch (error) {
      console.error("Error fetching full row data", error);
    }
  };
  if (Id) {
    fetchFuelCard();
  }
}, [Id, reset]);

  const onSubmit = (formData) => {
    setLoading(true)
    console.log("Form Data:", formData);
        const payload = {
      card_no: formData.cardNo,
      policy: formData.policyNo,
      unit_number: formData.unitNo,
      pin_number: formData.pinNo,
      company_id: formData.company.value,
      supplier_id: formData.supplier.value,
      driver_name: formData.driverName,
      d_mobile1: formData.driverMobile,
      d_mobile2: formData.driverMobile2,
      status: formData.cardStatus.label,
      supplier_name: formData.supplier.label,
      cardno: formData.cardNo.slice(-5),
      company_name: formData.company.label,
      update_otp: "",
    };
     const otpres=   axios.put(`${fual_card_update}/${Id}`, payload)
      .then((res) => {
        console.log(res);
        toast.success("Update successfully!");
      setLoading(false)

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

        const Data={
      newData:payload,
      oldData:oldData,
      otpres:otpres.data
    }
    console.log(payload)

    navigate(`/edit-information/${Id}`, {
      state: { data: Data }
    });
    
      
          axios.put(`${APINAME}/${Id}`, payload)
      .then((res) => {
        console.log(res);
        toast.success("Update successfully1!");

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <Fragment>
         {loading===true && ( < Loader loading={loading}/> )}
      <Breadcrumbs parent="Transaction" title="Edit Unknown Transaction " />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="my-3">
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Card Number </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="number"
                            {...register("cardNo")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Policy Number </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="number"
                            {...register("policyNo")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Unit Number </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="number"
                            {...register("unitNo")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Pin Number </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="number"
                            {...register("pinNo")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col  xl='4' md="6">
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <InputGroupText>Company</InputGroupText>
                          <Controller
                            name="company"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={data}
                                className="form-control p-0 border-0"
                                placeholder="Select Company Name"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
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

                    <Col  xl='4' md="6">
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <InputGroupText>Supplier</InputGroupText>
                          <Controller
                            name="supplier"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={
                                  supplierOption // your normal supplier array
                                }
                                className="form-control p-0 border-0"
                                placeholder="Select supplier"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                              />
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
               
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Driver Name </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="text"
                            {...register("driverName")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Driver Mobile 1 </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="text"
                            {...register("driverMobile")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col  xl='4' md="6">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Driver Mobile 2 </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="text"
                            {...register("driverMobile2")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                
                    <Col xl='4' md="6">
                      <FormGroup className="m-form__group">
                        <InputGroup>
                          <InputGroupText>Card Status</InputGroupText>
                          <Controller
                            name="cardStatus"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={
                                  cardStatus // your normal supplier array
                                }
                                className="form-control p-0 border-0"
                                placeholder="Select Card Status"
                                value={field.value}
                                onChange={(val) => field.onChange(val)}
                              />
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col  xl='8' md="12">
                      <div className="text-end">
                        <Btn
                          attrBtn={{
                            color: "primary",
                            className: "m-r-15",
                            type: "submit",
                          }}
                        >
                          Update
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
