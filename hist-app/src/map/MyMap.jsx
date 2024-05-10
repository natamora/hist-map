import { observer } from "mobx-react-lite";
import { Map, View } from "ol";
import { useEffect, useRef } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../app/stores/Store";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import TabPanel from "./TabPanel";
import Select from 'ol/interaction/Select';
import ImageModal from "./ImageModal";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

export default observer(function MyMap({ zoom, center }) {
    const { mapStore } = useStore();
    const { setMap, removeMap, addLayer, selectedFeature, setSelectedFeature } = mapStore;
    const mapRef = useRef();

    useEffect(() => {
        const theMap = new Map({
            target: mapRef.current,
            view: new View({
                center: center,
                zoom: zoom
            })
        });
        setMap(theMap);
        addBaseOSMLayer();
        addSketchesLayerWithSelectControl(theMap);

        return () => {
            if (!theMap) return;
            theMap.setTarget(undefined);
            removeMap();
        }
    }, []);

    function addSketchesLayerWithSelectControl(theMap) {
        const vectorSource = new VectorSource();
        const layer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'rgba(72, 47, 181, 1.0)',
                    width: 2,
                }),
                fill: new Fill({
                    color: 'rgba(64, 67, 161,0.2)'
                })
            }),
        });
        addLayer(layer, 'sketches-layer');

        let select = new Select({
            layers: [layer],
        });
        select.on("select", event => featureSelected(event));
        theMap.addInteraction(select);
    }

    function addBaseOSMLayer() {
        const osmLayer = new TileLayer({
            source: new OSM(),
            zIndex: -100,
        });

        addLayer(osmLayer, 'osm-layer');
    }

    function featureSelected(e) {
        setSelectedFeature(e.selected[0]);
    }

    return (
        <>
            {selectedFeature && <ImageModal />}
            <Grid>
                <Grid.Column width='4'>
                    <TabPanel />
                </Grid.Column>
                <Grid.Column width='12'>
                    <Segment>
                        <div id='map' ref={mapRef} className='map-container'>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>



    );
});