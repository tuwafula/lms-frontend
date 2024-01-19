import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { useState } from "react";
import Modal from "../../ui/Modal";
import IssueReturnForm from "./IssueReturnForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.6fr 0.6fr 0.6fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Book = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Member = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-400);
  font-family: "Sono";
`;

const Fee = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const statusToTagName = {
  unsettled: "green",
  settled: "silver",
};

function TransactionsRow({ transaction }) {
  const {
    book,
    member,
    issue_date,
    is_returned,
    rent_fee_charged,
    return_date,
  } = transaction;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TableRow>
        <Book>{book.title}</Book>
        <Member>{member.name}</Member>
        <Member>{issue_date}</Member>
        <Member>
          {return_date == null ? <span>&mdash;</span> : return_date}
        </Member>
        <Fee>
          {rent_fee_charged == null ? (
            <span>&mdash;</span>
          ) : (
            formatCurrency(rent_fee_charged)
          )}
        </Fee>
        <Tag
          type={
            is_returned
              ? statusToTagName["settled"]
              : statusToTagName["unsettled"]
          }
        >
          {" "}
          {is_returned ? "settled" : "unsettled"}
        </Tag>
        {is_returned || (
          <ButtonRow>
            <Button
              size="small"
              onClick={() => setShowModal((state) => !state)}
            >
              Issue Return
            </Button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <IssueReturnForm
                  transaction={transaction}
                  onCloseModal={() => setShowModal(false)}
                />
              </Modal>
            )}
          </ButtonRow>
        )}
      </TableRow>
    </>
  );
}

export default TransactionsRow;
