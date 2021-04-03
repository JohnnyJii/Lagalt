import ProfileProjectsGridItemX from '../../profile-view/my-projects/my-projects-list/list-item/ProfileProjectsGridItemX'
import React, { Component } from 'react'
import axios from 'axios'

class AllProjectsGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get(`https://lagalt-server.herokuapp.com/api/v1/projects`)
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
                        <ProfileProjectsGridItemX
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

export default AllProjectsGrid