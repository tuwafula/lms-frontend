import styled from "styled-components";

const ButtonDelete = styled.button`
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-grey-600);
  background-color: var(--color-red-400);
  border: 1px solid var(--color-grey-400);
  border-radius: 5px;

  &:hover {
    background-color: var(--color-red-100);
  }
`;

export default ButtonDelete;
