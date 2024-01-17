import { useState } from "react";
import Modal from "../../ui/Modal";
import EditBookForm from "./EditBookForm";

import { HiPencil } from "react-icons/hi2";
import ButtonEdit from "../../ui/ButtonEdit";

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
