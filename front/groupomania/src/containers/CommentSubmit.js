import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/commentSubmit";
import SimpleReactValidator from 'simple-react-validator';

function CommentSubmit(props) {

  const [, forceUpdate] = useState()
  
  const [commentSubmitData, setCommentSubmitData] = useState({
    postId: props.id,
    content: "",
  });

  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      alpha_num_dash_space: 'Le :attribute doit contenir uniquement des lettres, des chiffres et des espaces',
      between: 'Le titre doit contenir entre :min et :max carractères'
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      props.SubmitCommentData(commentSubmitData, props.id);
      setCommentSubmitData({
        ...commentSubmitData,
        content: "",
      });
      validator.current.showMessages(false);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1)
    }
  }

  return (
    <div className="container">
      <form>
        <div className="form-group col mb-3">
          <label htmlFor="title" className="form-label">
            Postez un commentaire !
          </label>
          <textarea
            className="form-control"
            id="comment"
            placeholder="commentaire"
            value={commentSubmitData.content}
            onChange={(e) =>
              setCommentSubmitData({
                ...commentSubmitData,
                content: e.target.value,
              })
            }
            aria-describedby="comment"
          />
          {validator.current.message('commentaire', commentSubmitData.content, 'required|alpha_num_dash_space|between:2,500')}
        </div>
        <button
          type="submit"
          className="btn btn-dark mb-3"
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          Poster
        </button>
      </form>
      <div className="text-danger mt-2">{props.postSubmitData.error}</div>
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
    SubmitCommentData: (commentSubmitData, id) =>
      dispatch(apiPOST(commentSubmitData, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSubmit);
