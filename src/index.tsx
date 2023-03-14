import React from 'react';
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import {AppRouter} from "./router";

ReactDOM.render(<React.StrictMode><AppRouter/></React.StrictMode>, document.getElementById('root'));

reportWebVitals()
