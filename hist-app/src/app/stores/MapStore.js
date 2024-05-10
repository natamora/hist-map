import { makeAutoObservable } from "mobx";
export default class MapStore {
    map = null;
    layerRegistry = new Map();
    sketchesSource = null;
    selectedFeature = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedFeature = (selected) => {
        this.selectedFeature = selected
    }
    // with arrow fun we dont need to bound action

    setMap = (generatedMap) => {
        this.map = generatedMap;
    }

    removeMap = () => { this.map = null; }

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