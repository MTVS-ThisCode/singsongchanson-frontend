import Card from "react-bootstrap/Card";
import MusicPlayer from "../components/MusicPlayer";

const playMusicHandler = (e) => {
  console.log(e);
};

function MusicList({ musicList, setMusicList }) {
  return (
    <>
      {musicList.map((music) => (
        <div style={{ width: "180px", height: "180px", padding: "2px", margin: "10px", float: "left" }}>
          <Card className="bg-dark text-white" onClick={playMusicHandler} key={music.musicNo}>
            <Card.Img src={music.albumImgUrl} alt="Card image" style={{ backgroundColor: "black", opacity: "0.5" }} />
            <Card.ImgOverlay>
              <MusicPlayer rank={false} musicList={musicList} url={music.musicUrl} musicNo={music.musicNo} count={music.streamingCnt} setMusicList={setMusicList} />
              <Card.Title style={{ marginTop: 10 }}>{music.title}</Card.Title>
              <Card.Text>
                genre : <b>{music.genre}</b> <br />
                streaming : <b>{music.streamingCnt}</b>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </div>
      ))}
    </>
  );
}

export default MusicList;
