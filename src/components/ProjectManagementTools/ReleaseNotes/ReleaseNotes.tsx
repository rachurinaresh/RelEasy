import React, { Key, useEffect, useState } from "react";
import "./ReleaseNotes.scss";
import axios from "axios";
import RichTextEditor from "../../Shared/RichTextEditor/RichTextEditor";
import { Button, FormControlLabel, ListItemIcon, Switch } from "@mui/material";
import {
  useGetProjectIssueTypesQuery,
  useGetProjectLabelValuesQuery,
  useLazyGenerateProjectReleaseNotesQuery,
} from "../../../services/rtkQueryServices/projectsService";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { UserService } from "../../../services/UserService";
import Loader from "../../../models/shared/Loader/Loader";
import { snackbarWrapper } from "../../Shared/snackbarWrapper";

export const ReleaseNotes = (props: any) => {
  const [textEditorContent, setTextEditorContent] = useState<any>(null);
  const [issueTypes, setIssueTypes] = useState<any>([]);
  const [labelValues, setLabelValues] = useState<any>([]);
  const [labelValue, setLabelValue] = useState<string>("");
  const [isIncludeIssueDescription, setIsIncludeIssueDescription] =
    useState<boolean>(true);
  const [getReleaseNotes, releaseNotesDetails] =
    useLazyGenerateProjectReleaseNotesQuery();
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  const {
    data: projectsIssueTypesData,
    refetch,
    isError,
  } = useGetProjectIssueTypesQuery({
    organizationId: props?.orgId,
    projectKey: props?.projectDetails?.projectKey,
  });

  const {
    data: projectsVersionsData,
    refetch: refetchData,
    isError: error,
  } = useGetProjectLabelValuesQuery({
    organizationId: props?.orgId,
    projectKey: props?.projectDetails?.projectKey,
  });

  useEffect(() => {
    if (projectsIssueTypesData?.isSuccess) {
      setIssueTypes(projectsIssueTypesData.data);
    }
  }, [projectsIssueTypesData]);

  useEffect(() => {
    if (projectsVersionsData?.isSuccess) {
      setLabelValues(projectsVersionsData.data);
    }
  }, [projectsVersionsData]);

  useEffect(() => {
    if (releaseNotesDetails?.isSuccess) {
      setIsFilterApplied(!isFilterApplied);
      handleChange("body", releaseNotesDetails?.data?.data);
    }
  }, [releaseNotesDetails]);

  const handleChange = (key: string, value: string | boolean) => {
    setTextEditorContent({ ...textEditorContent, [key]: value });
  };

  useEffect(() => {
    handleChange("body", props?.releaseNotesData);
  }, [props?.releaseNotesData]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const downloadReleaseNotes = () => {
    setIsLoading(true);
    axios
      .post(
        "https://localhost:7017/api/Project/DownloadReleaseNotes",

        { htmlBody: textEditorContent?.body },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${UserService.accessToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ReleaseNotes.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsLoading(false);
        snackbarWrapper("Downloaded successfully", "success");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        snackbarWrapper("Error", "error");
      });
  };

  const [selectedIssueTypes, setSelectedIssueTypes] = React.useState<string[]>(
    []
  );

  const handleIssueTypeChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedIssueTypes(
        selectedIssueTypes.length === issueTypes?.length
          ? []
          : issueTypes.map((item) => item?.issueTypeName)
      );
      return;
    }
    setSelectedIssueTypes(value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const isAllSelected =
    issueTypes?.length > 0 && selectedIssueTypes?.length === issueTypes?.length;

  const setSelectedIssueTypesValues = () => {
    let s: any = [];
    issueTypes?.map((item) => {
      selectedIssueTypes?.map((value) => {
        if (value === item?.issueTypeName) {
          s.push(item?.issueTypeId);
        }
      });
    });
    return s;
  };

  const handleLabelChange = (event) => {
    const value = event.target.value;
    setLabelValue(value);
  };

  return (
    <div className="p-5">
      <div className="filter-wrapper d-flex align-items-center justify-content-between mb-3">
        <div id="sample-id" className="d-flex align-items-center ">
          <div>
            {issueTypes?.length > 0 && (
              <div>
                <FormControl sx={{ m: 1, width: 100 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Issue Types
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedIssueTypes}
                    onChange={handleIssueTypeChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    label="Issue Types"
                  >
                    <MenuItem value="all">
                      <ListItemIcon>
                        <Checkbox
                          checked={isAllSelected}
                          indeterminate={
                            selectedIssueTypes?.length > 0 &&
                            selectedIssueTypes?.length < issueTypes?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText primary="Select All" />
                    </MenuItem>
                    {issueTypes?.map((issueType: any) => (
                      <MenuItem
                        key={issueType?.issueTypeId}
                        value={issueType?.issueTypeName}
                      >
                        <Checkbox
                          checked={
                            selectedIssueTypes?.indexOf(
                              issueType?.issueTypeName
                            ) > -1
                          }
                        />
                        <ListItemText primary={issueType?.issueTypeName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
          <div>
            {labelValues?.length > 0 && (
              <div>
                <FormControl sx={{ m: 1, width: 100 }}>
                  <InputLabel id="demo-simple-select-label">
                    Label Value
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={labelValue}
                    label="Age"
                    onChange={handleLabelChange}
                  >
                    {labelValues?.map((labelValue: any) => (
                      <MenuItem value={labelValue}>{labelValue}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={isIncludeIssueDescription}
                  onChange={() => {
                    setIsIncludeIssueDescription(!isIncludeIssueDescription);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Include Issue Description"
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <Button
            variant="outlined"
            onClick={() => {
              let content = {
                organizationId: props?.orgId,
                projectKey: props?.projectDetails?.projectKey,
                selectedIssueTypeIds: setSelectedIssueTypesValues(),
                includeIssueDescription: isIncludeIssueDescription,
                labelValue: labelValue,
                htmlTemplateId: 1,
              };
              getReleaseNotes(content);
            }}
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              let content = {
                organizationId: props?.orgId,
                projectKey: props?.projectDetails?.projectKey,
                selectedIssueTypeIds: [],
                includeIssueDescription: true,
                labelValue: "",
                htmlTemplateId: 1,
              };
              getReleaseNotes(content);
              setSelectedIssueTypes([]);
              setIsIncludeIssueDescription(true);
              setLabelValue("");
            }}
            className="clear-filter mb-2"
          >
            Clear Filter
          </Button>
        </div>
      </div>
      <div className="mb-3">
        <RichTextEditor
          value={textEditorContent?.body}
          onChange={(content: string) => {
            handleChange("body", content);
          }}
        />
      </div>
      <div id="content-check" className="notes-content"></div>
      <div className="d-flex justify-content-end fixed-footer">
        <Button
          onClick={() => {
            downloadReleaseNotes();
          }}
          variant="outlined"
        >
          Download Release Notes as PDF
        </Button>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default ReleaseNotes;
