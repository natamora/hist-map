import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import 'semantic-ui-css/semantic.min.css'
import 'ol/ol.css';
import { StoreContext, store } from './app/stores/Store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>

  // </React.StrictMode>,
)
