import MyMap from './map/MyMap';
import TabPanel from './map/TabPanel';
import { Container, Grid, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';


function App() {
  return (
    <>
      <Container style={{ marginTop: '3em', width: '1800px' }}>
        <Grid>
          <Grid.Column width='4'>
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
