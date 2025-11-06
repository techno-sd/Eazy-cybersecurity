import React from "react";
import Image from "next/image";

const Partners: React.FC = () => {
  return (
    <div className="partner-area ptb-70">
      <div className="container">
        <div className="partner-slides">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6 col-sm-4 col-md-4">
              <div className="single-partner-item">
                <Image src="/img/partners/partner1.png" alt="Partner" width={150} height={80} style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 col-md-4">
              <div className="single-partner-item">
                <Image src="/img/partners/partner2.png" alt="Partner" width={150} height={80} style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 col-md-4">
              <div className="single-partner-item">
                <Image src="/img/partners/partner3.png" alt="Partner" width={150} height={80} style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 col-md-4">
              <div className="single-partner-item">
                <Image src="/img/partners/partner4.png" alt="Partner" width={150} height={80} style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 col-md-4">
              <div className="single-partner-item">
                <Image src="/img/partners/partner5.png" alt="Partner" width={150} height={80} style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 col-md-4">
              <div className="single-partner-item">
                <Image src="/img/partners/partner6.png" alt="Partner" width={150} height={80} style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;