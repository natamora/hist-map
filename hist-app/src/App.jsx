import MyMap from './map/MyMap';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar';


function App() {
  return (
    <>
      <NavBar />
      <Container fluid style={{ marginTop: '5em', width: '95vw' }}>
        <MyMap center={[2230738.233475, 6506319.847634]} zoom={6} />
      </Container>
    </>
  )
}

export default observer(App);
