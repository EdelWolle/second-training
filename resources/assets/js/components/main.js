import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from './routing';

import store from './store';

class FirstMain extends Component {

    render() {
        return (
          <Provider store={store}>
            <Main />
          </Provider>
        );
    }
}



export default FirstMain;

if (document.getElementById('root')) {
    ReactDOM.render(<FirstMain />, document.getElementById('root'));
}
