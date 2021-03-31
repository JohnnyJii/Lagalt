import ProfileProjectsGridItem from "./ProfileProjectsGridItem";
import React, { Component } from 'react'
import axios from 'axios'
import firebase from 'firebase/app'

class ProfileProjectsGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const googleid = firebase.auth().currentUser.uid
        axios.get(`https://lagalt-server.herokuapp.com/api/v1/users/${googleid}/projects`)
            .then(response => {
                console.log(response)
                this.setState({posts: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { posts } = this.state
        return (
            <div className="container">
                {
                    posts.length ?
                    posts.map(post => 
                        <ProfileProjectsGridItem
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            desc={post.description}
                            industry={post.industry}
                        />) :
                        null
                }
            </div>
        )
    }
}

export default ProfileProjectsGrid