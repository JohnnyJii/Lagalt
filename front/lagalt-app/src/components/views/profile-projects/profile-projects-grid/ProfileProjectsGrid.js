import ProfileProjectsGridItem from "./ProfileProjectsGridItem";

function ProfileProjectsGrid() {
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <ProfileProjectsGridItem id={1}/>
            <ProfileProjectsGridItem id={2}/>
            <ProfileProjectsGridItem id={3}/>
            <ProfileProjectsGridItem id={4}/>
        </div>
    )
}

export default ProfileProjectsGrid