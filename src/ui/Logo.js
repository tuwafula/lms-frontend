import { HiOutlineBookOpen } from "react-icons/hi2";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo512.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
