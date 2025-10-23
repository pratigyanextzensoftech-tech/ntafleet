import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P, Image } from "../AbstractElements";
import { Otp as OtpLabel, Verify_otp } from "../Constant";
import NtaIcon from "../assets/images/logo/textLogo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";
import { ToastContainer, toast } from "react-toastify";
import Loader from '../Layout/Loader/index'
import OtherWay from "./OtherWay";

const OtpVerify = () => {
  const location = useLocation();
  const history = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP and user info sent from login page
  const { otp: sentOtp, userId, name } = location.state || {};

  // useEffect(() => {
  //   if (!sentOtp) {
  //     toast.error("OTP not found! Please login again.");
  //     history("/login");
  //   }
  // }, [sentOtp, history]);

  const otpVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (enteredOtp == sentOtp) {
        toast.success("OTP verified successfully!");
        setLoading(false);
        history("/dashboard"); // navigate to next page
      } else {
        toast.error("Invalid OTP!");
        setLoading(false);
                history("/dashboard"); // navigate to next page

      }
    }, 500);
  };

  return (
    <Fragment>
      {loading && <Loader loading={loading}/>}

      <Container fluid={true} className={`p-0 login-page ${loading ? "loading-active" : ""}`}>
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Image attrImage={{ className: "img-fluid my-4", src: NtaIcon, alt: "", width:"200px" }} />
                <Form className="theme-form">
                  <H4>Please Enter OTP sent to {name || "your email"}</H4>
                  <P>Enter the OTP to verify your account</P>
                  <FormGroup>
                    <Label className="col-form-label">{OtpLabel}</Label>
                    <Input
                      type="text"
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      value={enteredOtp}
                    />
                  </FormGroup>
                  <OtherWay />
                  <Btn
                    attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: otpVerify }}
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
