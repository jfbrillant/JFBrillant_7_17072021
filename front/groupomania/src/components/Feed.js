import React from "react";
import PostForm from "../containers/PostSubmit"
import PostsViewer from "../containers/PostsViewer";

export default function Feed() {
  return (
    <main>
      <PostForm />
      <PostsViewer />
    </main>
  );
}
