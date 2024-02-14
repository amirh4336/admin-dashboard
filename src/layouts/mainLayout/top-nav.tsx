import ChangeLanguage from "../../components/change-language";
import ChangeTheme from "../../components/change-theme";
import { useAppContext } from "../../context/app/app-context";

const TopNav = () => {
  const { toggleSidebar } = useAppContext() || {};
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-3">
        <ChangeLanguage />
        <ChangeTheme />
      </div>
    </nav>
  );
};

export default TopNav;
