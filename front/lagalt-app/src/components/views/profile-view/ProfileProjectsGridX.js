import ProfileProjectsGridItemX from "./ProfileProjectsGridItemX";
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
                            desc={post.description}
                            industry={post.industry}
                            progress={post.progress}
                            gitlink={post.gitlink}
                        />) :
                        <p>No projects</p>
                }
            </div>
        )
    }

export default ProfileProjectsGridX