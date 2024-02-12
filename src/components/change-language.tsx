import usFlag from "@assets/images/us.png"
import faFlag from "@assets/images/fa.png"


const ChangeLanguage = () => {
  return (
    <div className="dropdown">
      <a className="nav-flag dropdown-toggle">
        <img src={usFlag} alt="English" />
      </a>
      <div className="dropdown-menu dropdown-menu-end show">
        <a className="dropdown-item fw-bolder">
          <img src={faFlag} width="20" className="ms-2" />
        </a>
      </div>
    </div>
  )
}

export default ChangeLanguage