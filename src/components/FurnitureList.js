import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

import furnitureList from "./FurnitureList.module.css";
import { Button } from "react-bootstrap";

function FurnitureList({ allModels, setModels, models }) {
  const clickHandler = (model, e) => {
    setModels([...models, model]);
    const localStorageModels = localStorage.getItem("room");
    localStorage.setItem("room", JSON.stringify([...JSON.parse(localStorageModels), model]));
  };

  const removeHandler = (model, e) => {
    const array = [...models];
    const index = array.findIndex((el) => el.name === model.name);
    if (index !== -1) {
      array.splice(index, 1);
      setModels([...array]);
      localStorage.setItem("room", JSON.stringify([...array]));
    }
  };

  return (
    <div>
      <h5>All Furnitures</h5>
      <div className={furnitureList.modelListContainer}>
        <ListGroup as={"ul"}>
          {allModels.map((model) => (
            <ListGroup.Item as={"li"} key={allModels.indexOf(model)} action style={{ textAlign: "center" }}>
              <Image src={model.thumbnail} rounded style={{ height: "100px", width: "100px" }} />
              <h6>{model.name.split(".")[0]}</h6>
              <p>Documentation and examples for opting images into responsive behavior (so they never become wider than their parent) and add lightweight styles to them—all via classes.</p>
              <div>
                {models.filter((m) => m.name === model.name)[0] ? (
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      removeHandler(model, e);
                    }}
                  >
                    삭제
                  </Button>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={(e) => {
                      clickHandler(model, e);
                    }}
                  >
                    추가
                  </Button>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default FurnitureList;
