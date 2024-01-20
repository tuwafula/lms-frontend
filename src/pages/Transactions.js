import { useState } from "react";
import TransactionsTable from "../features/transactions/TransactionsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import IssueBookForm from "../features/transactions/IssueBookForm";

function Transactions() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Transactions</Heading>
        <Button onClick={() => setShowModal((state) => !state)}>
          Issue Book
        </Button>
        {showModal && (
          <Modal onClose={() => setShowModal((state) => !state)}>
            <IssueBookForm
              onCloseModal={() => setShowModal((state) => !state)}
            />
          </Modal>
        )}
      </Row>
      <Row>
        <TransactionsTable />
      </Row>
    </>
  );
}

export default Transactions;
