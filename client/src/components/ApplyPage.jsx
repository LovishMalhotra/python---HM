import joblevelimg from "../assets/job-level.svg";
import salaryimg from "../assets/salary.svg";
import experienceimg from "../assets/experience.svg";
import jobtypeimg from "../assets/job-type.svg";
import deadlineimg from "../assets/deadline.svg";
import updateimg from "../assets/updated.svg";
import locationimg from "../assets/location.svg";
import companylogo from "../assets/avatar.png";
import "../css/applyJob.css";
import fb from "../assets/fb.svg";
import x from "../assets/x.svg";
import reddit from "../assets/rd.svg";
import wa from "../assets/wa.svg";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Applyjob() {
  const [jobInfo, setJobInfo] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("jobId");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/jobs/?jobId=${jobId}`);

        if (response.status === 200) {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setJobInfo(response.data);
          console.log("Job Given", response.data);
        } else {
          alert("Login kr pehle");
          console.error("jobFetch failed:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [jobId]);

  // console.log(jobInfo);
  let deadline;

  if (jobInfo.deadline && !isNaN(new Date(jobInfo.deadline))) {
    deadline = jobInfo.deadline.substring(0, 10);
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="applyjob mt-5">
        <div className="info-container mx-5">
          <div className="row">
            <div className="col1">
              <div className="job-overview">
                <h5>Tuition Details</h5>
                <div className="table-row">
                  <div className="col">
                    <div>
                      <img src={joblevelimg} alt="image not found" />
                    </div>

                    <div className="content">
                      <span> Name</span>
                      <strong>{jobInfo.studentName}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <img src={joblevelimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>Class Title</span>
                      <strong>{jobInfo.classTitle}</strong>
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="col">
                    <div>
                      <img src={salaryimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>Fees</span>
                      <strong>{jobInfo.fees}</strong>
                      <span className="mx-1"> /month</span>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <img src={deadlineimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>Timings</span>
                      <strong>{jobInfo.timings}</strong>
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="col">
                    <div>
                      <img src={jobtypeimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>Mode</span>
                      <strong>{jobInfo.mode}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <img src={experienceimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>Gender</span>
                      <strong>{jobInfo.gender}</strong>
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="col">
                    <div>
                      <img src={updateimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>Subjects</span>
                      <strong>
                        {/* {jobInfo.skills &&
                        jobInfo.skills.map((skill, index) => (
                          <span key={index}>{skill}</span>
                        ))} */}
                        {jobInfo.subject?.join(", ")}
                      </strong>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <img src={locationimg} alt="image not found" />
                    </div>
                    <div className="content">
                      <span>City</span>
                      <strong>{jobInfo.city}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-company">
                <h3>Job description</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: jobInfo.description }}
                ></p>
              </div>
              <div className="col1-footer">
                <span></span>
              </div>
              <div className="media-container">
                <div className="media">
                  <h5 style={{ fontSize: "16px", fontWeight: "600" }}>
                    Share this
                  </h5>
                  <span className="media-icon">
                    <img src={fb} alt="facebook" />
                  </span>
                  <span className="media-icon">
                    <img src={x} alt="facebook" />
                  </span>
                  <span className="media-icon">
                    <img src={reddit} alt="facebook" />
                  </span>
                  <span className="media-icon">
                    <img src={wa} alt="facebook" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col2">
              <div className="address-card">
                <div className="address-title">
                  <div>
                    <img src={companylogo} alt="image not found" />
                  </div>
                  <div className="mt-4">
                    <span>{jobInfo.studentName}</span>
                    <span className="address-location">
                      <img src={locationimg} alt="image not found" />{" "}
                      {jobInfo.area}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="col">
                    <div className="content">
                      <span>Address: </span>
                      <strong>{jobInfo.address}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div className="content">
                      <span>Phone: </span>
                      <strong>{jobInfo.contact}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Applyjob;
