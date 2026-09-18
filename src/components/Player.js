
import React, { useState, useEffect, useRef } from "react";

const useAudio = url => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(url);
    audioRef.current = audio;

    const onEnded = () => setPlaying(false);
    audio.addEventListener('ended', onEnded);

    setPlaying(false);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', onEnded);
    };

  }, [url]);

  useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const toggle = () => setPlaying(prev => !prev);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  if (!url) {
    return (
      <>
        <tr>
          <td className="noSound">
            no sound
          </td>
        </tr>
      </>
    )
  }

  return (
    <tr>
      <td style={{ padding: "2px 2px 2px 20px" }} >
        <button onClick={toggle} className="buttonS">
          {playing ? "Pause" : "Play Sound"}</button>
      </td>
    </tr>
  );
};
export default Player;