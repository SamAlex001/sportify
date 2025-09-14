import "../styles/liveScore.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import { LiveScore } from "../components/LiveScore";
import { Loader } from "../components/Loaders";
import Footer from "../components/Footer";

export const LiveScorePage = () => {

   const navigate = useNavigate();
   const [liveScore, setLiveScore] = useState([]);
   const [loading, setLoading] = useState(true);
   const APP_URL = import.meta.env.VITE_APP_URL;

   async function getLiveScore() {
      try {
         const response = await fetch(`${APP_URL}/livescore/cricket`, {
            method: "GET",
            credentials: "include"
         })

         const score = await response.json();
         const data = score.data;
         setLiveScore(data);
         setLoading(!loading); //
      }
      catch (error) {
         console.log("Error Loading Match Data: ", error);
         setLoading(loading);
      };
   }

   useEffect(() => {
      getLiveScore();
   }, []);

   return (
      <div className="livescorepage-container">
         <Navbar />
         <div className="livescore-header">Current Live Scores</div>
         <div>
            {loading ? <Loader /> : <LiveScore />}
         </div>
         <div className="livescore-footer">
            <Footer />
         </div>
      </div>
   )
}