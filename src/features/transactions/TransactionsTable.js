import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { getTransactions } from "../../services/apiTransactions";
import TransactionsRow from "./TransactionsRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.6fr 0.6fr 0.6fr;
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

function TransactionsTable() {
  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isLoading) return <Spinner />;

  //   console.log(transactions);
  //   console.log(transactions[0].book);
  //   console.log(transactions[0].member);

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Book</div>
        <div>Member</div>
        <div>Date of issue</div>
        <div>Return Date</div>
        <div>Fee Charged</div>
        <div>Status</div>
      </TableHeader>
      {transactions.map((transaction) => (
        <TransactionsRow transaction={transaction} key={transaction.id} />
      ))}
    </Table>
  );
}

export default TransactionsTable;
