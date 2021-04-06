import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

class ChangeInfoTemplateX extends Component {
    constructor(props) {
        super(props);
        this.setLoad = this.props.setload;
        this.dbuser = this.props.dbuser;
        this.state = {
            id: this.dbuser.id,
            googleid: this.dbuser.googleid,
            username: this.dbuser.username,
            firstname: this.dbuser.firstname,
            lastname: this.dbuser.lastname,
            eMail: this.dbuser.eMail,
            imageSource: this.dbuser.imageSource,
            skills: this.dbuser.skills,
            description: this.dbuser.description,
            portfolio: this.dbuser.portfolio
        };
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = e => {
        e.preventDefault();
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
          };
        const form = {...this.state, skills: this.state.skills.split(' ')};
        axios.put(`https://lagalt-server.herokuapp.com/api/v1/users/${this.dbuser.id}`, form, config)
            .then(response => {
                this.setLoad(true);
                alert("Updated your profile!");
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { username, eMail, firstname, lastname, description, imageSource, portfolio, skills } = this.state;
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Col>
                            <Form.Control name="username" placeholder="Username" value={username} onChange={this.changeHandler}/>
                        </Col>
                        <Col>
                            <Form.Control name="eMail" placeholder="Email" value={eMail} onChange={this.changeHandler}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Control name="firstname" placeholder="First Name" value={firstname} onChange={this.changeHandler}/>
                        </Col>
                        <Col>
                            <Form.Control name="lastname" placeholder="Last Name" value={lastname} onChange={this.changeHandler}/>
                        </Col>
                    </Row>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>About You</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} value={description} onChange={this.changeHandler}/>
                        <Form.Label>Portfolio</Form.Label>
                    <Form.Control name="portfolio" as="textarea" rows={3} value={portfolio} onChange={this.changeHandler}/>
                        <Form.Label>Skills</Form.Label>
                    <Form.Control name="skills" placeholder="Skills separated with space" value={skills} onChange={this.changeHandler}/>
                        <Form.Label>Image Link</Form.Label>
                    <Form.Control name="imageSource" placeholder="Link to your image (ie. LinkedIn)" value={imageSource} onChange={this.changeHandler}/>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">Update</Button>
                </Form>
            </div>
        );
    }
}

export default ChangeInfoTemplateX;