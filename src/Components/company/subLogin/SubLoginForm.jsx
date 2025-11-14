import React,{useEffect} from "react";
import {
  Form,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import {
  companyLoginAccess,
  optionscompany,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import { useForm, Controller } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import { useCompany } from "../../../Hooks/Dropdowns";
import axios from "axios";
import { toast } from "react-toastify";
import { sub_company as APINAME } from "../../../api";

const SubLoginForm = ({ btnTtitle,onDataAdded,selectedRow,Edit,setEdit,setSelectedRow }) => {
  const{data}=useCompany()
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm({
      defaultValues: {
    Name: "",
    email: "",
    otpEmail: "",
    card: null,
    company: null,
    userName: "",
    password: "",
  }
  });
useEffect(() => {
  console.log(selectedRow)
    if (Edit && selectedRow) {
      reset({
        Name: selectedRow.name,
        email: selectedRow.email , // prefill dropdown
      otpEmail: selectedRow.otp_email, 
      card: selectedRow.card_discount, 
      // tax: selectedRow.company.value,
           company: {
        value: selectedRow["company_id"],
        label: selectedRow["company_id"]
      } ,
      // company: selectedRow.company_id, 
      userName: selectedRow.username, 
      password: selectedRow.password, 
      added_by: selectedRow.Added_By,
      added_on:selectedRow.Added_On
      });
    }
  }, [Edit, selectedRow, reset]);
  const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
    name: formData.Name,
    email:formData.email,
    otp_email:formData.otpEmail,
    card_discount:formData.card.value,
company_id:formData.company.value,
username:formData.userName,
password:formData.password,
added_by:sessionStorage.getItem("userId"),
added_on: new Date()
     }

      if (Edit && selectedRow) {
          axios.put(`${APINAME}/${selectedRow.id}`, payload)
        .then((res) => {
          toast.success("Supplier updated successfully!");
          setSelectedRow(null);
          setEdit(false);
 reset({
        Name: "",
        email: "",
        otpEmail: "",
        card: null,
        company: null,
        userName: "",
        password: "",
      });

          if (onDataAdded) onDataAdded(res.data);

        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    }
    else{
 axios.post(APINAME,payload)
    .then((res)=>{
        console.log(res);
       
          toast.success("Add successfully!");
   reset();

    // ✅ Immediately update UI
    if (onDataAdded) onDataAdded(res.data);

    })
    .catch((err)=>{
        console.log(err);
          toast.error(err.message);
    })
    }
   
        };
  return (
    <div>
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Row>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Name</InputGroupText>
                  <input
                    className="form-control"
                    type="text"
                    {...register("Name", { required: true })}
                  />
                </InputGroup>

                {errors.Name && (
                  <span className="text-danger"> Name is required</span>
                )}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>
                    <MdEmail className="mx-1" /> Email
                  </InputGroupText>
                  <input
                    className="form-control"
                    style={{ border: "1px solid #ccc" }}
                    type="text"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </InputGroup>
                {errors.email && (
                  <span className="text-danger">{errors.email?.message}</span>
                )}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className=" m-form__group">
                <InputGroup>
                  <InputGroupText>
                    {" "}
                    <MdEmail className="mx-1 " /> Otp Email{" "}
                  </InputGroupText>
                  <input
                    style={{ border: "1px solid #ccc" }}
                    name="otpEmail"
                    className="form-control"
                    type="text"
                    {...register("otpEmail", {
                      required: "Otp Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </InputGroup>
                {errors.otpEmail && (
                  <p className="text-danger">{errors.otpEmail?.message}</p>
                )}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Card Discount Sheet Menu</InputGroupText>
                  <Controller
                    name="card"
                    rules={{ required: " required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={companyLoginAccess}
                        className="form-control p-0 border-0"
                        placeholder="Select  "
                        value={field.value}   // ✅ FIXED
      onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </InputGroup>

                {errors.card && (
                  <span className="text-danger">{errors.card?.message}</span>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Company</InputGroupText>
                  <Controller
                    name="company"
                    rules={{ required: "company Name is required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={data}
                        className="form-control p-0 border-0"
                        placeholder="Select Company Name"
                        value={field.value}   // ✅ FIXED
      onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </InputGroup>
                {errors.company && (
                  <span className="text-danger">{errors.company?.message}</span>
                )}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className=" m-form__group">
                <InputGroup>
                  <InputGroupText>
                    {" "}
                    <FaUser className="mx-1 " /> Username{" "}
                    <span className="text-danger fw-bold  mx-1">*</span>
                  </InputGroupText>
                  <input
                    style={{ border: "1px solid #ccc" }}
                    className="form-control"
                    type="text"
                    {...register("userName", { required: true })}
                  />
                </InputGroup>
                {errors.userName && (
                  <span className="text-danger">UserName is required</span>
                )}
              </FormGroup>
            </Col>
            <Col sm="3">
              <FormGroup className=" m-form__group">
                <InputGroup>
                  <InputGroupText>
                    {" "}
                    <RiLockPasswordFill className="mx-1 " /> Password{" "}
                    <span className="text-danger fw-bold  mx-1">*</span>{" "}
                  </InputGroupText>
                  <input
                    style={{ border: "1px solid #ccc" }}
                    className="form-control"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Must include uppercase, lowercase, number & special character",
                      },
                    })}
                  />
                </InputGroup>

                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </FormGroup>
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
                  {Edit?"Update":btnTtitle}
                </Btn>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Form>
    </div>
  );
};

export default SubLoginForm;
