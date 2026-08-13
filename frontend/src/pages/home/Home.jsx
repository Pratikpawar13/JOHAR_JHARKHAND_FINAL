// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import n1 from "../topdestinations/assets/n1.jpg"
// import bgtrail2 from "./images/bgtrail2.jpg"
// import events from "../Events_Festivals/assets/events.jpg";
// import mapbg from "../Map/assets/mapbg1.png";
// import gallerybg from "../visualLibrary/assets/gallerybg1.png";
// import hotelsbg from "../home/images/hotelsbg.jpg";
// import footerbg from "../../assets/footerbg1.png";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import heroVideo from "../../pages/home/videos/mainbodyvid.mp4";
// import Navbar from "../../components/Navbar.jsx";
// import "./homestyle.css";
// import Destinations from "../topdestinations/Destinations.jsx";
// import EVENTS from "../Events_Festivals/events.jsx";
// import TrailCarousel from "../Carousel/Carousel.jsx";
// import JharkhandMap from "../Map/JharkhandMap.jsx";
// import TripPlanner from "../Trip_Planner/TripPlanner.jsx";
// import StayOptions from "../Stays/StayOptions.jsx";
// import VisualLibrary from "../visualLibrary/VisualLibrary.jsx";
// import plannerbg from "../Trip_Planner/assets/plannerbg6.mp4";
// import BusinessOpportunity from "../BusinessOpportunity/BusinessOpportunity.jsx";
// import ConnectWithUs from "../connectus/ConnectWithUs.jsx";
// import TouristDept from "../touristDept/TouristDept.jsx";
// import Footer from "../../components/Footer.jsx";

// const MicIcon = ({ isMuted }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="white"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="white"
//     className="mic-icon"
//   >
//     {isMuted ? (
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M15 12a3 3 0 11-6 0m6 0V7.5a3 3 0 10-6 0V12m6 0l3 3m-9-3l-3 3"
//       />
//     ) : (
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 14.25a3.75 3.75 0 003.75-3.75V6a3.75 3.75 0 10-7.5 0v4.5a3.75 3.75 0 003.75 3.75zM19.5 10.5v.75a7.5 7.5 0 01-15 0v-.75M12 19.5v2.25"
//       />
//     )}
//   </svg>
// );

// export default function Home() {
//   const videoRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(true);
//   const navigate = useNavigate();

//   const toggleMute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = !video.muted;
//       setIsMuted(video.muted);
//     }

//   };

//   return (
//     <div className="maincontainer" w-screen>
//       {/*=============================BODY LAUNCH SECTION============================*/}
//       <div className="mainbody">
//         <section className="hero">
//           <video
//             ref={videoRef}
//             className="hero-video"
//             src={heroVideo}
//             autoPlay
//             muted
//             loop
//             playsInline
//           />
//           <div className="hero-overlay"></div>

//           <button onClick={toggleMute} className="mic-btn" aria-label="Toggle Video Audio">
//             <MicIcon isMuted={isMuted} />
//           </button>

//           {/*============NAVBAR=============*/}
//           <div className="Navbar">
//             <Navbar />
//           </div>

//           <div className="imagebox">
//             <img src={logo} alt="Logo" className="logo-image" />
//           </div>

//           {/*==============CHATBOT============= */}
//           <div className="bot">
//             <button className="bot-btn" onClick={() => navigate("/chatbot")}>
//               <img src={logo} alt="bot" className="botimage" />
//             </button>
//           </div>



//         </section>
//       </div>

//       {/*=============================DESTINATION============================*/}
//       <div className="Destinations"
//         style={{ backgroundImage: `url(${n1})` }}>
//         <Destinations />
//       </div>

//       {/*=============================PICK-YOUR-TRAIL-COROSEL============================*/}
//       <div className="Trail"
//         style={{ backgroundImage: `url(${bgtrail2})` }}>
//         <TrailCarousel />
//       </div>

//       {/*=============================EVENTS AND FESTIVALS============================*/}
//       <div className="events"
//         style={{ backgroundImage: `url(${events})` }}>
//         <EVENTS />
//       </div>

//       {/*=============================JHARKHAND-MAP============================*/}

//       <div className="map"
//         style={{ backgroundImage: `url(${mapbg})` }}>
//         <JharkhandMap />
//       </div>

//       {/* =============================TRIP_PLANNER============================ */}
//       <div className="trip">
//         {/* Background Video */}
//         <video autoPlay loop muted playsInline className="bg-video">
//           <source src={plannerbg} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Foreground Component */}
//         <div className="tripcompo">
//           <TripPlanner />
//         </div>
//       </div>

//       {/*=============================JHARKHAND-MAP============================*/}

//       <div className="stay"
//         style={{ backgroundImage: `url(${hotelsbg})` }}>
//         <StayOptions />
//       </div>

//       {/*=============================VISUAL-LIBRARY============================*/}
//       <div className="stay"
//         style={{ backgroundImage: `url(${gallerybg})` }}>
//         <VisualLibrary />
//       </div>

//       {/*=============================bUSINESSOPPORTUNITIES============================*/}
//       <div className="stay"
//         style={{ backgroundImage: `url(${gallerybg})` }}>
//         <BusinessOpportunity />
//       </div>

