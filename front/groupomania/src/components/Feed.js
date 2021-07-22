import React from "react";
import PostForm from "../containers/PostSubmit"
import PostsViewer from "../containers/PostsViewer";

export default function Feed() {
  console.log(localStorage.getItem("userData"))
  return (
    <main>
      <PostForm />
      <PostsViewer />
    </main>
  );
}
