/*Reducer for the actions*/
const data = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return Object.assign({}, state, {
                inputValue: action.value,
            });
        case 'SET_RESULTS':
            return Object.assign({}, state, {
                results: action.data,
            });
        case 'SET_TYPE':
            return Object.assign({}, state, {
                type: action.data,
            });

        default:
            return state;
    }
};

export default data
