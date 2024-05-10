import { Header, Tab, TabPane } from "semantic-ui-react";
import SketchesForm from "../SketchesForm";

const panes = [
    { menuItem: 'Szkice', render: () => <TabPane><SketchesForm /></TabPane> },
    { menuItem: 'Mapy', render: () => <TabPane>Tab 2 Content</TabPane> },
]

export default function TabPanel() {
    return (
        <>
            <Header as='h2'>
                Przeglądarka map historycznych
            </Header>
            <hr></hr>
            <Tab panes={panes} />
        </>
    )

}