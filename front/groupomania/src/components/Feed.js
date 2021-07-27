import "../styles/Feed.scss"
import React from "react";
import PostSubmit from "../containers/PostSubmit"
import PostsViewer from "../containers/PostsViewer";

export default function Feed() {
  return (
    <main className="container">
      <PostSubmit />
      <PostsViewer />
    </main>
  );
}
