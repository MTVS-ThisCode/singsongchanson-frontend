import { Scene, Engine, WebGPUEngine, Vector3, HemisphericLight, DirectionalLight, MeshBuilder, ArcRotateCamera, Color3, StandardMaterial, CubeTexture, Texture } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

class SceneInitializer {
  async setEngine(document) {
    const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
    if (webGPUSupported) {
      const engine = new WebGPUEngine(document.querySelector("canvas"));
      await engine.initAsync();
      this.engine = engine;
    }
    this.engine = new Engine(document.querySelector("cnavas"), true);
  }

  async create(sceneOption, canvas) {
    this.engine.enableOfflineSupport = false;
    this.scene = new Scene(this.engine, sceneOption);

    if (this.scene.isReady()) {
      // Lights
      const light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
      light.intensity = 0.6;
      light.specular = Color3.Black();

      const light2 = new DirectionalLight("dir01", new Vector3(0, -0.5, -1.0), this.scene);
      light2.position = new Vector3(0, 5, 5);

      // Skybox
      const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.scene);
      const skyboxMaterial = new StandardMaterial("skyBox", this.scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new CubeTexture("textures/color", this.scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
      skyboxMaterial.specularColor = new Color3(0, 0, 0);
      skybox.material = skyboxMaterial;

      // Ground
      const ground = MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, this.scene);
      const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
      groundMaterial.diffuseTexture = new Texture("/textures/wood.jpg", this.scene);
      groundMaterial.diffuseTexture.uScale = 30;
      groundMaterial.diffuseTexture.vScale = 30;
      groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
      ground.material = groundMaterial;

      const camera1 = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new Vector3(0, -5, 0), this.scene);
      //scene.activeCamera = camera1;
      //scene.activeCamera.attachControl(canvas, true);
      camera1.attachControl(canvas, true); // 특정 DOM 요소와 카메라를 연결
      camera1.lowerRadiusLimit = 10; // radius : target과 카메라 까지의 거리
      camera1.upperRadiusLimit = 30;
      camera1.upperBetaLimit = Math.PI / 2 - 0.1; // beta : 위도 회전(라디안)
      camera1.wheelDeltaPercentage = 0.01; // 마우스 휠 델타 백분율 또는 카메라 확대/축소 속도를 가져오거나 설정

      const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

      const fullScrenButton = Button.CreateSimpleButton("but1", "Click Me");
      fullScrenButton.width = "50px";
      fullScrenButton.height = "50px";
      fullScrenButton.automaticSize = false;
      fullScrenButton.color = "white";
      fullScrenButton.cornerRadius = 0;
      fullScrenButton.background = "silver";
      fullScrenButton.onPointerUpObservable.add(function () {
        this.scene.getEngine().switchFullscreen();
      });
      fullScrenButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
      fullScrenButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
      advancedTexture.addControl(fullScrenButton);
    }

    return this.scene;
  }

  async onSceneReady(models, musicList) {}
}

export default SceneInitializer;
