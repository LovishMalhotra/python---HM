const Footer = () => {
  return (
    <>
      <section className="contact container mt-100">
        <div className="contact-info">
          <div className="first-info">
            <a href="/">
              <svg fill="none" height="46" viewBox="0 0 32 32" width="56">
                <path
                  clipRule="evenodd"
                  d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
              <h5
                className="font-bold text-inherit"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  color: " #3c65f !important",
                }}
              >
                IMhometutor
              </h5>
            </a>
            <p>
              IMhometutor is the heart of the design community and the best
              resource to discover and connect with designers and jobs
              worldwide.
            </p>
            <div className="social-icon">
              <a href="#">
                <i className="bx bxl-facebook" />
              </a>
              <a href="#">
                <i className="bx bxl-twitter" />
              </a>
              <a href="#">
                <i className="bx bxl-instagram" />
              </a>
              <a href="#">
                <i className="bx bxl-youtube" />
              </a>
              <a href="#">
                <i className="bx bxl-linkedin" />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="second-info col-auto">
              <h4>Resources</h4>
              <p>Contact us</p>
              <p>About page</p>
              <p>Products</p>
              <p>Contact</p>
            </div>
            <div className="third-info col-auto">
              <h4>Community</h4>
              <p>Feature</p>
              <p>Pricing</p>
              <p>Credit</p>
              <p>FAQ</p>
            </div>
            <div className="fourth-info col-auto">
              <h4>Quick links</h4>
              <p>iOS</p>
              <p>Android</p>
              <p>Desktop</p>
              <p>Microsoft</p>
            </div>
            <div className="five col-auto">
              <h4>More</h4>
              <p>Privacy</p>
              <p>Help</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
        <div className="end-text mt-5 mb-0">
          <p>Copyright @2024.IMhometutor all right reserved.</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
