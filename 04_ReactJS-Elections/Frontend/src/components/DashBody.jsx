import { useState, useEffect } from "react";
import { apiGetAllCandidates } from "../services/apiServices";
import { calcPercentOnTotal } from "../services/calcPercent";
import CandidateCard from "./CandidateCard";

export default function DashBody({ totalVotes = 0, children = {} }) {
  const [allCandidates, setAllCandidates] = useState([]);

  const theElections = [...children];
  const ordenedElections = theElections.sort((a, b) => b.votes - a.votes);

  useEffect(() => {
    async function loadCandidates() {
      const allCandidates = await apiGetAllCandidates();
      setAllCandidates(allCandidates);
    }
    loadCandidates();
  }, []);

  function findCandidateName(id) {
    const candidates = [...allCandidates];
    const theCandidate = candidates.find((candidate) => candidate.id === id);
    return theCandidate.name;
  }

  return (
    <>
      <div className="text-center">
        <p>{ordenedElections.length} candidatos</p>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center p-4">
        {ordenedElections.map((elec, index) => {
          return (
            <CandidateCard
              key={elec.id}
              percent={calcPercentOnTotal(totalVotes, elec.votes)}
              votes={elec.votes}
              name={findCandidateName(elec.candidateId)}
              done={index === 0}
            ></CandidateCard>
          );
        })}
      </div>
    </>
  );
}
