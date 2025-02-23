import { Form, Formik } from "formik";
import Input from "../../components/Shared/Input/Input";
import * as Yup from "yup";
import { validationMessages } from "../../constants/forms/validationMessages";
import { regex } from "../../constants/regex";
import { useLazyRegisterUserQuery } from "../../services/rtkQueryServices/loginService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import Button from "@mui/material/Button";

export default function Register() {
  const navigate = useNavigate();
  const formInitialValues = {
    userEmail: "",
    firstName: "",
    lastName: "",
    displayName: "",
  };
  const [setRegistration, registration] = useLazyRegisterUserQuery();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const validationSchema = () =>
    Yup.object({
      userEmail: Yup.string()
        .required(validationMessages.emailRequired)
        .matches(regex.emailValidation, validationMessages.validEmail),
      firstName: Yup.string().required(validationMessages.firstName),
      lastName: Yup.string().required(validationMessages.lastName),
      displayName: Yup.string().required(validationMessages.displayName),
    });
  return (
    <div>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          setRegistration(values).then((res) => {
            if (res.isSuccess) {
              navigate("/login");
            } else if (res.isError) {
              setErrorMessage(
                (res?.error as any).data?.message || "something went wrong"
              );
            }
          });
        }}
      >
        {(formik) => (
          <Form
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
            className="registration-form-container login-container d-flex vh-100 justify-content-center align-items-center"
          >
            <div className="d-flex flex-column justify-content-around align-items-center registration-form bg-white registration-wrapper px-16 py-5">
              <div className="mb-5">
                <div className="signup-header">Create Account,</div>
                <div className="signup-started text-align-center">
                  Sign up to get started 🎉!
                </div>
              </div>
              <div className="w-80">
                <Input
                  name="userEmail"
                  label="User Email"
                  placeholder="User Email"
                  errorMsg={
                    (formik.touched.userEmail || formik.submitCount > 0) &&
                    formik.errors.userEmail &&
                    (formik.errors as any).userEmail
                  }
                  onInput={formik.handleChange}
                  value={formik.values.userEmail}
                  required
                />
                <Input
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  onInput={formik.handleChange}
                  errorMsg={
                    formik.touched.firstName &&
                    formik.errors.firstName &&
                    (formik.errors as any).firstName
                  }
                  value={formik.values.firstName}
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  onInput={formik.handleChange}
                  errorMsg={
                    formik.touched.lastName &&
                    formik.errors.lastName &&
                    (formik.errors as any).lastName
                  }
                  value={formik.values.lastName}
                  required
                />
                <Input
                  name="displayName"
                  placeholder="Display Name"
                  label="Display Name"
                  onInput={formik.handleChange}
                  errorMsg={
                    formik.touched.displayName &&
                    formik.errors.displayName &&
                    (formik.errors as any).displayName
                  }
                  value={formik.values.displayName}
                  required
                />
                <span className="error-message">{errorMessage}</span>
                <div className="form-actions d-flex justify-content-between mt-3">
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Back to Login
                  </Button>
                  <Button variant="outlined" type="submit">
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
