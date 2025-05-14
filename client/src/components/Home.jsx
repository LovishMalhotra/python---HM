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
      const response = await axios.post(
        "https://server-snowy-psi-47.vercel.app/query/contact",
        query
      );

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
        <div className="heroRow row align-items-center px-4 py-5 rounded-4">
          {/* LEFT SIDE - Heading first, image second */}
          <div className="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
            <div className="left-content">
              <h1 className="display-5 fw-bold mb-4 text-dark">
                Better Grades Start with{" "}
                <span className="text-primary">Better Tutors</span>
              </h1>

              <p className="lead text-muted mb-4">
                Get matched with top-rated tutors for in-home and online
                learning support tailored to your needs.
              </p>

              <img
                className="img-fluid rounded-4 shadow-sm"
                src="/banner-image.jpg"
                alt="Tutoring support"
              />
            </div>
          </div>

          {/* RIGHT SIDE - Form inside a card */}
          <div className="col-lg-5  ">
            <div className="card border-0 searchBar find-tutor-box shadow-lg p-4 rounded-4">
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
                <div className="d-flex justify-content-center align-items-center contact-box">
                  <InputGroup
                    className="my-3 m-2 col-lg-4 col-md-6 col-sm-12 w-90 contact col-auto box"
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
                    className="btn-primary p-2 m-2 w-90 my-3 rounded  box col-auto font-sm"
                  >
                    <i class="fas fa-phone p-1">&nbsp;</i>
                    Get Call
                  </button>
                </div>
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
