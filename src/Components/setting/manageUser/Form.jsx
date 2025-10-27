import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import { add_user } from '../../../Constant';
import HeaderCard from '../../Common/Component/HeaderCard';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputText from '../../Forms/FormControl/formInput/InputText';
import DropDown from '../../Forms/FormControl/formInput/DropDown';
import { companyLoginAccess, manageuserStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { administrator } from '../../../api'; // ✅ Adjust API endpoint if needed

const FormComponent = ({ onUserAdded,editUser }) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
 useEffect(() => {
  console.log(editUser)
    if (editUser) {
      setValue("name", editUser.name);
      setValue("email", editUser.email);
      setValue("phone", editUser.phone);
      setValue("company", editUser.company);
     // setValue("password", editUser.password ); // optional
      setValue("status", {
        value: editUser.status,
        label: editUser.status == "0" ? "Active" : "Blocked",
      });
      setValue("company_login", {
        value: editUser.company_login,
        label: editUser.company_login,
      });
    } else {
      reset();
    }
  }, [editUser, setValue, reset]);
  // ✅ Handle form submission
  const onSubmit = async (formData) => {
    try {
      console.log("📤 Submitting data:", formData);

      // Create request payload (if needed, map keys)
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        password: formData.password,
        status: formData.status?.value, // DropDown gives object with label & value
        company_login: formData.company_login?.value,
        gender:"",
        pic:"",
        created:new Date().toISOString().slice(0, 19).replace('T', ' '), 
        admin_del:0,
        added_by:0, 
      };

      // ✅ POST request
      const res = await axios.post(administrator, payload);

      console.log("✅ API Response:", res.data);
      toast.success("Add Succesfully")

    if (onUserAdded) {
        onUserAdded({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          password: payload.password,
          company: payload.company,
          added_by: "1",
          company_login: payload.company_login,
          status: payload.status,
          gender:"",
        pic:"",
        created:new Date().toISOString().slice(0, 19).replace('T', ' '), 
        admin_del:0,
        added_by:0,
        });
      }
      reset(); // Reset the form on success
    } catch (error) {
      console.error("❌ Error submitting form:", error);
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
            <DropDown
              name="status"
              label="User Status"
              control={control}
              rules={{ required: "Status is required" }}
              placeholder="Select Status"
              options={manageuserStatus}
              autoSelectFirst={true}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <DropDown
              name="company_login"
              label="Company Login Access"
              control={control}
              rules={{ required: "Access is required" }}
              options={companyLoginAccess}
            />
          </Col>

          <Col md={8} className="text-end">
            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }}>
              {add_user}
            </Btn>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default FormComponent;
