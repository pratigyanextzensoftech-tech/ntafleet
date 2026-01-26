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
  } = useForm(
  //   {
  //     defaultValues: {
  //   Name: "",
  //   email: "",
  //   otpEmail: "",
  //   card: null,
  //   company: null,
  //   userName: "",
  //   password: "",
  // }
  // }
);
useEffect(() => {
  if (Edit && selectedRow) {
console.log(selectedRow)
  const selectedCompany = data?.find(
      (item) => item.value === selectedRow.company_id
    );
    const cardDiscount = companyLoginAccess?.find(
      (item) => item.value === selectedRow.card_discount == '0' ? "Yes" : "No"
    );
  
console.log(data)
    reset({
      Name: selectedRow.name,
      email: selectedRow.email,
      otpEmail: selectedRow.otp_email,

    company: 
         {
            value:selectedCompany.value ,
            label: selectedCompany.label,
          }
        ,

      card: {
        value: cardDiscount.value,
        label: cardDiscount.label
      },

      userName: selectedRow.username,
      password: selectedRow.password,
      added_by: selectedRow.Added_By,
      added_on: selectedRow.Added_On
    });
  }
}, [Edit, selectedRow, reset]);

  const onSubmit = (formData) => {
                        console.log("Form Data:", formData);  // ✅ This will print your inputs

     const payload = {
    name: formData.Name,
    email:formData.email,
    otp_email:formData.otpEmail,
    card_discount:formData.card.label,   
    company_name:formData.company.label,
company_id:formData.company.value,
username:formData.userName,
password:formData.password,
added_by:localStorage.getItem("userId"),
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
        card: {
          value:"",
          label:""
        },
  company: {
    value: "",
    label: ""
  },
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
            <Col  xxl="3" xl="4"  md="6" sm="12">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Name</InputGroupText>
                  <input
                    className="form-control"
                    type="text"
                   {...register("Name", {
        required: !Edit ? "Name is required" : false, // ⬅️ only validate when !Edit
      })}
                  />
                </InputGroup>

                {errors.Name && (
                  <span className="text-danger"> Name is required</span>
                )}
              </FormGroup>
            </Col>
            <Col xxl="3" xl="4"  md="6" sm="12">
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
        required: !Edit ? "Email is required" : false,
        pattern:
          !Edit
            ? {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              }
            : undefined,
      })}
    />
  </InputGroup>

  {!Edit && errors.email && (
    <span className="text-danger">{errors.email.message}</span>
  )}
</FormGroup>

            </Col>
            <Col xxl="3" xl="4"  md="6" sm="12">
         <FormGroup className="m-form__group">
  <InputGroup>
    <InputGroupText>
      <MdEmail className="mx-1" /> Otp Email
    </InputGroupText>

    <input
      style={{ border: "1px solid #ccc" }}
      name="otpEmail"
      className="form-control"
      type="text"
      {...register("otpEmail", {
        required: !Edit ? "Otp Email is required" : false,
        pattern: !Edit
          ? {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            }
          : undefined,
      })}
    />
  </InputGroup>

  {!Edit && errors.otpEmail && (
    <p className="text-danger">{errors.otpEmail.message}</p>
  )}
</FormGroup>

            </Col>
            <Col xxl="3" xl="4"  md="6" sm="12">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Card Discount Sheet Menu</InputGroupText>
                  <Controller
                    name="card"
                    rules={!Edit &&{ required: " required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={companyLoginAccess}
                        className="form-control p-0 border-0"
                        placeholder="Select  "
         value={field.value}
      onChange={(val) => field.onChange(val)}
           
                      />
                    )}
                  />
                </InputGroup>

                {!Edit && errors.card && (
                  <span className="text-danger">{errors.card?.message}</span>
                )}
              </FormGroup>
            </Col>
         
            <Col xxl="3" xl="4"  md="6" sm="12">
              <FormGroup className="m-form__group">
                <InputGroup>
                  <InputGroupText>Company</InputGroupText>
                  <Controller
                    name="company"
                    rules={!Edit &&{ required: "company Name is required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={data}
                        className="form-control p-0 border-0"
                        placeholder="Select Company "
                       value={field.value}
      onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </InputGroup>
                {!Edit && errors.company && (
                  <span className="text-danger">{errors.company?.message}</span>
                )}
              </FormGroup>
            </Col>
            <Col xxl="3" xl="4"  md="6" sm="12">
              <FormGroup className="m-form__group">
  <InputGroup>
    <InputGroupText>
      <FaUser className="mx-1" /> Username
      <span className="text-danger fw-bold mx-1">*</span>
    </InputGroupText>

    <input
      style={{ border: "1px solid #ccc" }}
      className="form-control"
      type="text"
      {...register("userName", {
        required: !Edit ? "UserName is required" : false,
      })}
    />
  </InputGroup>

  {!Edit && errors.userName && (
    <span className="text-danger">{errors.userName.message}</span>
  )}
</FormGroup>

            </Col>
            <Col xxl="3" xl="4"  md="6" sm="12">
             <FormGroup className="m-form__group">
  <InputGroup>
    <InputGroupText>
      <RiLockPasswordFill className="mx-1" /> Password{" "}
      <span className="text-danger fw-bold mx-1">*</span>
    </InputGroupText>

    <input
      style={{ border: "1px solid #ccc" }}
      className="form-control"
      type="password"
      {...register("password", {
        required: !Edit ? "Password is required" : false,
        minLength: !Edit
          ? {
              value: 8,
              message: "Password must be at least 8 characters",
            }
          : undefined,
        pattern: !Edit
          ? {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Must include uppercase, lowercase, number & special character",
            }
          : undefined,
      })}
    />
  </InputGroup>

  {!Edit && errors.password && (
    <span className="text-danger">{errors.password.message}</span>
  )}
</FormGroup>

            </Col>

            <Col xxl="3" xl="8"  md="6" sm="12">
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
