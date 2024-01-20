import Form from "../../ui/Form";
import styled from "styled-components";
import Select from "react-select";
import Button from "../../ui/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";
import { getMember, getMembers } from "../../services/apiMembers";
import { createTransaction } from "../../services/apiTransactions";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 30rem;
`;

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

function IssueBookForm({ onCloseModal }) {
  //   const { reset, handleSubmit, register } = useForm();

  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const { data: members } = useQuery({
    queryKey: ["members"],
    queryFn: () => getMembers(),
  });

  const bookOptions = books
    ? books.map((book) => ({ value: book.id, label: book.title }))
    : [];

  const memberOptions = members
    ? members.map((member) => ({ value: member.id, label: member.name }))
    : [];

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Book issued successfully");
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      onCloseModal();
    },
    onError: (err) => toast.error(err.message),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const bookOption = Number(e.target.book.value);
    const memberOption = Number(e.target.member.value);

    const member = await getMember(memberOption);

    if (member.outstanding_debt >= 499) {
      toast.error(
        "Cannot issue book. Outstanding debt must be less than KES 500"
      );
      return;
    }

    mutate({
      book: bookOption,
      member: memberOption,
    });
  }

  return (
    <StyledDiv>
      <Form onSubmit={handleSubmit}>
        <Heading>ISSUE BOOK</Heading>
        <FormRow>
          <Label htmlFor="book">Select Book:</Label>
          <Select
            id="book"
            name="book"
            options={bookOptions}
            isDisabled={isLoading}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="member">Select Member:</Label>
          <Select
            id="member"
            name="member"
            options={memberOptions}
            isDisabled={isLoading}
          />
        </FormRow>

        <FormRow>
          <Button type="reset" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button type="submit">Issue Book</Button>
        </FormRow>
      </Form>
    </StyledDiv>
  );
}

export default IssueBookForm;
