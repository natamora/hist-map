import { Header, Image, Modal } from "semantic-ui-react";
import { useStore } from "../app/stores/Store";
import { observer } from "mobx-react-lite";
import Select from "ol/interaction/Select";

export default observer(function ImageModal() {
    const { mapStore } = useStore();
    const { map, selectedFeature, setSelectedFeature} = mapStore;

    function handleCloseModal() {
        map.getInteractions().forEach(function (interaction) {
            if (interaction instanceof Select) {
                interaction.getFeatures().clear();
            }
        });
        setSelectedFeature(null);
    }
    return (
        <>
            {selectedFeature ? <Modal
                basic
                onOpen={() => {}}
                onClose={handleCloseModal}
                open={selectedFeature != null}
            >
                <Header textAlign='center'>
                    {selectedFeature.get('TitleLong') + " (" + selectedFeature.get('Year') + ")"}
                </Header>
                <Image src={selectedFeature.get('JPG')} fluid ></Image>

            </Modal> : null}
        </>

    );
})