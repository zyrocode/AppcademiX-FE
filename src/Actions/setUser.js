export const setUser = (userInfo) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_USER",
            payload: userInfo
        })
    };
}