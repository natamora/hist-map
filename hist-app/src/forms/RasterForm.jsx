import { observer } from "mobx-react-lite";
import { Button, Form } from "semantic-ui-react";
import { useStore } from "../app/stores/Store";
import { GeoJSON, WFS } from 'ol/format.js';
import { useState } from "react";
import {
    and as andFilter,
    equalTo as equalToFilter,
    like as likeFilter,
} from 'ol/format/filter.js';
import { ARKUSZ, GODLO, NAZWA, PODTYP, TYP, WFS_RASTER_LAYER, YEAR } from "../app/constants/Rasters";



export default observer(function RasterForm() {
    const { mapStore } = useStore();
    const { map, setRequestedFeatures } = mapStore;
    const initialFilters = {
        year: '',
        title: '',
        godlo: '',
        typ: '',
        podtyp: '',
        arkusz: '',
        nazwa: ''
    };
    const [formInputs, setFormInputs] = useState(initialFilters);

    function handleAddSketches() {
        var filters = [];
        if (formInputs.year) {
            filters.push(equalToFilter(YEAR, formInputs.year));
        }
        if (formInputs.typ) {
            filters.push(likeFilter(TYP, "*" + formInputs.typ + "*"));
        }
        if (formInputs.podtyp) {
            filters.push(likeFilter(PODTYP, "*" + formInputs.podtyp + "*"));
        }
        if (formInputs.godlo) {
            filters.push(likeFilter(GODLO, "*" + formInputs.godlo + "*"));
        }
        if (formInputs.arkusz) {
            filters.push(likeFilter(ARKUSZ, "*" + formInputs.arkusz + "*"));
        }
        if (formInputs.nazwa) {
            filters.push(likeFilter(NAZWA, "*" + formInputs.nazwa + "*"));
        }

        let filter = null;
        if (filters && filters.length == 1) {
            filter = filters[0];
        }
        else if (filters && filters.length > 1) {
            filter = andFilter(...filters);
        }
        let layer = map.getAllLayers().find(layer => {
            return layer.name && layer.name == WFS_RASTER_LAYER
        });
        const vectorSource = layer.getSource();
        const featureRequest = new WFS().writeGetFeature({
            srsName: 'EPSG:3857',
            featurePrefix: 'maps',
            featureTypes: ['wig100_index'],
            outputFormat: 'application/json',
            filter: filter
        });

        fetch('http://localhost:8080/geoserver/maps/wfs', {
            method: 'POST',
            body: new XMLSerializer().serializeToString(featureRequest),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {

                const features = new GeoJSON().readFeatures(json);
                setRequestedFeatures(features);
                if (features.length > 0) {
                    vectorSource.addFeatures(features);
                    map.getView().fit(vectorSource.getExtent());
                }
            });
    }

    function handleInputChange() {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value })
    }

    function handleClearRasters() {
        map.getLayers().forEach(layer => {
            const { name } = layer;
            if (name && name == WFS_RASTER_LAYER) {
                layer.getSource().clear();
            }
        });
        setRequestedFeatures([]);
    }

    return (
        <Form onSubmit={handleAddSketches} autoComplete='off'>
            <Form.Input placeholder="Rok" name='year' onChange={handleInputChange} />
            <Form.Input placeholder="Typ" name='typ' onChange={handleInputChange} />
            <Form.Input placeholder="Podtyp" name='podtyp' onChange={handleInputChange} />
            <Form.Input placeholder="Godło" name='godlo' onChange={handleInputChange} />
            <Form.Input placeholder="Arkusz" name='arkusz' onChange={handleInputChange} />
            <Form.Input placeholder="Nazwa" name='nazwa' onChange={handleInputChange} />
            <Button type='submit' content='Wyszukaj' positive />
            <Button type="button" content='Wyczyść' onClick={handleClearRasters} />
        </Form>
    )
})