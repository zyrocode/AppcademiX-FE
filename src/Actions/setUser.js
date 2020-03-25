


export const getUsersWithThunk = (userInfos, token) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_USER",
            payload: userInfos
        })


        if(token){
            dispatch({
                type: "SET_TOKEN",
                payload: token
            })
        }
    };


    
}