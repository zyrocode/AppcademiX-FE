export default function (state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload
            }

            case "UNSET_USER":
                return {
                    ...state,
                    ...undefined
                }

                default:
                    return state
    }
}