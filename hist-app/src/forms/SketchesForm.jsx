import { observer } from "mobx-react-lite";
import { Button, Form } from "semantic-ui-react";
import { useStore } from "../app/stores/Store";
import { GeoJSON, WFS } from 'ol/format.js';
import {
    and as andFilter,
    equalTo as equalToFilter,
    like as likeFilter,
} from 'ol/format/filter.js';
import { useState } from "react";
import { SKETCHES_LAYER } from "../app/constants/Sketches";

export default observer(function SketchesForm() {

    const { mapStore } = useStore();
    const { map } = mapStore;
    const initialFilters = {
        year: '',
        title: ''
    };
    const [formInputs, setFormInputs] = useState(initialFilters);

    function handleAddSketches() {
        var filters = [];
        if (formInputs.year) {
            filters.push(equalToFilter('Year', formInputs.year));
        }
        if (formInputs.title) {
            filters.push(likeFilter('TitleLong', "*" + formInputs.title.toUpperCase() + "*"));
        }

        let filter = null;
        if (filters && filters.length == 1) {
            filter = filters[0];
        }
        else if (filters && filters.length > 1) {
            filter = andFilter(...filters);
        }
        let layer = map.getAllLayers().find(layer => {
            return layer.name && layer.name == SKETCHES_LAYER
        });

        const vectorSource = layer.getSource();
        const featureRequest = new WFS().writeGetFeature({
            srsName: 'EPSG:3857',
            featureTypes: ['extend'],
            outputFormat: 'application/json',
            filter: filter
        });
        fetch('http://localhost:8080/geoserver/sketches/wfs', {
            method: 'POST',
            body: new XMLSerializer().serializeToString(featureRequest),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                const features = new GeoJSON().readFeatures(json);
                if (features.length > 0) {
                    vectorSource.addFeatures(features);
                    map.getView().fit(vectorSource.getExtent());
                }
            });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value })
    }

    function handleClearSketches() {
        map.getLayers().forEach(layer => {
            const { name } = layer;
            if (name && name == SKETCHES_LAYER) {
                layer.getSource().clear();
            }
        });
    }
    return (
        <Form onSubmit={handleAddSketches} autoComplete='off'>
            <Form.Input placeholder="Rok" name='year' onChange={handleInputChange} />
            <Form.Input placeholder="Tytuł" name='title' onChange={handleInputChange} />
            <Button type='submit' content='Wyszukaj' positive />
            <Button type="button" content='Wyczyść' onClick={handleClearSketches} />
        </Form>
    );
})