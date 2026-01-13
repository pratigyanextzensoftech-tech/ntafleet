import React, { useState } from 'react';
import Select from 'react-select'
import { MoneyCodeStatus } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { Row, Col, Form, FormGroup,  InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm, Controller } from 'react-hook-form';
import {money_code} from '../../../api/index'
import axios from 'axios';
import { toast } from 'react-toastify';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useCompany } from '../../../Hooks/Dropdowns';
import DatePickerInput from '../../Forms/FormControl/formInput/DatePickerInput';
const AddMoneyCodeForm = ({btntitle}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const[Edit,setEdit]=useState(false)
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
  
              axios.post(money_code,payload)
        .then((res)=>{
            console.log(res);  
              toast.success("Add successfully!");
       reset({company:"",
        status:"",
        ref:"",
        voided:"",
        issueType:"",
        issueBy:"",
        issueTo:"",
        issueDate:"",
        Fee:"",
        originalAmt:"",
        billdate:"",
        checkNum:"",
        dateUsed:"",
        amountUsed:"",
        currency:"",
        oneTime:"",
        exactAmount:"",
        expireDate:"",
        name:"",
        city:"",
        state:"",
        phone:"",
        license:"",
        driverState:"",
        driverId:"",
        hubometer:"",
        refeerHours:"",
        licenseState:"",
        LicenseNo:"",
        Odometer:"",
        PONo:"",
        TripNo:"",
        trailNo:"",
        unitNo:"",
        ControlNo:"",
        Birthday:"",
        ReeferTempatur:"",
        pinNo:"",
       Subfleet:"" ,
       Billing_Id:"",
        firstInitial:"",
        LastName:"",
        driverName:"",
        SSN:"",
        notes:"",
        mail_attachment:""

    });
    
        })
        .catch((err)=>{
            console.log(err);
              toast.error(err.message);
        })    
            };


    return (

        <Form noValidate='' onSubmit={handleSubmit(onSubmit)}  >

             
                <Row className="mt-3">
                       <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Company</InputGroupText>
                                <Controller name="company"
                                    rules={{ required: "company Name is required" }}

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
               
 <Col sm="3">
                        <FormGroup className="m-form__group">
                            <InputGroup >
                                <InputGroupText>Status</InputGroupText>
                                <Controller name="status"
                                    rules={{ required: "Status is required" }}

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
         <Col sm='3'>
             <InputText
                            name="ref"
                            label="Ref#"
                            type="text"
                            register={register}
                        />
                        </Col>
                         <Col sm='3'>
                         <InputText
                            name="voided"
                            label="Voided"
                            type="text"
                            register={register}
                        />
                      
                        </Col>
           <Row>
             <Col sm='3'>
               <InputText
                            name="issueType"
                            label="Issue Type"
                            type="text"
                            register={register}
                        />
                 
                        </Col>
                         <Col sm='3'>
                              <InputText
                            name="issueBy"
                            label="Issued By"
                            type="text"
                            register={register}
                        />
                 
                        
                        </Col>
                         <Col sm='3'>
                            <InputText
                            name="issueTo"
                            label=" Issued To "
                            type="text"
                            register={register}
                        />
                      
                        </Col>
                         <Col sm='3'>
                            <DatePickerInput
                            name="issueDate"
                            control={control}              // ✅ make sure this is passed
                            label="Issued Date"
                            required="Required"
                        />
                
                    
                        </Col>
            </Row> 
                <Row>
             <Col sm='3'>
                <InputText
                            name="Fee"
                            label="Fee "
                            type="text"
                            register={register}
                        />
                      
                       
                        </Col>
                         <Col sm='3'>
                              <InputText
                            name="originalAmt"
                            label="Original Amt "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                             <Col sm='3'>
                                <DatePickerInput
                            name="billdate"
                            control={control}              // ✅ make sure this is passed
                            label="Bill Date"
                            required="Required"
                        />
                             
                      
                        </Col>
                         <Col sm='3'>
                           <InputText
                            name="checkNum"
                            label=" Check Num "
                            type="text"
                            register={register}
                        />
                      
                        </Col>
            </Row> 
              <Row>
             <Col sm='3'>
                 <InputText
                            name="dateUsed"
                            label=" Date Used "
                            type="text"
                            register={register}
                        />
                     
                        </Col>
                       
                         <Col sm='3'>
                          <InputText
                            name="amountUsed"
                            label=" Amount Used "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
                         <Col sm='3'>
                           <InputText
                            name="currency"
                            label="Currency "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                          <Col sm='3'>
                             <InputText
                            name="oneTime"
                            label="One Time "
                            type="text"
                            register={register}
                        />
                    
                  
                        </Col>
            </Row>   
              <Row>
             <Col sm='3'>
               <InputText
                            name="exactAmount"
                            label=" Exact Amt "
                            type="text"
                            register={register}
                        />
                        
                        </Col>
                       
                         <Col sm='3'>
                          <InputText
                            name="expireDate"
                            label="Expire Date "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
                         <Col sm='3'>
                            <InputText
                            name="name"
                            label="Name "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                          <Col sm='3'>
                              <InputText
                            name="city"
                            label="City "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
            </Row>  
                <Row>
             <Col sm='3'>
               <InputText
                            name="state"
                            label="State "
                            type="text"
                            register={register}
                        />
                     
                        </Col>
                       
                         <Col sm='3'>
                           <InputText
                            name="phone"
                            label="Phone "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                         <Col sm='3'>
                          <InputText
                            name="license"
                            label=" Driver License  "
                            type="text"
                            register={register}
                        />
                        
                        </Col>
                          <Col sm='3'>
                            <InputText
                            name="driverState"
                            label="Driver State  "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
            </Row> 
              <Row>
             <Col sm='3'>
                 <InputText
                            name="driverId"
                            label=" Driver Id  "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
                       
                         <Col sm='3'>
                           <InputText
                            name="hubometer"
                            label=" Hubometer  "
                            type="text"
                            register={register}
                        />
                         
                        </Col>
                         <Col sm='3'>
                              <InputText
                            name="refeerHours"
                            label=" Reefer Hours  "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
                          <Col sm='3'>
                                 <InputText
                            name="licenseState"
                            label=" License State  "
                            type="text"
                            register={register}
                        />
              
                        </Col>
            </Row>  
                 <Row>
             <Col sm='3'>
               <InputText
                            name="LicenseNo"
                            label="License Number  "
                            type="text"
                            register={register}
                        />
                     
                        </Col>
                       
                         <Col sm='3'>
                           <InputText
                            name="Odometer"
                            label="Odometer  "
                            type="text"
                            register={register}
                        />
                     
               
                        </Col>
                         <Col sm='3'>
                            <InputText
                            name="PONo"
                            label="PO Number  "
                            type="text"
                            register={register}
                        />
                     
                  
                        </Col>
                          <Col sm='3'>
                            <InputText
                            name="TripNo"
                            label="Trip Number  "
                            type="text"
                            register={register}
                        />
                  
                        </Col>
            </Row>   
                <Row>
             <Col sm='3'>
              <InputText
                            name="trailNo"
                            label=" Trailer Number  "
                            type="text"
                            register={register}
                        />
                      
                        </Col>
                       
                         <Col sm='3'>
                          <InputText
                            name="unitNo"
                            label="Unit Number  "
                            type="text"
                            register={register}
                        />
                
                        </Col>
                         <Col sm='3'>
                           <InputText
                            name="ControlNo"
                            label="Control Number  "
                            type="text"
                            register={register}
                        />
                
                
                        </Col>
                          <Col sm='3'>
                                   <InputText
                            name="Birthday"
                            label="Birthday  "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
            </Row>  
             <Row>
             <Col sm='3'>
                <InputText
                            name="ReeferTempatur"
                            label=" Reefer Tempatur  "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                       
                         <Col sm='3'>
                          <InputText
                            name="pinNo"
                            label=" PIN Number  "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                          <Col sm='3'>
                               <InputText
                            name="Subfleet"
                            label="Subfleet  "
                            type="text"
                            register={register}
                        />
                        
                        </Col>
                         <Col sm='3'>
                               <InputText
                            name="Billing_Id"
                            label="Billing Id  "
                            type="text"
                            register={register}
                        />
                          
                        </Col>
                        
            </Row> 
                 <Row>
             <Col sm='3'>
                  <InputText
                            name="firstInitial"
                            label=" First Inital  "
                            type="text"
                            register={register}
                        />
                          
               
                        </Col>
                       
                         <Col sm='3'>
                           <InputText
                            name="LastName"
                            label="LastName  "
                            type="text"
                            register={register}
                        />
                    
                        </Col>
                          <Col sm='3'>
                           <InputText
                            name="driverName"
                            label="Driver Name  "
                            type="text"
                            register={register}
                        />
                   
                        </Col>
                         <Col sm='3'>
                             <InputText
                            name="SSN"
                            label="SSN  "
                            type="text"
                            register={register}
                        />
                         
                        </Col>
                        
            </Row>  
                <Row>
             <Col sm='12'>
                <InputText
                            name="notes"
                            label="Notes  "
                            type="text"
                            register={register}
                        />
                       
                        </Col>
                       
                        
            </Row>  
             <Row>
            <Col sm="10">
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
<Col sm="2" >
                    <div className='text-end'>
                            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btntitle}</Btn>
                    </div>
            </Col>
                </Row>
                </Row>
        </Form>
    )
}


export default AddMoneyCodeForm
