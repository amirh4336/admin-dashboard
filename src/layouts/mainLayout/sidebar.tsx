import { useTranslation } from "react-i18next";
// import logo from "@assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/app/app-context";
import { useQuery } from "@tanstack/react-query";
import { httpInterceptedService } from "../../core/https-server";
import { MdOutlineLocalCafe } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";

const Sidebar = () => {
  const { t } = useTranslation();
  const { showSidebar } = useAppContext() || {};

  const userId = localStorage.getItem("userData");
  const { data, isLoading } = useQuery({
    queryKey: ["cafe"],
    queryFn: () => httpInterceptedService.get(`/cafes/${userId}`),
  });

  return (
    <nav className={`sidebar ${!showSidebar ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <a className="sidebar-brand d-flex flex-column align-items-center pt-0 mb-0">
          {/* <img src={logo} style={{ height: "80px" }} /> */}
          <p className="mb-0 mt-4" style={{ fontSize: "90%" }}>
            {t("mainLayout.sidebar.subtitle")}
          </p>
        </a>

        <ul className="sidebar-nav pe-0">
          <li className="sidebar-header fw-bolder fs-lg">
            {t("mainLayout.sidebar.courseManagement")}
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/"}
            >
              <MdOutlineLocalCafe />

              <span className="align-middle me-2">
                {t("mainLayout.sidebar.allCourses")}
              </span>
            </NavLink>
          </li>
          {isLoading ? (
            <li className="sidebar-item ms-2">درحال بارگذاری...</li>
          ) : !data?.data._id ? null : (
            <li className="sidebar-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                to={`/cafe/food/${data.data._id}`}
              >
                <IoFastFoodOutline />

                <span className="align-middle me-2">منو غذایی</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
