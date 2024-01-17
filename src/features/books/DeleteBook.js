import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import ButtonDelete from "../../ui/ButtonDelete";

function DeleteBook({ mutate, isDeleting, id }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <ButtonDelete
        onClick={() => setIsOpenModal((state) => !state)}
        disabled={isDeleting}
      >
        <HiTrash />
      </ButtonDelete>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((state) => !state)}>
          <ConfirmDelete
            resource="book"
            disabled={isDeleting}
            onConfirm={() => {
              mutate(id);
            }}
            closeModal={() => setIsOpenModal((state) => !state)}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteBook;
