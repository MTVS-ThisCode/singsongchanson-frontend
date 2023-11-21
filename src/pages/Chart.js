import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

function Chart({ authenticated, user, logout }) {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>Singsong Chart</h1>
        <Row>
          <div className="col-8" style={{ textAlign: "center" }}>
            <Tabs defaultActiveKey="daily" id="justify-tab-example" className="mb-3" justify>
              <Tab eventKey="daily" title="일간차트">
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
                      <th>좋아요</th>
                      <th>듣기</th>
                      <th>다운</th>
                      <th>싱송룸 방문</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td colSpan={7}>
                        <Image src="/img/3rdPrototype.jpeg" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                        <b>Table cell</b>
                      </td>
                      <td>
                        <Image src="/img/liked.png" style={{ width: "20px", height: "20px" }} />
                      </td>
                      <td>
                        <Image src="/img/play.png" style={{ width: "20px", height: "20px" }} />
                      </td>
                      <td>
                        <Image src="/img/download.png" style={{ width: "20px", height: "20px" }} />
                      </td>
                      <td>
                        <Image src="/img/room.png" style={{ width: "20px", height: "20px" }} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="liked" title="좋아요한 음악">
                Tab content for Profile
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
