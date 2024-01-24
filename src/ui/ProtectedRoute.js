import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  background-color: var(--color-grey-50);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // 2. If there is NO authenticated user redirect to the login

  useEffect(() => {
    if (user === null && !isLoading) navigate("/login");
  }, [isLoading, navigate, user]);

  // 3. while loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If there is a USER render the app
  return children;
}

export default ProtectedRoute;