//       {/*=============================CONNECTWITHUS============================*/}
//       <div className="stay"
//         style={{ backgroundImage: `url(${gallerybg})` }}>
//         <ConnectWithUs />
//       </div>

//       {/*=============================TOURISTDEPARTMENT============================*/}
//       <div className="tourDept">
//         <TouristDept />
//       </div>

//       {/*=============================TOURISTDEPARTMENT============================*/}
//       <div className="tourDept"
//         style={{ backgroundImage: `url(${footerbg})` }}>
//         <Footer />
//       </div>

//     </div>
//   );
// }













// src/pages/home/Home.jsx  (replace your current Home file or apply edits)
import React, { useRef, useState } from "react";
// NOTE: removed useNavigate because we toggle panel inline
import logo from "../../assets/logo.png";
import n1 from "../topdestinations/assets/n1.jpg";
import bgtrail2 from "./images/bgtrail2.jpg";
import events from "../Events_Festivals/assets/events.jpg";
import mapbg from "../Map/assets/mapbg1.png";
import gallerybg from "../visualLibrary/assets/gallerybg1.png";
import hotelsbg from "../home/images/hotelsbg.jpg";
import footerbg from "../../assets/footerbg1.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import heroVideo from "../../pages/home/videos/mainbodyvid.mp4";
import Navbar from "../../components/Navbar.jsx";
import "./homestyle.css";
import Destinations from "../topdestinations/Destinations.jsx";
import EVENTS from "../Events_Festivals/events.jsx";
import TrailCarousel from "../Carousel/Carousel.jsx";
import JharkhandMap from "../Map/JharkhandMap.jsx";
import TripPlanner from "../Trip_Planner/TripPlanner.jsx";
import StayOptions from "../Stays/StayOptions.jsx";
import VisualLibrary from "../visualLibrary/VisualLibrary.jsx";
import plannerbg from "../Trip_Planner/assets/plannerbg6.mp4";
import BusinessOpportunity from "../BusinessOpportunity/BusinessOpportunity.jsx";
import ConnectWithUs from "../connectus/ConnectWithUs.jsx";
import TouristDept from "../touristDept/TouristDept.jsx";
import Footer from "../../components/Footer.jsx";

import ChatBot from "../../components/jharkhand-ai-assistant/frontend/src/components/ChatBot.jsx"; // IMPORTANT: path to ChatBot
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";


// MicIcon (clean functional component)
const MicIcon = ({ isMuted }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="mic-icon">
      {isMuted ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0m6 0V7.5a3 3 0 10-6 0V12m6 0l3 3m-9-3l-3 3" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25a3.75 3.75 0 003.75-3.75V6a3.75 3.75 0 10-7.5 0v4.5a3.75 3.75 0 003.75 3.75zM19.5 10.5v.75a7.5 7.5 0 01-15 0v-.75M12 19.5v2.25" />
      )}
    </svg>
  );
};

export default function Home() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // NEW: toggle chat panel locally on the Home page
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="maincontainer w-screen">
      <div className="mainbody">
        <section className="hero">
          <video ref={videoRef} className="hero-video" src={heroVideo} autoPlay muted loop playsInline />
          <div className="hero-overlay"></div>

          <button onClick={toggleMute} className="mic-btn" aria-label="Toggle Video Audio">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>


          <div className="Navbar">
            <Navbar />
          </div>

          <div className="imagebox">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>


          {/* ====== CHAT PANEL (controlled inline) ====== */}
          <div className={`chat-panel ${isChatOpen ? "open" : ""}`} aria-hidden={!isChatOpen}>
            <ChatBot onClose={() => setIsChatOpen(false)} />
          </div>

          {/* Floating bot button toggles the panel */}
          <div className="chatassistant">
            <button
              className="assistant-btn"
              onClick={() => setIsChatOpen((s) => !s)}
              aria-expanded={isChatOpen}
              aria-label="Toggle Chat"
            >
              <img src={logo} alt="bot" className="botimage" />
            </button>
          </div>

        </section>
      </div>



      {/* rest of your Home page sections unchanged */}
      <div className="Destinations" style={{ backgroundImage: `url(${n1})` }}>
        <Destinations />
      </div>

      <div className="Trail" style={{ backgroundImage: `url(${bgtrail2})` }}>
        <TrailCarousel />
      </div>

      <div className="events" style={{ backgroundImage: `url(${events})` }}>
        <EVENTS />
      </div>

      <div className="map" style={{ backgroundImage: `url(${mapbg})` }}>
        <JharkhandMap />
      </div>

      <div className="trip">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src={plannerbg} type="video/mp4" />
        </video>
        <div className="tripcompo">
          <TripPlanner />
        </div>
      </div>

      <div className="stay" style={{ backgroundImage: `url(${hotelsbg})` }}>
        <StayOptions />
      </div>

      <div className="stay" style={{ backgroundImage: `url(${gallerybg})` }}>
        <VisualLibrary />
      </div>

      <div className="stay" style={{ backgroundImage: `url(${gallerybg})` }}>
        <BusinessOpportunity />
      </div>

      <div className="stay" style={{ backgroundImage: `url(${gallerybg})` }}>
        <ConnectWithUs />
      </div>

      <div className="tourDept">
        <TouristDept />
      </div>

      <div className="tourDept" style={{ backgroundImage: `url(${footerbg})` }}>
        <Footer />
      </div>
    </div>
  );
}
