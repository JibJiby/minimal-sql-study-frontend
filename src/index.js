import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

import './index.css';
import App from './App';

// antd 꼭 넣어주기
import 'antd/dist/antd.css';
// 백엔드
import { backendUrl } from './config/config'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = backendUrl

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);