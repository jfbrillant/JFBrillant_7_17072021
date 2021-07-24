import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom"
import moment from 'moment';
import 'moment/locale/fr'
import { apiGET } from "../actions/onePost";
import CommentSubmit from "./CommentSubmit";
import CommentsViewer from "./CommentsViewer";
import PostDelete from "./PostDelete";

function OnePost({ onePostData, getOnePostData }) {
  const id = useParams().id;
    useEffect(() => {
      getOnePostData(id);
      }, [getOnePostData, id]);
    
      const displayOnePost = !onePostData.post ? (
        <p>Il n'y a aucun post... !</p>
      ) : onePostData.isLoading ? (
        <p>Chargement en cours...</p>
      ) : onePostData.error ? (
        <p>{onePostData.error}</p>
      ) : (
            <div key={onePostData.post.id} className="mb-5">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h2 className="card-title">{onePostData.post.title}</h2>
                    <PostDelete userId={onePostData.post.userId} postId={onePostData.post.id}/>
                  </div>
                  <p className="card-text">
                    Posté par{" "}
                    <span className="h5">
                      {onePostData.post.User.firstname} {onePostData.post.User.lastname}
                    </span>{" "}
                    {moment(onePostData.post.createdAt).fromNow()}
                  </p>
                </div>
                <img src={onePostData.post.attachment} className="card-img-top" alt="Img" />
              </div>
            </div>
          );

      return <div className="container">
        {displayOnePost}
        <CommentSubmit id={id} />
        <CommentsViewer id={id} />
      </div>;
    }
    
    const mapStateToProps = (state) => {
      return {
        onePostData: state.getOnePost,
      };
    };
    
    const mapDispatchToProps = (dispatch) => {
      return {
        getOnePostData: (id) => dispatch(apiGET(id)),
      };
    };

export default connect(mapStateToProps, mapDispatchToProps)(OnePost);