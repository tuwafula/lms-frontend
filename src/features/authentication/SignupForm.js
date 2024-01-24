import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import { useForm, Controller } from "react-hook-form";
import FileInput from "../../ui/FileInput";
import { signUp as signUpApi } from "../../services/apiAuth";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function SignupForm() {
  const { register, formState, handleSubmit, getValues, control, reset } =
    useForm();

  const { errors } = formState;

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Staff user created successfully");
    },
    onSettled: () => {
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    const formData = new FormData();

    formData.append("avatar", data.avatar[0], data.avatar[0].name);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    signUp(formData);
  }

  return (
    <>
      <Heading>Create new user</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="first_name">First name</Label>
          <Input
            type="text"
            id="first_name"
            disabled={isLoading}
            {...register("first_name", {
              required: "This field is required",
            })}
          />
          {errors?.first_name?.message && (
            <Error>{errors.first_name.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="last_name">Last name</Label>
          <Input
            type="text"
            id="last_name"
            disabled={isLoading}
            {...register("last_name", {
              required: "This field is required",
            })}
          />
          {errors?.last_name?.message && (
            <Error>{errors.last_name.message}</Error>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors?.email?.message && <Error>{errors.email.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
            })}
          />
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="passwordConfirm">Confirm password</Label>
          <Input
            type="password"
            id="passwordConfirm"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords must be the same",
            })}
          />
          {errors?.passwordConfirm?.message && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="avatar">Profile picture</Label>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <FileInput
                id="avatar"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default SignupForm;
