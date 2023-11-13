import { AdvancedDynamicTexture, Rectangle, StackPanel, Button } from "@babylonjs/gui";
import { MeshBuilder, Vector3 } from "@babylonjs/core";

import MusicButton from "./MusicButton";

class MusicListPage {
  constructor(guiManager, musicList, scene, furniturePosition) {
    // const ground = MeshBuilder.CreateGround("ground1", { height: 300, width: 300, subdivisions: 4 }, scene);
    // ground.rotation = new Vector3(8, 0, 0);
    // ground.position = new Vector3(400, 300, -200);
    // const advancedTexture = AdvancedDynamicTexture.CreateForMesh(ground, 1024, 1024);

    // const rectangle = new Rectangle("rect");
    // rectangle.background = "black";
    // rectangle.color = "yellow";
    // rectangle.width = "300px";
    // rectangle.height = "300px";

    // advancedTexture.addControl(rectangle);

    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const panel = new StackPanel();
    advancedTexture.addControl(panel);
    musicList.forEach((music) => {
      const musicButton = new MusicButton(music.url, music.title, scene, furniturePosition);
      panel.addControl(musicButton.musicPlayButton);
      //advancedTexture.addControl(musicButton.stopMusicButton);
      //musicButton.musicPlayButton.isVisible = false;
      //musicButton.stopMusicButton.isVisible = false;
    });
    var closeButton = Button.CreateSimpleButton("but", "Close");
    closeButton.width = "100px";
    closeButton.height = "40px";
    closeButton.color = "white";
    closeButton.background = "green";
    closeButton.onPointerClickObservable.add(() => {
      console.log("closeButton clicked");
      panel.isVisible = false;
    });
    panel.addControl(closeButton);
  }
}

export default MusicListPage;
