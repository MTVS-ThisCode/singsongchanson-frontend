import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";

const ImageUpload = ({ setImage }) => {
  function getImageFileObject(imageFile) {
    setImage(imageFile.file);
  }

  function runAfterImageDelete(file) {
    console.log({ file });
  }

  return <ImageUploader style={{ height: 400, width: 400 }} onFileAdded={(img) => getImageFileObject(img)} onFileRemoved={(img) => runAfterImageDelete(img)} />;
};

export default ImageUpload;
