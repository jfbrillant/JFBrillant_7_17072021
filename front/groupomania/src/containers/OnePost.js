import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import { apiGET } from "../actions/onePost";
import { apiPUT } from "../actions/postEdit";
import CommentSubmit from "./CommentSubmit";
import CommentsViewer from "./CommentsViewer";
import PostEdit from "./PostEdit";
import PostDelete from "./PostDelete";

function OnePost({ onePostData, getOnePostData, editPost }) {
  const id = useParams().id;
  useEffect(() => {
    getOnePostData(id);
  }, [getOnePostData, id]);

  const [isUpdated, setIsUpdated] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    title: "",
    attachment: "",
  });

  const displayOnePost = !onePostData.post ? (
    <p>Il n'y a aucun post... !</p>
  ) : onePostData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : onePostData.error ? (
    <p>{onePostData.error}</p>
  ) : (
    <div className="card bg-light bg-gradient mb-5">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          {!isUpdated ? (
            <h2 className="card-title">{onePostData.post.title}</h2>
          ) : (
            <div>
              <input
                type="text"
                className="form-control"
                placeholder={onePostData.post.title}
                value={postUpdate.title}
                onChange={(e) =>
                  setPostUpdate({
                    ...postUpdate,
                    title: e.target.value,
                  })
                }
                aria-describedby="post-title"
              />
              <input
                type="file"
                name="attachment"
                className="form-control"
                accept=".jpg,.gif"
                onChange={(e) =>
                  setPostUpdate({
                    ...postUpdate,
                    attachment: e.target.files[0],
                  })
                }
                aria-describedby="post-title"
              />
              <button
                type="submit"
                className="btn btn-dark"
                onClick={(e) => {
                  e.preventDefault();
                  editPost(onePostData.post.id, postUpdate);
                }}
              >
                Valider les modifications
              </button>
            </div>
          )}
        </div>
        <p className="card-text">
          <span className="h5">
            {onePostData.post.User.firstname} {onePostData.post.User.lastname}
          </span>{" "}
          {moment(onePostData.post.createdAt).fromNow()}
        </p>
        <div className="d-grid gap-2 d-flex justify-content-start">
          <PostEdit
            userId={onePostData.post.userId}
            postId={onePostData.post.id}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
          <PostDelete
            userId={onePostData.post.userId}
            postId={onePostData.post.id}
          />
        </div>
      </div>
      <img
        src={onePostData.post.attachment}
        className="card-img-top"
        alt="Img"
      />
      <div className="d-flex justify-content-between">
        <button className="btn btn-dark">
          <i className="fas fa-heart"></i> {onePostData.post.likes}
        </button>
        <button className="btn btn-dark">
          <i className="fas fa-comments"></i> {onePostData.post.comments}
        </button>
      </div>
    </div>
  );

  return (
    <main>
      <div className="container">
        {displayOnePost}
        <CommentSubmit id={id} />
        <CommentsViewer id={id} />
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    onePostData: state.getOnePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOnePostData: (id) => dispatch(apiGET(id)),
    editPost: (id, postUpdate) => dispatch(apiPUT(id, postUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePost);
