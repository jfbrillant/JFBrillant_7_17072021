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
      alpha_num_dash_space: 'Le :attribute doit contenir uniquement des lettres, des chiffres et des espaces',
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
    <div className="container mb-5">
      <h1 className="mt-5 mb-5">Postez vos Gifs sur le feed</h1>
      <form>
        <div className="form-group col-md-6 mb-3">
          <label htmlFor="title" className="form-label">
            Titre
          </label>
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
          {validator.current.message('titre', postSubmitData.title, 'required|alpha_num_dash_space|between:2,60')}
        </div>
        <div className="form-group col-md-6 mb-3">
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
          className="btn btn-dark mt-3"
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
