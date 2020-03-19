export const getUsersWithThunk = (userInfos) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_USER",
            payload: userInfos
        })
    };
}