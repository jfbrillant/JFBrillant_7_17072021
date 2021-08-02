import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { apiGET } from "../actions/likesViewer";
import { apiPOST } from "../actions/likeCreate";
import { apiDELETE } from "../actions/likeDelete";
import LikeCount from "./LikeCount";

function LikeButton({
  post,
  getLikes,
  postLikesData,
  createLike,
  deleteLike,
  createLikeState,
  deleteLikeState,
}) {
  const activeUserId = JSON.parse(localStorage.getItem("userData")).userId;

  const postId = {
    postId: post.id,
  };

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    getLikes(post.id)
  }, [getLikes, post.id])

  useEffect(() => {
    const postLikes = postLikesData.find(
      // eslint-disable-next-line
      (postLike) => postLike.postId == post.id
    );
    if (postLikes) {
      setLikesCount(postLikes.count);
      const userHasLiked = postLikes.rows.find(
        // eslint-disable-next-line
        (like) => like.userId == activeUserId
      );
      if (userHasLiked) {
        document
          .getElementById(`likeButton${post.id}`)
          .classList.add("text-primary");
        setIsLiked(true);
      } else {
        document
          .getElementById(`likeButton${post.id}`)
          .classList.remove("text-primary");
        setIsLiked(false);
      }
    } else return false;
  }, [postLikesData, activeUserId, post.id]);

  const handleLike = () => {
    if (isLiked) {
      deleteLike(post.id);
      setIsLiked(false);
      setLikesCount(likesCount - 1)
    } else {
      createLike(postId);
      setIsLiked(true);
      setLikesCount(likesCount + 1)
    }
  };

  return (
    <button
      id={"likeButton" + post.id}
      className="btn btn-dark"
      onClick={(e) => {
        e.preventDefault();
        handleLike();
      }}
    >
      <i className="fas fa-heart"></i> {likesCount ? likesCount : "0"}
    </button>
  );
}

const mapStateToProps = (state) => {
  return {
    createLikeState: state.createLike,
    deleteLikeState: state.deleteLike,
    postLikesData: state.getLikes.likes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLikes: (postId) => dispatch(apiGET(postId)),
    createLike: (postId) => dispatch(apiPOST(postId)),
    deleteLike: (postId) => dispatch(apiDELETE(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
