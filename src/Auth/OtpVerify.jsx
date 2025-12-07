import React, { Fragment, useState, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P, Image } from "../AbstractElements";
import { Otp as OtpLabel, Verify_otp } from "../Constant";
import NtaIcon from "../assets/images/logo/textLogo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Layout/Loader";
import OtherWay from "./OtherWay";
import { MenuContext } from "../_helper/Menu/MenuProvider";
import axios from "axios";
import { loginlog } from "../api"; 
const OtpVerify = () => {
  const { mainmenu } = useContext(MenuContext); // ✅ from provider
  const location = useLocation();
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { otp: sentOtp, userId } = location.state || {};
  const otpVerify =  (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => 
      {
      if (enteredOtp == sentOtp) {
        toast.success("OTP verified successfully!");
        localStorage.setItem("userId", userId);
        localStorage.setItem("Menu", JSON.stringify(mainmenu)); 
        try
        {
         // const response = axios.post(loginlog, {userId, msg:"OTP verified successfully!" });
          setLoading(false);
          navigate("/dashboard");
        } 
        catch (error) {}        
        
       
      } else {
        toast.error("Invalid OTP!");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <Fragment>
      {loading && <Loader loading={loading} />}
      <Container fluid className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Image
                  attrImage={{
                    className: "img-fluid my-4",
                    src: NtaIcon,
                    alt: "",
                    width: "200px",
                  }}
                />
                <Form className="theme-form">
                  <H4>Enter The OTP </H4>
                  <P>Please enter the one-time sent to your email.</P>
                  <FormGroup>
                    <Label className="col-form-label">{OtpLabel}</Label>
                    <Input
                      type="text"
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      value={enteredOtp}
                      placeholder="Enter OTP here"
                    />
                  </FormGroup>
                  {/* <OtherWay /> */}
                  <Btn
                    attrBtn={{
                      color: "primary",
                      className: "d-block w-100 mt-2",
                      onClick: otpVerify,
                    }}
                  >
                    {Verify_otp}
                  </Btn>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default OtpVerify;
