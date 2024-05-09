import { Map, View } from "ol";
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { useEffect, useRef, useState } from "react";
import { Segment } from "semantic-ui-react";

export default function MyMap({ zoom, center}) {
    const[map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    const osmLayer = new TileLayer({
        source: new OSM()
    })

    const theMap = new Map({
        target: 'map',
        layers: [osmLayer],
        view: new View({
            center: center,
            zoom: zoom
        })
    });

    useEffect(() => {
        console.log('set');
         setMap(theMap);
    }, []);

    return (
        <Segment>
            <div id='map' ref={mapElement} className='map-container'>
            </div>
        </Segment>

    );
}