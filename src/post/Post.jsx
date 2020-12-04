import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { db } from "../firebase";
import firebase from "firebase";

function Post({ username, id, caption, imageUrl, photoURL, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // function to fetch comments
  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [id]);

  // function to add comment
  const addComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      username: user,
      comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar src={photoURL} />
        <p>{username}</p>
      </div>
      <div className="post-body">
        {imageUrl && <img src={imageUrl} alt={caption} />}
        <p>{caption}</p>
      </div>

      {/* displaying comments */}
      <div className="comments">
        {comments.map((comment) => (
          <p>
            <span>{comment.username}</span> {comment.comment}
          </p>
        ))}
      </div>

      {/* Like and comment box */}
      {photoURL && (
        <>
          <div className="post-bottom">
            <div className="comment-box">
              <form onSubmit={addComment}>
                <input
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  type="text"
                  placeholder="add a comment..."
                />
                <Button type="submit" disabled={!comment}>
                  POST
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
