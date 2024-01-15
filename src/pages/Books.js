import { useState } from "react";
import BookTable from "../features/books/BookTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateBookForm from "../features/books/CreateBookForm";

function Books() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Books</Heading>
        <p>Search</p>
      </Row>
      <Row>
        <BookTable />
        <Button onClick={() => setShowForm((state) => !state)}>
          Add new book
        </Button>
        {showForm && <CreateBookForm />}
      </Row>
    </>
  );
}

export default Books;
