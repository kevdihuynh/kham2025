import { useEffect, useMemo, useState } from "react";
import backgroundImage from "../assets/TEST.png";
import openingVideo from "../assets/video.mp4";
import "./App.css";

const createTimeSegments = (targetDate) => {
  const diff = +targetDate - Date.now();

  if (diff <= 0) {
    return null;
  }

  return [
    { id: "days", label: "Days", value: Math.floor(diff / (1000 * 60 * 60 * 24)) },
    { id: "hours", label: "Hours", value: Math.floor((diff / (1000 * 60 * 60)) % 24) },
    { id: "minutes", label: "Minutes", value: Math.floor((diff / (1000 * 60)) % 60) },
    { id: "seconds", label: "Seconds", value: Math.floor((diff / 1000) % 60) }
  ].map((segment) => ({
    ...segment,
    value: segment.value.toString().padStart(2, "0")
  }));
};

const Countdown = ({ weddingDate, onPlayVideo }) => {
  const targetDate = useMemo(() => new Date(weddingDate), [weddingDate]);
  const [segments, setSegments] = useState(() => createTimeSegments(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSegments(createTimeSegments(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  if (!segments) {
    return (
      <div className="card card--full">
        {onPlayVideo ? (
          <button className="celebrate-button" type="button" onClick={onPlayVideo}>
            <span className="typing-text">Click to open...</span>
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="card">
      <h1>Kevin &amp; [Partner]</h1>
      <p className="subtitle">Countdown to our big day</p>
      <div className="timer">
        {segments.map(({ id, label, value }) => (
          <div key={id} className="timer-cell">
            <span className="value">{value}</span>
            <span className="label">{label}</span>
          </div>
        ))}
      </div>
      <p className="date">{targetDate.toLocaleDateString()}</p>
    </div>
  );
};

const Background = ({ playing, onEnded }) => (
  <div className="background" aria-hidden="true">
    {playing ? (
      <video
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        poster={backgroundImage}
      >
        <source src={openingVideo} type="video/mp4" />
      </video>
    ) : (
      <img src={backgroundImage} alt="" />
    )}
  </div>
);

const App = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  return (
    <>
      <div className="background-container">
        <Background playing={isVideoPlaying} onEnded={handleVideoEnded} />
      </div>
      <main>
        <Countdown weddingDate="2025-06-14T15:00:00" onPlayVideo={handlePlayVideo} />
      </main>
    </>
  );
};

export default App;

