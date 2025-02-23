import { sideNavProps } from "../../../../models/shared/side-nav";
import { Link } from "react-router-dom";
import "./SideNav.scss";
import { routePaths } from "../../../../constants/routePaths";
import Navigation from "../Navigation/Navigation";
import { ReactComponent as ProjectManagementTool } from "../../../../assets/svg/ProjectManagementTool.svg";
const SideNav = (props: sideNavProps) => {
  let routes = [
    {
      text: "Project Management Tools",
      icon: ProjectManagementTool,
      link: routePaths.projectManagementTools,
    },
  ];
  const navigation = routes.map((item, index) => (
    <li className="mb-4" key={item.text}>
      <Navigation {...props} navItem={item} />
    </li>
  ));
  return (
    <>
      <div className="side-nav-wrapper">
        <ul className="list-unstyled mb-0">{navigation}</ul>
      </div>
      <div className="d-flex flex-column side-nav-footer-wrapper align-items-center"></div>
    </>
  );
};
export default SideNav;
