import Footer from "./Footer";
import Navbar from "./Navbar";
import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
  const [query, setQuery] = useState({ contact: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuery = async (event) => {
    event.preventDefault();

    if (!query.contact) {
      alert(`Please fill in contact`);
      return;
    }
    try {
      const response = await axios.post("/query/contact", query);

      if (response.status === 201) {
        alert("We will call you soon");
        console.log("Contact Submitted");
        setQuery({ contact: "" });
      } else {
        console.error("query failed:", response.statusText);
      }
    } catch (err) {
      console.log("An error occured:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container ">
        <div className="heroRow row mt-8 ">
          <div className="col-md-6 mt-3">
            <div className="left container">
              {/* heading */}
              <h1 className="heading-banner wow animate__animated animate__fadeInUp">
                The
                <span className="color-brand-2"> Easiest Way </span>
                <br className="d-none d-lg-block" />
                to Get Your Tutor
              </h1>
              {/* banner-image */}
              <div className="banner m-1">
                Each month, more than 3 million job seekers turn to
                <br className="d-none d-lg-block" />
                website in their search for work, making over
                <br className="d-none d-lg-block" />
                applications every single day
                <br className="d-none d-lg-block" />
              </div>
              {/* contact query */}
            </div>
          </div>
          <div className="col-md-5  ">
            <div className="searchBar find-tutor-box">
              <form
                className="d-flex justify-content-center"
                onSubmit={handleQuery}
              >
                <h5 className="my-4">Find Tutor Now!</h5>
                <input
                  style={{ width: "90%" }}
                  className="form-control m-2"
                  type="text"
                  placeholder="Name"
                  name="fullName"
                ></input>

                <input
                  style={{ width: "90%" }}
                  className="form-control "
                  type="text"
                  placeholder="Course"
                  name="Course"
                ></input>
                <Form.Text
                  className="text-start justify-content-left"
                  muted
                ></Form.Text>

                <InputGroup
                  className="m-2 my-3 col-lg-4 w-60 col-md-6 col-sm-12 col-auto box"
                  style={{ width: "69%" }}
                >
                  <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                  <Form.Control
                    name="contact"
                    value={query.contact}
                    placeholder="Contact details"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                  />
                </InputGroup>

                <button
                  type="submit"
                  className="btn-primary p-2 m-2  my-3 rounded  box col-auto font-sm"
                >
                  <i class="fas fa-phone p-1">&nbsp;</i>
                  Get Call
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container category">
        <h2 class="text-center mb-10" style={{ marginTop: "10% !important" }}>
          Browse by category
        </h2>
        <p className="text-center font-xs">
          Find the tutor that’s perfect for you
        </p>
        <div className="row content-box justify-content-center gap-3 mt-5">
          <div className="col-md-2 category-col d-flex">
            <div>
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="category-content">
              <h4>Mathematics</h4>
              <p className="">
                965<span> tutors Available</span>
              </p>
            </div>
          </div>
          <div className="col-md-2 category-col d-flex">
            <div>
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="category-content">
              <h4>English</h4>
              <p className="">
                168<span> tutors Available</span>
              </p>
            </div>
          </div>
          <div className="col-md-2 category-col d-flex">
            <div>
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="category-content">
              <h4>Science</h4>
              <p className="">
                1856<span> tutors Available</span>
              </p>
            </div>
          </div>
          <div className="col-md-2 category-col d-flex">
            <div>
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="category-content">
              <h4>Social Studies</h4>
              <p className="">
                165<span> tutors Available</span>
              </p>
            </div>
          </div>
          <div className="col-md-2 category-col d-flex">
            <div>
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="category-content">
              <h4>Hindi</h4>
              <p className="">
                254<span> tutors Available</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-box mb-30 ">
        <div className="container">
          <div className="box-hiring d-flex ">
            <div className="text-1 mt-3">
              <span className="text-we-are">WE ARE</span>
              <span className="text-hiring">HIRING</span>
            </div>
            <div className="text-2 mt-3">
              Let's Work Together <br /> &amp; Explore Opportunities
            </div>
            <div className="text-3 mt-3">
              <button type="button" className="btn btn-primary btn-apply">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container job-category">
        <h2 class="text-center mb-10">tuitions of the day</h2>
        <p className="text-center ">
          Search and connect with the right candidates faster.
        </p>
        <div className="row justify-content-center gap-3 mt-5">
          <div className="col-md-2 job-category-col d-flex">
            <div className="job-category-image">
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="job-category-content">
              <h4>Mathematics</h4>
            </div>
          </div>
          <div className="col-md-2 job-category-col d-flex">
            <div className="job-category-image">
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="job-category-content">
              <h4>English</h4>
            </div>
          </div>
          <div className="col-md-2 job-category-col d-flex">
            <div className="job-category-image">
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="job-category-content">
              <h4>Science</h4>
            </div>
          </div>
          <div className="col-md-2 job-category-col d-flex">
            <div className="job-category-image">
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="job-category-content">
              <h4>Social Studies</h4>
            </div>
          </div>
          <div className="col-md-2 job-category-col d-flex">
            <div className="job-category-image">
              <img
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/lightning.svg"
                className="img-fluid"
                alt="img-logo-1"
              />
            </div>
            <div className="job-category-content">
              <h4>Hindi</h4>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row py-5 px-5">
        <div className="col-xl-3 col-lg-4 pb-2 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img
                    src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-1.png"
                    alt=""
                  />
                </div>
                <div className="left-info-card">
                  <span className="job-name">LinkedIn</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  UI / UX Designer
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small m-1">
                    Adobe XD
                  </a>
                  <a href="/" className="btn btn-grey-small m-1">
                    Figma
                  </a>
                  <a href="/" className="btn btn-grey-small m-1">
                    Photoshop
                  </a>
                </div>
                <div className="mt-3 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$500</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-2.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">Adobe</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  Full Stack Engineer
                </h6>
                <p className="mt-15 py-3 p-card">
                  Lorem ipsum, dolor sit amet consectetur, saepe architecto sunt
                  existe.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small m-1">
                    React
                  </a>
                  <a href="/" className="btn btn-grey-small m-1">
                    NodeJS
                  </a>
                </div>
                <div className="mt-3 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$800</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-3.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">Bing Search</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  Java Software Engineer
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small m-1">
                    Python
                  </a>
                  <a href="/" className="btn btn-grey-small m-1">
                    AWS
                  </a>
                  <a href="/" className="btn btn-grey-small m-1">
                    Photoshop
                  </a>
                </div>
                <div className="mt-3 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$250</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-4.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">Daily Motion</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  Frontend Developer
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small m-1">
                    Typescript
                  </a>
                  <a href="/" className="btn btn-grey-small m-1">
                    Java
                  </a>
                </div>
                <div className="mt-3 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$250</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-5.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">LinkedIn</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  React Native Web Developer
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small mr-5">
                    Angular
                  </a>
                </div>
                <div className="mt-5 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$500</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-6.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">Quora JSC</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  Senior System Engineer
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small mr-5">
                    PHP
                  </a>
                  <a href="/" className="btn btn-grey-small mr-5">
                    Android
                  </a>
                </div>
                <div className="mt-5 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$800</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-7.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">Nintendo</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  Products Manager
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small mr-5">
                    Asp.Net
                  </a>
                  <a href="/" className="btn btn-grey-small mr-5">
                    Figma
                  </a>
                </div>
                <div className="mt-5 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$250</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 pb-5 col-md-6 col-sm-12 col-12">
          <div className="card">
            <div className="card-body hover-up">
              <div className="card-header d-flex">
                <span className="flash" />
                <div className="image-left">
                  <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-8.png" />
                </div>
                <div className="left-info-card">
                  <span className="job-name">Periscope</span>
                  <br />
                  <span className="location-content">New York, US</span>
                </div>
              </div>
              <div className="card-content">
                <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                  Lead Quality Control QA
                </h6>
                <p className="mt-15 py-3 p-card">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-30">
                  <a href="/" className="btn btn-grey-small mr-5">
                    iOS
                  </a>
                  <a href="/" className="btn btn-grey-small mr-5">
                    Laravel
                  </a>
                  <a href="/" className="btn btn-grey-small mr-5">
                    GoLang
                  </a>
                </div>
                <div className="mt-5 card-bottom">
                  <div className="row">
                    <div className="col-6 col-lg-6">
                      <span className="card-text-price">$250</span>
                      <span className="card-text-muted">/Hour</span>
                    </div>
                    <div className="col-6 col-lg-6">
                      <div className="btn btn-apply mx-4">Apply Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container mt-100">
        <div className="row">
          <div className="col-md-6">
            <div className="search-job-image">
              <img
                className="img-job-1"
                alt="JobBox"
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/img-chart.png"
              />
              <img
                className="img-job-2"
                alt="JobBox"
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/controlcard.png"
              />
              <img
                className="img-job-3"
                alt="JobBox"
                src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/img1.png"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="left-content">
              <span className="text-left-1">Millions Of Tutors.</span>
              <h2 className="text-left-2">
                Find The One That's
                <span className="text-right">Right</span> For You
              </h2>
              <p className="text-p">
                Search all the open positions on the web. Get your own
                personalized salary estimate. Read reviews on over 600,000
                companies worldwide. The right job is out there.
              </p>
              <div className="buttons">
                {/* <a
                  className="btn btn-primary button-search px-3 py-2 hover-up"
                  href="/"
                >
                  Search Jobs
                </a> */}
                <a href="/" className="btn btn-primary px-3 py-2">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-100 mb-50">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="text-center">
              <h1 className="count-h1">
                <span>250</span>
                <span>K+</span>
              </h1>
              <h5>Completed Cases</h5>
              <p className="font-sm mt-10 count-p">
                We always provide people a complete solution upon focused of any
                business
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="text-center">
              <h1 className="count-h1">
                <span>80</span>
                <span>K+</span>
              </h1>
              <h5>Happy Clients</h5>
              <p className="font-sm mt-10 count-p">
                We always provide people a complete solution upon focused of any
                business
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="text-center">
              <h1 className="count-h1">
                <span>17</span>
                <span>+</span>
              </h1>
              <h5>Our Office</h5>
              <p className="font-sm mt-10 count-p">
                We always provide people a complete solution upon focused of any
                business
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="text-center">
              <h1 className="count-h1">
                <span>86</span>
                <span>K+</span>
              </h1>
              <h5>Skilled People</h5>
              <p className="font-sm mt-10 count-p">
                We always provide people a complete solution upon focused of any
                business
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
