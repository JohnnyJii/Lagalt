import ProfileProjectsGridItem from "./ProfileProjectsGridItem";

function ProfileProjectsGrid() {
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <ProfileProjectsGridItem id={1}/>
            <ProfileProjectsGridItem id={2}/>
        </div>
    )
}

export default ProfileProjectsGrid