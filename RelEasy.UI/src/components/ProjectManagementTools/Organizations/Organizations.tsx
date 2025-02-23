import "./Organizations.scss";
import React, { useEffect, useMemo } from "react";
import { Key, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as MenuIcon } from "../../../assets/svg/menuIcon.svg";
import Modal from "../../Shared/Modal/Modal";
import OrganizationConfigurationsForm from "../forms/OrganizationsForm";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useGetPMTOrganizationsQuery } from "../../../services/rtkQueryServices/pmtService";
import { routePaths } from "../../../constants/routePaths";

const Organizations = (props: any) => {
  const [organizations, setOrganizations] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialValues, setInitialValues] = useState<any>({});
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<any>();
  const pmtConfigId = useMemo(() => searchParams.get("id"), [searchParams]);
  const {
    data: organizationData,
    refetch,
    isError,
  } = useGetPMTOrganizationsQuery(pmtConfigId);
  useEffect(() => {
    if (organizationData?.isSuccess) {
      setOrganizations(organizationData.data);
    }
  }, [organizationData]);
  const [isOpenOrganization, setIsOpenOrganization] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");
  const breadCrumb = [
    { title: "PMT", url: "/projectManagementTools" },
    { title: "Organizations" },
  ];
  const breadCrumbList = breadCrumb?.map((chunk, index) => {
    return (
      <li key={index}>
        <Link className="bread-crumb-route" to={chunk.url!}>
          {chunk.title}
        </Link>
      </li>
    );
  });
  const handleAddOrganization = (e: any) => {
    setIsOpenOrganization(true);
    setFormType("edit");
    setInitialValues({ pmtConfigId: pmtConfigId });
  };
  const OrganizationsContent = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      item: any
    ) => {
      setAnchorEl(event.currentTarget);
      setCardData(item);
    };
    const handleClose = (event: any) => {
      setAnchorEl(null);
      event.stopPropagation();
    };
    const viewOrganizationConfigurations = (event: any, item: any) => {
      handleClose(event);
      setIsOpenOrganization(true);
      setInitialValues({ ...cardData, pmtConfigId: pmtConfigId });
      setFormType("view");
    };
    const editOrganizationConfigurations = (event: any) => {
      handleClose(event);
      setIsOpenOrganization(true);
      setInitialValues({ ...cardData, pmtConfigId: pmtConfigId });
      setFormType("edit");
    };
    return (
      <>
        {organizations?.length > 0 ? (
          <div className="d-flex flex-wrap">
            {organizations?.map((item: any, index: Key) => (
              <div className="organization-card cursor-pointer">
                <div className="d-flex justify-content-end">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                      handleClick(e, item);
                    }}
                  >
                    <MenuIcon className="menu-icon" />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={(event) => {
                        viewOrganizationConfigurations(event, item);
                      }}
                    >
                      View Organization config
                    </MenuItem>
                    <MenuItem onClick={editOrganizationConfigurations}>
                      Edit Organization config
                    </MenuItem>
                  </Menu>
                </div>
                {item?.organizationName}
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={(event) => {
                      navigate({
                        pathname: routePaths.projects,
                        search: createSearchParams({
                          id: item.organizationId,
                        })?.toString(),
                      });
                    }}
                    variant="outlined"
                  >
                    Projects
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            No organizations
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={breadCrumb && breadCrumb.length > 0 ? "breadcrumb " : ""}>
        {breadCrumb.length > 0 && (
          <ul className="page-breadcrumb">{breadCrumbList}</ul>
        )}
      </div>
      <div className="page-header">
        <div className="page-title">List of Organizations</div>
        <Button
          variant="outlined"
          className="add-button"
          onClick={handleAddOrganization}
        >
          Add Organization
        </Button>
      </div>
      {OrganizationsContent()}
      <Modal
        title="Organization Configurations"
        isOpen={isOpenOrganization}
        onClose={() => {
          setIsOpenOrganization(false);
          refetch();
        }}
        children={
          <>
            <OrganizationConfigurationsForm
              formInitialValues={initialValues}
              formType={formType}
              setFormType={setFormType}
              onClose={() => {
                setIsOpenOrganization(!isOpenOrganization);
                refetch();
              }}
            />
          </>
        }
      />
    </>
  );
};
export default Organizations;
