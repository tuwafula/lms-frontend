import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { logout as logoutApi } from "../../services/apiAuth";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

function Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      Cookies.remove("token", { path: "/" });
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoading}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
