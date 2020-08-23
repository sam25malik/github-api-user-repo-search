import axios from "axios";
import {toast} from "react-toastify";

export const setInputValue = (value) => ({
    type: 'SET_SEARCH',
    value
});


export const setResults = (data) => ({
    type: 'SET_RESULTS',
    data
});

export const setType = (data) => ({
    type: 'SET_TYPE',
    data
});

/*Call the search api and sets the response*/
export function searchGit(value) {

    return function (dispatch, getState) {
        dispatch(setInputValue(value));
        const state = getState();
        if(value.length>=3){
        return axios.get(`http://localhost:3000/api/search`,{
                params:{
                    search: value,
                    type: state.data.type
                },
                withCredentials: true
            }
        ).then(response => {
            console.log('response',response);
            if(response.data.message){
                toast("API rate limit exceeded");
            }else{
                dispatch(setResults(response.data.items));
            }}).catch(error => {
               toast('Some Error Occured');
            });
        }
    }
}

/*Clear the cached data*/
export function clearCache() {
    return function (dispatch, getState) {        
        return axios.get(`http://localhost:3000/api/clear-cache`,{
               withCredentials: true
            }
        ).then(response => {
            toast('Cache Cleared')
        }).catch(error => {
            toast('Error Clearing Cache');
        });
    }
}


