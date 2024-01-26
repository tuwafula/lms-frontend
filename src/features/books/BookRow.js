import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import styled from "styled-components";
import { deleteBook } from "../../services/apiBooks";
import EditBookButton from "../../features/books/EditBookButton";

import DeleteBook from "./DeleteBook";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 1.8fr 1fr 1fr 1fr;
  /* grid-template-columns: 0.6fr 1fr 1fr 1fr 1fr 1fr; */
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Author = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-400);
  font-family: "Sono";
`;

const Stock = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Rent = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;

function BookRow({ book }) {
  const { id: bookId, title, author, image, stock, rent_fee } = book;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast.success("Book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <>
      <TableRow>
        {/* https://res.cloudinary.com/dz9wzvgbd/image/upload/v1706262294/unwckx326wtgpobcil4k.jpg */}
        <Img src={`https://res.cloudinary.com/dz9wzvgbd/${image}`} />
        <Title>{title}</Title>
        <Author>{author}</Author>
        {/* <Quantity>Total copies: {quantity}</Quantity> */}
        <Stock>Available copies: {stock}</Stock>
        <Rent>{formatCurrency(rent_fee)}</Rent>
        <ButtonRow>
          <EditBookButton book={book} />

          <DeleteBook mutate={mutate} isDeleting={isDeleting} id={bookId} />
        </ButtonRow>
      </TableRow>
    </>
  );
}

export default BookRow;
