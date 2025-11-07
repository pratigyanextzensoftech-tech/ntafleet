import React, { useState, Fragment, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  CardBody,
  Input,
  InputGroup,
  Container,
  InputGroupText,
  FormGroup,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm,Controller } from "react-hook-form";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import DatePicker from 'react-datepicker'
import useCompany from "../../../Hooks/useCompany";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import InputText from "../../Forms/FormControl/formInput/InputText";
import axios from "axios";
import { tcheck } from "../../../api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const TcheckEditForm = ({}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const[file,setFile]=useState('')
    const [createDate, setCreateDate] = useState(new Date());
  
  const [Data, setData] = useState([]);
  const { companies: companyOptions, loading: companyLoading } = useCompany();
  const { id } = useParams();
  const decodedId = atob(id);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  const handleFileChange = (e) => {
setFile(e.target.files[0])
  };
  useEffect(() => {
    // if (decodedId) {
      axios
        .get(`${tcheck}/${decodedId}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
            reset({
          company: { value: res.data.company_id, label: res.data.company_name },
          expressCode: res.data.express_code  ,
          dollarAmt: res.data.dollar_amt,
          fees: res.data.fees,
          genType: res.data.generation_type,
          createdId: res.data.create_id,
          reason: res.data.reason,
          driverId: res.data.driver_id,
          tractor: res.data.tractor,
          trip: res.data.trip,
          driverCdl: res.data.driver_cdl,
          trailor: res.data.trailor,
          user1: res.data.user1,
          user2: res.data.user2,
          memo: res.data.memo,
          createDate: res.data.create_date
        });
        })
        .catch((err) => console.error("Failed to fetch record:", err));
    // }
  }, [reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs

    try {
      // Create request payload (if needed, map keys)
      const payload = {
        company_name: data.company.value, // from your form field
        create_date: data.createDate, // static example
        create_id: data.createdId, // from form
        dollar_amt: data.dollarAmt,
        driver_cdl: data.driverCdl,
        driver_id: data.driverId,
        express_code: data.expressCode,
        fees: data.fees,
        generation_type: data.genType,
        id: 2075, // static or data.id
        idby: 22, // static or data.idby
        mail_attachment: file,
        memo: data.memo,
        payee: data.payee,
        reason: data.reason,
        tractor: data.tractor,
        trailer: data.trailor,
        trip: data.trip,
        user1_label: data.user1,
        user2_label: data.user2,
      };
      // setData(payload);
      console.log("📤 Submitting data:", payload);
      const res = await axios.put(`${tcheck}/${Data.company_id}`, payload);
      console.log(`${tcheck}/${Data.company_id}`)
      console.log("✅ API Response:", res.data);
      toast.success(" Updated Succesfully");
      //reset(); // Reset the form on success
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };
  const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedValues((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Tcheck" title="T Check List " />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mt-3">
                    <Col sm="4">
                      <DropDown
                        name="company"
                        label="Company"
                        control={control}
                        errors={errors}
                        defaultValueId={Data.company_id}
                        placeholder="Select Company"
                        // loading={companyLoading}
                        options={companyOptions}
                      />
                    </Col>
                    <Col sm="4">
                   
                      <Row>
                     
                      <FormGroup className="m-form__group ">
                                          <InputGroup>
                                                       <Col sm="3">
           
                      <InputGroupText>Create Date</InputGroupText>
                     </Col>
                        <Col sm="9">
                        <Controller
                          name="createDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              className="form-control "
                              selected={createDate}
                              onChange={(date) => {
                                setCreateDate(date);
                                field.onChange(date);
                              }}
                              dateFormat="yyyy-MM-dd"
                            />
                          )}
                        />
                        {errors.pricingDate && (
                          <span className="text-danger">
                            {errors.pricingDate.message}
                          </span>
                        )}
                      </Col>
                    </InputGroup>
                  </FormGroup>
                   </Row>
                </Col>
                  
                    <Col sm="4">
                 
                       <InputText
                        name="expressCode"
                        label="Express Code"
                        type="text"
                        register={register}
                        // value={Data.express_code}
                      /> 
                 
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="4">
                      <InputText
                        name="dollarAmt"
                        label="Dollar Amt"
                        type="text"
                        register={register}
                        // value={Data.dollar_amt}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="fees"
                        // value={Data.fees}
                        label="Fees"
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="genType"
                        label="Generation Type"
                        type="text"
                        register={register}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <InputText
                        name="createdId"
                        label="Created ID"
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="reason"
                        label="Reason"
                        // value={Data.reason}
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="driverId"
                        label="Driver ID "
                        type="text"
                        register={register}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <InputText
                        name="tractor"
                        label="Tractor #"
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="trip"
                        label="Trip #"
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="driverCdl"
                        label="Driver CDL "
                        type="text"
                        register={register}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <InputText
                        name="trailor"
                        label="Trailer#"
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="user1"
                        label="User 1 Label"
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="4">
                      <InputText
                        name="user2"
                        label="User 2 Label "
                        type="text"
                        register={register}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <InputText
                        name="memo"
                        label="Memo"
                        // value={Data.memo}
                        type="text"
                        register={register}
                      />
                    </Col>
                    <Col sm="8">
                      <Row>
                        <Col className="pe-0" sm="3">
                          <InputGroupText>File</InputGroupText>
                        </Col>
                        <Col className="px-0" sm="9">
                          <Input
                            type="file"
                            className="form-control"
                            style={{ border: "1px solid #ccc" }}
                            accept=".csv"
                            onChange={handleFileChange}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      Update Tcheck
                    </Btn>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default TcheckEditForm;
