import { Sound } from "@babylonjs/core";

import { HolographicButton, TextBlock } from "@babylonjs/gui";

class MusicButton {
  constructor(url, guiManager, scene, listButtonPosition) {
    let music;
    const musicPlayButton = new HolographicButton("Music Button");
    guiManager.addControl(musicPlayButton);

    // Must be done AFTER addControl in order to overwrite the default content
    const playText = new TextBlock();
    playText.text = "Play";
    playText.color = "Red";
    playText.fontSize = 48;
    musicPlayButton.content = playText;
    musicPlayButton.position.y = listButtonPosition.y + 1;
    musicPlayButton.position.x = listButtonPosition.x - 2;
    musicPlayButton.node.rotation.y = Math.PI;

    musicPlayButton.onPointerClickObservable.add(() => {
      music = new Sound("", url, scene, null, { autoplay: true, loop: true });
      console.log("play music");
      console.log(music);
    });

    this.musicPlayButton = musicPlayButton;

    const stopMusicButton = new HolographicButton("Stop Music");
    guiManager.addControl(stopMusicButton);

    // Must be done AFTER addControl in order to overwrite the default content
    const stopText = new TextBlock();
    stopText.text = `Stop`;
    stopText.color = "Red";
    stopText.fontSize = 48;
    stopMusicButton.content = stopText;
    stopMusicButton.position.y = listButtonPosition.y + 1;
    stopMusicButton.position.x = listButtonPosition.x - 3;
    stopMusicButton.node.rotation.y = Math.PI;

    setInterval(() => {
      if (music) {
        const time = music.currentTime;
        var min = parseInt((time % 3600) / 60);
        var sec = parseInt(time % 60);

        const currentTime = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
        stopText.text = `Stop 
        ${currentTime}`;
      }
    }, 1000);

    stopMusicButton.onPointerClickObservable.add(() => {
      if (music) {
        console.log("stop music");
        music.stop();
      }
    });

    this.stopMusicButton = stopMusicButton;
  }
}

export default MusicButton;
