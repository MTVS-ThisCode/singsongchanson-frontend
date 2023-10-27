import { Vector3, SceneLoader, KeyboardEventTypes, Animation, AnimationPropertiesOverride } from "@babylonjs/core";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

class Avatar {
  constructor(url, name, scale, scene, camera, position) {
    SceneLoader.ImportMesh("", url, name, scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
      const model = newMeshes[0];
      model.scaling.scaleInPlace(scale);

      model.position.x = position.x;
      model.position.y = position.y;
      model.position.z = position.z;

      camera.target = model;

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
                model.rotation = new Vector3(0, -(Math.PI / 2), 0);
                model.position.x += 0.1;
                break;
              case "d" || "D":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                model.rotation = new Vector3(0, Math.PI / 2, 0);
                model.position.x -= 0.1;
                break;
              case "w" || "W":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                model.rotation = new Vector3(0, Math.PI, 0);
                model.position.z += 0.1;
                break;
              case "s" || "S":
                if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
                model.rotation = new Vector3(0, Math.PI * 2, 0);
                model.position.z -= 0.1;
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
    });
  }
}

export default Avatar;
