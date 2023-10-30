import { TransformNode } from "@babylonjs/core";

import { HolographicButton, TextBlock, PlanePanel } from "@babylonjs/gui";

import MusicButton from "./MusicButton";

class MusicListButton {
  constructor(guiManager, musicList, scene, furniturePosition) {
    const playListButton = new HolographicButton("Show Playlist");
    this.playListButton = playListButton;
    guiManager.addControl(playListButton);

    // Must be done AFTER addControl in order to overwrite the default content
    const playListText = new TextBlock();
    playListText.text = "Show \n PlayList";
    playListText.color = "Red";
    playListText.fontSize = 48;
    playListButton.content = playListText;
    playListButton.position.y = furniturePosition.y + 5;
    playListButton.position.x = furniturePosition.x;
    playListButton.node.rotation.y = Math.PI;

    let listEvent = true;
    const musicListPanel = new PlanePanel();
    this.musicListPanel = musicListPanel;
    const anchor = new TransformNode("");

    guiManager.addControl(musicListPanel);
    musicListPanel.linkToTransformNode(anchor);

    const size = musicList.length;

    musicListPanel.blockLayout = true;
    musicListPanel.node.rotation.y = Math.PI;
    musicListPanel.margin = 0.6;
    musicListPanel.position.y = playListButton.position.y + 0.3 + Math.ceil(size / musicListPanel.columns);
    musicList.forEach((music) => {
      const musicButton = new MusicButton(music.url, guiManager, scene, this.playListButton.position);
      musicListPanel.addControl(musicButton.musicPlayButton);
      musicListPanel.addControl(musicButton.stopMusicButton);
      musicButton.musicPlayButton.isVisible = false;
      musicButton.stopMusicButton.isVisible = false;
    });
    musicListPanel.blockLayout = false;

    playListButton.onPointerClickObservable.add((eventData, eventState) => {
      eventState.lastReturnValue = listEvent;
      if (eventState.lastReturnValue) {
        playListText.text = "Hide \n PlayList";
        musicListPanel.children.forEach((btn) => {
          btn.isVisible = true;
        });
        listEvent = false;
      } else {
        playListText.text = "Show \n PlayList";
        musicListPanel.children.forEach((btn) => {
          btn.isVisible = false;
        });
        listEvent = true;
      }
    });
  }
}

export default MusicListButton;
