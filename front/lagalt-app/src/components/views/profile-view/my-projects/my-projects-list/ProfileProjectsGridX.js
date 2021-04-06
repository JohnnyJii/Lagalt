import ProfileProjectsGridItemX from "./list-item/ProfileProjectsGridItemX";
import React from 'react'

function ProfileProjectsGridX(props) {
        return (
            <div className="container">
                {
                    props.posts.length ?
                    props.posts.map(post => 
                        <ProfileProjectsGridItemX
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            description={post.description}
                            industry={post.industry}
                            progress={post.progress}
                            gitlink={post.gitlink}
                            creator={post.user}
                        />) :
                        <h1>No projects</h1>
                }
            </div>
        )
    }

export default ProfileProjectsGridX