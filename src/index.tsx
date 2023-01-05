import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';

//import css 
import "./Style/Component/InputSearchAntd.scss"
import "./Style/Component/RadioAntd.scss"
import "./Style/Component/TableAntd.scss"
import "./Style/Component/CheckboxAntd.scss"
import './Style/Component/InputAntd.scss'
import './Style/Component/SelectAntd.scss'
import "./Style/Component/TimepickerAntd.scss"

import {Provider} from "react-redux"
import { store } from './Redux/configStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
