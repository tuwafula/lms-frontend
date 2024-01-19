import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import RegisterMemberForm from "./RegisterMemberForm";

function AddMember() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowModal((state) => !state)}>
        Add Member
      </Button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RegisterMemberForm onCloseModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddMember;
