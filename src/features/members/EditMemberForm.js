import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { editMember } from "../../services/apiMembers";

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

function EditMemberForm({ memberToEdit, onCloseModal, id }) {
  const { handleSubmit, register, reset, formState } = useForm({
    defaultValues: memberToEdit,
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ data, id }) => editMember(data, id),
    onSuccess: () => {
      toast.success("Member updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      reset();
      onCloseModal();
    },
    onError: (err) => toast.error(err.message),
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    mutate({ data, id });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          disabled={isEditing}
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          disabled={isEditing}
          id="email"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="outstanding_debt">Outstanding debt</Label>
        <Input
          type="number"
          disabled={isEditing}
          id="outstanding_debt"
          defaultValue={0}
          {...register("outstanding_debt", {
            required: "This field is required",
            // validate: (value) =>
            //   value === 0 || "Outstanding debt must be equal to zero",
          })}
        />
        {errors?.outstading_debt?.message && (
          <Error>{errors.outstading_debt.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isEditing}>
          Edit Member
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditMemberForm;
