import "./Header.scss";
import { useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { HeaderProps } from "../../../../models/shared/header";
import { ReactComponent as HamBurger } from "../../../../../src/assets/svg/HamBurger.svg";
import { ReactComponent as OpenHamBurger } from "../../../../../src/assets/svg/OpenHamBurger.svg";
import { ReactComponent as Logout } from "../../../../../src/assets/svg/logout.svg";
import { StyledMenu } from "../Theme/StyledMenu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { UserService } from "../../../../services/UserService";

const Header = (props: HeaderProps) => {
  const { isActive } = props;
  const [anchorEl, setAnchorEl] = useState<any>();
  const open = Boolean(anchorEl);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    UserService.logOut();
  };
  const [headerShadow, setHeaderShadow] = useState<boolean>(false);
  return (
    <div className="header-wrapper d-flex justify-content-center align-items-center">
      <header
        className={
          "w-100 main-header d-flex justify-content-between align-items-center " +
          (headerShadow && "header-shadow")
        }
      >
        {isActive ? (
          <OpenHamBurger
            onClick={() => {
              props.setIsSideNavOpen(!isActive);
            }}
            className="cursor-pointer"
          />
        ) : (
          <HamBurger
            onClick={() => {
              props.setIsSideNavOpen(!isActive);
            }}
            className="cursor-pointer"
          />
        )}
        <div
          style={isActive ? { paddingLeft: "15px" } : { paddingLeft: "15px" }}
        >
          Releasy
        </div>
        <div className="actions">
          <div className="account-action">
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="text"
              disableElevation
              onClick={handleClick}
              className="h-100"
            >
              <div className="user-profile" ref={profileRef}>
                <div className="user-profile-control">
                  <div className="d-flex flex-column">
                    <span
                      className="user-name"
                      title={UserService?.getClaims?.UserName}
                    >
                      {UserService?.getClaims?.UserName}
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ms-3"
                      >
                        <path
                          d="M8.21973 0.969727L4.99998 4.18948L1.78023 0.969727L0.719727 2.03023L4.99998 6.31048L9.28023 2.03023L8.21973 0.969727Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  logOut();
                }}
                disableRipple
              >
                <div className="d-flex justify-content-between align-items-center w-100 mx-3 profile-wrapper logout-wrapper">
                  <span>Logout</span>
                  <Logout />
                </div>
              </MenuItem>
            </StyledMenu>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
