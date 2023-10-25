import { useCallback, useEffect, useRef, useState } from "react";
import {
  Scene,
  Engine,
  WebGPUEngine,
  Vector3,
  HemisphericLight,
  DirectionalLight,
  MeshBuilder,
  ArcRotateCamera,
  Color3,
  StandardMaterial,
  CubeTexture,
  Texture,
  SceneLoader,
  KeyboardEventTypes,
  Animation,
  AnimationPropertiesOverride,
  Sound,
  PointerDragBehavior,
  TransformNode,
} from "@babylonjs/core";
import { HolographicButton, GUI3DManager, TextBlock, PlanePanel, AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

function SceneComponent({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest }) {
  const reactCanvas = useRef(null);

  async function createEngine() {
    const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
    if (webGPUSupported) {
      const engine = new WebGPUEngine(document.querySelector("canvas"));
      await engine.initAsync();
      return engine;
    }
    return new Engine(document.querySelector("cnavas"), true);
  }

  let box;

  const onSceneReady = useCallback(async (scene, camera, ground, canvas) => {
    const guiManager = new GUI3DManager(scene);

    // Load hero character and play animation

    SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
      var hero = newMeshes[0];

      //Scale the model down
      hero.scaling.scaleInPlace(0.1);

      //Lock camera on the character
      camera.target = hero;

      Animation.AllowMatricesInterpolation = true;

      const skeleton = skeletons[0];
      skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
      skeleton.animationPropertiesOverride.enableBlending = true;
      skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
      skeleton.animationPropertiesOverride.loopMode = 0;

      const idleRange = scene.getAnimationGroupByName("Idle");
      const walkRange = scene.getAnimationGroupByName("Walking");

      scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case KeyboardEventTypes.KEYDOWN:
            console.log("key : ", kbInfo.event.key);
            switch (kbInfo.event.key) {
              case "a" || "A":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                hero.rotation = new Vector3(0, -(Math.PI / 2), 0);
                hero.position.x += 0.1;
                break;
              case "d" || "D":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                hero.rotation = new Vector3(0, Math.PI / 2, 0);
                hero.position.x -= 0.1;
                break;
              case "w" || "W":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                hero.rotation = new Vector3(0, Math.PI, 0);
                hero.position.z += 0.1;
                break;
              case "s" || "S":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                hero.rotation = new Vector3(0, Math.PI * 2, 0);
                hero.position.z -= 0.1;
                break;
              default:
                if (idleRange) idleRange.start(true, 1.0, idleRange.from, idleRange.to, false);
                break;
            }
            break;
          case KeyboardEventTypes.KEYUP:
            if (walkRange) walkRange.stop();
            break;
          default:
            if (idleRange) idleRange.start(true, 1.0, idleRange.from, idleRange.to, false);
            break;
        }
      });

      //Play the Samba animation
      //Get the Samba animation Group
      // const anim = scene.getAnimationGroupByName(animation);
      // anim.start(true, 1.0, anim.from, anim.to, false);
    });

    SceneLoader.ImportMesh("", "/assets/", "Chair.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
      var hero = newMeshes[0];

      //Scale the model down
      hero.scaling.scaleInPlace(1);

      hero.position.x = 1;
      hero.position.y = 1;
      hero.position.z = 0;

      //Lock camera on the character
      //camera.target = hero;

      const playListButton = new HolographicButton("Show Playlist");
      guiManager.addControl(playListButton);

      // Must be done AFTER addControl in order to overwrite the default content
      const text1 = new TextBlock();
      text1.text = "Show \n PlayList";
      text1.color = "Red";
      text1.fontSize = 48;
      playListButton.content = text1;
      playListButton.position.y = hero.position.y + 2;
      playListButton.position.x = hero.position.x;
      playListButton.node.rotation.y = Math.PI;

      let listEvent = true;
      const musicListPanel = new PlanePanel();
      const anchor = new TransformNode("");

      guiManager.addControl(musicListPanel);
      musicListPanel.linkToTransformNode(anchor);

      let size = 20;

      musicListPanel.blockLayout = true;
      musicListPanel.node.rotation.y = Math.PI;
      musicListPanel.margin = 0.6;
      musicListPanel.position.y = playListButton.position.y + 0.3 + Math.ceil(size / musicListPanel.columns);
      for (let index = 0; index < size; index++) {
        const button = new HolographicButton("orientation");
        button.onPointerClickObservable.add((eventData, eventState) => {
          console.log(eventData);
        });
        musicListPanel.addControl(button);
        const text1 = new TextBlock();
        text1.text = "Button #" + musicListPanel.children.length;
        text1.color = "White";
        text1.fontSize = 48;
        button.content = text1;

        button.isVisible = false;
      }
      musicListPanel.blockLayout = false;
      playListButton.onPointerClickObservable.add((eventData, eventState) => {
        eventState.lastReturnValue = listEvent;
        if (eventState.lastReturnValue) {
          text1.text = "Hide \n PlayList";
          musicListPanel.children.forEach((btn) => {
            btn.isVisible = true;
          });
          listEvent = false;
        } else {
          text1.text = "Show \n PlayList";
          musicListPanel.children.forEach((btn) => {
            btn.isVisible = false;
          });
          listEvent = true;
        }
      });

      const dragBehavior = new PointerDragBehavior();
      dragBehavior.moveAttached = false;
      hero.addBehavior(dragBehavior);
      let moveMode = 0;
      let clickBtn = "";
      dragBehavior.onDragStartObservable.add((event) => {
        if (event.pointerInfo.event.inputIndex === 2) {
          moveMode = 0;
          clickBtn = "left";
        } else if (event.pointerInfo.event.inputIndex === 4) {
          clickBtn = "right";
        }
      });
      dragBehavior.onDragObservable.add((event) => {
        const absX = Math.abs(event.delta.x);
        const absY = Math.abs(event.delta.y);
        const absZ = Math.abs(event.delta.z);
        if (absX > absY && absX > absZ) {
          moveMode = 1;
        } else if (absY > absZ && absY > absX) {
          moveMode = 2;
        } else if (absZ > absX && absZ > absY) {
          moveMode = 3;
        }
        if (clickBtn === "left") {
          if (moveMode === 1) {
            hero.position.x += event.delta.x;
            playListButton.position.x += event.delta.x;
            musicListPanel.position.x += event.delta.x;
          } else if (moveMode === 2) {
            if (hero.position.y + event.delta.y > ground.position.y) {
              hero.position.y += event.delta.y;
              playListButton.position.y += event.delta.y;
              musicListPanel.position.y += event.delta.y;
            }
          } else if (moveMode === 3) {
            hero.position.z += event.delta.z;
            playListButton.position.z += event.delta.z;
            musicListPanel.position.z += event.delta.z;
          }
        } else if (clickBtn === "right") {
          if (event.delta.x > 0) {
            hero.addRotation(0, 0.1, 0);
          } else if (event.delta.x < 0) {
            hero.addRotation(0, -0.1, 0);
          }
        }
      });
    });

    let music;

    const getMusicButton = new HolographicButton("Get Music");
    guiManager.addControl(getMusicButton);

    // Must be done AFTER addControl in order to overwrite the default content
    const text1 = new TextBlock();
    text1.text = "Play";
    text1.color = "Red";
    text1.fontSize = 48;
    getMusicButton.content = text1;
    getMusicButton.position.y = 1;
    getMusicButton.position.x = -2;
    getMusicButton.node.rotation.y = Math.PI;

    getMusicButton.onPointerClickObservable.add(() => {
      music = new Sound("restaurant", "/sounds/3rdPrototype.mp3", scene, null, { autoplay: true, loop: true });
      console.log(music);
    });

    const stopMusicButton = new HolographicButton("Stop Music");
    guiManager.addControl(stopMusicButton);

    // Must be done AFTER addControl in order to overwrite the default content
    const text3 = new TextBlock();
    text3.text = `Stop`;
    text3.color = "Red";
    text3.fontSize = 48;
    stopMusicButton.content = text3;
    stopMusicButton.position.y = 1;
    stopMusicButton.position.x = -3;
    stopMusicButton.node.rotation.y = Math.PI;

    setInterval(() => {
      if (music) {
        const time = music.currentTime;
        var min = parseInt((time % 3600) / 60);
        var sec = parseInt(time % 60);

        const currentTime = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
        text3.text = `Stop 
        ${currentTime}`;
      }
    }, 1000);

    stopMusicButton.onPointerClickObservable.add(() => {
      if (music) {
        console.log("stop music");
        music.stop();
      }
    });
  }, []);

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = useCallback(
    (scene) => {
      if (box !== undefined) {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime();

        const rpm = 10;
        box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      }
    },
    [box]
  );
  // set up basic engine and scene
  useEffect(() => {
    async function setEngine() {
      const { current: canvas } = reactCanvas;

      if (!canvas) return;

      //const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
      const engine = await createEngine();
      console.log("engine : ", engine);
      engine.enableOfflineSupport = false;
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        // Lights
        var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.6;
        light.specular = Color3.Black();

        var light2 = new DirectionalLight("dir01", new Vector3(0, -0.5, -1.0), scene);
        light2.position = new Vector3(0, 5, 5);

        // Skybox
        var skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        var skyboxMaterial = new StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("textures/color", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        // Ground
        var ground = MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, scene);
        var groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new Texture("/textures/wood.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 30;
        groundMaterial.diffuseTexture.vScale = 30;
        groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        ground.material = groundMaterial;

        var camera1 = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new Vector3(0, -5, 0), scene);
        //scene.activeCamera = camera1;
        //scene.activeCamera.attachControl(canvas, true);
        camera1.attachControl(canvas, true); // 특정 DOM 요소와 카메라를 연결
        camera1.lowerRadiusLimit = 10; // radius : target과 카메라 까지의 거리
        camera1.upperRadiusLimit = 30;
        camera1.upperBetaLimit = Math.PI / 2 - 0.1; // beta : 위도 회전(라디안)
        camera1.wheelDeltaPercentage = 0.01; // 마우스 휠 델타 백분율 또는 카메라 확대/축소 속도를 가져오거나 설정

        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const fullScrenButton = Button.CreateSimpleButton("but1", "Full");
        fullScrenButton.width = "50px";
        fullScrenButton.height = "50px";
        fullScrenButton.automaticSize = false;
        fullScrenButton.color = "white";
        fullScrenButton.cornerRadius = 0;
        fullScrenButton.background = "silver";
        fullScrenButton.onPointerUpObservable.add(function () {
          scene.getEngine().switchFullscreen();
          console.log(fullScrenButton.text);
          if (fullScrenButton.text === "Full") {
            fullScrenButton.text = "exit";
          } else {
            fullScrenButton.text = "Full";
          }
        });
        fullScrenButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        fullScrenButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(fullScrenButton);

        onSceneReady(scene, camera1, ground, canvas);
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") onRender(scene);
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
    setEngine();
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return <canvas ref={reactCanvas} {...rest} style={{ width: "950px", height: "500px" }} />;
}

export default SceneComponent;

/* ----------------------------------------------------------------
 1. 클래스를 통해 Materials들을 여러 개 생성할 수 있도록 수정
 2. 데이터베이스에 저장된 Materials들의 종류를 avatar, furniture 로 구분
 3. avatar의 경우 wasd 의 조작이 가능한 메소드를 가지도록
 4. furniture의 경우 drag and drop으로 위치 이동이 가능한 메소드를 가지도록
 5. 버튼 선택을 통해 사운드가 들리도록  
 6. Materials을 선택했을 때 종류가 furniture일 경우, 메뉴(버튼)이 나타나도록
 7. post request를 통해 furniture의 위치값 전송
 8. furniture의 상세 종류 - 책상, 진열대 , 의자 , 소파, LP 수납함 등등
*/
