import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Logout from "../features/authentication/Logout";
import { getCurrentUser } from "../services/apiAuth";
import { useEffect } from "react";

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
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (user === null && !isLoading) navigate("/login");
  }, [isLoading, navigate, user]);

  return (
    <StyledHeader>
      <Avatar src={`https://res.cloudinary.com/dz9wzvgbd/${user.avatar}`} />
      <Span>{user.first_name}</Span>
      <Span>{user.last_name}</Span>
      <Logout />
    </StyledHeader>
  );
}

export default Header;
