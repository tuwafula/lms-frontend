import Heading from "../ui/Heading";
import Row from "../ui/Row";

import MembersTable from "../features/members/MembersTable";

import AddMember from "../features/members/AddMember";

function Members() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Members</Heading>
        <p>Search</p>
      </Row>
      <Row>
        <MembersTable />
        <AddMember />
      </Row>
    </>
  );
}

export default Members;
