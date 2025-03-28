import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { Offcanvas, Button } from "react-bootstrap";

const FindJob = () => {
  const [jobData, setJobdata] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [timingFilter, setTimingFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [hasPaid, setHasPaid] = useState(false);

  const containerRef = useRef(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  const [searchParams, setSearchParams] = useState({ subject: "", city: "" });
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);

  const handleCitySearch = async (e) => {
    const query = e.target.value;
    setSearchParams((prev) => ({ ...prev, city: query }));

    if (query.length > 2) {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${query}&limit=5`
      );
      const data = await response.json();
      setCitySuggestions(data.features);
      setShowCitySuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  };

  const handleSubjectSearch = async (e) => {
    const query = e.target.value;
    setSearchParams((prev) => ({ ...prev, subject: query }));

    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`
        );
        const data = await response.json();
        setSubjectSuggestions(data.query.search);
        setShowSubjectSuggestions(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSubjectSuggestions([]);
      setShowSubjectSuggestions(false);
    }
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowCitySuggestions(false);
      setShowSubjectSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCity = (cityName) => {
    setSearchParams((prev) => ({ ...prev, city: cityName }));
    setShowCitySuggestions(false);
  };

  const handleSelectSubject = (subjectTitle) => {
    setSearchParams((prev) => ({ ...prev, subject: subjectTitle }));
    setShowSubjectSuggestions(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const searchResponse = await axios.get("/search", {
        params: {
          subject:
            searchParams.subject === 0
              ? ""
              : e.target[0].options[searchParams.subject].text,
          city:
            searchParams.city === 0
              ? ""
              : e.target[1].options[searchParams.city].text,
        },
      });

      // Handle the response data, e.g., update state with the fetched jobs
      let response = searchResponse.data.jobs;
      setJobdata(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        const allJobsResponse = await axios.get("/jobs/allJobs");
        response = allJobsResponse.data;

        if (subjectFilter) {
          response = response.filter((job) => {
            return job.subject.some(
              (sub) => sub.toLowerCase() === subjectFilter.toLowerCase()
            );
          });
        }

        if (genderFilter) {
          response = response.filter((job) => {
            return job.gender.toLowerCase() === genderFilter.toLowerCase();
          });
        }

        if (typeFilter) {
          response = response.filter((job) => {
            return job.mode.toLowerCase() === typeFilter.toLowerCase();
          });
        }

        if (timingFilter) {
          response = response.filter((job) => {
            return job.timings.toLowerCase() === timingFilter.toLowerCase();
          });
        }

        setJobdata(Array.isArray(response) ? response : []);
      } catch (err) {
        console.log("Error Fetching Data", err);
      }
    };

    const fetchHasPaid = async () => {
      try {
        const response = await axios.get("/payment/status");
        // console.log(response);
        setHasPaid(response.data.hasPaid);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchHasPaid();
    fetchData();
  }, [subjectFilter, genderFilter, typeFilter, timingFilter]);

  const limitDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    }
    return description;
  };
  let navigate = useNavigate();

  const handleClick = async (jobId) => {
    if (hasPaid) {
      /* NEED NAVIGATE BOX THAT YOU REALLY WANT TO APPLY FOR JOB*/
      try {
        // Step 1: Assign Lead Before Navigating
        const response = await axios.post("https://server-snowy-psi-47.vercel.app/payment/assignLead", jobId);
        console.log(response)
        if (response.data.success) {
          // Step 2: Navigate to Apply Job Page
          navigate(`/Apply?jobId=${jobId}`);
        } else {
          alert("Failed to assign lead. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message); 
          navigate(`/paymentPage`);
        } else {
          alert("Something went wrong");
        }
      }
    } else {
      navigate(`/paymentPage`);
    }
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Toggle off-canvas menu
  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="px-4 py-5 my-5 text-center box-banner">
          <h1 className="fw-bold box-banner-header">
            <span className="box-banner-header-22Jobs">New Jobs</span>
            <span>Available Now</span>
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead box-banner-text mb-4">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap.
            </p>

            <div className="d-grid gap-2  justify-content-sm-center">
              <img
                className="box-banner-image1"
                src="https://jobbox-nextjs-v3.vercel.app/_next/static/media/right-job-head.20bf0a8a.svg"
                alt=""
              />
              <div className="searchBar container-fluid">
                <form
                  className="wrapper justify-content-center align-items-center"
                  onSubmit={handleSearch}
                >
                  {/* Subject Autocomplete */}
                  <div className="autocomplete-container" ref={containerRef}>
                    <input
                      type="text"
                      className="form-input m-2 box"
                      placeholder="Subject"
                      value={searchParams.subject}
                      onChange={handleSubjectSearch}
                      onFocus={() => setShowSubjectSuggestions(true)}
                    />
                    {showSubjectSuggestions &&
                      subjectSuggestions.length > 0 && (
                        <ul className="suggestions-dropdown">
                          {subjectSuggestions.map((subject, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelectSubject(subject.title)}
                            >
                              {subject.title}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>

                  {/* City Autocomplete */}
                  <div className="autocomplete-container" ref={containerRef}>
                    <input
                      type="text"
                      className="form-input m-2 box"
                      placeholder="City"
                      value={searchParams.city}
                      onChange={handleCitySearch}
                      onFocus={() => setShowCitySuggestions(true)}
                    />
                    {showCitySuggestions && citySuggestions.length > 0 && (
                      <ul className="suggestions-dropdown">
                        {citySuggestions.map((city, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              handleSelectCity(city.properties.name)
                            }
                          >
                            {city.properties.name}, {city.properties.county},{" "}
                            {city.properties.country}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary m-2 btn-default col-auto font-sm button-box"
                  >
                    Search
                  </button>
                </form>
              </div>
              <img
                className="box-banner-image2"
                src="https://jobbox-nextjs-v3.vercel.app/_next/static/media/left-job-head.15bb41c5.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="slidebar">
              <div className="slidebar-filter">
                {/* Filter Heading */}
                <div className="filter-block head-border mb-3">
                  <h5>
                    Filters
                    <a className="link-reset d-md-block d-none" href="/findJob">
                      Reset
                    </a>
                    <a className="link-reset">
                      <Button
                        variant="primary"
                        className="d-md-none" // Show this only on mobile
                        onClick={handleOffcanvasShow}
                      >
                        <i class="fa-solid fa-filter"></i>
                      </Button>
                    </a>
                  </h5>
                </div>

                {/* Mobile View Filter Button */}

                {/* Off-Canvas Menu (Mobile Only) */}
                <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Advance Filter</Offcanvas.Title>
                    <Button href="/findJob">Reset</Button>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {/* Subject Filter */}
                    <div className="filter-block">
                      <h5 className="mt-5">Subject</h5>
                      <ul className="list-checkbox">
                        <li>
                          <label className="filter-category-industry">
                            <input
                              type="checkbox"
                              defaultChecked
                              checked={subjectFilter === ""}
                              onChange={(e) =>
                                setSubjectFilter(e.target.checked ? "" : "")
                              }
                            />
                            <span className="text-small">All</span>
                          </label>
                        </li>
                        {[
                          "Science",
                          "Maths",
                          "English",
                          "Social Studies",
                          "Hindi",
                          "Punjabi",
                        ].map((subject) => (
                          <li key={subject}>
                            <label className="filter-category-industry">
                              <input
                                type="checkbox"
                                checked={subjectFilter === subject}
                                onChange={(e) =>
                                  setSubjectFilter(
                                    e.target.checked ? subject : ""
                                  )
                                }
                              />
                              <span className="text-small">{subject}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gender Filter */}
                    <div className="filter-block ">
                      <h5 className="mt-5">Gender</h5>
                      <ul className="list-checkbox">
                        <li>
                          <label className="filter-category-industry">
                            <input
                              type="checkbox"
                              defaultChecked
                              checked={genderFilter === ""}
                              onChange={(e) =>
                                setGenderFilter(e.target.checked ? "" : "")
                              }
                            />
                            <span className="text-small">All</span>
                          </label>
                        </li>
                        {["Male/Female Any", "Male Only", "Female Only"].map(
                          (gender) => (
                            <li key={gender}>
                              <label className="filter-category-industry">
                                <input
                                  type="checkbox"
                                  checked={genderFilter === gender}
                                  onChange={(e) =>
                                    setGenderFilter(
                                      e.target.checked ? gender : ""
                                    )
                                  }
                                />
                                <span className="text-small">{gender}</span>
                              </label>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Job Type Filter */}
                    <div className="filter-block ">
                      <h5 className="mt-5">Job Type</h5>
                      <ul className="list-checkbox">
                        <li>
                          <label className="filter-category-industry">
                            <input
                              type="checkbox"
                              defaultChecked
                              checked={typeFilter === ""}
                              onChange={(e) =>
                                setTypeFilter(e.target.checked ? "" : "")
                              }
                            />
                            <span className="text-small">All</span>
                          </label>
                        </li>
                        {["Home Tuition", "Online Tuition"].map((type) => (
                          <li key={type}>
                            <label className="filter-category-industry">
                              <input
                                type="checkbox"
                                checked={typeFilter === type}
                                onChange={(e) =>
                                  setTypeFilter(e.target.checked ? type : "")
                                }
                              />
                              <span className="text-small">
                                {type === "Home Tuition"
                                  ? "Offline Classes"
                                  : "Online Classes"}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timings Filter */}
                    <div className="filter-block mb-20">
                      <h5 className="mt-5">Timings</h5>
                      <ul className="list-checkbox">
                        <li>
                          <label className="filter-category-industry">
                            <input
                              type="checkbox"
                              defaultChecked
                              checked={timingFilter === ""}
                              onChange={(e) =>
                                setTimingFilter(e.target.checked ? "" : "")
                              }
                            />
                            <span className="text-small">All</span>
                          </label>
                        </li>
                        {["Morning", "Afternoon", "Evening"].map((timing) => (
                          <li key={timing}>
                            <label className="filter-category-industry">
                              <input
                                type="checkbox"
                                checked={timingFilter === timing}
                                onChange={(e) =>
                                  setTimingFilter(
                                    e.target.checked ? timing : ""
                                  )
                                }
                              />
                              <span className="text-small">{timing}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>

                {/* Desktop View Filters */}
                <div className="filter-block mb-20 d-none d-md-block">
                  <h5 className="mt-5">Subject</h5>
                  <ul className="list-checkbox">
                    <li>
                      <label className="filter-category-industry">
                        <input
                          type="checkbox"
                          defaultChecked
                          checked={subjectFilter === ""}
                          onChange={(e) =>
                            setSubjectFilter(e.target.checked ? "" : "")
                          }
                        />
                        <span className="text-small">All</span>
                      </label>
                    </li>
                    {[
                      "Science",
                      "Maths",
                      "English",
                      "Social Studies",
                      "Hindi",
                      "Punjabi",
                    ].map((subject) => (
                      <li key={subject}>
                        <label className="filter-category-industry">
                          <input
                            type="checkbox"
                            checked={subjectFilter === subject}
                            onChange={(e) =>
                              setSubjectFilter(e.target.checked ? subject : "")
                            }
                          />
                          <span className="text-small">{subject}</span>
                        </label>
                      </li>
                    ))}
                  </ul>

                  {/* Gender Filter */}
                  <div className="filter-block ">
                    <h5 className="mt-5">Gender</h5>
                    <ul className="list-checkbox">
                      <li>
                        <label className="filter-category-industry">
                          <input
                            type="checkbox"
                            defaultChecked
                            checked={genderFilter === ""}
                            onChange={(e) =>
                              setGenderFilter(e.target.checked ? "" : "")
                            }
                          />
                          <span className="text-small">All</span>
                        </label>
                      </li>
                      {["Male/Female Any", "Male Only", "Female Only"].map(
                        (gender) => (
                          <li key={gender}>
                            <label className="filter-category-industry">
                              <input
                                type="checkbox"
                                checked={genderFilter === gender}
                                onChange={(e) =>
                                  setGenderFilter(
                                    e.target.checked ? gender : ""
                                  )
                                }
                              />
                              <span className="text-small">{gender}</span>
                            </label>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Job Type Filter */}
                  <div className="filter-block ">
                    <h5 className="mt-5">Job Type</h5>
                    <ul className="list-checkbox">
                      <li>
                        <label className="filter-category-industry">
                          <input
                            type="checkbox"
                            defaultChecked
                            checked={typeFilter === ""}
                            onChange={(e) =>
                              setTypeFilter(e.target.checked ? "" : "")
                            }
                          />
                          <span className="text-small">All</span>
                        </label>
                      </li>
                      {["Home Tuition", "Online Tuition"].map((type) => (
                        <li key={type}>
                          <label className="filter-category-industry">
                            <input
                              type="checkbox"
                              checked={typeFilter === type}
                              onChange={(e) =>
                                setTypeFilter(e.target.checked ? type : "")
                              }
                            />
                            <span className="text-small">
                              {type === "Home Tuition"
                                ? "Offline Classes"
                                : "Online Classes"}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timings Filter */}
                  <div className="filter-block ">
                    <h5 className="mt-5">Timings</h5>
                    <ul className="list-checkbox">
                      <li>
                        <label className="filter-category-industry">
                          <input
                            type="checkbox"
                            defaultChecked
                            checked={timingFilter === ""}
                            onChange={(e) =>
                              setTimingFilter(e.target.checked ? "" : "")
                            }
                          />
                          <span className="text-small">All</span>
                        </label>
                      </li>
                      {["Morning", "Afternoon", "Evening"].map((timing) => (
                        <li key={timing}>
                          <label className="filter-category-industry">
                            <input
                              type="checkbox"
                              checked={timingFilter === timing}
                              onChange={(e) =>
                                setTimingFilter(e.target.checked ? timing : "")
                              }
                            />
                            <span className="text-small">{timing}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 ">
            <div className="row">
              {jobData.map((job) => (
                <div className="col-md-4" key={job._id}>
                  <div className="card">
                    <div className="card-body hover-up">
                      <div className="card-header d-flex">
                        <span className="flash" />
                        <div className="image-left">
                          <img
                            src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/brands/brand-1.png"
                            alt={`logo for {job.companyName}`}
                          />
                        </div>
                        <div className="left-info-card">
                          <span className="job-name">{job.studentName}</span>
                          <br />
                          <span className="location-content">{job.area}</span>
                        </div>
                      </div>
                      <div className="card-content ">
                        <h6 style={{ fontWeight: 600, fontSize: 16 }}>
                          {job.classTitle}
                        </h6>
                        <span className="p-card ">
                          <i
                            className="fa fa-clock"
                            style={{ marginRight: "0.5rem" }}
                          />
                          {job.timings}
                        </span>
                        <span className="p-card mx-3">
                          <i
                            class="fa fa-user"
                            style={{ marginRight: "0.5rem" }}
                          ></i>
                          {job.gender}
                        </span>
                        <p className=" pt-3 p-card ">
                          {limitDescription(job.description, 10)}
                        </p>
                        {job.subject.map((subject, index) => (
                          <a
                            key={index}
                            href="/"
                            className="btn btn-grey-small m-1"
                          >
                            {subject}
                          </a>
                        ))}
                        <div className="mt-3 card-bottom">
                          <div className="row">
                            <div className="col-6 col-lg-6">
                              <span className="card-text-price">
                                {job.fees}
                              </span>
                              <span className="card-text-muted mx-1">
                                /month
                              </span>
                            </div>
                            <div className="col-6 col-lg-6">
                              <div
                                className="btn btn-apply mx-4"
                                onClick={() => handleClick(job._id)}
                              >
                                View Details
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default FindJob;
