import { Formik } from "formik";
import * as yup from "yup";
import {
  LoginWrapper,
  Title,
  InputWrapper,
  Label,
  Input,
  Button,
  Error,
  Link
} from "../login/styles";
import { useSignupMutation } from "../../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import "../login/index.scss";

type intialInputTypes = {
  userName: string;
  password: string;
  confirmPassword: string;
};

const initialValues: intialInputTypes = { userName: "", password: "", confirmPassword: "" };

const signInSchema = yup.object().shape({
  userName: yup
    .string()
    .email("username must be a valid email")
    .required("username is required"),
  password: yup.string().required("password is required"),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match').required("confirm password is required")
});

const Signup = () => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const handleSignup = async (values: intialInputTypes) => {
    console.log({ values });
    const response = await signup({
        variables: { input: { userName: values.userName, password: values.password } },
    });
    if (response?.data) {
      localStorage.setItem("token", response?.data?.signup);
      navigate("/");
    } else {
        alert(`${response}`);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        handleSignup(values);
      }}
    >
      {({ values, setFieldValue, handleSubmit, errors, isValid, dirty }) => (
        <div className="mainWrapper">
          <div className="mainContainer">
            <LoginWrapper>
              <Title>Sign up</Title>
              <>
                <InputWrapper>
                  <Label>
                    Username
                    <br />
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter username"
                    value={values.userName}
                    onChange={(e) => setFieldValue("userName", e.target.value)}
                  />
                  <br />
                  {errors.userName && <Error>{errors.userName}</Error>}
                </InputWrapper>
                <InputWrapper>
                  <Label>
                    Password
                    <br />
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />
                  {errors.password && <Error>{errors.password}</Error>}
                </InputWrapper>
                <InputWrapper>
                  <Label>
                    Confirm Password
                    <br />
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={values.confirmPassword}
                    onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                  />
                  {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
                </InputWrapper>
                <div className="signInWrapper">
                  <Button onClick={() => handleSubmit()}>Sign up</Button>
                </div>
                <Link onClick={() => navigate('/login')}>Already have an account</Link>
              </>
            </LoginWrapper>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
