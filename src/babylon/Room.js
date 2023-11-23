import { Vector3, SceneLoader, KeyboardEventTypes, MeshBuilder, DynamicTexture, StandardMaterial } from "@babylonjs/core";

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
import { FBXLoader } from "babylonjs-fbx-loader";

class Room {
  async create(scene) {
    SceneLoader.RegisterPlugin(new FBXLoader());

    const result = await SceneLoader.ImportMeshAsync("", "/assets/", "my_room.fbx", scene);
  }
}

export default Room;
