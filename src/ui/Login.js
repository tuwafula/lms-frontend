import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "./Logo";
import Heading from "./Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 48rem; */
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h1">Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
