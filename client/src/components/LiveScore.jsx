import { useEffect, useState } from "react";
import { ScoreCard } from "../components/ScoreCard";
import "../styles/liveScore.css";

export const LiveScore = ({ limit }) => { // Add 'limit' prop

   const [liveScore, setLiveScore] = useState([]);
   const APP_URL = import.meta.env.VITE_APP_URL;

   async function getLiveScore() {
      try {
         const response = await fetch(`${APP_URL}/livescore/cricket`, {
            method: "GET",
            credentials: "include"
         });

         const score = await response.json();
         const data = score.data;
         setLiveScore(data);

      }
      catch (error) {
         console.log("Error Loading Match Data: ", error);
      };
   }

   useEffect(() => {
      getLiveScore();
   }, []);

   return (
      <div>
         <div className="livescore-container">
            {liveScore.slice(0, limit).map((matchInfo, index) => {
               const dateTime = matchInfo.dateTimeGMT;
               const matchType = matchInfo.matchType;
               const matchStatus = matchInfo.status;
               let T1Name, T1ShortName, T1Wicket, T1Over, T1Run, T1Logo;
               let T2Name, T2ShortName, T2Wicket, T2Over, T2Run, T2Logo;

               if (matchInfo && matchInfo.teamInfo && matchInfo.teamInfo.length > 0) {
                  T1Name = matchInfo.teamInfo[0].name;
                  T1ShortName = matchInfo.teamInfo[0].shortname;
                  T1Logo = matchInfo.teamInfo[0].img;
                  try {
                     if (matchInfo && matchInfo.score && matchInfo.score.length > 0) {
                        T1Wicket = matchInfo.score[0].w;
                        T1Run = matchInfo.score[0].r;
                        T1Over = matchInfo.score[0].o;
                     }
                  } catch (error) { console.log(error) }
               }

               if (matchInfo && matchInfo.teamInfo && matchInfo.teamInfo.length > 1) {
                  T2Name = matchInfo.teamInfo[1].name;
                  T2ShortName = matchInfo.teamInfo[1].shortname;
                  T2Logo = matchInfo.teamInfo[1].img;
                  try {
                     if (matchInfo && matchInfo.score && matchInfo.score.length > 0) {
                        T2Wicket = matchInfo.score[1].w;
                        T2Run = matchInfo.score[1].r;
                        T2Over = matchInfo.score[1].o;
                     }
                  } catch (error) { console.log(error) }
               }

               return (
                  <ScoreCard
                     className="score-card"
                     key={index}
                     matchDate={dateTime} matchType={matchType}
                     matchStatus={matchStatus}
                     Team1={T1Name} T1ShortName={T1ShortName}
                     T1_Run={T1Run} T1_Wicket={T1Wicket} T1_Over={T1Over}
                     Team2={T2Name} T2ShortName={T2ShortName}
                     T2_Run={T2Run} T2_Wicket={T2Wicket} T2_Over={T2Over}
                  />
               );
            })}
         </div>
      </div>
   )
}
