import { Scene, Engine, WebGPUEngine, Vector3, HemisphericLight, DirectionalLight, MeshBuilder, ArcRotateCamera, Color3, StandardMaterial, CubeTexture, Texture } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control, GUI3DManager } from "@babylonjs/gui";

import Avatar from "./Avatar";
import Furniture from "./Furniture";

import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import MusicListButton from "./MusicListButton";

class SceneInitializer {
  setSkybox() {
    // Skybox

    //this.engine.setTexture(0, null, new CubeTexture("/texture/color", this.scene));
    const skyBoxTexture = new CubeTexture("/texture/color", this.scene);

    const skyboxMaterial = new StandardMaterial("skyBox", this.scene);

    const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = skyBoxTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;

    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
  }

  setGround() {
    // Ground

    this.ground = MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, this.scene);

    const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
    const groundTexture = new Texture("/texture/wood.jpg", this.scene);
    groundMaterial.diffuseTexture = groundTexture;
    groundMaterial.diffuseTexture.uScale = 30;
    groundMaterial.diffuseTexture.vScale = 30;
    groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
    this.ground.material = groundMaterial;
  }

  async setEngine(document) {
    const canvas = document.querySelector("canvas");
    document.fullscreenEnabled = true;
    const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
    if (webGPUSupported) {
      this.engine = new WebGPUEngine(canvas);
      await this.engine.initAsync();
    } else {
      this.engine = new Engine(canvas, true);
    }
  }

  async create(sceneOption, canvas) {
    this.engine.enableOfflineSupport = false;
    this.scene = new Scene(this.engine, sceneOption);

    if (this.scene.isReady()) {
      this.scene.freezeActiveMeshes(true);
      // Lights
      const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
      light.intensity = 0.6;
      light.specular = Color3.Black();

      const light2 = new DirectionalLight("dir01", new Vector3(0, -0.5, -1.0), this.scene);
      light2.position = new Vector3(0, 5, 5);

      this.setSkybox();

      this.setGround();

      this.camera1 = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new Vector3(0, -5, 0), this.scene);
      //scene.activeCamera = camera1;
      //scene.activeCamera.attachControl(canvas, true);
      this.camera1.attachControl(canvas, true); // 특정 DOM 요소와 카메라를 연결
      this.camera1.lowerRadiusLimit = 10; // radius : target과 카메라 까지의 거리
      this.camera1.upperRadiusLimit = 30;
      this.camera1.upperBetaLimit = Math.PI / 2 - 0.1; // beta : 위도 회전(라디안)
      this.camera1.wheelDeltaPercentage = 0.01; // 마우스 휠 델타 백분율 또는 카메라 확대/축소 속도를 가져오거나 설정

      const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

      const fullScrenButton = Button.CreateSimpleButton("but1", "Full");
      fullScrenButton.width = "50px";
      fullScrenButton.height = "50px";
      fullScrenButton.automaticSize = false;
      fullScrenButton.color = "white";
      fullScrenButton.cornerRadius = 0;
      fullScrenButton.background = "silver";
      fullScrenButton.onPointerUpObservable.add(() => {
        this.scene.getEngine().switchFullscreen();
      });
      fullScrenButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
      fullScrenButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
      advancedTexture.addControl(fullScrenButton);
    }
  }

  async onReady(models, musicList) {
    const guiManager = new GUI3DManager(this.scene);
    models.forEach(async (model) => {
      if (model.type === "avatar") {
        new Avatar(model.url, model.name, model.scale, this.scene, this.camera1, model.position);
      } else if (model.type === "furniture") {
        if (model.name === "Chair.glb") {
          const furniture = new Furniture();
          const musicStorege = await furniture.create(model.url, model.name, model.scale, this.scene, model.position);
          const musicListButton = new MusicListButton(guiManager, musicList, this.scene, model.position);
          Furniture.dragOn(musicStorege, this.ground, musicListButton.playListButton);
        } else {
          const furniture = new Furniture();
          const musicStorege = await furniture.create(model.url, model.name, model.scale, this.scene, model.position);
          Furniture.dragOn(musicStorege, this.ground);
        }
      }
    });
  }
}

export default SceneInitializer;
