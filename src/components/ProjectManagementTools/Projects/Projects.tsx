import { Key, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { routePaths } from "../../../constants/routePaths";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import {
  useGetProjectsDetailsQuery,
  useLazyGenerateProjectReleaseNotesQuery,
} from "../../../services/rtkQueryServices/projectsService";
import { Button } from "@mui/material";
import { ReleaseNotes } from "../ReleaseNotes/ReleaseNotes";
import Modal from "../../Shared/Modal/Modal";
import "./Projects.scss";

const Projects = (props: any) => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<any>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [getReleaseNotes, releaseNotesDetails] =
    useLazyGenerateProjectReleaseNotesQuery();
  const orgId = useMemo(() => searchParams.get("id"), [searchParams]);
  const {
    data: projectsData,
    refetch,
    isError,
  } = useGetProjectsDetailsQuery(orgId);

  useEffect(() => {
    if (projectsData?.isSuccess) {
      setProjects(projectsData.data);
    }
  }, [projectsData]);

  const breadCrumb = [
    { title: "PMT", url: "/projectManagementTools" },
    { title: "Organizations", url: `/organizations?id=${orgId}` },
    { title: "Projects" },
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

  const ProjectsContent = () => {
    return (
      <>
        {projects?.length > 0 ? (
          <div className="d-flex flex-wrap">
            {projects?.map((item: any, index: Key) => (
              <div className="align-content-center d-flex justify-content-center me-4 project-card">
                <div className="project-key">Key : {item?.projectKey}</div>
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <div className="project-name me-5">{item?.projectName}</div>
                  <Button
                    onClick={() => {
                      let content = {
                        organizationId: orgId,
                        projectKey: item?.projectKey,
                        selectedIssueTypeIds: [],
                        includeIssueDescription: true,
                        labelValue: "",
                        htmlTemplateId: 1,
                      };
                      getReleaseNotes(content);
                      setOpen(true);
                      setOpenIndex(index);
                    }}
                    variant="outlined"
                  >
                    {" "}
                    Preview Release Note
                  </Button>
                </div>

                <Modal
                  isOpen={open && openIndex === index}
                  onClose={() => {
                    setOpen(false);
                    setOpenIndex(false);
                  }}
                  title="Release Notes"
                  modalWidth="1820px"
                  headerBg="#FFFFFF"
                  headerColor="#13ada4"
                  modalHeaderBottomStyle={{
                    borderBottom: "1px solid var(--primary-color)",
                  }}
                >
                  <>
                    <ReleaseNotes
                      releaseNotesData={releaseNotesDetails?.data?.data}
                      orgId={orgId}
                      projectDetails={item}
                    />
                  </>
                </Modal>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            No projects
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
        <div className="page-title mb-5">List of Projects</div>
      </div>
      {ProjectsContent()}
    </>
  );
};

export default Projects;
