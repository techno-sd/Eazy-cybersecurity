import React from "react";

const TopHeader: React.FC = () => {
  return (
    <div className="top-header-area">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="header-left-content">
              <p>
                <i className="flaticon-email"></i>
                Email: <a href="mailto:support@eazy.com">support@eazy.com</a>
              </p>
            </div>
          </div>
          
          <div className="col-lg-6 col-md-6">
            <div className="header-right-content">
              <p>
                <i className="flaticon-phone-call"></i>
                Phone: <a href="tel:+1234567890">+123 456 7890</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;