import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './scss/style.scss';
import App from "./App";
import { StoreProvider } from 'easy-peasy';
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store} >
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

