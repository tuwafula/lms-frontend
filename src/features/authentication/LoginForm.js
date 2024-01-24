import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { login as loginApi } from "../../services/apiAuth";

const FormLogin = styled.form`
  width: 40rem;
  overflow: hidden;
  font-size: 1.4rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setEmail("");
      setPassword("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <FormLogin onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor="Email address">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="Password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          Login
        </Button>
      </FormRow>
    </FormLogin>
  );
}

export default LoginForm;
