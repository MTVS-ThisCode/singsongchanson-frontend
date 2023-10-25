import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { FileUploader } from "react-drag-drop-files";

function CreateAlbum({ setFile }) {
  const handleChange = (file) => {
    setFile(file);
  };

  const fileTypes = ["MP3", "WAV"];

  return (
    <Row className="xs-8">
      <div style={{ textAlign: "center" }}>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      </div>
    </Row>
  );
}

export default CreateAlbum;
