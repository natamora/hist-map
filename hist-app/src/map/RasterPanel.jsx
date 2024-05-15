import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/Store";
import { useState } from "react";
import { Button, Divider, Header, Segment, Sidebar, Table, TableBody, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import TableRowItem from "./TableRowItem";
import ImageLayer from "ol/layer/Image.js";
import { ImageWMS } from "ol/source";

export default observer(function RasterPanel() {
    const { mapStore } = useStore();
    const { map, requestedFeatures, addLayer, rasterLayerNames, setRasterLayerNames } = mapStore;
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    function handleSelect(id) {
        if (selectedFeatures.includes(id)) {
            setSelectedFeatures(selectedFeatures.filter(s => s !== id))
        } else {
            setSelectedFeatures([...selectedFeatures, id])
        }
    }
    function handleViewWMS() {
        clearRasterLayers();
        for(let featureId in selectedFeatures) {
            let feature = requestedFeatures[featureId];
            let extent = feature.getGeometry().getExtent();
            var untiled = new ImageLayer({
                extent: extent,
                source: new ImageWMS({
                    ratio: 1,
                    url: 'http://localhost:8080/geoserver/maps/wms',
                    params: {
                        'FORMAT': 'image/png',
                        'VERSION': '1.1.1',
                        "STYLES": '',
                        "LAYERS": 'maps:WIG 100000',
                        "exceptions": 'application/vnd.ogc.se_inimage',
                        "srs": "EPSG:3857",
                    }
                })
            });
            setRasterLayerNames([...rasterLayerNames, feature.getId()])
            addLayer(untiled, feature.getId());
        }
    }
    function clearRasterLayers() {
        map.getLayers().getArray().slice().forEach(layer => {
            if (layer.name && rasterLayerNames.includes(layer.name)) {
                map.removeLayer(layer);
            }
        });
        setRasterLayerNames([]);
    }

    return (
        <>
            {requestedFeatures &&
                <Sidebar id="panel"
                    color='blue'
                    as={Segment}
                    animation='overlay'
                    direction='bottom'
                    visible={Array.isArray(requestedFeatures) && requestedFeatures.length > 0}
                >
                    <Header>Dostępne rastry</Header>
                    <Divider />
                    <div className="container__table">
                        
                        <Table celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Rok</TableHeaderCell>
                                    <TableHeaderCell>Godło</TableHeaderCell>
                                    <TableHeaderCell>Tytuł</TableHeaderCell>
                                    <TableHeaderCell>Typ</TableHeaderCell>
                                    <TableHeaderCell>Podtyp</TableHeaderCell>
                                    <TableHeaderCell>Arkusz</TableHeaderCell>
                                    <TableHeaderCell>Nazwa</TableHeaderCell>
                                    <TableHeaderCell>Pobierz</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requestedFeatures.map(feature => (
                                    <TableRowItem
                                        key={feature.getId()}
                                        feature={feature}
                                        isSelected={selectedFeatures.includes(feature.getId())}
                                        handleSelect={() => handleSelect(feature.getId())}
                                    />
                                ))}
                            </TableBody>

                        </Table>
                    </div>
                    <Divider hidden />
                    <Button type="button" content='Podgląd' color="blue" onClick={handleViewWMS}/>
                </Sidebar>}
        </>
    )
})