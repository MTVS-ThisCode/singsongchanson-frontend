import { SceneLoader, PointerDragBehavior } from "@babylonjs/core";
import { AdvancedDynamicTexture, Rectangle, StackPanel, Button } from "@babylonjs/gui";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Engines/WebGPU/Extensions/engine.uniformBuffer";
import "@babylonjs/core/Engines/WebGPU/Extensions/engine.dynamicTexture";
import "@babylonjs/core/Engines/WebGPU/Extensions/engine.alpha";
import "@babylonjs/core/Engines/WebGPU/Extensions/engine.dynamicBuffer";
import { Vector3 } from "babylonjs";
import MusicListButton from "./MusicListButton";
import MusicListPage from "./MusicListPage";

class Furniture {
  async create(url, name, scale, scene, position, rotation, isEdit) {
    const result = await SceneLoader.ImportMeshAsync("", url, name, scene);

    result.meshes.forEach((mesh) => {
      // mesh.isPickable = true;
      mesh.checkCollisions = true;
      mesh.metadata = { name, url, scale };
      //mesh.freezeWorldMatrix();
      //mesh.doNotSyncBoundingInfo = true;
    });
    const model = result.meshes[0];
    model.enablePointerMoveEvents = true;
    model.isPickable = true;
    model.scaling.scaleInPlace(scale);

    model.position.x = position.x;
    model.position.y = position.y;
    model.position.z = position.z;

    if (rotation) {
      model.rotationQuaternion.x = rotation.x;
      model.rotationQuaternion.y = rotation.y;
      model.rotationQuaternion.z = rotation.z;
    }
    model.metadata = { name, url, scale };

    return model;
  }

  static dragOn(furnitureModel, musicListButton, musicListPanel) {
    const models = JSON.parse(localStorage.getItem("room"));
    const updateModel = models.filter((model) => model.name === furnitureModel.metadata.name)[0];
    const index = models.indexOf(updateModel);
    const dragBehavior = new PointerDragBehavior();

    dragBehavior.moveAttached = false;
    furnitureModel.addBehavior(dragBehavior);
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
          if (Math.abs(furnitureModel.position.x + event.delta.x) < 380) {
            furnitureModel.position.x += event.delta.x;
            if (musicListButton) {
              musicListButton.position.x += event.delta.x;
            }
            if (musicListPanel) {
              musicListPanel.position.x += event.delta.x;
            }
          }
        } else if (moveMode === 2) {
          if (furnitureModel.position.y + event.delta.y > 0) {
            furnitureModel.position.y += event.delta.y;
            if (musicListButton) {
              musicListButton.position.y += event.delta.y;
            }
            if (musicListPanel) {
              musicListPanel.position.y += event.delta.y;
            }
          }
        } else if (moveMode === 3) {
          if (furnitureModel.position.z + event.delta.z > -260 && furnitureModel.position.z + event.delta.z < 250) {
            furnitureModel.position.z += event.delta.z;
            if (musicListButton) {
              musicListButton.position.z += event.delta.z;
            }
            if (musicListPanel) {
              musicListPanel.position.z += event.delta.z;
            }
          }
        }
      } else if (clickBtn === "right") {
        if (event.delta.x > 0) {
          furnitureModel.addRotation(0, -0.1, 0);
        } else if (event.delta.x < 0) {
          furnitureModel.addRotation(0, 0.1, 0);
        }
      }

      if (index !== -1) {
        const furniture = {};
        furniture.position = { x: furnitureModel.position.x, y: furnitureModel.position.y, z: furnitureModel.position.z };
        furniture.name = furnitureModel.metadata.name;
        furniture.url = furnitureModel.metadata.url;
        furniture.scale = furnitureModel.metadata.scale;
        furniture.rotation = { x: furnitureModel.rotationQuaternion.x, y: furnitureModel.rotationQuaternion.y, z: furnitureModel.rotationQuaternion.z };
        models[index] = furniture;
        console.log(models[index]);
        localStorage.setItem("room", JSON.stringify(models));
      }
    });
  }

  static click(furnitureModel, scene, guiManager, anchor, musicList) {
    let created = false;
    const musicPannel = new MusicListPage(musicList, scene, guiManager, anchor, furnitureModel.position);
    scene.onPointerDown = function (evt, pickResult) {
      // We try to pick an object
      if (pickResult.hit) {
        if (pickResult.pickedMesh.metadata !== undefined) {
          const meshName = pickResult.pickedMesh.metadata.name;
          if (meshName === "keyboard.glb" || meshName === "guitar.glb") {
            if (!created) {
              // MusicListPage.create(musicList, scene, guiManager, anchor, pickResult.pickedMesh._absolutePosition);
              musicPannel.open();
              created = !created;
            } else {
              musicPannel.close();
              console.log("closed");
              created = !created;
            }
          }
        }
      }
    };
  }
}

export default Furniture;
