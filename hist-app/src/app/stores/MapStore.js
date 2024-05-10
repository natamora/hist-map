import { makeAutoObservable } from "mobx";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
export default class MapStore {
    title = 'Test message';
    map = null;
    layerRegistry = new Map();
    sketchesSource = null;

    constructor() {
        makeAutoObservable(this);
    }

    // with arrow fun we dont need to bound action
    setTitle = () => {
        this.title = this.title + '!';
    }

    setMap = (generatedMap) => {
        this.map = generatedMap;
    }

    removeMap = () => { this.map = null; }

    initialSketches = () => {
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
        this.addLayer(layer, 'sketches-layer');
        return layer;
    }

    addLayer = (layer, name) => {
        if (this.map) {
            layer.name = name;
            this.map.addLayer(layer);
            console.log('layer added', layer);
        }
        else {
            console.log('map not found - add layer');
        }
    }

}