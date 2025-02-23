import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../Shared/Input/Input";
import { validationMessages } from "../../../constants/forms/validationMessages";
import { useLazySaveOrganizationQuery } from "../../../services/rtkQueryServices/organizationService";
import { useEffect } from "react";
import { snackbarWrapper } from "../../Shared/snackbarWrapper";

const OrganizationConfigurationsForm = (props: any) => {
  const { formInitialValues, formType, setFormType } = props;
  const [SaveOrganizationData, organizationData] =
    useLazySaveOrganizationQuery();
  const validationSchema = () =>
    Yup.object({
      organizationURL: Yup.string().required(
        validationMessages.organizationURL
      ),
      organizationName: Yup.string().required(
        validationMessages.organizationName
      ),
    });
  useEffect(() => {
    if (organizationData.isSuccess) {
      props.onClose();
      snackbarWrapper(
        "Organization configurations saved successfully",
        "success"
      );
    } else if (organizationData.isError) {
      snackbarWrapper("Error", "error");
    }
  }, [organizationData]);
  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values: any) => {
        SaveOrganizationData(values);
      }}
    >
      {(formik) => (
        <Form
          onChange={formik.handleChange}
          onSubmit={formik.handleSubmit}
          className="organization-form-container"
        >
          <div className="organization-form">
            <Input
              name="organizationURL"
              label="Organization URL"
              placeholder="Organization URL"
              errorMsg={
                (formik.touched.organizationURL || formik.submitCount > 0) &&
                formik.errors.organizationURL &&
                (formik.errors as any).organizationURL
              }
              onInput={formik.handleChange}
              value={formik.values.organizationURL}
              required
              disabled={formType === "view"}
            />
            <Input
              name="organizationName"
              placeholder="Organization Name"
              label="Organization Name"
              onInput={formik.handleChange}
              errorMsg={
                (formik.touched.organizationName || formik.submitCount > 0) &&
                formik.errors.organizationName &&
                (formik.errors as any).organizationName
              }
              value={formik.values.organizationName}
              required
              disabled={formType === "view"}
            />
          </div>
          <div className="form-actions">
            {formType === "view" ? (
              <button
                className={"form-button"}
                onClick={(e) => {
                  setFormType("edit");
                  e.preventDefault();
                }}
              >
                Edit
              </button>
            ) : (
              <button className={"form-button"}>Save</button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default OrganizationConfigurationsForm;
