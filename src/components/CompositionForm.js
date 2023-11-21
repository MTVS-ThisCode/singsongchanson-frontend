import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import style from "./Composition.module.css";
import ImageUpload from "./ImageUpload";

import { useState } from "react";

import { postSongprompt, postImage } from "../apis/song";

function CompositionForm({ setPost, setResults }) {
  const [image, setImage] = useState(null);
  const [key, setKey] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [length, setLength] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [styleList, setStyleList] = useState([]);

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };
  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };
  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleStyleChange = (e) => {
    const style = e.target.value;
    const array = [...styleList];
    const index = array.findIndex((el) => el === style);
    if (index === -1) {
      setStyleList([...array, style]);
    } else {
      array.splice(index, 1);
      setStyleList([...array]);
    }
  };

  const submitHandler = async () => {
    setPost(true);
    const formData = new FormData();

    formData.append("keyword", prompt);
    formData.append("style", styleList);

    const data = Object.fromEntries(formData);
    console.log("data", data);
    await postSongprompt(data).then((result) => {
      console.log(result.data);
      console.log(data);
      setResults(result);
      // if (result.status === 200) {
      //   const data = result.data.data;
      //   console.log(data);
      //   setResults(data);
      // } else {
      //   setResults(result);
      // }
    });
  };

  const submitImageHandler = async () => {
    setPost(true);
    const formData = new FormData();

    formData.append("image", image);

    const data = Object.fromEntries(formData);
    console.log("data", data);
    await postImage(data).then((result) => {
      console.log(result.data);
      console.log(data);
      setResults(result);
      // if (result.status === 200) {
      //   const data = result.data.data;
      //   console.log(data);
      //   setResults(data);
      // } else {
      //   setResults(result);
      // }
    });
  };

  return (
    <div>
      <Form.Label>
        <b>TEXT</b>
      </Form.Label>
      <Row className="xs-8" style={{ backgroundColor: "#F5F5F5" }}>
        <Form.Group>
          <Form.Label>
            <b>Style</b>
          </Form.Label>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              {["Calm", "Dramatic", "Energizing", "Suspenseful", "Unusual", "Acoustic", "Jazz", "Hip-Hop", "Pop", "R&B", "Piano", "Guitar", "Strings", "Drums", "Synthesizer"].map((style) => (
                <Form.Check inline label={style} name="style" type={type} id={`inline-${type}-1`} value={style} onChange={handleStyleChange} />
              ))}
            </div>
          ))}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridKey">
          <Form.Label>조성</Form.Label>
          <Form.Select defaultValue="Auto" onChange={handleKeyChange}>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Auto">Auto</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSpeed">
          <Form.Label>빠르기</Form.Label>
          <Form.Select defaultValue="Slow" onChange={handleSpeedChange}>
            <option value="Slow">Slow</option>
            <option value="Medium">Medium</option>
            <option value="Fast">Fast</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLength">
          <Form.Label>길이</Form.Label>
          <Form.Select defaultValue="Auto" onChange={handleLengthChange}>
            <option value="Auto">Auto</option>
            <option value="< 0'30"> {"<"} 0'30 </option>
            <option value="0'30 - 1'00"> 0'30 - 1'00 </option>
            <option value="0'30 - 1'00"> 1'00 - 1'30 </option>
            <option value="1'30 - 2'00"> 1'30 - 2'00 </option>
            <option value="2'00 - 2'30"> 2'00 - 2'30 </option>
            <option value="2'30 - 3'00"> 2'30 - 3'00 </option>
            <option value="3'00 - 3'30"> 3'00 - 3'30 </option>
            <option value="3'30 - 4'00"> 3'30 - 4'00 </option>
            <option value="4'00 - 4'30"> 4'00 - 4'30 </option>
            <option value="4'30 - 5'00"> 4'30 - 5'00 </option>
            <option value="5'00 - 5'30"> 5'00 - 5'30 </option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent" style={{ marginTop: "30px" }} onChange={handlePromptChange}>
          <Form.Label>내용 : </Form.Label>
          <Form.Control as="textarea" rows={2} />
        </Form.Group>

        <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit" className={style.btnSubmit} onClick={submitHandler}>
            INPUT
          </Button>
        </div>
      </Row>
      <Form.Label>
        <b>PHOTO</b>
      </Form.Label>
      <Row>
        <ImageUpload setImage={setImage}></ImageUpload>
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit" className={style.btnSubmit} onClick={submitImageHandler}>
            INPUT
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default CompositionForm;
