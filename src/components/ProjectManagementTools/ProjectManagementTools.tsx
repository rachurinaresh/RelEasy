import "./ProjectManagementTools.scss";
import React, { useEffect } from "react";
import { Key, useState } from "react";
import { ReactComponent as Settings } from "../../assets/svg/settings.svg";
import { routePaths } from "../../constants/routePaths";
import { useNavigate } from "react-router";
import Modal from "../Shared/Modal/Modal";
import PMTConfigurationsForm from "./forms/ProjectManagementToolsForm";
import {
  useGetPMTMasterDataQuery,
  useLazyGetPMTConfigDetailsQuery,
} from "../../services/rtkQueryServices/pmtService";
import { createSearchParams } from "react-router-dom";
import { UserService } from "../../services/UserService";

const TrackingSystems = (props: any) => {
  const [pmtList, setPmtList] = useState([]);
  const {
    data: pmtData,
    refetch,
    isError,
  } = useGetPMTMasterDataQuery(UserService?.getClaims?.UserId);
  const [pmtId, setPmtId] = useState<any>();
  const [setPMTConfigDetails, pmtConfigDetails] =
    useLazyGetPMTConfigDetailsQuery();
  const [initialValues, setInitialValues] = useState<any>({});
  useEffect(() => {
    setPmtList(pmtData?.data);
    setPmtId(pmtData?.data.pmtId);
  }, [pmtData]);
  const [isOpenPMT, setIsOpenPMT] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");
  const navigate = useNavigate();
  const TrackingBoardsContent = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      event.stopPropagation();
    };
    const handleClose = (event: any) => {
      setAnchorEl(null);
      event.stopPropagation();
    };
    const viewPMTConfigurations = (event: any, id: number, pmtId: number) => {
      setPMTConfigDetails(id).then((res) => {
        if (res.isSuccess) {
          setInitialValues({
            pmtEmail: res?.data?.data?.pmtEmail,
            pmtPersonalAccessToken: res?.data?.data?.pmtPersonalAccessToken,
            pmtConfigId: res?.data?.data?.pmtConfigId,
            userId: UserService?.getClaims?.UserId,
            pmtId: pmtId,
          });
          setIsOpenPMT(true);
        }
      });
      handleClose(event);
      setFormType("view");
    };
    const editPMTConfigurations = (event: any, id: number) => {
      handleClose(event);
      setPMTConfigDetails(id);
      setFormType("edit");
    };
    const addPMTConfigurations = (event: any, id: number) => {
      setIsOpenPMT(true);
      setFormType("edit");
      setInitialValues({
        pmtEmail: "",
        pmtPersonalAccessToken: "",
        pmtConfigId: 0,
        userId: UserService.getClaims?.UserId,
        pmtId: id,
      });
    };
    return (
      <>
        {pmtList?.length > 0 ? (
          <div className="d-flex flex-wrap">
            {pmtList?.map((item: any, index: Key) => (
              <div className="box-item">
                <div className="flip-box">
                  <div className="flip-box-front text-center">
                    <div className="inner color-white">
                      <h3 className="flip-box-header">{item?.pmtName}</h3>
                      <img
                        src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png"
                        alt=""
                        className="flip-box-img"
                      />
                    </div>
                  </div>
                  <div className="flip-box-back text-center">
                    <div className="inner color-white">
                      {item?.isInitialConfigSet && (
                        <div className="d-flex justify-content-between mb-3 flex-wrap">
                          <Settings
                            onClick={(event) =>
                              viewPMTConfigurations(
                                event,
                                item.pmtConfigId,
                                item.pmtId
                              )
                            }
                            className="cursor-pointer settings"
                            title="View Project Management Tool Configurations"
                          />
                        </div>
                      )}
                      <h3 className="flip-box-header">
                        {item?.pmtName} {item?.isInitialConfigSet && "Config"}
                      </h3>
                      <p>Project Management Tool</p>
                      <button
                        className="flip-box-button"
                        onClick={(event) => {
                          if (item?.isInitialConfigSet)
                            navigate({
                              pathname: routePaths.organizations,
                              search: createSearchParams({
                                id: item.pmtConfigId,
                              })?.toString(),
                            });
                          else {
                            addPMTConfigurations(event, item.pmtId);
                          }
                        }}
                      >
                        {item?.isInitialConfigSet
                          ? "Organizations"
                          : "SetUp PMT Config"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            No Trackings Boards
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="page-title">List of Project Management Tools</div>
      {TrackingBoardsContent()}
      <Modal
        title="PMT Configurations"
        isOpen={isOpenPMT}
        onClose={() => {
          setIsOpenPMT(false);
          refetch();
        }}
        children={
          <>
            <PMTConfigurationsForm
              formInitialValues={initialValues}
              formType={formType}
              setFormType={setFormType}
              onClose={() => {
                setIsOpenPMT(false);
                refetch();
              }}
            />
          </>
        }
      />
    </>
  );
};
export default TrackingSystems;
