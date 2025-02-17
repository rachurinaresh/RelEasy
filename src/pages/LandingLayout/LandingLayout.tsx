import { useState } from "react";
import "./LandingLayout.scss";
import { Outlet } from "react-router-dom";
import Header from "../../components/Shared/Widget/Header/Header";
import SideNav from "../../components/Shared/Widget/Side-nav/Side-nav";

const LandingLayout = () => {
  const [mobileToggle, setMobileToggle] = useState<boolean>(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(true);

  function mobileMenuToggle() {
    if (mobileToggle) {
      setMobileToggle(false);
    } else {
      setMobileToggle(true);
    }
  }

  return (
    <div
      className={
        "d-flex releasy-content-wrapper " + (mobileToggle ? "show-menu" : "")
      }
    >
      <div
        className={"releasy-left-wrapper " + (isSideNavOpen ? "" : "inactive")}
      >
        <div
          className="hamburger-icon pr-4 pt-4 text-right cursor-pointer"
          onClick={mobileMenuToggle}
        >
          <span className="nav-menu-close">
            close
            {/* <Close /> */}
          </span>
        </div>
        <div>
          <SideNav
            isSideNavOpen={isSideNavOpen}
            setIsSideNavOpen={setIsSideNavOpen}
          />
        </div>
      </div>
      {
        <Header
          setIsSideNavOpen={(e) => {
            setIsSideNavOpen(e);
          }}
          isActive={isSideNavOpen}
        />
      }
      <div
        className={"releasy-right-wrapper " + (isSideNavOpen ? "" : "inactive")}
      >
        <div
          onClick={mobileMenuToggle}
          className="nav-menu-open header-badge-wrapper"
        >
          <span className="material-icons nav-menu-open-icon">
            {/* <Menu /> */}
          </span>
        </div>
        <div className="releasy-main-content p-4 h-100">
          {/* <Dashboard /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
