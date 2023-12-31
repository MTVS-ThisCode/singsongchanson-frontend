import { TransformNode } from "@babylonjs/core";
import { HolographicButton, TextBlock, PlanePanel, AdvancedDynamicTexture, StackPanel, Button } from "@babylonjs/gui";

import MusicButton from "./MusicButton";
import { Vector3 } from "babylonjs";

class MusicListButton {
  constructor(guiManager, musicList, scene, furniturePosition) {
    // const playListButton = new HolographicButton("Show Playlist");
    // this.playListButton = playListButton;
    // guiManager.addControl(playListButton);

    // // Must be done AFTER addControl in order to overwrite the default content
    // const playListText = new TextBlock();
    // playListText.text = "Show \n PlayList";
    // playListText.color = "Red";
    // playListText.fontSize = 300;
    // playListButton.content = playListText;
    // playListButton.position.y = furniturePosition.y + 6;
    // playListButton.position.x = furniturePosition.x;
    // playListButton.node.rotation.y = Math.PI;

    // let listEvent = true;
    const musicListPanel = new PlanePanel();
    this.musicListPanel = musicListPanel;
    const anchor = new TransformNode("");

    guiManager.addControl(musicListPanel);
    musicListPanel.linkToTransformNode(anchor);

    const size = musicList.length;

    musicListPanel.blockLayout = true;
    //musicListPanel.node.rotation.y = Math.PI;
    musicListPanel.margin = 10;
    musicListPanel.position.x = furniturePosition.x;
    musicListPanel.position.y = furniturePosition.y + 200 + Math.ceil(size / musicListPanel.columns);
    musicListPanel.position.z = furniturePosition.z;
    musicList.forEach((music) => {
      const musicButton = new MusicButton(music.url, guiManager, scene, furniturePosition);
      musicListPanel.addControl(musicButton.musicPlayButton);
      musicListPanel.addControl(musicButton.stopMusicButton);
      musicButton.musicPlayButton.isVisible = false;
      musicButton.stopMusicButton.isVisible = false;
    });
    musicListPanel.blockLayout = false;

    // playListButton.onPointerClickObservable.add((eventData, eventState) => {
    //   eventState.lastReturnValue = listEvent;
    //   if (eventState.lastReturnValue) {
    //     playListText.text = "Hide \n PlayList";
    //     musicListPanel.children.forEach((btn) => {
    //       btn.isVisible = true;
    //     });
    //     listEvent = false;
    //   } else {
    //     playListText.text = "Show \n PlayList";
    //     musicListPanel.children.forEach((btn) => {
    //       btn.isVisible = false;
    //     });
    //     listEvent = true;
    //   }
    // });
  }
}

export default MusicListButton;
