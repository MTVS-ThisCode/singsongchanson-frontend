import { Sound, Vector3 } from "@babylonjs/core";

import { HolographicButton, TextBlock, Button, Image } from "@babylonjs/gui";
import axios from "axios";

class MusicButton {
  constructor(url, imageUrl, name, scene, panel, guiManager) {
    let music;
    // const musicPlayButton = new HolographicButton("Music Button");
    this.musicPlayButton = new HolographicButton("Music Button");
    panel.addControl(this.musicPlayButton);
    //guiManager.addControl(this.musicPlayButton);
    this.musicPlayButton.scaling.x = 120;
    this.musicPlayButton.scaling.y = 120;
    this.musicPlayButton.scaling.z = 50;
    this.musicPlayButton.imageUrl = imageUrl;
    const playText = new TextBlock();
    playText.text = `music #${name}`;
    playText.color = "white";
    playText.fontSize = 45;
    this.musicPlayButton.content = playText;
    //this.musicPlayButton.text = `music #${name}`;
    //this.musicPlayButton.isVisible = true;

    // Must be done AFTER addControl in order to overwrite the default content
    // const playText = new TextBlock();
    // playText.text = "Play";
    // playText.color = "Red";
    // playText.fontSize = 100;
    // musicPlayButton.content = playText;
    // musicPlayButton.position.y = listButtonPosition.y + 1;
    // musicPlayButton.position.x = listButtonPosition.x - 2;
    // musicPlayButton.node.rotation.y = Math.PI;
    // musicPlayButton.scaling = new Vector3(30, 30, 1);

    let clicked = true;
    let timestamp;

    this.musicPlayButton.onPointerClickObservable.add(() => {
      console.log("clicked : ", clicked);
      if (clicked) {
        music = new Sound("", url, scene, null, { autoplay: true, loop: true });
        console.log("play music");
        console.log(music);
        music.play();
        //this.musicPlayButton.textBlock.text = `Stop`;
        timestamp = setInterval(() => {
          if (music) {
            const time = music.currentTime;
            var min = parseInt((time % 3600) / 60);
            var sec = parseInt(time % 60);

            const currentTime = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
            //this.musicPlayButton.text = `Stop - ${currentTime}`;
            playText.text = `Stop \n ${currentTime}`;
          }
        }, 1000);
      } else {
        if (music) {
          clearInterval(timestamp);
          //this.musicPlayButton.text = `music #${name}`;
          playText.text = `music #${name}`;
          console.log("stop music");
          music.stop();
        }
      }
      clicked = !clicked;
    });

    // const stopMusicButton = new HolographicButton("Stop Music");
    // guiManager.addControl(stopMusicButton);
    const stopMusicButton = Button.CreateSimpleButton("but1", "Click Me");

    // Must be done AFTER addControl in order to overwrite the default content
    // const stopText = new TextBlock();
    // stopText.text = `Stop`;
    // stopText.color = "Red";
    // stopText.fontSize = 100;
    // stopMusicButton.content = stopText;
    // stopMusicButton.position.y = listButtonPosition.y + 1;
    // stopMusicButton.position.x = listButtonPosition.x - 3;
    // stopMusicButton.node.rotation.y = Math.PI;
    // stopMusicButton.scaling = new Vector3(30, 30, 1);

    stopMusicButton.onPointerClickObservable.add(() => {
      if (music) {
        console.log("stop music");
        music.stop();
      }
    });

    // this.stopMusicButton = stopMusicButton;
  }
}

export default MusicButton;
