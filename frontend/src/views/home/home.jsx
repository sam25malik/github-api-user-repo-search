import React from 'react'
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import Home from "./components/home";
import configureStore from "./redux/ConfigureStore";

/*Redux store to store the data*/
const store = configureStore(rootReducer, {
        data: {
            inputValue:'',
            results:'',
            type:'users'
        }
    }
);

const Dashboard = () => (
    <Provider store={store}>
        <Home/>
    </Provider>
);

export default Dashboard