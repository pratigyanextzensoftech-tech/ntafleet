import React,{Fragment,useEffect,useState} from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import { Container,Table } from 'reactstrap'
import { useLocation } from 'react-router'
import axios from 'axios'
import { fual_card as APINAME } from "../../../api"; 
import { toast } from 'react-toastify'
const Index = () => {
  const { state } = useLocation();
  const oldData = state?.data?.oldData;

  const [fuelCards, setFuelCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${APINAME}/${oldData.card_id}`); 
        setFuelCards(res.data);  // ✅ real data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (oldData?.card_id) {
      fetchData();
    }

  }, [oldData]);

     
 
    
     const NewData=state.data.newData
     const otpres=state.data.otpres
     console.log(state);

     console.log(oldData);
     console.log(NewData)
       const onSubmit= async ()=>{

       
       const otpData = document.getElementById("otp").value; 

        if(fuelCards.update_otp===otpData)
        {
            axios.put(`${APINAME}/${oldData.card_id}`, NewData)
            .then((res) => 
                {
               
                toast.success("Update successfully!"); 
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
        }
        else
        {

             toast.error("OTP Not Matched");
        }



   
     } 
  return (
    <Fragment>
        <Breadcrumbs parent="Fuel Card" title="Fuel Card Information " />
        <Container >
            <div style={{maxWidth: "750px",margin:"auto",width:"100%"}} className='border border-3  p-3 border-primary'>
                <div >
                    <p>Changes on Card Number-{oldData.card_no} is below </p>
                    <p>Otp Send to {oldData.company_name}Email Id </p>
                </div>
                <div className='table-responsive'>
                <table  className='text-center table-warning table-hover table-striped-columns table table-bordered ' width="700px"> 
              <thead className='table-primary'>
                <tr >
               
                    <th>Heading</th>
                    <th>Before</th>
                    <th>After</th>
                </tr>
                 </thead>
              <tbody>
                  <tr className='border-bottom-primary'>
                    <th>CardNumber</th>
                    <th>{oldData?.card_no}</th>
                    <th>{NewData?.card_no}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Company</th>
                    <th>{oldData.company_name}</th>
                    <th>{NewData.company_name}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Pollicy Number</th>
                    <th>{oldData.policy}</th>
                    <th>{NewData.policy}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Unit Number</th>
                    <th>{oldData.unit_number}</th>
                    <th>{NewData.unit_number}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Pin Number</th>
                    <th>{oldData.pin_number}</th>
                    <th>{NewData.pin_number}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Driver Name</th>
                    <th>{oldData.driver_name}</th>
                    <th>{NewData.driver_name}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Driver  Mobile1 </th>
                    <th>{oldData.d_mobile1}</th>
                    <th>{NewData.d_mobile1}</th>
                </tr>
                <tr className='border-bottom-primary'>
                    <th>Driver  Mobile2</th>
                    <th>{oldData.d_mobile2}</th>
                    <th>{NewData.d_mobile2}</th>
                </tr>
                  <tr className='border-bottom-primary'>
                    <th>Card Status</th>
                    <th>{oldData.status}</th>
                    <th>{NewData.status}</th>
                </tr>
                </tbody>
                </table>
            
                </div>
                  <div className=' my-4 text-center'>
          <p>Please Enter OTP for Update Card {oldData.card_no} is below</p>
          <div className='row cardInformation  gx-0 '>
            <div className='col-sm-6 '>
                    <input className='form-control1 ' type="text" id="otp" placeholder='Enter Otp' />
            </div>
               <div className='col-sm-6 my-sm-0  my-2'>
                <button onClick={onSubmit} className='btn btn-primary' type="submit">Submit OTP</button>
            </div>
          </div>
          </div>
            </div>
          
        </Container>
      </Fragment>
  )
}
export default Index
