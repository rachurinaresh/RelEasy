import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../Shared/Input/Input";
import { validationMessages } from "../../../constants/forms/validationMessages";
import { regex } from "../../../constants/regex";
import { useLazySavePMTConfigDetailsQuery } from "../../../services/rtkQueryServices/pmtService";
import { useEffect } from "react";
import { snackbarWrapper } from "../../Shared/snackbarWrapper";

const PMTConfigurationsForm = (props: any) => {
  const { formInitialValues, formType, setFormType } = props;
  const [savepmtConfigDetails, pmtConfigDetails] =
    useLazySavePMTConfigDetailsQuery();
  const validationSchema = () =>
    Yup.object({
      pmtEmail: Yup.string()
        .required(validationMessages.emailRequired)
        .matches(regex.emailValidation, validationMessages.validEmail),
      pmtPersonalAccessToken: Yup.string().required(
        validationMessages.accessTokenRequired
      ),
    });
  useEffect(() => {
    if (pmtConfigDetails.isSuccess) {
      props.onClose();
      snackbarWrapper("Configurations saved successfully", "success");
    } else if (pmtConfigDetails.isError) {
      snackbarWrapper("something went wrong", "error");
    }
  }, [pmtConfigDetails]);
  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values: any) => {
        savepmtConfigDetails(values);
      }}
    >
      {(formik) => (
        <Form
          onChange={formik.handleChange}
          onSubmit={formik.handleSubmit}
          className="pmt-form-container"
        >
          <div className="pmt-form">
            <Input
              name="pmtEmail"
              label="User Email"
              placeholder="Email Address"
              errorMsg={
                (formik.touched.pmtEmail || formik.submitCount > 0) &&
                formik.errors.pmtEmail &&
                (formik.errors as any).pmtEmail
              }
              onInput={formik.handleChange}
              value={formik.values.pmtEmail}
              required
              disabled={formType === "view"}
            />
            <Input
              name="pmtPersonalAccessToken"
              placeholder="Access Token"
              label="Access Token"
              onInput={formik.handleChange}
              errorMsg={
                formik.touched.pmtPersonalAccessToken &&
                formik.errors.pmtPersonalAccessToken &&
                (formik.errors as any).pmtPersonalAccessToken
              }
              value={formik.values.pmtPersonalAccessToken}
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
                type="button"
              >
                Edit
              </button>
            ) : (
              <button className={"form-button"} type="submit">
                save
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default PMTConfigurationsForm;
