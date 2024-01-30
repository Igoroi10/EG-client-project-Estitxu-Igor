const FoundByArtifact = (allUsers, artifactsData) => {

    artifactsData.forEach((artifact) => {
        allUsers.forEach((user) => {
            if(artifact.foundBy[0] === user._id){
                artifact.foundBy[0] = user;
            }
        })
    })

};

export default FoundByArtifact;