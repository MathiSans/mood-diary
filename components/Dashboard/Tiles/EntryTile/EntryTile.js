import getWeekdayFromTime from "@/utils/getWeekdayFromTime";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as Styled from "./EntryTile.styled";
import Link from "next/link";
import Intensity from "@/utils/intensity";
import LinkWrapper from "@/components/LinkWrapper/LinkWrapper";

export default function EntryTile({
  experience,
  time,
  color,
  intensity,
  reactions,
  entryUrl,
  location,
}) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Styled.Container>
        <LinkWrapper link={`/id:${entryUrl}`}>
          <Styled.TextContainer>
            {session ? (
              "You "
            ) : (
              <Styled.StaticText>Somebody </Styled.StaticText>
            )}
            {location === "unknown" ? (
              ""
            ) : (
              <>
                <Styled.StaticText>in </Styled.StaticText>
                {location.region}
              </>
            )}
            <Styled.StaticText> felt</Styled.StaticText> {experience}.{" "}
            <Styled.StaticText>More specifically</Styled.StaticText>{" "}
            <Intensity value={intensity} experience={experience} />
            <Styled.StaticText>
              . {session ? "You" : "They"} selected these tags:
            </Styled.StaticText>{" "}
            {reactions.map((reaction, index, array) => (
              <span key={index}>
                {reaction}
                {index < array.length - 1 && ", "}
              </span>
            ))}
          </Styled.TextContainer>
          <div>
            {getWeekdayFromTime(time)},<br />
            {time}
          </div>
          <Styled.ColorCircle color={color} />
        </LinkWrapper>
      </Styled.Container>
    </>
  );
}
