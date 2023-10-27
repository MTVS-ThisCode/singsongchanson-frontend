import { SceneLoader, PointerDragBehavior } from "@babylonjs/core";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

class Furniture {
  async create(url, name, scale, scene, position) {
    const result = await SceneLoader.ImportMeshAsync("", url, name, scene);
    const model = result.meshes[0];
    model.scaling.scaleInPlace(scale);

    model.position.x = position.x;
    model.position.y = position.y;
    model.position.z = position.z;
    return model;
  }

  static dragOn(furnitureModel, ground, musicListButton) {
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
          furnitureModel.position.x += event.delta.x;
          if (musicListButton) {
            musicListButton.position.x += event.delta.x;
          }
        } else if (moveMode === 2) {
          if (furnitureModel.position.y + event.delta.y > ground.position.y) {
            furnitureModel.position.y += event.delta.y;
            if (musicListButton) {
              musicListButton.position.y += event.delta.y;
            }
          }
        } else if (moveMode === 3) {
          furnitureModel.position.z += event.delta.z;
          if (musicListButton) {
            musicListButton.position.z += event.delta.z;
          }
        }
      } else if (clickBtn === "right") {
        if (event.delta.x > 0) {
          furnitureModel.addRotation(0, 0.1, 0);
        } else if (event.delta.x < 0) {
          furnitureModel.addRotation(0, -0.1, 0);
        }
      }
    });
  }
}

export default Furniture;
