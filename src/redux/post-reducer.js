import { API } from "../api/api"

const GET_DATA = 'GET_DATA'
const IS_LOADING = 'IS_LOADING'
const BAD_REQUEST = 'BAD_REQUEST'
const SET_FORM_TO_STATE = 'SET_FORM_TO_STATE'

let initialstate = {
    data: [],
    isLoading: false,
    inputLinkValue: 'http://api.massrelevance.com/MassRelDemo/kindle.json',
    gettingDataMistake: false,
    numberOfPosts: 0,
    veliocityOfChange: 10

}


let PostReducer = (state = initialstate, action) => {
    switch (action.type) {
        case GET_DATA: {


            let stateCopy = { ...state, data: action.response }
            return stateCopy
        }
        case IS_LOADING: {

            let stateCopy = { ...state, isLoading: action.loadingStatus }
            return stateCopy
        }
        case BAD_REQUEST: {

            let stateCopy = { ...state, gettingDataMistake: action.gettingDataMistake }
            return stateCopy
        }

        case SET_FORM_TO_STATE: {

            let stateCopy = {
                ...state, inputLinkValue: action.inputLinkValue,
                numberOfPosts: action.numberOfPosts, veliocityOfChange: action.veliocityOfChange
            }
            return stateCopy
        }
        default:
            return state
    }
}

const getData = (response) => {
    return { type: GET_DATA, response }
}

const isLoading = (loadingStatus) => {
    return { type: IS_LOADING, loadingStatus }
}

const badRequestAC = (gettingDataMistake) => {
    return { type: BAD_REQUEST, gettingDataMistake }
}
const setFormToState = (inputLinkValue, numberOfPosts, veliocityOfChange) => {
    return { type: SET_FORM_TO_STATE, inputLinkValue, numberOfPosts, veliocityOfChange }
}

export const getDataThunk = (inputLinkValue, numberOfPosts, veliocityOfChange) => {

    return (dispatch) => {

        dispatch(isLoading(true))
        dispatch(setFormToState(inputLinkValue, numberOfPosts, veliocityOfChange))
        API.getDataList(inputLinkValue)
            .then(response => {

                if (response.status === 200) {

                    dispatch(isLoading(false))
                    dispatch(getData(response.data))
                    dispatch(badRequestAC(false))
                }
            }

            ).catch(err => {
                console.log(err)

                dispatch(badRequestAC(true))
                dispatch(isLoading(false))
            })
    }
}

export const updateDataThunk = (state) => {

    return (dispatch) => {
        dispatch(isLoading(true))
        if (state.inputLinkValue === null && state.numberOfPosts === null && state.veliocityOfChange === null) {
            console.log('first loading')
            dispatch(isLoading(false))
        }
        else {
            dispatch(setFormToState(state.inputLinkValue, state.numberOfPosts, state.veliocityOfChange))
            API.getDataList(state.inputLinkValue)
                .then(response => {
                    if (response.status === 200) {
                        dispatch(isLoading(false))
                        dispatch(getData(response.data))
                        dispatch(badRequestAC(false))
                    }
                }
                ).catch(err => {
                    console.log(err)
                    dispatch(badRequestAC(true))
                    dispatch(isLoading(false))
                })
        }
    }
}




export default PostReducer