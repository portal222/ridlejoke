
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

const PlayerFX = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  if (url == '') {
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
  
        <button onClick={toggle} className="buttonS">{playing ? "Pause" : "Play Sound"}</button>
    
  );
};

export default PlayerFX;