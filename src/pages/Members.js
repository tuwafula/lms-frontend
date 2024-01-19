import Heading from "../ui/Heading";
import Row from "../ui/Row";

import MembersTable from "../features/members/MembersTable";

import AddMember from "../features/members/AddMember";
import SearchForm from "../ui/SearchForm";

function Members() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Members</Heading>
        <SearchForm title="Search Member" />
      </Row>
      <Row>
        <MembersTable />
        <AddMember />
      </Row>
    </>
  );
}

export default Members;
