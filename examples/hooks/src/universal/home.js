import React, {useState} from 'react';
import YouTube from 'react-youtube';
import {useFlags} from 'ld-react';

export default function Home() {
  const {moonshotDemo} = useFlags();

  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: 48,
    }
  };

  return (
    <div>
      {
        moonshotDemo ?
          <>
          <h1>Jackpot! Starman lives!</h1>
          < YouTube
            videoId="sI66hcu9fIs"
            opts={opts}
          />
          </> :
          <>
          <h1>Moonshot: Is it good??</h1>
          <img src="https://render.fineartamerica.com/images/rendered/default/poster/8/8/break/images-medium-5/michael-jordan-buzzer-beater-brian-reaves.jpg" alt="does it work?"/>
          </>
      }
    </div>
  );
}