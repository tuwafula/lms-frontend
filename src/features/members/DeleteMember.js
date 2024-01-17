import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";

function DeleteMember({ mutate, disabled, id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        // disabled={isDeleting}
        onClick={() => setShowModal((state) => !state)}
      >
        <HiTrash />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDelete
            resource="member"
            onConfirm={() => mutate(id)}
            disabled={disabled}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteMember;

// onClick={() => {
//     console.log("deleting");
//     mutate(memberId);
//   }}
