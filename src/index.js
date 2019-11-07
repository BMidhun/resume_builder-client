import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes/routes';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import reducer from './reducers/reducers';
import './index.css'




const App = () => {

    return (

        <Provider store={createStore(reducer)}>
        <BrowserRouter>
            
            <Routes />
            
        </BrowserRouter>
        </Provider>

    )

}

ReactDOM.render(<App />, document.getElementById('root'))