import React from 'react';
import ReactDOM from 'react-dom/client';
// Redux
// https://github.com/rt2zz/redux-persist
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import * as _redux from './setup'
import store, {persistor} from './setup/redux/Store'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'

// Apps
import {JusimI18nProvider} from './_jutemplate/i18n/Jusim18n'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_jutemplate/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_jutemplate/assets/css/style.rtl.css'
 **/
import './_jutemplate/assets/sass/style.scss'
import './_jutemplate/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic JUT mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject JUT interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store)

Chart.register(...registerables)

const root = ReactDOM.createRoot(document.getElementById("root") as Element); 
root.render(
  // <React.StrictMode>
  <JusimI18nProvider>
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  </JusimI18nProvider>
  // </React.StrictMode>
)
