import React from "react";

const DigitalWorkflow: React.FC = () => {
  return (
    <div className="digital-workflow-area ptb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="digital-workflow-content">
              <h2>Digital Workflow</h2>
              <p>
                Enhance your business workflow with our digital solutions.
                We provide comprehensive security measures to protect your
                digital assets and streamline your operations.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="digital-workflow-image">
              <img
                src="/img/home-one/digital-workflow.png"
                alt="Digital Workflow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalWorkflow;