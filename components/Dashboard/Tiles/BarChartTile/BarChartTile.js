import styled from "styled-components";
import { useSession } from "next-auth/react";
import experienceAnalyser from "@/utils/experienceAnalyser";
import lastWeekAnalyser from "@/utils/lastWeekAnalyser";
import { useData } from "@/lib/useData";
import { useState } from "react";

export default function BarChartTile() {
  const { data: session } = useSession();
  const [isLastWeek, setIsLastWeek] = useState(true);

  const { allEntries, isLoadingEntries, errorEntries } =
    useData().fetchedAllEntries;
  console.log(allEntries, isLoadingEntries, errorEntries);
  const { userEntries } = useData().fetchedUserEntries;
  const lastWeek = lastWeekAnalyser(session ? userEntries : allEntries);
  console.log("lastWeek", lastWeek);

  const visualizedData = isLastWeek
    ? experienceAnalyser(lastWeek)
    : experienceAnalyser(session ? userEntries : allEntries);

  const totalCount = visualizedData.totalCount;
  console.log(visualizedData.experiences);

  if (isLoadingEntries) return <p>Entries Loading</p>;
  if (errorEntries) return <p>Sorry, there was an error fetching entries</p>;

  function topTwoExperiencesAnalyser(data) {
    data.sort((a, b) => b.count - a.count);
    const topTwoExperiences = data.slice(0, 2);
    return topTwoExperiences;
  }

  const topTwoExperiences = topTwoExperiencesAnalyser(
    visualizedData.experiences
  );

  const emotionFirst = topTwoExperiences[0].experience;
  const emotionSecond = topTwoExperiences[1].experience;
  return (
    <BarChartContainer>
      <LastWeekTogglePill
        onClick={() => {
          setIsLastWeek(!isLastWeek);
        }}
      >
        <span>Last Week</span>
      </LastWeekTogglePill>
      <EntriesDescription>
        {totalCount} entries most are {emotionFirst} and {emotionSecond}
      </EntriesDescription>

      {visualizedData.experiences &&
        visualizedData.experiences.map(({ index, count, color }) => (
          <>
            <SingleBar
              key={index}
              color={color}
              barHeight={Math.floor((count / totalCount) * 100)}
            />
          </>
        ))}
    </BarChartContainer>
  );
}

const EntriesDescription = styled.p`
  top: 1rem;
  right: 1rem;
  position: absolute;
`;

const LastWeekTogglePill = styled.button`
  top: 1rem;
  left: 1rem;
  position: absolute;
  border-radius: 12px;
  background-color: black;
  color: white;
  padding: 0.2rem 0.5rem;
  font-size: 0.5rem;
`;

const BarChartContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background-color: #2b2b2b;
  align-items: flex-end;
  border-radius: 16px;
  position: relative;
  /* margin-top: 3rem; */
  grid-column-end: span 4;
  grid-row-end: span 3;
`;

const SingleBar = styled.div`
  width: 3.31rem;
  height: ${(props) => props.barHeight}%;
  background-color: ${(props) => props.color};
  align-items: flex-end;
  border-radius: 12px;
`;
