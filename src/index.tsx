import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import {AppRouter} from "./router";

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals()
