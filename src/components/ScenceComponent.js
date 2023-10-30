import { useCallback, useEffect, useRef, useState } from "react";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

import SceneInitializer from "../babylon/SceneInitializer";

import avatarJSON from "../data/avatar.json";
import furnitureJSON from "../data/furniture.json";
import musicListJSON from "../data/musicList.json";
import { Button } from "react-bootstrap";
import { BiFullscreen } from "react-icons/bi";

function SceneComponent({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, user, ...rest }) {
  const reactCanvas = useRef(null);
  const [models, setModels] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [avatar, setAvatar] = useState({});
  const [engine, setEngine] = useState(null);

  let box;

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

  useEffect(() => {
    setModels([...furnitureJSON]);
    setMusicList([...musicListJSON]);
    setAvatar(avatarJSON);
  }, []);

  const setScene = useCallback(async () => {
    const { current: canvas } = reactCanvas;
    const sceneInitializer = new SceneInitializer();
    document.fullscreenEnabled = true;
    await sceneInitializer.setEngine(document);
    await sceneInitializer.create(sceneOptions, canvas);
    await sceneInitializer.onReady(models, musicList, avatar, user);
    setEngine(sceneInitializer.engine);

    sceneInitializer.engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(sceneInitializer.scene);
      sceneInitializer.scene.render();
    });

    const resize = () => {
      sceneInitializer.scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      //sceneInitializer.scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [sceneOptions, onRender, avatar, models, musicList]);

  // set up basic engine and scene
  useEffect(() => {
    setScene();
  }, [antialias, engineOptions, adaptToDeviceRatio, setScene]);

  const fullscreen = () => {
    engine.switchFullscreen();
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <canvas ref={reactCanvas} {...rest} style={{ width: "100%", height: "500px" }} allow="fullscreen"></canvas>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, right: 0, pointerEvents: "none" }}>
          <Button variant="dark" size="lg" onClick={fullscreen} style={{ position: "absolute", right: "24px", bottom: "24px", pointerEvents: "all" }}>
            <BiFullscreen />
          </Button>
        </div>
      </div>
    </>
  );
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
