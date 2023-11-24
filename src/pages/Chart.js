import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import MusicPlayer from "../components/MusicPlayer";
import { getRanking } from "../apis/song";
import { useEffect, useState } from "react";
import axios from "axios";

function Chart({ authenticated, user, logout }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function getMusicRank() {
      getRanking().then((result) => {
        const data = result.data.data;
        console.log(data);
        setRanking(data);
      });
    }
    getMusicRank();
  }, []);

  const downloadFile = (srcUrl) => {
    axios({
      url: srcUrl, //your url
      method: "GET",
      responseType: "blob", // important
    })
      .then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "file.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>Singsong Chart</h1>
        <Row>
          <div className="col-8" style={{ textAlign: "center" }}>
            <Tabs defaultActiveKey="daily" id="justify-tab-example" className="mb-3" justify>
              <Tab eventKey="daily" title="전체 차트">
                <h5>
                  <b>{new Date().toLocaleDateString()}</b>
                </h5>
                <Table stripe="columns" bordered={false} style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>제목</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>누적 청취 수</th>
                      <th>듣기</th>
                      <th>다운</th>
                      <th>싱송룸 방문</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((music) => (
                      <>
                        <tr>
                          <td>{ranking.indexOf(music) + 1}</td>
                          <td colSpan={7}>
                            <Image src={music.albumImgUrl} style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                            <b>{music.title} </b>
                          </td>
                          <td>{music.streamingCnt}</td>
                          <td>
                            <MusicPlayer rank={true} musicList={ranking} url={music.musicUrl} musicNo={music.musicNo} count={music.streamingCnt} setMusicList={setRanking} />
                          </td>
                          <td>
                            <a href={music.musicUrl} download={music.musicUrl} style={{ width: "20px", height: "20px" }}>
                              <Image src="/img/download.png" />
                            </a>
                          </td>
                          <td>
                            <Link to={`/room/${music.roomId}`} style={{ textDecoration: "none", color: "black" }}>
                              <Image src="/img/room.png" style={{ width: "20px", height: "20px" }} />
                            </Link>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default Chart;
