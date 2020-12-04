import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import "./PostMaker.css";
import firebase from "firebase";
import { db, storage } from "../firebase";
import ImageIcon from "@material-ui/icons/Image";

function PostMaker({ user }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);

  // function to setImage
  const changeHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // function to upload image to firebase
  const handleSubmit = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        // progress function
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        // error function
        (err) => {
          alert(err.message);
          console.log(err);
        },
        // complete function
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                imageUrl: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
                caption: caption,
              });
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    } else {
      db.collection("posts").add({
        username: user.displayName,
        caption,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setProgress(0);
      setCaption("");
      setImage(null);
    }
  };

  return (
    <div className="postMaker">
      <div className="postMaker-head">
        <Avatar src={user.photoURL} />
        <form>
          <div className="form-head">
            <input
              className="text-input"
              type="text"
              placeholder="Tell People Something..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input
              onChange={changeHandler}
              className="image-input"
              type="file"
              accept="image/*"
              hidden
              id="file-input"
            />
            <label htmlFor="file-input">
              <ImageIcon />
            </label>
          </div>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!caption}
          >
            UPLOAD
          </Button>
        </form>
      </div>
      <div className="postMaker-bottom">
        <progress
          style={{ width: 500 }}
          className="progress-bar"
          value={progress}
          max="100"
        />
      </div>
    </div>
  );
}

export default PostMaker;
