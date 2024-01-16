import BookTable from "../features/books/BookTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddBook from "../features/books/AddBook";
import SearchForm from "../features/books/SearchForm";

function Books() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Books</Heading>
        <SearchForm />
      </Row>
      <Row>
        <BookTable />
        <AddBook />
      </Row>
    </>
  );
}

export default Books;
