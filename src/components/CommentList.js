import { Stack, Image, Form, Button } from "react-bootstrap";
import commentStyle from "./Comment.module.css";
import { useRef, useState, useEffect } from "react";

function CommentList({ user, commentList }) {
  const comment = useRef(null);

  const postComment = () => {
    console.log(comment.current.value);
    comment.current.value = "";
  };

  return (
    <>
      <b>댓글 {commentList.length}개</b>

      {user ? (
        <div className={commentStyle.postComment}>
          <Stack direction="horizontal" gap={3}>
            <Image className={commentStyle.profileImage} src={user.profileImg} alt="profileImage"></Image>
            <Form.Control className="me-auto" placeholder="댓글 쓰기..." ref={comment} />
            <div className="vr" />
            <Button variant="secondary" onClick={postComment}>
              Submit
            </Button>
          </Stack>
        </div>
      ) : (
        <div></div>
      )}

      <Stack gap={commentList.length} className={commentStyle.commentList}>
        {commentList.map((comment) => (
          <Stack direction="horizontal" gap={3} key={commentList.indexOf(comment)}>
            <Image className={commentStyle.profileImage} src={comment.user.profileImg} alt="profileImage"></Image>
            <h6>
              <b>@{comment.user.nickname}</b>
            </h6>
            <div className="vr" />

            <div className={commentStyle.commentBody}>{comment.body}</div>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export default CommentList;
