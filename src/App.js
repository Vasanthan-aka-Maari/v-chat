import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./header/Header";
import Post from "./post/Post";
import PostMaker from "./postMaker/PostMaker";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  //  function to fetch posts from firebase
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="app">
      <Header user={user} setUser={setUser} />
      <div className="body-container">
        {user && <PostMaker user={user} />}
        {posts.map((post) => (
          <Post
            photoURL={user?.photoURL}
            key={post.id}
            id={post.id}
            username={post.data.username}
            caption={post.data.caption}
            imageUrl={post.data.imageUrl}
            user={user?.displayName}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
