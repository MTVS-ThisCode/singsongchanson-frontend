import { Scene, Engine, WebGPUEngine, Vector3, HemisphericLight, DirectionalLight, MeshBuilder, ArcRotateCamera, Color3, StandardMaterial, CubeTexture, Texture, TransformNode } from "@babylonjs/core";
import { GUI3DManager } from "@babylonjs/gui";
import Avatar from "./Avatar";
import Furniture from "./Furniture";
import Room from "./Room";
import "@babylonjs/core/Engines/WebGPU/Extensions";
const loaders = require("babylonjs-loaders");

class SceneInitializer {
  setSkybox() {
    // Skybox

    //this.engine.setTexture(0, null, new CubeTexture("/texture/color", this.scene));
    const skyBoxTexture = new CubeTexture("/texture/color", this.scene);
    //this.scene.createDefaultSkybox(this.scene.environmentTexture, true);

    const skyboxMaterial = new StandardMaterial("skyBox", this.scene);

    const skybox = MeshBuilder.CreateBox("skyBox", { size: 3000.0 }, this.scene);
    skyboxMaterial.backFaceCulling = false;

    skyboxMaterial.reflectionTexture = skyBoxTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;

    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    //skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
  }

  setGround() {
    // Ground

    this.ground = MeshBuilder.CreateGround("ground", { height: 60, width: 60, subdivisions: 4 }, this.scene);

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
    const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
    if (webGPUSupported) {
      this.engine = new WebGPUEngine(canvas, {
        enableAllFeatures: true,
        // deviceDescriptor: {
        //   requiredFeatures: ["depth-clip-control", "depth24unorm-stencil8", "depth32float-stencil8", "texture-compression-bc", "texture-compression-etc2", "texture-compression-astc", "timestamp-query", "indirect-first-instance"],
        // },
      });
      await this.engine.initAsync();
    } else {
      this.engine = new Engine(canvas, true);
    }
    this.engine.enableOfflineSupport = true;
    this.engine.compatibilityMode = false;
    this.scene = new Scene(this.engine);
    //this.engine = new Engine(canvas, true);
  }

  create(sceneOption, canvas) {
    if (this.scene.isReady()) {
      this.guiManager = new GUI3DManager(this.scene);
      this.anchor = new TransformNode("");
      // Lights
      const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
      light.position = new Vector3(0, 3000, 1000);
      light.intensity = 2;
      light.specular = Color3.White();

      // const light2 = new DirectionalLight("dir01", new Vector3(0, -0.5, -1.0), this.scene);
      // light2.position = new Vector3(0, 2000, 500);

      //this.setSkybox();

      //this.setGround();

      this.camera1 = new ArcRotateCamera("camera1", Math.PI * 1.5, Math.PI / 3, 500, new Vector3(0, 100, 0), this.scene);
      this.scene.activeCamera = this.camera1;
      //scene.activeCamera.attachControl(canvas, true);
      this.camera1.attachControl(canvas, true); // 특정 DOM 요소와 카메라를 연결
      this.camera1.lowerRadiusLimit = 100; // radius : target과 카메라 까지의 거리
      this.camera1.upperRadiusLimit = 1500;
      this.camera1.upperBetaLimit = Math.PI / 2 - 0.1; // beta : 위도 회전(라디안)
      this.camera1.wheelDeltaPercentage = 0.1; // 마우스 휠 델타 백분율 또는 카메라 확대/축소 속도를 가져오거나 설정
      this.camera1.inputs.attached.pointers.panningSensibility = 10;

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

  async onReady(models, musicList, avatarModel, user, isEdit) {
    const room = new Room();
    await room.create(this.scene);
    const avatar = new Avatar();
    let userNickname;
    if (user) {
      userNickname = user.nickName;
    } else {
      userNickname = "userNickname";
    }
    if (avatarModel) {
      const newAvatar = await avatar.create(avatarModel.url, avatarModel.name, avatarModel.scale, this.scene, this.camera1, avatarModel.position);
      const nicknamePlane = avatar.addNicknamePlane(newAvatar, this.scene, userNickname);
      Avatar.move(newAvatar, this.scene, nicknamePlane);
    }

    if (models && models.length > 0) {
      models.forEach(async (model) => {
        // if (model.name === "desk.glb") {
        //   const furniture = new Furniture();
        //   const musicStorege = await furniture.create(model.url, model.name, model.scale, this.scene, model.position, model.rotation, isEdit);
        //   //const musicListButton = new MusicListButton(this.guiManager, musicList, this.scene, musicStorege.position);
        //   if (isEdit) {
        //     //Furniture.dragOn(musicStorege, musicListButton.playListButton, musicListButton.musicListPanel);
        //     Furniture.dragOn(musicStorege);
        //   } else {
        //     Furniture.click(musicStorege, this.scene);
        //   }
        // } else {
        //   const furniture = new Furniture();
        //   const musicStorege = await furniture.create(model.url, model.name, model.scale, this.scene, model.position, model.rotation, isEdit);
        //   if (isEdit) {
        //     Furniture.dragOn(musicStorege);
        //   } else {
        //     Furniture.click(musicStorege, this.scene);
        //   }
        // }
        const furniture = new Furniture();
        const musicStorege = await furniture.create(model.url, model.name, model.scale, this.scene, model.position, model.rotation, isEdit);
        if (isEdit) {
          Furniture.dragOn(musicStorege);
        } else {
          Furniture.click(musicStorege, this.scene, this.guiManager, this.anchor, musicList);
        }
      });
    }
  }
}

export default SceneInitializer;
