import MyMap from './map/MyMap';
import './style.css'
import 'ol/ol.css';
function App() {

  return (
    <>
        <MyMap  center={[2230738.233475, 6506319.847634]} zoom={6}/>
    </>
  )
}

export default App
