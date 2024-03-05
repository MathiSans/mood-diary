import { nanoid } from "nanoid";
import { EntryList } from "./EntryList.styled";
import Intensity from "@/utils/intensity";

import {
  StyledEntry,
  SliderText,
  ExperienceText,
  EntryText,
  Separator,
  EditDeleteButton,
  StyledEntryHeadnote,
} from "@/components/EntryList/EntryList.styled";

export default function StyledEntryList({ allEntries }) {
  return (
    <EntryList>
      {allEntries.map((entry) => {
        return (
          <StyledEntry key={entry.id}>
            <StyledEntryHeadnote>
              <small>{entry.date}</small>
              <span>
                <EditDeleteButton>🗑️</EditDeleteButton>
              </span>
            </StyledEntryHeadnote>
            <p>
              You felt{" "}
              <SliderText>
                <Intensity intensity={entry.slider} />.
              </SliderText>{" "}
              You selected these tags:{" "}
              <ExperienceText>
                {entry.experiences
                  .filter((experience) => Object.values(experience)[0])
                  .map((experience, index, array) => (
                    <span key={nanoid()}>
                      {Object.keys(experience)[0]}
                      {index < array.length - 1 && ", "}
                    </span>
                  ))}
              </ExperienceText>
              <span>. You wrote:</span> <EntryText>{entry.text}</EntryText>
            </p>
            <Separator />
          </StyledEntry>
        );
      })}{" "}
    </EntryList>
  );
}
