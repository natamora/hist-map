import { observer } from "mobx-react-lite";
import { Map, View } from "ol";
import { useEffect, useRef } from "react";
import { Segment } from "semantic-ui-react";
import { useStore } from "../app/stores/Store";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

export default observer(function MyMap({ zoom, center }) {
    const { mapStore } = useStore();
    const {setMap, removeMap, addLayer} = mapStore;
    const mapRef = useRef();

    useEffect(() => {
        const theMap = new Map({
            layers: [],
            view: new View({
                center: center,
                zoom: zoom
            })
        });
        theMap.setTarget(mapRef.current);
        setMap(theMap);

        const osmLayer = new TileLayer({
            source: new OSM()
        });
        osmLayer.setZIndex(-100);
        addLayer(osmLayer, 'osm-layer');
        return () => {
            if(!theMap) return;
            theMap.setTarget(undefined);
            removeMap();
        }
    }, []);

    return (
        <Segment>
            <div id='map' ref={mapRef} className='map-container'>
            </div>
        </Segment>

    );
});