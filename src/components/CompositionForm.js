import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import style from "./Composition.module.css";

import { useState } from "react";

function CompositionForm() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [length, setLength] = useState(null);

  const handleKeyChange = (e) => {
    console.log(e.target.value);
    setKey(e.target.value);
  };
  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };
  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  function submitHandler() {
    console.log({ key, speed, length });
  }

  return (
    <Row className="xs-8">
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

      <Form.Group className="mb-3" controlId="formContent" style={{ marginTop: "30px" }}>
        <Form.Label>내용 : </Form.Label>
        <Form.Control as="textarea" rows={5} />
      </Form.Group>

      <div style={{ textAlign: "center" }}>
        <Button variant="primary" type="submit" className={style.btnSubmit} onClick={submitHandler}>
          INPUT
        </Button>
      </div>
    </Row>
  );
}

export default CompositionForm;
