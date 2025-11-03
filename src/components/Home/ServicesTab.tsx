import React from "react";

const ServicesTab: React.FC = () => {
  return (
    <div className="services-tab-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Comprehensive security solutions for your business needs.</p>
        </div>
        
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-service-box">
              <div className="icon">
                <i className="flaticon-cyber-security"></i>
              </div>
              <h3>Cyber Security</h3>
              <p>Complete protection against cyber threats and attacks.</p>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="single-service-box">
              <div className="icon">
                <i className="flaticon-shield"></i>
              </div>
              <h3>Data Protection</h3>
              <p>Secure your sensitive data with our advanced protection methods.</p>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <div className="single-service-box">
              <div className="icon">
                <i className="flaticon-server"></i>
              </div>
              <h3>Network Security</h3>
              <p>Comprehensive network security solutions for businesses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;