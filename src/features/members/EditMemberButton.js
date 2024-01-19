import { useState } from "react";
import Modal from "../../ui/Modal";
import EditMemberForm from "./EditMemberForm";
import { HiPencil } from "react-icons/hi2";
import ButtonEdit from "../../ui/ButtonEdit";

function EditMemberButton({ memberToEdit, id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonEdit onClick={() => setShowModal((state) => !state)}>
        <HiPencil />
      </ButtonEdit>
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
