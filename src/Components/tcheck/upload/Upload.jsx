import React, { useState } from 'react';
import { Row, Col, Form,Input } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import InputText from '../../Forms/FormControl/formInput/InputText';
import Papa from "papaparse";
import axios from "axios";
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
const Upload = ({ btnTitle }) => {
     const [csvData, setCsvData] = useState([]);
      const [file, setFile] = useState(null);
      const [pricingDate, setPricingDate] = useState(new Date());
    const [fileKey, setFileKey] = useState(Date.now());
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitted, isValid },
    } = useForm();

 // 🧰 Key rename logic
  const keyMap = {
    "0":"create date",
    "1": "express_code",
    "2": "dollar_amt",
    "3": "",
    "4": "",
    "5": "payee",
    "6": "driver_id",
    "7": "tractor",
    "8": "",
    "9":" ",
    "10": "fees",
    "101": "memo",

   
  };

  const renameKeys = (row, keyMap) => {
  const newRow = {};
  for (const key in row) {
    const trimmedKey = key.trim(); // 🧹 remove leading/trailing spaces
    const newKey = keyMap[trimmedKey] || trimmedKey;
    newRow[newKey] = row[key];
  }
  return newRow;
};

  // 🧾 Handle form submission
 
const formatDate = (value) => {
  if (!value) return "-";
  return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
};
     const handleFileChange = (e) => {
       const file = e.target.files[0];
       if (!file) return;
       setFile(file);
   
       Papa.parse(file, {
         header: true,
         skipEmptyLines: true,
         complete: (results) => {
           console.log("Parsed CSV Data:", results.data);
           setCsvData(results.data);
         },
       });
          const jsonData = csvData
        .map((row, index) => {
          if (index < 7 || row.length === 0) return null;
          const obj = {};
          row.forEach((cell, colIndex) => {
            const value = typeof cell === "string" ? cell.trim() : cell;
            obj[`${colIndex + 1}`] = value;
            if(colIndex==5){
              const [city, state] = value.trim().split(',').map(s => s.trim());
              obj[`city`] = city; 
              obj[`saving_total`] = 0; 
              
            }
          });
          obj["rowNumber"] = index + 1;
          return obj;
        })
                   setCsvData(jsonData);

     };
      const onSubmit = async (data) => {
    if (!file) {
      alert("Please upload a CSV file first.");
                setFile(file);

      return;

    }

    // ✅ Transform the CSV data
    const enrichedData = csvData.map((row) => {
      const renamed = renameKeys(row, keyMap);
      return {
        ...renamed,
        "create_date":Date.now(),
    "company_id": "",
    "company_name": "",
        "reason": "",
    "trailer": "",
    "user1_label": "",
    "user2_label": "",
    "mail_attachment": "",
        "idby": "",

      };
    });
    

    console.log("🧾 Final Data Sent:", enrichedData);
 
//     try {
//       const response = await axios.post(upload_esso_pricing, enrichedData);
//       console.log("✅ Upload Success:", response.data);
      
//       toast.success(`Upload successful! ${response.data.count || ""}`)
//        setFile(null);
//    setFileKey(Date.now()); 
//   setPricingDate("");
//       // alert(`Upload successful! ${response.data.count || ""}`);
//     } catch (error) {
//       console.error("❌ Upload Error:", error);
//             toast.error(`Upload failed: ${error.response?.data?.error || error.message}`)

//       // alert(`Upload failed: ${error.response?.data?.error || error.message}`);
//     }
  };
    return (

        <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)} >
            <Row>
                <Col sm="10">
                      <Input
                        type="file"
                 name="file"
            label="File"
             register={register}
            errors={errors}
            rules={{ required: "Required" }}
                        className="form-control"
                        style={{ border: "1px solid #ccc" }}
                        accept=".csv"
                          key={fileKey}
                        onChange={handleFileChange}
                      />
                                
                       
                </Col>
                <Col sm="2" >
                    <div className='text-end'>
                        <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
                    </div>
                </Col>
            </Row>

        </Form>
    )
}


export default Upload
