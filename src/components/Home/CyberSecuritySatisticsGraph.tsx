import React from "react";

const CyberSecuritySatisticsGraph: React.FC = () => {
  return (
    <div className="cyber-security-statistics-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <h2>Cyber Security Statistics</h2>
          <p>
            Comprehensive overview of cyber security trends and statistics
            to help you understand the current threat landscape.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-statistics-box">
              <div className="icon">
                <i className="flaticon-cyber-security"></i>
              </div>
              <h3>98%</h3>
              <p>Protection Rate</p>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-statistics-box">
              <div className="icon">
                <i className="flaticon-shield"></i>
              </div>
              <h3>24/7</h3>
              <p>Monitoring</p>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-statistics-box">
              <div className="icon">
                <i className="flaticon-server"></i>
              </div>
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-6">
            <div className="single-statistics-box">
              <div className="icon">
                <i className="flaticon-folder"></i>
              </div>
              <h3>1000+</h3>
              <p>Threats Blocked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberSecuritySatisticsGraph;