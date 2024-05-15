import { Tab, TabPane } from "semantic-ui-react";
import SketchesForm from "../forms/SketchesForm";
import RasterForm from "../forms/RasterForm";

const panes = [
    { menuItem: 'Szkice', render: () => <TabPane><SketchesForm /></TabPane> },
    { menuItem: 'Mapy', render: () => <TabPane><RasterForm /></TabPane> },
]

export default function TabPanel() {
    return (
        <>
            <Tab panes={panes} />
        </>
    )

}