import React, { useState } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/postSubmit";

function PostForm(props) {
  const [postSubmitData, setPostSubmitData] = useState({
    title: "",
    attachment: "",
  });
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
        </div>
        <input
            type="file"
            name="attachment"
            className="form-control"
            id="post-file"
            accept=".jpg,.gif"
            onChange={(e) =>
              setPostSubmitData({ ...postSubmitData, attachment: e.target.files[0] })
            }
            aria-describedby="post-title"
          />
        <button
          type="submit"
          className="btn btn-dark mt-3"
          onClick={(e) => {
            e.preventDefault();
            props.SubmitPostData(postSubmitData);
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
    postSubmitData: state.submitPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitPostData: (postSubmitData) => dispatch(apiPOST(postSubmitData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
