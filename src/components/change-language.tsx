import usFlag from "@assets/images/us.png";
import faFlag from "@assets/images/fa.png";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/app/app-context";

const ChangeLanguage = () => {
  const [show, setShow] = useState(false);

  const context = useAppContext();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickOutSide = (e: any) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickOutSide);

    return () => {
      document.addEventListener("mousedown", checkIfClickOutSide);
    };
  }, [show]);

  return (
    <div className="dropdown">
      <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
        <img src={context?.language === "fa" ? faFlag : usFlag} alt="English" />
      </a>
      <div
        ref={ref}
        className={`dropdown-menu dropdown-menu-end ${
          show ? "show" : undefined
        }`}
      >
        <a
          className="dropdown-item fw-bolder d-flex align-items-center gap-2"
          style={{ textAlign: context?.language === "fa" ? "right" : "left" }}
          onClick={() => {
            context?.changeLanguage && context?.changeLanguage("fa");
          }}
        >
          <img src={faFlag} width="20" className="ms-2" />
          <span className="align-middle">فارسی</span>
        </a>
        <a
          className="dropdown-item fw-bolder d-flex align-items-center gap-2"
          style={{ textAlign: context?.language === "fa" ? "right" : "left" }}
          onClick={() => {
            context?.changeLanguage && context?.changeLanguage("en");
          }}
        >
          <img src={usFlag} width="20" className="ms-2" />
          <span className="align-middle">English</span>
        </a>
      </div>
    </div>
  );
};

export default ChangeLanguage;
