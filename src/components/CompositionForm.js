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
  const [scale, setScale] = useState(null);
  const [genre, setGenre] = useState(null);
  const [length, setLength] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [title, setTitle] = useState(null);
  const [instrumentList, setInstrumentList] = useState([]);

  const handleScaleChange = (e) => {
    setScale(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value));
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInstrumentChange = (e) => {
    const style = e.target.value;
    const array = [...instrumentList];
    const index = array.findIndex((el) => el === style);
    if (index === -1) {
      setInstrumentList([...array, style]);
    } else {
      array.splice(index, 1);
      setInstrumentList([...array]);
    }
  };

  const submitHandler = async () => {
    setPost(true);
    const formData = new FormData();

    formData.append("keyword", prompt);
    formData.append("duration", length);
    formData.append("scale", scale);
    formData.append("instrument", instrumentList);
    formData.append("genre", genre);
    formData.append("title", title);

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

    formData.append("imageFile", image);
    formData.append("title", title);

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
    <Row>
      <Form.Group className="mb-3" controlId="formContent" style={{ marginTop: "30px" }} onChange={handleTitleChange}>
        <Form.Label>
          <b>TITLE</b>
        </Form.Label>
        <Form.Control as="input" rows={2} />
      </Form.Group>
      <div className="col-6">
        <Form.Label>
          <b>TEXT</b>
        </Form.Label>
        <div style={{ backgroundColor: "#F5F5F5", height: 400 }}>
          <Form.Group>
            <Form.Label>
              <b>Instrument</b>
            </Form.Label>
            {["checkbox"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                {["Piano", "Guitar", "Bass guitar", "Drums", "Violin", "Synthesizer"].map((style) => (
                  <Form.Check inline label={style} name="style" type={type} id={`inline-${type}-1`} value={style} onChange={handleInstrumentChange} />
                ))}
              </div>
            ))}
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formGridKey">
                  <Form.Label>조성</Form.Label>
                  <Form.Select defaultValue="Auto" onChange={handleScaleChange} value={scale}>
                    {["Scale", "C Major", "G Major", "A Minor", "E Minor", "D Major", "A Major", "E Major"].map((key) => (
                      <option value={key} key={key}>
                        {key}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGridSpeed">
                  <Form.Label>장르</Form.Label>
                  <Form.Select defaultValue="Slow" onChange={handleGenreChange} value={genre}>
                    {["Genre", "Pop", "Rock", "Jazz", "Classical", "Country", "Electronic", "BGM", "Reggae"].map((genre) => (
                      <option value={genre} key={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGridLength">
                  <Form.Label>길이(초)</Form.Label>
                  <Form.Select defaultValue="Auto" onChange={handleLengthChange} value={length}>
                    {["Duration", "15", "30", "60", "90", "120", "180"].map((duration) => (
                      <option value={duration} key={duration}>
                        {duration}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContent" style={{ marginTop: "30px" }} onChange={handlePromptChange}>
            <Form.Label>내용 : </Form.Label>
            <Form.Control as="textarea" rows={2} />
          </Form.Group>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit" className={style.btnSubmit} onClick={submitHandler}>
            INPUT
          </Button>
        </div>
      </div>
      <div className="col-6">
        <Form.Label>
          <b>PHOTO</b>
        </Form.Label>
        <div style={{ textAlign: "center" }}>
          <ImageUpload setImage={setImage}></ImageUpload>
          <div style={{ textAlign: "center" }}>
            <Button variant="primary" type="submit" className={style.btnSubmit} onClick={submitImageHandler}>
              INPUT
            </Button>
          </div>
        </div>
      </div>
    </Row>
  );
}

export default CompositionForm;
