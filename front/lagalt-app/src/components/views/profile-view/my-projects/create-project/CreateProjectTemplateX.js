import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SUGGESTIONS } from './ProjectTagSuccestions';
import { WithContext as Tags } from 'react-tag-input';

const suggestions = SUGGESTIONS.map((language) => {
  return {
    id: language,
    text: language
  };
});

// const KeyCodes = {
//   comma: 188,
//   enter: 13,
// };

// const delimeters = [KeyCodes.comma, KeyCodes.enter];

class CreateProjectTemplateX extends Component {
  constructor(props) {
    super(props);
    this.addProject = this.props.addProject;
    this.dbuserid = props.dbuserid;
    this.state = {
      title: '',
      industry: '',
      description: '',
      progress: '',
      skills: [],
      tags: [],
      suggestions: suggestions,
      gitlink: '',
      user: {
        id: this.dbuserid
      }
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({ tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  handleTagClick(index) {
    console.log(index);
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();

  const form = this.state;
  this.addProject(form);
    }

    render() {
      const { title, description, gitlink, tags, suggestions } = this.state;
      return (
        <div>
          <Form onSubmit={this.submitHandler}>
            <Form.Label>Project Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="Project title" value={title} onChange={this.changeHandler} />
            <br />
            <Form.Label>Industry</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3" onChange={this.changeHandler}>

                <Form.Check
                  inline name="industry"
                  label="Game Development"
                  type={type}
                  value={'Game Development'}
                  id={`inline-${type}-1`}
                />

                <Form.Check
                  inline name="industry"
                  label="Film"
                  type={type}
                  value={'Film'}
                  id={`inline-${type}-2`}
                />

                <Form.Check
                  inline name="industry"
                  label="Music"
                  type={type}
                  value={'Music'}
                  id={`inline-${type}-3`}
                />

                <Form.Check
                  inline name="industry"
                  label="Web Development"
                  type={type}
                  value={'Web Development'}
                  id={`inline-${type}-4`}
                />
              </div>
            ))
            }
            <Form.Label>Progress</Form.Label>
            {
              ['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3" onChange={this.changeHandler}>

                  <Form.Check
                    inline name="progress"
                    label="Founding"
                    type={type}
                    value={'Founding'}
                    id={`inline-${type}-5`}
                  />

                  <Form.Check
                    inline name="progress"
                    label="In Progress"
                    type={type}
                    value={'In Progress'}
                    id={`inline-${type}-6`}
                  />

                  <Form.Check
                    inline name="progress"
                    label="Stalled"
                    type={type}
                    value={'Stalled'}
                    id={`inline-${type}-7`}
                  />

                  <Form.Check
                    inline name="progress"
                    label="Completed"
                    type={type}
                    value={'Completed'}
                    id={`inline-${type}-8`}
                  />

                </div>
              ))
            }
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Project Description</Form.Label>
              <Form.Control name="description" as="textarea" rows={3} value={description} onChange={this.changeHandler} />
            </Form.Group>
            <Tags
              tags={tags}
              suggestions={suggestions}
              // delimiters={delimiters}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              handleTagClick={this.handleTagClick}
            />
            <br />
            <Form.Label>Git Link</Form.Label>
            <Form.Control name="gitlink" type="text" placeholder="Github repo link" value={gitlink} onChange={this.changeHandler} />
            <br />
            <Button variant="primary" type="submit">Create</Button>
          </Form >
        </div >
      );
    }
}

export default CreateProjectTemplateX;