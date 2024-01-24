import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import Logout from "../features/authentication/Logout";
import { getCurrentUser } from "../services/apiAuth";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Span = styled.span`
  color: var(--color-grey-500);
`;

function Header() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return (
    <StyledHeader>
      <Avatar src={`https://lms-render-0tx1.onrender.com${user.avatar}`} />
      <Span>{user.first_name}</Span>
      <Span>{user.last_name}</Span>
      <Logout />
    </StyledHeader>
  );
}

export default Header;
