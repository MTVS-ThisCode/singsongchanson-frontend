import { useState } from "react";
import Row from "react-bootstrap/Row";
import { Image, Spinner, Card } from "react-bootstrap";
import MusicPlayer from "../components/MusicPlayer";

function CompositionResult({ results }) {
  console.log("CompositionResult : ", results);

  return (
    <Row className="xs-8">
      {results === null ? (
        <div style={{ marginTop: "200px", marginLeft: "250px", textAlign: "center" }}>
          <Spinner animation="border" variant="secondary" />
          <h3>AI가 노래를 작곡 중입니다...</h3>
        </div>
      ) : (
        <div>
          {results.status === 200 ? (
            <div>
              <div style={{ width: "500px", height: "500px", padding: "2px", margin: "10px", float: "left" }}>
                <Card className="bg-dark text-white">
                  <Card.Img src={results.data.data.albumImgUrl} alt="Card image" style={{ backgroundColor: "black", opacity: "0.5" }} />
                  <Card.ImgOverlay>
                    <Card.Title>{results.data.data.title}</Card.Title>
                    <Card.Text>{results.data.data.genre}</Card.Text>
                    <MusicPlayer url={results.data.data.musicUrl} />
                  </Card.ImgOverlay>
                </Card>
              </div>
            </div>
          ) : (
            <h1>Error : {results.data.message}</h1>
          )}
        </div>
      )}
    </Row>
  );
}

export default CompositionResult;
