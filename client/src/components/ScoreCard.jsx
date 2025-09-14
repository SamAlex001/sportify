import "../styles/scoreCard.css";

export const ScoreCard = ({
   matchDate, matchType, matchStatus,
   Team1, T1ShortName, T1_Logo, T1_Wicket, T1_Run, T1_Over,
   Team2, T2ShortName, T2_Logo, T2_Wicket, T2_Run, T2_Over
}) => {

   return (
      <div className="card-container">
         <div className="card-teams-container">
            <div className="card-team">
               <div className="card-teamName t1Name">{Team1}</div>
               {/* <div className="card-teamLogo"><img src={T1_Logo} alt="LOGO_NOT_LOADING" /></div> */}
               <div className="card-teamShortName">{T1ShortName}</div>
               <div className="card-score-container">
                  <div className="card-score-run t1Run">{T1_Run}</div>
                  <div className="card-score-wicket t1Wicket">{T1_Wicket}</div>
                  <div className="card-score-over t1Over">{T1_Over}</div>
               </div>
            </div>
            <div className="card-team">
               <div className="card-teamName t2Name">{Team2}</div>
               {/* <div className="card-teamLogo"><img src={T2_Logo} alt="LOGO_NOT_LOADING" /></div> */}
               <div className="card-teamShortName">{T2ShortName}</div>
               <div className="card-score-container">
                  <div className="card-score-run">{T2_Run}</div>
                  <div className="card-score-wicket">{T2_Wicket}</div>
                  <div className="card-score-over">{T2_Over}</div>
               </div>
            </div>
         </div>
         <div className="card-date">{matchDate}</div>
         <div className="card-matchInfo-container">
            <div className="card-matchType">Series: {matchType}</div>
         </div>
         <div className="card-matchStatus">{matchStatus}</div>
      </div>
   )
}