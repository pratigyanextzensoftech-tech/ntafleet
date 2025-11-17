import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form,FormGroup,InputGroup,InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import { add_user } from '../../../Constant';
import HeaderCard from '../../Common/Component/HeaderCard';
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select'
import { toast } from 'react-toastify';
import InputText from '../../Forms/FormControl/formInput/InputText';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import { companyLoginAccess, manageuserStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { administrator } from '../../../api'; // ✅ Adjust API endpoint if needed

const FormComponent = ({ onUserAdded,editUser,Edit_id,Edit,selectedRow,setEdit,onDataAdded }) => {
  console.log(Edit_id)
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues:{
      name:"",
      email:"",
      phone:"",
      company:"",
      password:"",
      status:"",
      company_login:""
    }
  });
useEffect(() => {
  if (Edit && selectedRow) {
    console.log(selectedRow)
    reset({
      name: selectedRow.name,
      email: selectedRow.email,
      phone: selectedRow.phone,
      company: selectedRow.company,
      password: selectedRow.password,
       status: {
          value: selectedRow.status,
          label: selectedRow.status==0?"Active":"Blocked"
        },
        company_login:{
           value: selectedRow.company_login,
          label: selectedRow.company_login==0?"Yes":"No"
        }
    });
  }
}, [Edit, selectedRow]);

  // ✅ Handle form submission
const onSubmit = async (formData) => {
  console.log(formData)
  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    password: formData.password,
    status: formData.status?.value, // dropdown gives {label, value}
    company_login: formData.company_login?.label,
    gender: "",
    pic: "",
    created: new Date().toISOString().slice(0, 19).replace("T", " "),
    admin_del: 0,
    added_by: 0,
  };

  try {
     if (Edit && selectedRow) {
      // 🟢 UPDATE (Edit mode)
      const res = await axios.put(`${administrator}/${selectedRow.id}`, payload);
      console.log("✅ User Updated:", res.data);
        if (onDataAdded) onDataAdded();

      toast.success("User updated successfully!");
    } else {
      // 🟢 ADD (Create mode)
      const res = await axios.post(administrator, payload);
      console.log("✅ User Added:", res.data);
      toast.success("User added successfully!");
      if (onUserAdded) {
        onUserAdded({
          ...payload,
          added_by: "1",
        });
      }
    }

    reset({
       name:"",
      email:"",
      phone:"",
      company:"",
      password:"",
      status:"",
      company_login:""
    }); // reset form after submit
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    toast.error("Something went wrong!");
  }
};


  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="4">
            <InputText
              name="name"
              label="Name"
              placeholder="Enter Name"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Name is required" }}
            />
          </Col>

          <Col md="4">
            <InputText
              name="email"
              label="Email"
              placeholder="Enter Email"
              type="email"
              register={register}
              errors={errors}
              rules={{ required: "Email is required" }}
            />
          </Col>

          <Col md="4">
            <InputText
              name="phone"
              label="Phone"
              placeholder="Enter Phone"
              type="number"
              register={register}
              errors={errors}
              rules={{ required: "Phone number is required" }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <InputText
              name="company"
              label="Company"
              placeholder="Enter Company"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Company is required" }}
            />
          </Col>

          <Col md={4}>
            <InputText
              name="password"
              label={!editUser?"Password":"New Password"}
              placeholder={!editUser?"Enter Password":"Enter New Password"}
              type="password"
              register={register}
              errors={errors}
              rules={{ required: "Password is required" }}
            />
          </Col>

          <Col md={4}>
           <FormGroup className="m-form__group">
              <InputGroup>
                <InputGroupText>User Status</InputGroupText>
                <Controller
                  name="status"
                  rules={{ required: "Status is required" }}

                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={manageuserStatus}
                      className="form-control p-0 border-0"
                      placeholder="Status is required"
                     value={field.value}
      onChange={(val) => field.onChange(val)}
                      />
                  
                  
                  )}
                />
              </InputGroup>

              {errors.status && (
                <span className="text-danger">{errors.status?.message}</span>
              )}
            </FormGroup>
            {/* <DropDown
              name="status"
              label="User Status"
              control={control}
              rules={{ required: "Status is required" }}
              placeholder="Select Status"
              options={manageuserStatus}
              autoSelectFirst={true} */}
             {/* value={manageuserStatus.find(opt => opt.value === field.value?.value)}
     onChange={(selected) => field.onChange(selected)}
            /> */}
          </Col>
        </Row>

        <Row>
          <Col md={4}>
           <FormGroup className="m-form__group">
              <InputGroup>
                <InputGroupText>Company Login Access</InputGroupText>
                <Controller
                  name="company_login"
                  rules={{ required: "Access is required" }}

                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={companyLoginAccess}
                      className="form-control p-0 border-0"
                      placeholder="Access is required"
                      value={field.value}
      onChange={(val) => field.onChange(val)}
                      />
                  
                  
                  )}
                />
              </InputGroup>

              {errors.company_login && (
                <span className="text-danger">{errors.company_login?.message}</span>
              )}
            </FormGroup>
         
          </Col>

          <Col md={8} className="text-end">
            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }}>
              {Edit?"Update User":'Add User'}
            </Btn>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default FormComponent;
