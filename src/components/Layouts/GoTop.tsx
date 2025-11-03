import React, { useState, useEffect } from "react";

const GoTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener("scroll", toggleVisibility);

    return () => {
      document.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="go-top" onClick={scrollToTop}>
          <i className="bx bx-chevrons-up"></i>
          <i className="bx bx-chevrons-up"></i>
        </div>
      )}
    </>
  );
};

export default GoTop;
