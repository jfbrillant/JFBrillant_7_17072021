import React, { useState } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/commentSubmit";

function CommentSubmit(props) {
  const [commentSubmitData, setCommentSubmitData] = useState({
    postId: props.id,
    content: ""
  });
  return (
    <div className="container">
      <form>
        <div className="form-group col-md-6 mb-3">
          <label htmlFor="title" className="form-label">
          Postez un commentaire !
          </label>
          <input
            type="text"
            className="form-control"
            id="comment"
            placeholder="commentaire"
            value={commentSubmitData.comment}
            onChange={(e) =>
                setCommentSubmitData({ ...commentSubmitData, content: e.target.value })
            }
            aria-describedby="comment"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            props.SubmitCommentData(commentSubmitData, props.id);
          }}
        >
          Poster
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postSubmitData: state.submitComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitCommentData: (commentSubmitData, id) => dispatch(apiPOST(commentSubmitData, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSubmit);
