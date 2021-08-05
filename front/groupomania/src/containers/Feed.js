import "../styles/Feed.scss";
import React, { Fragment } from "react";
import PostSubmit from "./PostSubmit";
import PostsViewer from "./PostsViewer";

function Feed() {
  return (
    <main className="container">
        <Fragment>
          <PostSubmit />
          <PostsViewer />
        </Fragment>
    </main>
  );
}

export default Feed;
