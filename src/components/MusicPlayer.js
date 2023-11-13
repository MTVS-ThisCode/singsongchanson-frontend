import React, { useState, useEffect } from "react";

import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import Button from "react-bootstrap/Button";
const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    async function play(audio) {
      await audio.play();
    }
    playing ? play(audio) : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button variant="outline-light" size="lg" onClick={toggle}>
        {playing ? <BsPauseCircle /> : <BsPlayCircle />}
      </Button>
    </div>
  );
};

export default Player;
