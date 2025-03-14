import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import FindJob from "./FindJob";

const CompanyRegister = () => {
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    area: "",
    classTitle: "",
    city: "",
    address: "",
    timings: "",
    subject: [],
    fees: "",
    mode: "",
    gender: "",
    description: "",
    contact: "",
    password: "",
    confirmPassword: "",
    passwordsMatch: true,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubjectChange = (tags) => {
    setFormData((prevData) => ({ ...prevData, subject: tags }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      password: value,
      passwordsMatch: value === prevData.confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      confirmPassword: value,
      passwordsMatch: value === prevData.password,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    const requiredFields = [
      "studentName",
      "area",
      "classTitle",
      "city",
      "address",
      "timings",
      "subject",
      "fees",
      "mode",
      "gender",
      "contact",
      "description",
      "password",
      "confirmPassword",
      "termsAccepted",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return;
      }
    }

    // Check if passwords match before submitting the form
    if (!formData.passwordsMatch) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/jobs/postJob", formData);

      if (response.status === 201) {
        alert("Successfully registered your job");
        setRegistrationComplete(true);
        console.log("Registration Complete");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (err) {
      console.log("An error occured:", err);
    }
    // Add your form submission logic here
  };
  if (registrationComplete) {
    return <FindJob />;
  }

  return (
    <>
      <Navbar></Navbar>
      <section className="pt-100">
        <div className="container">
          <div className="row login-register-cover">
            <div className=" mx-auto text-center">
              <div className="text-center">
                <p className="font-sm">Register Your Tuition</p>
                <h2 className="mt-10">Make Hiring Effortless</h2>
                <p className="login-text-p">
                  Access to all features. No credit card required.
                </p>
              </div>

              <form className="mt-50 login-register container justify-content-center">
                <div className="row">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group ">
                    <label className=" form-label text-start">
                      Student's Name*
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Full Name"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">Area*</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Model Town"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Class Title*
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Class X"
                      name="classTitle"
                      value={formData.classTitle}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">City*</label>
                    <select
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option>Select City</option>
                      <option>Ludhiana</option>
                      <option>Amritsar</option>
                      <option>Jalandhar</option>
                      <option>Mohali</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Full Address
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Fill full address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Timings Preferred*
                    </label>
                    <select
                      className="form-control"
                      name="timings"
                      value={formData.timings}
                      onChange={handleChange}
                    >
                      <option>Select Timings</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">Subjects</label>
                    <TagsInput
                      className="form-control"
                      value={formData.subject}
                      name="subject"
                      onChange={handleSubjectChange}
                      inputProps={{
                        placeholder: "Enter subjects or type All Subjects",
                        style: { width: "240px" },
                      }}
                    />
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Fees Preferred*
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      step="0.1"
                      placeholder="Per Month Fees"
                      name="fees"
                      value={formData.fees}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Mode of Tuition
                    </label>
                    <select
                      className="form-control"
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                    >
                      <option>Select Mode</option>
                      <option>Online Tuition</option>
                      <option>Home Tuition</option>
                    </select>
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Gender Preferred*
                    </label>
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option>Select Gender</option>
                      <option>Male/Female Any</option>
                      <option>Female Only</option>
                      <option>Male Only</option>
                    </select>
                  </div>
                </div>
                <div className="row ">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Job Description
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Describe your tutor needs in detail..."
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className=" form-label text-start">
                      Contact No*
                    </label>

                    <InputGroup
                      className="form-control"
                      style={{ border: "none" }}
                    >
                      <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                      <Form.Control
                        type="tel"
                        placeholder="Contact details"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className="form-label text-start">Password*</label>
                    <input
                      className="form-control"
                      type="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
                      placeholder="***********"
                    />
                  </div>
                  <div className="mb-3 mx-auto col-lg-4 col-md-6 col-sm-12 form-group">
                    <label className="form-label text-start">
                      Confirm Password*
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="***********"
                    />
                  </div>
                </div>

                <div className="text-center footer-margin">
                  <div className="login-footer mt-50 d-flex ">
                    <Form.Check
                      className=" font-small"
                      type="checkbox"
                      id={`default-checkbox`}
                      label={`Accept our Terms and Condition`}
                      name="termsAccepted"
                      value={formData.termsAccepted}
                      onChange={handleChange}
                    />
                    <a className="font-small">Forgot Password</a>
                  </div>
                  <div className="row">
                    <Button
                      className="form-button "
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>

                    <span className="my-3 login-text-p">
                      Already have an Account?
                      <a href="./CompanyLogin">Login</a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </section>
    </>
  );
};

const CompanyLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post("/jobs/companyLogin", loginData);
      if (data.status === 200) {
        alert("Successfully Loged into your job");
        console.log("Loged in");
      } else {
        alert("Put valid data");
        console.error("Login failed:", data.statusText);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="pt-100">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto text-center">
              <div className="text-center">
                <p className="font-sm">Welcome Back!</p>
                <h2 className="mt-10"> Company's Login</h2>
                <p className="login-text-p">
                  Access to all features. No credit card required.
                </p>
              </div>
              <form className="mt-50 login-register justify-content-center">
                <div className="mb-3 form-group">
                  <label className=" form-label text-start">
                    Email Address*
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="name123@gmail.com"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="mb-3 form-group">
                  <label className=" form-label text-start">Password*</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="***********"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="login-footer d-flex ">
                  <Form.Check
                    className="px-5"
                    type="checkbox"
                    id="rememberMe"
                    label="Remember me"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleChange}
                  />
                  <a className="px-4">Forgot Password</a>
                </div>
                <Button
                  className="form-button"
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </Button>

                <span className="my-3  login-text-p">
                  Don't have an Account?
                  <a href="./CompanyRegister">Register</a>
                </span>
              </form>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </section>
    </>
  );
};

export { CompanyRegister, CompanyLogin };
