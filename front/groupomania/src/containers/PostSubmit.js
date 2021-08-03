import "../styles/PostSubmit.scss";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/postSubmit";
import SimpleReactValidator from 'simple-react-validator';

function PostForm(props) {

  const [postSubmitData, setPostSubmitData] = useState({
    title: "",
    attachment: "",
  });

  const [, forceUpdate] = useState()
  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      between: 'Le titre doit contenir entre :min et :max carractères'
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      props.SubmitPostData(postSubmitData);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1)
    }
  }

  return (
    <div className="mb-5">
      <h1 className="mt-3 mb-5">Postez vos Gifs sur le feed</h1>
      <form className="p-3 bg-dark">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            id="post-title"
            placeholder="titre"
            value={postSubmitData.title}
            onChange={(e) =>
              setPostSubmitData({ ...postSubmitData, title: e.target.value })
            }
            aria-describedby="post-title"
          />
          {validator.current.message('titre', postSubmitData.title, 'required|between:2,60')}
        </div>
        <div className="form-group mb-3">
          <input
            type="file"
            name="attachment"
            className="form-control"
            id="post-file"
            accept=".jpg,.gif"
            onChange={(e) =>
              setPostSubmitData({
                ...postSubmitData,
                attachment: e.target.files[0],
              })
            }
            aria-describedby="post-title"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
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
    postSubmitData: state.submitPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitPostData: (postSubmitData) => dispatch(apiPOST(postSubmitData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
