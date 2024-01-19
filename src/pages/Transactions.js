import TransactionsTable from "../features/transactions/TransactionsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Transactions() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Transactions</Heading>
      </Row>
      <Row>
        <TransactionsTable />
      </Row>
    </>
  );
}

export default Transactions;
