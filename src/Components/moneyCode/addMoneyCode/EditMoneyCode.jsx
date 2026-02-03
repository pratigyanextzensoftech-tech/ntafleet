import React, { useState,useEffect,Fragment } from 'react';
import Select from 'react-select'
import { MoneyCodeStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup,Card,CardBody, InputGroup, InputGroupText, Container } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import {money_code} from '../../../api/index'
import axios from 'axios';
import { toast } from 'react-toastify';
import InputText from '../../Forms/FormControl/formInput/InputText';
import {Breadcrumbs} from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import { useCompany } from '../../../Hooks/Dropdowns';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
import { useLocation } from "react-router-dom";
const EditMoneyCodeForm = ({btntitle}) => {
      const { state } = useLocation();
      const editData = state?.data ?? null;
        console.log(state.data)
    const [selectedValues, setSelectedValues] = useState([]);
    const{data}=useCompany()
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();
   
 const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };
const toDateObject = (value) => {
  if (!value) return null;

  // Handles "YYYY-MM-DD"
  const d = new Date(value + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
};

   useEffect(() => {
    reset({
      company: {
        value: editData.company_id,
        label: editData.company_name,
      },
      status: MoneyCodeStatus.find(
        (s) => s.value === String(editData.status)
      ),
      ref: editData.Ref,
      voided: editData.Voided,
      issueType: editData.IssueType,
      issueBy: editData.IssuedBy,
      issueTo: editData.IssuedTo,
      issueDate: toDateObject(editData?.IssuedDate) ,
      Fee: editData.Fee,
      originalAmt: editData.OriginalAmt,
      billdate: toDateObject(editData?.BillDate) ,
      checkNum: editData.CheckNum,
      dateUsed: editData.DateUsed,
      amountUsed: editData.AmountUsed,
      currency: editData.Currency,
      oneTime: editData.OneTime,
      exactAmount: editData.ExactAmt,
      expireDate: editData.ExpireDate,
      name: editData.Name,
      city: editData.City,
      state: editData.State,
      phone: editData.Phone,
      license: editData.DriverLicense,
      driverState: editData.DriverState,
      driverId: editData.DriverId,
      hubometer: editData.Hubometer,
      refeerHours: editData.ReeferHours,
      licenseState: editData.LicenseState,
      LicenseNo: editData.LicenseNumber,
      Odometer: editData.Odometer,
      PONo: editData.PONumber,
      TripNo: editData.TripNumber,
      trailNo: editData.TrailerNumber,
      unitNo: editData.UnitNumber,
      ControlNo: editData.ControlNumber,
      Birthday: editData.Birthday,
      ReeferTempatur: editData.ReeferTempatur,
      pinNo: editData.PINNumber,
      Subfleet: editData.Subfleet,
      Billing_Id: editData.BillingId,
      firstInitial: editData.FirstInital,
      LastName: editData.LastName,
      driverName: editData.DriverName,
      SSN: editData.SSN,
      notes: editData.Notes,
      mail_attachment: editData.mail_attachment,
    });
  
}, [ reset]);

    const onSubmit = (formData) => {
    
         const payload = {
   
  company_id: formData.company?.value || formData.company,
company_name: formData.company?.label || formData.company,
  status: formData.status?.value || formData.status,
  Ref:formData.ref||"",
  Voided:formData.voided||"",
  IssueType:formData.issueType||"",
IssuedBy:formData.issueType||"",
IssuedTo:formData.issueTo||"",
IssuedDate:formatDate(formData.issueDate)||"",
Fee:formData.Fee||"",
OriginalAmt:formData.originalAmt||"",
BillDate:formatDate(formData.billdate)||"",
CheckNum:formData.checkNum||"",
DateUsed:formData.dateUsed||"",
AmountUsed:formData.amountUsed||"",
Currency:formData.currency||"",
OneTime:formData.oneTime||"",
ExactAmt:formData.exactAmount||"",
ExpireDate:formData.expireDate||"",
Notes:formData.notes||"",
Name:formData.name||"",
City:formData.city||"",
State:formData.state||"",
Phone:formData.phone||"",
DriverLicense:formData.license||"",
DriverState:formData.driverState||"",
DriverId:formData.driverId||"",
Hubometer:formData.hubometer||"",
ReeferHours:formData.refeerHours||"",
LicenseState:formData.licenseState||"",
LicenseNumber:formData.LicenseNo||"",
Odometer:formData.Odometer||"",
PONumber:formData.PONo|| "",
    TripNumber: formData.TripNo||"",
    TrailerNumber: formData.trailNo||"",
    UnitNumber:formData.unitNo|| "",
    ControlNumber:formData.ControlNo|| "",
    Birthday: formData.Birthday||"",
    ReeferTempatur:formData.ReeferTempatur|| "",
    PINNumber:formData.pinNo|| "",
    Subfleet: formData.Subfleet||"",
    BillingId:formData.Billing_Id|| "",
    FirstInital:formData.firstInitial|| "",
    LastName: formData.LastName||"",
    DriverName:formData.driverName|| "",
    SSN: formData.SSN||"",
    mail_attachment: "",
    c: null,
    dated: new Date().toISOString().slice(0, 19).replace("T", " "),
         }
        
          axios.put(`${money_code}/${editData.id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
        //   if (onDataAdded) onDataAdded();
        
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    
   
      
            };

    const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setSelectedValues(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(item => item !== value);
            }
        });
    }
    return (
 <Fragment>
      <Breadcrumbs parent='Money Code' title=' Edit MoneyCode ' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Edit MoneyCode" />
              <CardBody>
        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >
                <Row className="my-3">
                       <Col xxl="3"  md="6" sm="12">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Company</InputGroupText>
                                <Controller name="company"
                                    rules={!editData?{ required: "company Name is required" }:""}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={data}
                                            className="form-control p-0 border-0"
                                            placeholder="Select Company Name"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.company && (
                                <span className="text-danger">{errors.company?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
               
 <Col xxl="3"  md="6" sm="12">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Status</InputGroupText>
                                <Controller name="status"
                                    rules={!editData?{ required: "Status is required" }:""}

                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={MoneyCodeStatus}
                                            className="form-control p-0 border-0"
                                            placeholder="Select status"
                                        />
                                    )}
                                />
                            </InputGroup>

                            {errors.status && (
                                <span className="text-danger">{errors.status?.message}</span>
                            )}
                        </FormGroup>
                    </Col>
         <Col xxl="3"  md="6" sm="12">
             <InputText
                            name="ref"
                            label="Ref#"
                            type="text"
                            register={register}
                        />
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                         <InputText
                            name="voided"
                            label="Voided"
                            type="text"
                            register={register}
                        />
                      
                        </Col>
          
             <Col xxl="3"  md="6" sm="12">
               <InputText
                            name="issueType"
                            label="Issue Type"
                            type="text"
                            register={register}
                        />
                 
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                              <InputText
                            name="issueBy"
                            label="Issued By"
                            type="text"
                            register={register}
                        />
                 
                        
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                            <InputText
                            name="issueTo"
                            label=" Issued To "
                            type="text"
                            register={register}
                        />
                      
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                            <DatePickerInput
                            name="issueDate"
                            control={control}              // ✅ make sure this is passed
                            label="Issued Date"
                            required="Required"
                        />
                
                    
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
                <InputText
                            name="Fee"
                            label="Fee "
                            type="text"
                            register={register}
                        />
                      
                       
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                              <InputText
                            name="originalAmt"
                            label="Original Amt "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                             <Col xxl="3"  md="6" sm="12">
                                <DatePickerInput
                            name="billdate"
                            control={control}              // ✅ make sure this is passed
                            label="Bill Date"
                            required="Required"
                        />
                             
                      
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="checkNum"
                            label=" Check Num "
                            type="text"
                            register={register}
                        />
                      
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
                 <InputText
                            name="dateUsed"
                            label=" Date Used "
                            type="text"
                            register={register}
                        /> 
                        </Col>            
                         <Col xxl="3"  md="6" sm="12">
                          <InputText
                            name="amountUsed"
                            label=" Amount Used "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="currency"
                            label="Currency "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                             <InputText
                            name="oneTime"
                            label="One Time "
                            type="text"
                            register={register}
                        />
                    
                  
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
               <InputText
                            name="exactAmount"
                            label=" Exact Amt "
                            type="text"
                            register={register}
                        />
                        
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                          <InputText
                            name="expireDate"
                            label="Expire Date "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                            <InputText
                            name="name"
                            label="Name "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                              <InputText
                            name="city"
                            label="City "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
               <InputText
                            name="state"
                            label="State "
                            type="text"
                            register={register}
                        />
                     
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="phone"
                            label="Phone "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                          <InputText
                            name="license"
                            label=" Driver License  "
                            type="text"
                            register={register}
                        />
                        
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                            <InputText
                            name="driverState"
                            label="Driver State  "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
                 <InputText
                            name="driverId"
                            label=" Driver Id  "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="hubometer"
                            label=" Hubometer  "
                            type="text"
                            register={register}
                        />
                         
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                              <InputText
                            name="refeerHours"
                            label=" Reefer Hours  "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                                 <InputText
                            name="licenseState"
                            label=" License State  "
                            type="text"
                            register={register}
                        />
              
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
               <InputText
                            name="LicenseNo"
                            label="License Number  "
                            type="text"
                            register={register}
                        />
                     
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="Odometer"
                            label="Odometer  "
                            type="text"
                            register={register}
                        />
                     
               
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                            <InputText
                            name="PONo"
                            label="PO Number  "
                            type="text"
                            register={register}
                        />
                     
                  
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                            <InputText
                            name="TripNo"
                            label="Trip Number  "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
           
             <Col xxl="3"  md="6" sm="12">
              <InputText
                            name="trailNo"
                            label=" Trailer Number  "
                            type="text"
                            register={register}
                        />
                      
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                          <InputText
                            name="unitNo"
                            label="Unit Number  "
                            type="text"
                            register={register}
                        />
                
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="ControlNo"
                            label="Control Number  "
                            type="text"
                            register={register}
                        />
                
                
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                                   <InputText
                            name="Birthday"
                            label="Birthday  "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
            
             <Col xxl="3"  md="6" sm="12">
                <InputText
                            name="ReeferTempatur"
                            label=" Reefer Tempatur  "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                          <InputText
                            name="pinNo"
                            label=" PIN Number  "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                               <InputText
                            name="Subfleet"
                            label="Subfleet  "
                            type="text"
                            register={register}
                        />
                        
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                               <InputText
                            name="Billing_Id"
                            label="Billing Id  "
                            type="text"
                            register={register}
                        />
                          
                        </Col>
                        
           
             <Col xxl="3"  md="6" sm="12">
                  <InputText
                            name="firstInitial"
                            label=" First Inital  "
                            type="text"
                            register={register}
                        />
                          
               
                        </Col>
                       
                         <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="LastName"
                            label="LastName  "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                          <Col xxl="3"  md="6" sm="12">
                           <InputText
                            name="driverName"
                            label="Driver Name  "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                         <Col xxl="3"  md="6" sm="12">
                             <InputText
                            name="SSN"
                            label="SSN  "
                            type="text"
                            register={register}
                        />
                         
                        </Col>
                        
          
             <Col xxl="12"  md="6" sm="12">
                <InputText
                            name="notes"
                            label="Notes  "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
                       
                        
          
            <Col xxl="10"  md="6" sm="12">
               <InputText
                            name="mail_attachment"
                            label="Mail Attachment  "
                            type="file"
                            register={register}
                        />
            {/* <Row>
                                        <Col className='px-0' sm="2">
            
                                            <InputGroupText className='h-100'> Mail Attachment</InputGroupText>
                                        </Col>
                                        <Col className='px-0' sm="10">
            
                                            <Input style={{border:"1px solid #ccc"}} className="form-control w-100c " type="file" />
                                        </Col>
                                                        </Row> */}

                </Col>
<Col  xxl="2"  md="12" sm="12" >
                    <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{!editData?btntitle:"Update Moneycode"}</Btn>
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
    )
}


export default EditMoneyCodeForm
