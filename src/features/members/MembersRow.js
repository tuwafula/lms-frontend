import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteMember } from "../../services/apiMembers";

import styled from "styled-components";
import EditMemberButton from "./EditMemberButton";
import DeleteMember from "./DeleteMember";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 0.6fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-400);
  font-family: "Sono";
`;

const OutstandingDebt = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;

function MembersRow({ member }) {
  const { id: memberId, name, email, outstanding_debt } = member;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Name>{name}</Name>
        <Email>{email}</Email>
        <OutstandingDebt>{formatCurrency(outstanding_debt)}</OutstandingDebt>
        <ButtonRow>
          <EditMemberButton
            memberToEdit={member}
            id={memberId}
            disabled={isDeleting}
          />

          <DeleteMember mutate={mutate} id={memberId} />
        </ButtonRow>
      </TableRow>
    </>
  );
}

export default MembersRow;
