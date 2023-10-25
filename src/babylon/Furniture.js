import { SceneLoader, PointerDragBehavior } from "@babylonjs/core";

class Furniture {
  constructor(url, name, scene, position, ground) {
    SceneLoader.ImportMesh("", url, name, scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
      const model = newMeshes[0];

      //Scale the model down
      model.scaling.scaleInPlace(1);

      model.position.x = position.x;
      model.position.y = position.y;
      model.position.z = position.z;

      //Lock camera on the character
      //camera.target = hero;

      const dragBehavior = new PointerDragBehavior();
      dragBehavior.moveAttached = false;
      model.addBehavior(dragBehavior);

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
            model.position.x += event.delta.x;
          } else if (moveMode === 2) {
            if (model.position.y + event.delta.y > ground.position.y) {
              model.position.y += event.delta.y;
            }
          } else if (moveMode === 3) {
            model.position.z += event.delta.z;
          }
        } else if (clickBtn === "right") {
          if (event.delta.x > 0) {
            model.addRotation(0, 0.1, 0);
          } else if (event.delta.x < 0) {
            model.addRotation(0, -0.1, 0);
          }
        }
      });
    });
  }
}

export default Furniture;
