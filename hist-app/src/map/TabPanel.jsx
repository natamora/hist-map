import { Tab, TabPane } from "semantic-ui-react";
import SketchesForm from "../SketchesForm";

const panes = [
    { menuItem: 'Szkice', render: () => <TabPane><SketchesForm /></TabPane> },
    { menuItem: 'Mapy', render: () => <TabPane>Tab 2 Content</TabPane> },
]

const TabPanel = () => <Tab panes={panes} />

export default TabPanel;