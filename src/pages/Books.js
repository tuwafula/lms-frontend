import BookTable from "../features/books/BookTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddBook from "../features/books/AddBook";
import SearchForm from "../ui/SearchForm";

function Books() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Books</Heading>
        <SearchForm title="Search By Author / Book Title" />
      </Row>
      <Row>
        <BookTable />
        <AddBook />
      </Row>
    </>
  );
}

export default Books;
