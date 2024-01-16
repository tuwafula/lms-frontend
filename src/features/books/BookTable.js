import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";
import { getBooks } from "../../services/apiBooks";
import Spinner from "../../ui/Spinner";
import BookRow from "./BookRow";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 1.8fr 1fr 1fr 1fr;
  /* grid-template-columns: 0.6fr 1fr 1fr 1fr 1fr 1fr; */
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

function BookTable() {
  const [searchParams] = useSearchParams();

  const val1 = "title";
  const val2 = "author";
  const filterValue = searchParams.get(val1) || searchParams.get(val2);
  console.log(filterValue);

  const {
    isLoading,
    data: books,
    error,
  } = useQuery({
    queryKey: ["books", filterValue],
    queryFn: () => getBooks(filterValue),
  });

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>title</div>
        <div>author</div>
        {/* <div>quantity</div> */}
        <div>stock</div>
        <div>Rent fee</div>
        <div></div>
      </TableHeader>
      {books.map((book) => (
        <BookRow book={book} key={book.id} />
      ))}
    </Table>
  );
}

export default BookTable;
