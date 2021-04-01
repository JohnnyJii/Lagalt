
import React, { Component } from 'react'

import SearchBar from '../../search/SearchBar'


class AllProjectsGrid extends Component {
    
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         posts: []
    //     }
    // }

    // componentDidMount() {
    //     axios.get(`https://lagalt-server.herokuapp.com/api/v1/projects`)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({posts: response.data})
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    render() {
        // const { posts } = this.state
        return (
            <div className="container">
                <SearchBar />
                {/* {
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
                } */}
            </div>
        )
    }
}

export default AllProjectsGrid