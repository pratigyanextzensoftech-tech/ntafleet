import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../Constant";
import { Image } from "../AbstractElements";
import NtaIcon from "../assets/images/logo/textLogo.webp";
import { useNavigate } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Layout/Loader/index"; // import loader

const Signin = ({ selected }) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false); // loader state
  const history = useNavigate();

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));

  useEffect(() => {
    localStorage.setItem("profileURL", man);
    localStorage.setItem("Name", "Emay Walter");
  }, [value, name]);

const loginAuth = async (e) => {
  e.preventDefault();

  // 1️⃣ Show loader
  setLoading(true);
  setValue(man);
  setName("Emay Walter");

  // 2️⃣ Simulate API call or verification delay
  setTimeout(() => {
    if (email === "test@gmail.com" && password === "test123") {
      localStorage.setItem("login", JSON.stringify(true));

      // 3️⃣ Show toast first
      toast.success("Successfully logged in!");

      // 4️⃣ Wait a short moment before navigating
      setTimeout(() => {
        setLoading(false);       // hide loader
        history("/verify");       // navigate to verify page
      }, 800); // 0.8s delay for toast to render

    } else {
      // Wrong credentials
      toast.error("You entered wrong email or password!");
      
      setLoading(false); // hide loader
    }
  }, 500); // simulate 0.5s API call delay
};


  return (
    <Fragment>
      {/* Loader */}
      {loading && <Loader loading={loading} />}

      <Container fluid={true} className={`p-0 login-page ${loading ? "loading-active" : ""}`}>
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Image attrImage={{ className: "img-fluid  my-4", src: `${NtaIcon}`, alt: "", width:"200px" }} />

                <Form className="theme-form">
                  <H4>{selected === "simpleLogin" ? "" : "Sign In With Simple Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input type={togglePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>

                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                    </div>
                    <a className="link" href="#javascript">{ForgotPassword}</a>
                    <Btn attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: (e) => loginAuth(e) }}>{SignIn}</Btn>
                  </div>
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

export default Signin;
