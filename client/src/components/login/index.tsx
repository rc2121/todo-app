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
} from "./styles";
import { useLoginLazyQuery } from "../../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import "./index.scss";

type intialInputTypes = {
  userName: string;
  password: string;
};

const initialValues: intialInputTypes = { userName: "", password: "" };

const signInSchema = yup.object().shape({
  userName: yup
    .string()
    .email("username must be a valid email")
    .required("username is required"),
  password: yup.string().required("password is required"),
});

const Login = () => {
  const [login] = useLoginLazyQuery();
  const navigate = useNavigate();
  const handleLogin = async (values: intialInputTypes) => {
    const response = await login({
      variables: { loginInput: values },
    });
    if (response?.data) {
      localStorage.setItem("token", response?.data?.login);
      navigate("/");
    }
    if (response?.error) {
      alert(`${response?.error}`);
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
        handleLogin(values);
      }}
    >
      {({ values, setFieldValue, handleSubmit, errors, isValid, dirty }) => (
        <div className="mainWrapper">
          <div className="mainContainer">
            <LoginWrapper>
              <Title>Sign in</Title>
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
                <div className="signInWrapper">
                  <Button onClick={() => handleSubmit()}>Sign in</Button>
                </div>
                <Link onClick={() => navigate('/signup')}>Don't have an account ?</Link>
              </>
            </LoginWrapper>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
