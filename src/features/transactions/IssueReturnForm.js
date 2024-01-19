import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { calculateDateDifferenceInDays } from "../../utils/helpers";
import { issueBookReturn } from "../../services/apiTransactions";

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

function IssueReturnForm({ transaction, onCloseModal }) {
  const { formState, handleSubmit, register } = useForm();

  const { errors } = formState;

  const { id, member, book, issue_date } = transaction;
  const { rent_fee } = book;

  const today = new Date();

  const days = calculateDateDifferenceInDays(issue_date, today);

  const rentCharged = days * Number(rent_fee);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ updatedData, id }) => issueBookReturn(updatedData, id),
    onSuccess: () => {
      toast.success("Book return successful");
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      onCloseModal();
    },
    onError: (err) => toast.error("Could not issue book return"),
  });

  function onSubmit(data) {
    const updatedData = {
      book: { ...book },
      ...data,
      member: {
        ...member,
        outstanding_debt: Number(member.outstanding_debt) + Number(rentCharged),
      },
      return_date: new Date().toISOString().split("T")[0],
    };
    mutate({ updatedData, id });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="rent_fee_charged">Rent fee charged</Label>
        <Input
          type="number"
          defaultValue={rentCharged}
          disabled={isUpdating}
          id="rent_fee_charged"
          {...register("rent_fee_charged", {
            required: "This field is required",
          })}
        />
        {errors?.rent_fee_charged?.message && (
          <Error>{errors.rent_fee_charged.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="is_returned">Return(check box to return)</Label>
        <Input
          type="checkbox"
          disabled={isUpdating}
          id="is_returned"
          {...register("is_returned", {
            required: "This field is required",
          })}
        />
        {errors?.is_returned?.message && (
          <Error>{errors.is_returned.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit">Issue Return</Button>
      </FormRow>
    </Form>
  );
}

export default IssueReturnForm;
