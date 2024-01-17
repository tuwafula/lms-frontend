import { useState } from "react";
import Modal from "../../ui/Modal";
import EditMemberForm from "./EditMemberForm";
import { HiPencil } from "react-icons/hi2";

function EditMemberButton({ memberToEdit, id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal((state) => !state)}>
        <HiPencil />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditMemberForm
            onCloseModal={() => setShowModal(false)}
            memberToEdit={memberToEdit}
            id={id}
          />
        </Modal>
      )}
    </>
  );
}

export default EditMemberButton;
