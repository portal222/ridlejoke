
import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  if (url == '') {
    return (
      <>
        <tr>
          <td style={{ padding: "3px 5px 3px 10px" }}>
            no sound
          </td>
        </tr>
      </>
    )
  }

  return (
    <tr>
      <td style={{ padding: "2px 2px 2px 1px" }}>
        <button onClick={toggle} className="button">{playing ? "Pause" : "Play Sound"}</button>
      </td>
    </tr>
  );
};

export default Player;