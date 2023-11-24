import React, { useState, useEffect } from "react";

import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { postStreaming } from "../apis/song";

const useAudio = (url, musicNo, musicList, setMusicList) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    async function play(audio) {
      await audio.play();
      await postStreaming(musicNo).then((result) => {
        console.log(result.data);
        const array = [...musicList];
        const index = musicList.findIndex((music) => music.musicNo === musicNo);
        if (index !== -1) {
          array[index].streamingCnt = result.data.data.streamingCnt;
          setMusicList([...array]);
        }
      });
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

const Player = ({ rank, musicList, url, musicNo, setMusicList }) => {
  const [playing, toggle] = useAudio(url, musicNo, musicList, setMusicList);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {rank ? (
        <Button variant="outline-dark" size="lg" onClick={toggle}>
          {playing ? <BsPauseCircle /> : <BsPlayCircle />}
        </Button>
      ) : (
        <Button variant="outline-light" size="lg" onClick={toggle}>
          {playing ? <BsPauseCircle /> : <BsPlayCircle />}
        </Button>
      )}
    </div>
  );
};

export default Player;
