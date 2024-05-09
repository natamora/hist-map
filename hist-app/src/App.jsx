import { useStore } from './app/stores/Store';
import MyMap from './map/MyMap';
import TabPanel from './map/TabPanel';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

function App() {
  const { mapStore } = useStore();

  return (
    <>
      <Container style={{ marginTop: '3em', width: '1800px' }}>
        <Grid>
          <Grid.Column width='4'>
            <h2>{mapStore.title}</h2>
            <Button content='Add' positive onClick={mapStore.setTitle} />
            <Header as='h2'>
              Przeglądarka map historycznych
            </Header>
            <hr></hr>
            <TabPanel />
          </Grid.Column>
          <Grid.Column width='12'>
            <MyMap center={[2230738.233475, 6506319.847634]} zoom={6} />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}

export default observer(App);
