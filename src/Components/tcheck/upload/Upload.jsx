import React, { useState } from 'react';
import { Row, Col, Form, Input } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import InputText from '../../Forms/FormControl/formInput/InputText';
import Papa from "papaparse";
import axios from "axios";
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { tcheck_upload } from '../../../api';
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
    "0": "create_date",
    "1": "express_code",
    "2": "dollar_amt",
    "3": "generation_type",
    "4": "create_id",
    "5": "payee",
    "6": "driver_id",
    "7": "tractor",
    "8": "trip",
    "9": "driver_cdl",
    "10": "trailer",
    "11": "user1_label",
    "12": "user2_label",
    "13": "memo",
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

  // const formatDate = (value) => {
  //   if (!value) return "-";
  //   return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
  // };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);

    Papa.parse(file, {
      header: false, // don’t use first row as keys
      skipEmptyLines: true,
      complete: (results) => {
        const allRows = results.data;
        const dataRows = allRows.slice(1); // remove first row (header)

        // Convert each row (array) into an object with numeric keys
        const formatted = dataRows.map((row) =>
          row.reduce((acc, val, index) => {
            acc[index] = val.trim();
            return acc;
          }, {})
        );
        setCsvData(formatted);
      },
    });
    

  };
  const onSubmit = async () => {
    if (!file) {
      toast.error("Please upload a CSV file first.");
      return;
    }
    if (csvData.length === 0) {
      toast.error("Parsed CSV data is empty.");
      return;
    }

    const enrichedData = csvData.map((row) => {
      const dollar_amt = parseFloat(row[2] || 0); 
      const a = Math.floor(dollar_amt / 500); // 0
      const b = dollar_amt % 500;             // 120
      let fees = a * 3;                   // 0
      if (b > 0) fees += 3;               // +3
      fees = Math.round(fees * 100) / 100; // 3.00 
 

      return {
        ...renameKeys(row, keyMap),
        company_id: 0,
        company_name: "",
        reason: "",
        mail_attachment: "",
        idby: 1,
        fees: fees, // add calculated field here
      };
    });
 

    console.log("🧾 Final Data Sent:", enrichedData);

    try {
      const response = await axios.post(tcheck_upload, enrichedData);
      console.log("✅ Upload Success:", response.data);
      toast.success(`Upload successful! ${response.data.count || ""}`);
      setFile(null);
      setFileKey(Date.now());
      setCsvData([]);
    } catch (error) {
      console.error("❌ Upload Error:", error);
      toast.error(
        `Upload failed: ${error.response?.data?.error || error.message}`
      );
    }
  };

  return (

    <Form className='px-2' noValidate='' onSubmit={handleSubmit(onSubmit)} >
      <Row className='my-2'>
        <Col md="8" lg="8" sm="7">
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
        <Col md="4"  lg="4" sm="5">
          <div className='text-end mt-2 mt-sm-0'>
            <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{btnTitle}</Btn>
          </div>
        </Col>
      </Row>

    </Form>
  )
}


export default Upload
