import { useCallback, useEffect, useRef, useState } from "react";

import "@babylonjs/core/Loading/loadingScreen";
// import "@babylonjs/loaders/glTF";
// import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import SceneInitializer from "../babylon/SceneInitializer";

import musicListJSON from "../data/musicList.json";
import { Button } from "react-bootstrap";
import { BiFullscreen } from "react-icons/bi";

import { postRoomInfo } from "../apis/room";
import { useNavigate } from "react-router-dom";
import { getMymusic } from "../apis/song";

function SceneComponent({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, user, isEdit, models, avatar, roomId, ...rest }) {
  const reactCanvas = useRef(null);
  const [musicList, setMusicList] = useState([]);
  const [engine, setEngine] = useState(null);
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   setMusicList([...musicListJSON]);
  // }, []);

  useEffect(() => {
    getMymusic(user.userNo).then((result) => {
      if (result.status === 200) {
        const data = result.data.data;
        setMusicList([...data]);
      }
    });
  }, []);

  const setScene = useCallback(async () => {
    if (models) {
      const { current: canvas } = reactCanvas;
      const sceneInitializer = new SceneInitializer();
      document.fullscreenEnabled = true;
      await sceneInitializer.setEngine(document);
      sceneInitializer.create(sceneOptions, canvas);
      await sceneInitializer.onReady(models, musicList, avatar, user, isEdit);
      setEngine(sceneInitializer.scene.getEngine());

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
    }
  }, [sceneOptions, onRender, models, avatar, musicList, isEdit]);

  // set up basic engine and scene
  useEffect(() => {
    setScene();
  }, [setScene, onRender]);

  const fullscreen = () => {
    engine.switchFullscreen();
  };

  const updateRoomHandler = async (engine, e) => {
    const result = engine.scenes[0].getActiveMeshes().data.filter((mesh) => mesh.metadata !== null && "name" in mesh.metadata);

    const updatedMesh = [];
    result.forEach((element) => {
      const furniture = {};
      furniture.position = { x: element.position.x, y: element.position.y, z: element.position.z };
      furniture.name = element.metadata.name;
      furniture.url = element.metadata.url;
      furniture.scale = element.metadata.scale;
      furniture.rotation = { x: element.rotationQuaternion.x, y: element.rotationQuaternion.y, z: element.rotationQuaternion.z };

      const exist = updatedMesh.findIndex((f) => f.name === element.metadata.name);
      if (exist === -1) {
        updatedMesh.push(furniture);
      }
    });
    console.log(updatedMesh);

    const body = {};
    body.roomId = roomId;
    body.furniture = updatedMesh;

    await postRoomInfo(body).then((result) => {
      if (result.status === 200) {
        const data = result.data.data;
        console.log(data);
        localStorage.setItem("room", JSON.stringify([]));
        alert("singsonroom이 업데이트 되었습니다!");
        navigate(`/room/${roomId}`);
      }
    });
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <canvas ref={reactCanvas} {...rest} style={{ width: "100%", height: "500px" }} allow="fullscreen"></canvas>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, right: 0, pointerEvents: "none" }}>
          <Button variant="dark" size="lg" onClick={fullscreen} style={{ position: "absolute", right: "24px", bottom: "24px", paddingLeft: "5px", paddingRight: "5px", paddingTop: "0px", paddingBottom: "3px", pointerEvents: "all" }}>
            <BiFullscreen style={{ width: "20px", height: "20px" }} />
          </Button>
          {isEdit ? (
            <Button
              variant="dark"
              size="md"
              onClick={(e) => {
                updateRoomHandler(engine, e);
              }}
              style={{ position: "absolute", right: "24px", bottom: "90%", pointerEvents: "all" }}
            >
              저장하기
            </Button>
          ) : null}
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
