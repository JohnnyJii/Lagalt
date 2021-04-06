import React, { Component } from 'react';
import Axios from 'axios';

class CreateNewProject extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      industry: '',
      gitlink: '',
      description: '',
      skills: [],
      user: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    data = JSON.stringify(data);
    data = JSON.parse(data);

    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };

    Axios.post('https://lagalt-server.herokuapp.com/api/v1/projects', data, config);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="id">Project ID</label>
        <input id="id" name="id" type="text"></input>
        <br />

        <label htmlFor="title">Project Title</label>
        <input id="title" name="title" type="text"></input>
        <br />

        <label htmlFor="industry">Industry</label>
        <input id="industry" name="industry" type="text"></input>
        <br />

        <label htmlFor="gitlink">Github Link</label>
        <input id="gitlink" name="gitlink" type="text"></input>
        <br />

        <label htmlFor="description">Description</label>
        <input id="description" name="description" type="text"></input>
        <br />

        <button>Create</button>
      </form>
    );
  }
}

export default CreateNewProject;