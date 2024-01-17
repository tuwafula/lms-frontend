import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import { getMembers } from "../../services/apiMembers";
import Spinner from "../../ui/Spinner";
import MembersRow from "./MembersRow";
// import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 0.6fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function MembersTable() {
  //   const [searchParams] = useSearchParams();

  //   const filterValue = searchParams.get("searchTerm");

  const { isLoading, data: members } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  if (isLoading) return <Spinner />;

  console.log(members);

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Name</div>
        <div>Email</div>
        <div>Outstanding debt</div>
      </TableHeader>
      {members.map((member) => (
        <MembersRow member={member} key={member.id} />
      ))}
    </Table>
  );
}

export default MembersTable;
