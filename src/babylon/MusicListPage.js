import { PlanePanel } from "@babylonjs/gui";

import MusicButton from "./MusicButton";

class MusicListPage {
  constructor(musicList, scene, guiManager, anchor, furniturePosition) {
    this.panel = new PlanePanel();
    //const panel = new StackPanel();
    //advancedTexture.addControl(panel);
    guiManager.addControl(this.panel);
    this.panel.linkToTransformNode(anchor);
    //this.panel.scaling = new Vector3(50, 50, 10);
    this.panel.columns = 6;
    this.panel.margin = 10;
    this.panel.position.z = 340;
    this.panel.position.x = 0;
    this.panel.position.y = 200;
    this.panel.blockLayout = true;
    //panel.node.rotation.y = Math.PI;
    //this.panel.node.rotation.y = Math.PI;
    musicList.forEach((music) => {
      const musicButton = new MusicButton(music.musicUrl, music.albumImgUrl, musicList.indexOf(music) + 1, scene, this.panel, guiManager);
      //this.panel.addControl(musicButton.musicPlayButton);
      // musicButton.musicPlayButton.linkToTransformNode(anchor);
      musicButton.musicPlayButton.isVisible = false;
    });
    this.panel.blockLayout = false;
  }

  open() {
    this.panel.children.forEach((btn) => {
      btn.isVisible = true;
    });
  }
  close() {
    this.panel.children.forEach((btn) => {
      btn.isVisible = false;
    });
  }

  // static create(musicList, scene, guiManager, anchor, furniturePosition) {
  //   const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  //   const panel = new ScatterPanel();
  //   //const panel = new StackPanel();
  //   //advancedTexture.addControl(panel);
  //   guiManager.addControl(panel);
  //   panel.linkToTransformNode(anchor);
  //   panel.scaling = new Vector3(30, 30, 1);
  //   panel.position.z = furniturePosition.z;
  //   panel.position.x = furniturePosition.x;
  //   panel.position.y = furniturePosition.y + 50;
  //   panel.blockLayout = true;
  //   //panel.node.rotation.y = Math.PI;
  //   musicList.forEach((music) => {
  //     const musicButton = new MusicButton(music.musicUrl, musicList.indexOf(music), scene, panel);
  //     panel.addControl(musicButton.musicPlayButton);
  //     //advancedTexture.addControl(musicButton.stopMusicButton);
  //     //musicButton.musicPlayButton.isVisible = false;
  //     //musicButton.stopMusicButton.isVisible = false;
  //   });
  //   panel.blockLayout = false;
  //   // var closeButton = Button.CreateSimpleButton("but", "Close");
  //   // closeButton.width = "100px";
  //   // closeButton.height = "40px";
  //   // closeButton.color = "white";
  //   // closeButton.background = "green";
  //   // closeButton.onPointerClickObservable.add(() => {
  //   //   console.log("closeButton clicked");
  //   //   panel.isVisible = false;
  //   // });
  //   // panel.addControl(closeButton);
  // }
}

export default MusicListPage;
