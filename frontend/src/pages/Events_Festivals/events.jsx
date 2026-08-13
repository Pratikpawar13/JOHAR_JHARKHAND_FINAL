import React, { useState } from "react";
import "./events.css";
import sohrai from "../Events_Festivals/assets/sohrai.jpg";
import sarhul from "../Events_Festivals/assets/sarhul.jpg";
import karma from "../Events_Festivals/assets/karma.jpg";
import shravani_mela from "../Events_Festivals/assets/shravani_mela.png";


const DATA = [
  {
    title: "🌳 Karma",
    desc: "Under the sacred Karma tree, villages sway to beating madals and endless dance—celebrating life, harvest, and the bond of earth and tribe. “Johar!” echoes as night turns to song and rhythm.",
    img: karma,
  },
  {
    title: "🌿 Sarhul",
    desc: "When sal trees bloom, Sarhul bursts forth with drums, flowers, and prayers to nature’s spirit—welcoming spring, fertility, and community joy in Jharkhand’s green heart.",
    img: sarhul,
  },
  {
    title: "🐂 Sohrai",
    desc: "After the harvest, homes glow with vibrant wall art, cattle are adorned, and folk songs rise; Sohrai honors livestock, gratitude, and the living tapestry of rural life.",
    img: sohrai,
  },
  {
    title: "🕉 Shravani Mela (Deoghar)",
    desc: "Millions of Kanwariyas march with Ganga jal, chanting “Bol Bam!” toward Baba Baidyanath, draping Deoghar in saffron devotion through the holy month of Shravan.",
    img: shravani_mela,
  }
];

export default function EVENTS() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const makeActive = (index) => {
    // trigger straighten animation on all images
    setAnimating(true);
    setActive(index);
  };

  const onAnimationEnd = () => {
    setAnimating(false);
  };

  const prev = () => makeActive((active - 1 + DATA.length) % DATA.length);
  const next = () => makeActive((active + 1) % DATA.length);

  return (
    <div className="eventscontainer">

      <div className="eventstbox">
        <p>Events & Festivals</p>
      </div>
      <activities-widget className={animating ? "children-animating" : ""}>
        {DATA.map((item, i) => (
          <div
            key={i}
            className={`activity ${i === active ? "active" : ""}`}
            onAnimationEnd={i === active ? onAnimationEnd : undefined}
          >
            <div className="img">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="text">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}

        <div className="activities-count">
          {active + 1}/{DATA.length}
        </div>

        

        <nav className="activities-navigation">
          <div className="explorebtn">
          <button>Explore more</button>
        </div>
        
          <button aria-label="previous" onClick={prev}>⭠</button>
          <button aria-label="next" onClick={next}>⭢</button>
        </nav>
      </activities-widget>
    </div>
  );
}
