import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import RegisterMemberForm from "../features/members/RegisterMemberForm";

import MembersTable from "../features/members/MembersTable";
import Button from "../ui/Button";

function Members() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Members</Heading>
        <p>Search</p>
      </Row>
      <Row>
        <MembersTable />
        <div>
          <Button onClick={() => setShowForm((state) => !state)}>
            Add Member
          </Button>
        </div>
        {showForm && <RegisterMemberForm />}
      </Row>
    </>
  );
}

export default Members;
