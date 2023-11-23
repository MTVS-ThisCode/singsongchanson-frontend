import { Stack, Image, Form, Button } from "react-bootstrap";
import commentStyle from "./Comment.module.css";
import { useRef, useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { postComment, deleteComment, getComment } from "../apis/comment";
import Dropdown from "react-bootstrap/Dropdown";

function CommentList({ user, roomId }) {
  const [comment, setComment] = useState(null);
  const commentBody = useRef(null);
  const [commentList, setCommentList] = useState([]);
  const [updated, setUpdated] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    commentBody.current.value = e.target.value;
  };

  const postCommentHandler = async (e) => {
    const body = {
      content: comment,
      roomId: roomId,
    };
    await postComment(body).then((result) => {
      setComment(null);
      setUpdated(!updated);
      commentBody.current.value = null;
    });
  };

  const deleteCommentHandler = async (e) => {
    const commentNo = e.target.id;
    await deleteComment(commentNo).then((result) => {
      setComment(null);
      setUpdated(!updated);
    });
  };

  useEffect(() => {
    async function getCommentList() {
      await getComment(roomId).then((result) => {
        setCommentList(result.data.data);
      });
    }

    getCommentList();
  }, [updated]);

  return (
    <>
      <b>댓글 {commentList.length}개</b>

      {user ? (
        <div className={commentStyle.postComment}>
          <Stack direction="horizontal" gap={3}>
            <Image className={commentStyle.profileImage} src={user.profileImg} alt="profileImage"></Image>
            <Form.Control className="me-auto" placeholder="댓글 쓰기..." onChange={handleCommentChange} ref={commentBody} />
            <div className="vr" />
            <Button variant="secondary" onClick={postCommentHandler}>
              Submit
            </Button>
          </Stack>
        </div>
      ) : (
        <div></div>
      )}

      <Stack gap={commentList.length} className={commentStyle.commentList}>
        {commentList.length > 0
          ? commentList.map((comment) => (
              <Stack direction="horizontal" gap={3} key={comment.commentNo}>
                <Image className={commentStyle.profileImage} src={comment.userVO.profileImg} alt="profileImage"></Image>
                <h6>
                  <b>@{comment.userVO.nickName}</b>
                </h6>
                <div className="vr" />

                <div className="me-auto">{comment.content}</div>
                <Dropdown className="d-inline mx-2" variant="outline-secondary">
                  <Dropdown.Toggle id="dropdown-autoclose-true" variant="outline-secondary">
                    <CiMenuBurger />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item id={comment.commentNo} onClick={deleteCommentHandler}>
                      삭제
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Stack>
            ))
          : null}
      </Stack>
    </>
  );
}

export default CommentList;
