import { useCallback, useEffect, useRef, useState } from "react";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

import SceneInitializer from "../babylon/SceneInitializer";

import modelJSON from "../data/model.json";
import musicListJSON from "../data/musicList.json";

function SceneComponent({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest }) {
  const reactCanvas = useRef(null);
  const [models, setModels] = useState([]);
  const [musicList, setMusicList] = useState([]);

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
    setModels([...modelJSON]);
    setMusicList([...musicListJSON]);
  }, []);

  const setScene = useCallback(async () => {
    const { current: canvas } = reactCanvas;
    const sceneInitializer = new SceneInitializer();
    await sceneInitializer.setEngine(document);
    await sceneInitializer.create(sceneOptions, canvas);
    await sceneInitializer.onReady(models, musicList);

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
      sceneInitializer.scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [sceneOptions, onRender, musicList, models]);

  // set up basic engine and scene
  useEffect(() => {
    setScene();
  }, [antialias, engineOptions, adaptToDeviceRatio, setScene]);

  return <canvas ref={reactCanvas} {...rest} style={{ width: "950px", height: "500px" }} allow="fullscreen" />;
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
