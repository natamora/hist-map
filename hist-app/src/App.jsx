import MyMap from './map/MyMap';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';


function App() {
  return (
    <>
      <Container style={{ marginTop: '3em', width: '1800px' }}>
            <MyMap center={[2230738.233475, 6506319.847634]} zoom={6} />
      </Container>
    </>
  )
}

export default observer(App);
