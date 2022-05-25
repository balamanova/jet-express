import React from "react";
import MapContext from "./MapContext";

const MapProvider = (props) => {
    const [mapInstance, setMapInstance, directions, setDirections] = React.useState();

    return (
        <MapContext.Provider value={[mapInstance, setMapInstance, directions, setDirections]}>
            {props.children}
        </MapContext.Provider>
    );
};

export default MapProvider