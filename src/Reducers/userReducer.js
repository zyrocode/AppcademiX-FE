export default function (state = {}, action) {
    switch (action.type) {
        case "SET_USER": 
            return {
                ...state,
                user: action.payload
            }

            case "UNSET_USER":
                return {
                    ...state,
                   user: undefined
                }

                default:
                    return state
    }
}