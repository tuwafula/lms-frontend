import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import EditBookForm from "./EditBookForm";

import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";

const ButtonEdit = styled.button`
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-grey-600);
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function EditBookButton({ book }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <ButtonEdit onClick={() => setIsOpenModal((state) => !state)}>
        <HiPencil />
      </ButtonEdit>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <EditBookForm
            bookToEdit={book}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditBookButton;
