import Intensity from "@/utils/intensity";
import * as Styled from "./EntriesList.styled";
import { useSWRConfig } from "swr";
import { AnimatePresence, motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Circle from "../Circle/Circle";
import { Grid } from "./EntriesList.styled";
import experienceAnalyser from "@/utils/experienceAnalyser";
import MapOfCircles from "../MapOfCircles/MapOfCircles";
import SingleEmotionList from "./SingleEmotionList";

export default function EntriesList({
  filtered,
  filter,
  isVisualized,
  handleIsVisualized,
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const { mutate } = useSWRConfig();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const [targetExperience, setTargetExperience] = useState(null);
  const [isExperiencePage, setIsExperiencePage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current
        ? containerRef.current.offsetWidth
        : window.innerWidth;
      const containerHeight = containerRef.current
        ? containerRef.current.offsetHeight
        : window.innerHeight;
      setScreenSize({ width: containerWidth, height: containerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleDeleteDialog(event, id) {
    event.stopPropagation();
    setDeletingId(id);
  }

  async function handleDeleteEntry(event, id) {
    event.stopPropagation();
    await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });
    mutate("/api/entries");
  }

  const result = experienceAnalyser(filtered);
  const totalCount = result.totalCount;

  const experiences = isExperiencePage ? filtered : result.experiences;
  const sortedExperiences = experiences.sort((a, b) => b.count - a.count);

  const singleEmotionEntryList = experiences.filter(
    (experience) => experience.experience === targetExperience
  );
  const handleExperienceClick = (experience) => {
    setTargetExperience(experience);
    setIsExperiencePage(!isExperiencePage);
  };

  console.log("isExperiencePage", isExperiencePage);

  return (
    <>
      {/*Checkbox wird auf der Liste von der Einzelnen Emotion ausgeblendet*/}
      {!isExperiencePage && (
        <label htmlFor="visualize">
          Visualize
          <input
            id="visualize"
            type="checkbox"
            checked={isVisualized}
            onChange={handleIsVisualized}
          />
        </label>
      )}

      {/*Der Block geht sehr lang und rendert Entweder die ShowAll Liste oder Die Circle*/}
      {isVisualized ? (
        <>
          <p>
            This are your{isExperiencePage && ` ${targetExperience}`} moods
            {filter === "lastWeek" && " of the last week"}
          </p>

          {/*Nur der Button wird eingeblendet auf der Liste der einzelen Emotion*/}
          {isExperiencePage ? (
            <button
              onClick={() => {
                setIsExperiencePage(!isExperiencePage);
              }}
            >
              back
            </button>
          ) : (
            ""
          )}
          <div>
            {!isExperiencePage ? (
              <MapOfCircles
                data={sortedExperiences}
                handleExperienceClick={handleExperienceClick}
                totalCount={totalCount}
                isEntriesListStyle={true}
              />
            ) : (
              <AnimatePresence>
                <SingleEmotionList
                  singleEmotionEntryList={singleEmotionEntryList}
                  filter={filter}
                  deletingId={deletingId}
                />
                {/* {singleEmotionEntryList.map((entry) => (
                  <>
                    <motion.div
                      key={entry._id}
                      whileHover={{ scale: 1.05 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Styled.Card onClick={() => router.push(`${entry._id}`)}>
                        <Styled.ColoredShapeContainer>
                          <Styled.ColoredShape color={entry.color} />
                        </Styled.ColoredShapeContainer>
                        <Styled.Sentence>
                          <Styled.StaticText>Somebody </Styled.StaticText>
                          {entry.location === "unknown"
                            ? ""
                            : `in ${entry.location.region}`}
                          <Styled.StaticText> felt</Styled.StaticText>{" "}
                          {entry.experience}.{" "}
                          <Styled.StaticText>
                            More specifically
                          </Styled.StaticText>{" "}
                          <Intensity
                            value={entry.intensity}
                            experience={entry.experience}
                          />
                          <Styled.StaticText>
                            . They selected these tags:
                          </Styled.StaticText>{" "}
                          {entry.reactions.map((reaction, index, array) => (
                            <span key={index}>
                              {reaction}
                              {index < array.length - 1 && ", "}
                            </span>
                          ))}
                        </Styled.Sentence>
                        <div>
                          {filter === "value 2" ? (
                            <Styled.Sentence>{entry.time}</Styled.Sentence>
                          ) : (
                            ""
                          )}
                        </div>

                        <Styled.DeleteContainer>
                          {deletingId === entry._id ? (
                            <>
                              <Styled.DeleteQuestion>
                                sure about deleting?
                              </Styled.DeleteQuestion>
                              <Styled.DeleteAnswer
                                red
                                onClick={(event) =>
                                  handleDeleteEntry(event, entry._id)
                                }
                              >
                                yes
                              </Styled.DeleteAnswer>
                              <Styled.DeleteAnswer
                                onClick={(event) =>
                                  handleDeleteDialog(event, null)
                                }
                              >
                                no
                              </Styled.DeleteAnswer>
                            </>
                          ) : (
                            <>
                              <Styled.DeleteButton
                                as="a"
                                onClick={(event) =>
                                  handleDeleteDialog(event, entry._id)
                                }
                              >
                                <FiTrash2 />
                              </Styled.DeleteButton>
                            </>
                          )}
                        </Styled.DeleteContainer>
                      </Styled.Card>
                    </motion.div>
                  </>
                ))} */}
              </AnimatePresence>
            )}
          </div>
        </>
      ) : (
        <>
          <Styled.Grid>
            <AnimatePresence>
              {filtered.map((entry) => (
                <motion.div
                  key={entry._id}
                  whileHover={{ scale: 1.05 }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Styled.Card onClick={() => router.push(`${entry._id}`)}>
                    <Styled.ColoredShapeContainer>
                      <Styled.ColoredShape color={entry.color} />
                    </Styled.ColoredShapeContainer>
                    <Styled.Sentence>
                      <Styled.StaticText>Somebody </Styled.StaticText>
                      {entry.location === "unknown"
                        ? ""
                        : `in ${entry.location.region}`}
                      <Styled.StaticText> felt</Styled.StaticText>{" "}
                      {entry.experience}.{" "}
                      <Styled.StaticText>More specifically</Styled.StaticText>{" "}
                      <Intensity
                        value={entry.intensity}
                        experience={entry.experience}
                      />
                      <Styled.StaticText>
                        . They selected these tags:
                      </Styled.StaticText>{" "}
                      {entry.reactions.map((reaction, index, array) => (
                        <span key={index}>
                          {reaction}
                          {index < array.length - 1 && ", "}
                        </span>
                      ))}
                    </Styled.Sentence>
                    <div>
                      {filter === "lastWeek" ? (
                        <Styled.Sentence>{entry.time}</Styled.Sentence>
                      ) : (
                        ""
                      )}
                    </div>

                    <Styled.DeleteContainer>
                      {deletingId === entry._id ? (
                        <>
                          <Styled.DeleteQuestion>
                            sure about deleting?
                          </Styled.DeleteQuestion>
                          <Styled.DeleteAnswer
                            red
                            onClick={(event) =>
                              handleDeleteEntry(event, entry._id)
                            }
                          >
                            yes
                          </Styled.DeleteAnswer>
                          <Styled.DeleteAnswer
                            onClick={(event) => handleDeleteDialog(event, null)}
                          >
                            no
                          </Styled.DeleteAnswer>
                        </>
                      ) : (
                        <>
                          <Styled.DeleteButton
                            as="a"
                            onClick={(event) =>
                              handleDeleteDialog(event, entry._id)
                            }
                          >
                            <FiTrash2 />
                          </Styled.DeleteButton>
                        </>
                      )}
                    </Styled.DeleteContainer>
                  </Styled.Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Styled.Grid>
        </>
      )}
    </>
  );
}
