import { Scene, Engine, WebGPUEngine, Vector3, HemisphericLight, DirectionalLight, MeshBuilder, ArcRotateCamera, Color3, StandardMaterial, CubeTexture, Texture } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control, GUI3DManager } from "@babylonjs/gui";

import Avatar from "./Avatar";
import Furniture from "./Furniture";

import MusicListButton from "./MusicListButton";

class SceneInitializer {
  setSkybox() {
    // Skybox

    //this.engine.setTexture(0, null, new CubeTexture("/texture/color", this.scene));
    const skyBoxTexture = new CubeTexture("/texture/color", this.scene);
    //this.scene.createDefaultSkybox(this.scene.environmentTexture, true);

    const skyboxMaterial = new StandardMaterial("skyBox", this.scene);

    const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = skyBoxTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;

    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
  }

  async setGround() {
    // Ground

    this.ground = MeshBuilder.CreateGround("ground", { height: 1000, width: 1000, subdivisions: 4 }, this.scene);

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
    // const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
    // if (webGPUSupported) {
    //   this.engine = new WebGPUEngine(canvas);
    //   await this.engine.initAsync();
    // } else {
    //   this.engine = new Engine(canvas, true);
    // }
    this.engine = new Engine(canvas, false);
  }

  async create(sceneOption, canvas) {
    this.engine.enableOfflineSupport = false;
    this.scene = new Scene(this.engine);

    if (this.scene.isReady()) {
      // Lights
      const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
      light.intensity = 0.6;
      light.specular = Color3.Black();

      const light2 = new DirectionalLight("dir01", new Vector3(0, -0.5, -1.0), this.scene);
      light2.position = new Vector3(0, 5, 5);

      this.setSkybox();

      this.setGround();

      this.camera1 = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 6, 30, new Vector3(0, 3, 3), this.scene);
      //scene.activeCamera = camera1;
      //scene.activeCamera.attachControl(canvas, true);
      this.camera1.attachControl(canvas, true); // 특정 DOM 요소와 카메라를 연결
      this.camera1.lowerRadiusLimit = 10; // radius : target과 카메라 까지의 거리
      this.camera1.upperRadiusLimit = 50;
      this.camera1.upperBetaLimit = Math.PI / 2 - 0.1; // beta : 위도 회전(라디안)
      this.camera1.wheelDeltaPercentage = 0.01; // 마우스 휠 델타 백분율 또는 카메라 확대/축소 속도를 가져오거나 설정

      // const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

      // const fullScrenButton = Button.CreateSimpleButton("but1", "Full");
      // fullScrenButton.width = "50px";
      // fullScrenButton.height = "50px";
      // fullScrenButton.automaticSize = false;
      // fullScrenButton.color = "white";
      // fullScrenButton.cornerRadius = 0;
      // fullScrenButton.background = "silver";
      // fullScrenButton.onPointerClickObservable.add(async () => {
      //   const request = await canvas.requestFullscreen();
      //   console.log(request);
      //   this.scene.getEngine().switchFullscreen();
      // });
      // fullScrenButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
      // fullScrenButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
      // advancedTexture.addControl(fullScrenButton);
    }
  }

  async onReady(models, musicList, avatarModel, user) {
    const guiManager = new GUI3DManager(this.scene);
    const avatar = new Avatar();
    const userAvatarModel = avatarModel["female"];
    console.log(userAvatarModel);
    const newAvatar = await avatar.create(userAvatarModel.url, userAvatarModel.name, userAvatarModel.scale, this.scene, this.camera1, userAvatarModel.position);
    const nicknamePlane = avatar.addNicknamePlane(newAvatar, this.scene, "이효진");
    Avatar.move(newAvatar, this.scene, nicknamePlane);
    if (user) {
      const userAvatarModel = avatarModel[user.gender];
      if (userAvatarModel) {
        const newAvatar = await avatar.create(userAvatarModel.url, userAvatarModel.name, userAvatarModel.scale, this.scene, this.camera1, userAvatarModel.position);
        const nicknamePlane = avatar.addNicknamePlane(newAvatar, this.scene, "이효진");
        Avatar.move(newAvatar, this.scene, nicknamePlane);
      }
    }
    models.forEach(async (model) => {
      if (model.type === "avatar") {
      } else if (model.type === "furniture") {
        if (model.name === "Chair.glb") {
          const furniture = new Furniture();
          const musicStorege = await furniture.create(model.url, model.name, model.scale, this.scene, model.position);
          const musicListButton = new MusicListButton(guiManager, musicList, this.scene, model.position);
          Furniture.dragOn(musicStorege, this.ground, musicListButton.playListButton, musicListButton.musicListPanel);
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
