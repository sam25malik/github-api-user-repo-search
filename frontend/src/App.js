import React, {Component} from 'react';
import './App.css';
import Dashboard from "./views/home/home";
import { ToastContainer } from 'react-toastify';

class App extends Component {
    render() {
        return (
          <div>
            <Dashboard/>
            <ToastContainer />
        </div>
        );
    }
}

export default App;
