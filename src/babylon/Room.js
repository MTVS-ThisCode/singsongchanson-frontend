import { Vector3, SceneLoader, KeyboardEventTypes, MeshBuilder, DynamicTexture, StandardMaterial } from "@babylonjs/core";
import { HolographicButton, TextBlock, PlanePanel } from "@babylonjs/gui";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import { FBXLoader } from "babylonjs-fbx-loader";

class Room {
  async create(scene) {
    SceneLoader.RegisterPlugin(new FBXLoader());

    const result = await SceneLoader.ImportMeshAsync("", "/assets/", "my_room.fbx", scene);
  }
}

export default Room;
