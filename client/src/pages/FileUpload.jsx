import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005/api/auth/uploadFile'
});

const sendFileToBackend = (file, userId) => {
  const formBody = new window.FormData();
  formBody.append('image', file);

  const id = userId;

  return api
    .post(`/${id}`, formBody)
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
};

export default class FileUpload extends Component {
  state = {
    user: this.props.user,
    uploadedImage: null,
    imageFromBackend: null
  };

  handleFormSubmission = event => {
    event.preventDefault();
    const image = this.state.uploadedImage;

    sendFileToBackend(image, this.state.user._id)
      .then(response => {
        console.log(response);
        this.setState({
          imageFromBackend: response.imagePath
        });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const uploadedImage = event.target.files[0];

    this.setState({
      uploadedImage
    });
  };

  render() {
    console.log(this.state.user);
    return (
      <div>
        <h1>Testing Cloudinary Upload</h1>
        <form onSubmit={this.handleFormSubmission}>
          <input type="file" name="userImage" onChange={this.handleInputChange} />
          <button type="submit">Upload Image</button>
        </form>
        {this.state.imageFromBackend && (
          <div>
            <h1>Uploaded Users Profile Pic</h1>
            <img width="300" src={this.state.imageFromBackend} alt="" />
          </div>
        )}
        <div>
          <h1>Current Users Profile Pic</h1>
          <img width="300" src={this.state.user.profilePic} alt="" />
        </div>
      </div>
    );
  }
}
