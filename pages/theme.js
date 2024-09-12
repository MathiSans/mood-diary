import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function ThemeTest({ handleToggleTheme }) {
  const [isToggled, setIsToggled] = useState(false);

  //   const onToggle = () => {
  //     setIsToggled(!isToggled);
  //     handleToggleTheme();
  //   };
  return (
    <>
      <h1>Hello World</h1>
      <Box>
        <p>Box</p>
      </Box>
      <button
        onClick={() => {
          handleToggleTheme();
        }}
      >
        Toggle
      </button>
      <br />
      <LinkBox>
        <Link href="/activities">Activities Page</Link>
        <Link href="/entries">Entries Page</Link>
        <Link href="/smiletrainer">Smile Trainer Page</Link>
      </LinkBox>
    </>
  );
}

const Box = styled.div`
  background-color: ${(prop) => prop.theme.bgColor2};
  color: ${(prop) => prop.theme.color};
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const LinkBox = styled.div`
  margin: 1rem;
  padding: 15px;
  width: 200px;
  height: auto;
  border: 2px solid ${(prop) => prop.theme.borderColor};
  display: flex;
  flex-direction: column;
`;
