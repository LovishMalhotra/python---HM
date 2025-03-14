import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="navbar navbg-body-tertiary mt-2">
          <div className="container">
            <a className="navbar-brand mb-0 h1" href="/">
              <div style={{ display: "flex", verticalAlign: "middle" }}>
                <svg fill="none" height="46" viewBox="0 0 32 32" width="56">
                  <path
                    clipRule="evenodd"
                    d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                <h3
                  className="font-bold text-inherit mt-1 logo"
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  IMhometutor
                </h3>
              </div>
            </a>
            {/* Show Hamburger on small screens (d-md-none) */}
            <button
              className="navbar-toggler d-md-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/9663/9663120.png"
                alt="JobHunt"
                width="50px"
                height="50px"
              />
            </button>
            {/* Normal Navbar for larger screens (d-none d-md-block) */}
            <div className="d-none d-md-block">
              <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 mx-3 flex-row pe-3">
                <li className="nav-item">
                  <a className="nav-link mx-3 active" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="/FindJob">
                    Find Tuitions
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="/CompanyRegister">
                    Post Tuiton
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="/About">
                    About Us
                  </a>
                </li>
               
              </ul>
             </div>
             <a href="./SignUp">
                    <button className="btn btn-primary d-none d-md-block">
                      SignUp as Tutor
                    </button>
              </a>
            {/* Offcanvas Navbar for mobile view */}
            <div
              className="offcanvas offcanvas-end d-md-none"
              tabIndex={-1}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <a
                  href="/"
                  className="offcanvas-title logo d-flex"
                  id="offcanvasNavbarLabel"
                >
                  <svg fill="none" height="46" viewBox="0 0 32 32" width="56">
                    <path
                      clipRule="evenodd"
                      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                  <h5
                    className="font-bold text-inherit mt-2"
                    style={{
                      color: " #3c65f !important",
                    }}
                  >
                    IMhometutor
                  </h5>
                </a>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{
                    marginRight: "20px",
                  }}
                />
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 mx-3 justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link mx-3 active" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link" href="/FindJob">
                      Find Tuitions
                    </a>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link" href="/CompanyRegister">
                      Post Tuiton
                    </a>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link" href="/About">
                      About Us
                    </a>
                  </li>
                </ul>
                <a href="./SignUp">
                  <button className="btn mx-2 my-3 btn-primary">
                    SignUp as Tutor
                  </button>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </header>
    </>
  );
};

export default Navbar;
