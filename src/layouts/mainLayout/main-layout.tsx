import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";

const MainLayout = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const { t } = useTranslation();

  if (!token) {
    navigate("/")
  }
  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar/>
      <div className="main">
       <TopNav/>
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <p className="mb-0">
                  © 2023 - <a className="text-muted">{t("classbon")}</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
