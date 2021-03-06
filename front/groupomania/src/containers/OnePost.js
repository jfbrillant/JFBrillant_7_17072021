import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import CommentSubmit from "./CommentSubmit";
import CommentsViewer from "./CommentsViewer";
import OnePostViewer from "./OnePostViewer";

function OnePost() {
  const id = useParams().id;

  return (
    <main className="container">
        <Fragment>
          <OnePostViewer id={id} />
          <CommentSubmit id={id} />
          <CommentsViewer id={id} />
        </Fragment>
    </main>
  );
}

export default OnePost;
