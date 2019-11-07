import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import reducer from './reducers/reducers';
import Layout from  "./components/HOC/Layout/Layout";
import './index.css'




const App = () => {

    return (

        <Provider store={createStore(reducer)}>
     
            
            <Layout />
            
       
        </Provider>

    )

}

ReactDOM.render(<App />, document.getElementById('root'))