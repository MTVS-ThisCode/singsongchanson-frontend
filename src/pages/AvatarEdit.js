import SceneComponent from "../components/ScenceComponent";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import avatarJSON from "../data/avatar.json";

import { postAvatar } from "../apis/auth";
import { ACCESS_TOKEN } from "../constants";

function AvatarEdit({ authenticated, user }) {
  const [avatar, setAvatar] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [uploadModel, setUploadModel] = useState({});
  const [scale, setScale] = useState(0);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    setAvatar(uploadAvatar);
  }, [uploadAvatar]);

  const submitHandler = async () => {
    const formData = new FormData();

    formData.append("file", uploadModel);

    //const blob = new Blob([JSON.stringify(value)], { type: "application/json" });
    formData.append("gender", gender);
    formData.append("scale", scale);

    const data = Object.fromEntries(formData);
    console.log("data", data);
    await postAvatar(localStorage.getItem(ACCESS_TOKEN), data).then((result) => {
      if (result.status === 200) {
        const data = result.data.data;
        console.log(data);
        const url = data.savedFileUrl;
        setUploadAvatar({ scale: data.scale, name: url.split("/").at(-1), url: url.substring(0, url.lastIndexOf("/")) + "/", position: { x: 0, y: 0, z: 0 } });
      }
    });
  };

  const updateScaleHandler = (e) => {
    setScale(e.target.value);
  };

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadModel(file);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/room.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>Avatar Edit</b>
        </h1>
        <Row>
          <div className="col-8">
            <SceneComponent antialias id="my-canvas" user={user} isEdit={false} avatar={avatar} />
          </div>
          <div className="col-4">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>아바타 업로드 하기</Form.Label>
              <Form.Control type="file" onChange={uploadHandler} />
              <br />
              <Form.Select aria-label="Gender select" onChange={handleGenderChange}>
                <option>아바타 성별</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <br />
              <Form.Control type="number" step="0.001" placeholder="모델의 스케일" aria-label="모델의 스케일" onChange={updateScaleHandler} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default AvatarEdit;
