import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux/configureStore';
import Routes from 'comps/Routes';

// import 'assets/semantic/semantic.rtl.min.css';
import 'assets/font/fonts.css';
import 'assets/css/global.css';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
