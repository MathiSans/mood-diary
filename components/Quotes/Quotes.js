import styled from "styled-components";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Quotes({ quotes }) {
  const [quoteState, setQuoteState] = useState({});
  const [nextQuote, setNextQuote] = useState(0);

  const router = useRouter();

  function handleRandomQuote() {
    if (!quotes || !Array.isArray(quotes) || quotes.length === 0) {
      return <p>No quotes available</p>;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuoteState(randomQuote);
  }
  useEffect(() => {
    handleRandomQuote();
  });
  useEffect(() => {
    handleRandomQuote();
  }, [nextQuote]);
  return (
    <>
      {
        <>
          <StyledArticle>
            <StyledH1>{quoteState.text}</StyledH1>
            <p>- {quoteState.author}</p>
          </StyledArticle>
          <StyledButton
            onClick={() => {
              setNextQuote((currQuote) => currQuote + 1);
            }}
          >
            new quote
          </StyledButton>
        </>
      }
    </>
  );
}

const StyledArticle = styled.article`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;

  border: 2px solid white;
  border-radius: 12px;
  box-shadow: rgba(255, 255, 255, 0.359) 0px 10px 15px -3px,
    rgba(255, 255, 255, 0.776) 0px 4px 6px -2px;
  padding: 1.5rem;
`;

const StyledH1 = styled.h1`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: white;
  padding: 1rem;
  border-radius: 12px;
`;
