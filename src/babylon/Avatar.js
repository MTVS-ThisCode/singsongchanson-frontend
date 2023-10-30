import { Vector3, SceneLoader, KeyboardEventTypes, Animation, AnimationPropertiesOverride, MeshBuilder, DynamicTexture, StandardMaterial } from "@babylonjs/core";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import { FBXLoader } from "babylonjs-fbx-loader";

class Avatar {
  async create(url, name, scale, scene, camera, position) {
    SceneLoader.RegisterPlugin(new FBXLoader());

    const result = await SceneLoader.ImportMeshAsync("", url, name, scene);
    console.log(result);
    const model = result.meshes[0];
    model.scaling.scaleInPlace(scale);

    model.position.x = position.x;
    model.position.y = position.y;
    model.position.z = position.z;

    camera.target = model;

    //Animation.AllowMatricesInterpolation = true;
    return model;
    // const skeleton = skeletons[0];
    // skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
    // skeleton.animationPropertiesOverride.enableBlending = true;
    // skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
    // skeleton.animationPropertiesOverride.loopMode = 0;
  }

  static move(avatarModel, scene, nicknamePlane) {
    const idleRange = scene.getAnimationGroupByName("Idle");
    const walkRange = scene.getAnimationGroupByName("Walking");

    scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          console.log("key : ", kbInfo.event.key);
          switch (kbInfo.event.key) {
            case "a" || "A":
              if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
              avatarModel.rotation = new Vector3(0, -(Math.PI / 2), 0);
              avatarModel.position.x += 0.1;
              nicknamePlane.position.x += 0.1;
              break;
            case "d" || "D":
              if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
              avatarModel.rotation = new Vector3(0, Math.PI / 2, 0);
              avatarModel.position.x -= 0.1;
              nicknamePlane.position.x -= 0.1;
              break;
            case "w" || "W":
              if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
              avatarModel.rotation = new Vector3(0, Math.PI, 0);
              avatarModel.position.z += 0.1;
              nicknamePlane.position.z += 0.1;
              break;
            case "s" || "S":
              if (walkRange) walkRange.start(true, 1.0, walkRange.from, walkRange.to, false);
              avatarModel.rotation = new Vector3(0, Math.PI * 2, 0);
              avatarModel.position.z -= 0.1;
              nicknamePlane.position.z -= 0.1;
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
  }

  addNicknamePlane(model, scene, userNickname) {
    //Set font
    var font_size = 15;
    var font = "bold " + font_size + "px Arial";

    //Set height for plane
    var planeHeight = 1;

    //Set height for dynamic texture
    var DTHeight = 1.5 * font_size; //or set as wished

    //Calcultae ratio
    var ratio = planeHeight / DTHeight;

    //Set text
    var text = userNickname;

    var temp = new DynamicTexture("DynamicTexture", 64, scene);
    var tmpctx = temp.getContext();
    tmpctx.font = font;
    var DTWidth = tmpctx.measureText(text).width + 8;

    //Calculate width the plane has to be
    var planeWidth = DTWidth * ratio;

    //Create dynamic texture and write the text
    var dynamicTexture = new DynamicTexture("DynamicTexture", { width: DTWidth, height: DTHeight }, scene, false);
    var mat = new StandardMaterial("mat", scene);
    mat.diffuseTexture = dynamicTexture;
    dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);

    //Create plane and set dynamic texture as material
    var plane = MeshBuilder.CreatePlane("plane", { width: planeWidth, height: planeHeight }, scene);
    plane.rotation.y = Math.PI;
    plane.position.y = model.position.y + 8.5;
    plane.material = mat;

    return plane;
  }
}

export default Avatar;
