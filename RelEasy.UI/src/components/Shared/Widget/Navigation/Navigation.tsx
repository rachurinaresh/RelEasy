import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function Navigation(props: any) {
  const Icon = props.navItem?.icon;
  const location = useLocation();
  const activeLink = useMemo(() => location.pathname, [location]);
  const [expandedSideNavItem, setExpandedSideNavItem] =
    useState<boolean>(false);
  useEffect(() => {
    if (!props?.isSideNavOpen) {
      setExpandedSideNavItem(false);
    }
  }, [props]);
  return (
    <>
      {props.navItem?.subMenu ? (
        <div
          className={
            expandedSideNavItem
              ? "expanded pb-5"
              : activeLink?.includes(props?.navItem?.link)
              ? "active-sube-menu-wrapper"
              : ""
          }
        >
          <div
            className="menu-item"
            onClick={() => {
              setExpandedSideNavItem(!expandedSideNavItem);
            }}
          >
            <div className="menu-icon" title={props.navItem?.text}>
              <Icon />
            </div>
            <div className="menu-label" title={props.navItem?.text}>
              {props.navItem?.text}
            </div>
            <span>
              {/* <Dropdown className="side-nav-sub-menu-dropdown-icon" /> */}
            </span>
          </div>
          {expandedSideNavItem && (
            <div className="sub-menu mx-5 ps-5">
              {props?.navItem?.subMenu?.map(({ link, text, Icon }: any) => {
                return (
                  <NavLink
                    to={link}
                    className={({ isActive }) =>
                      isActive
                        ? "sub-menu-item d-flex py-3 active align-items-center "
                        : "sub-menu-item d-flex py-3 align-items-center "
                    }
                    onClick={() => {
                      props.setIsSideNavOpen(false);
                    }}
                  >
                    <Icon />
                    <div className="menu-icon m-0 ps-1" title={text}></div>
                    <div className="menu-label" title={text}>
                      {text}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to={props.navItem?.link}
          className={({ isActive }) =>
            isActive ? "menu-item active " : "menu-item"
          }
          onClick={() => {
            props.setIsSideNavOpen(false);
          }}
        >
          <div className="menu-icon" title={props.navItem?.text}>
            <Icon />
          </div>
          <div className="menu-label" title={props.navItem?.text}>
            {props.navItem?.text}
          </div>
        </NavLink>
      )}
    </>
  );
}

export default Navigation;
