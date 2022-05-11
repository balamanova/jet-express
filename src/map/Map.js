import { load } from '@2gis/mapgl';
import { useEffect } from 'react';
import React from 'react';

import { Directions } from '@2gis/mapgl-directions';

const MapWrapper = React.memo(
    () => {
        return <div id="map-container" style={{ width: '100%',
            height: '100%',
            position: "absolute" }}>

        </div>;
    },
    () => true,
);

export const Map = () => {
    useEffect(() => {
        let map;
        load().then((mapglAPI) => {
            // container — id of the div element in your html
            map = new mapglAPI.Map('map-container', {
                center: [76.921622, 43.234291],
                zoom: 17,
                key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
            });
        });
        const directions = new Directions(map, {
            directionsApiKey: 'rurbbn3446',
        });

        let marker;

        load().then((mapglAPI) => {
            // container — id of the div element in your html
            marker = new mapglAPI.Marker(map, {
                coordinates: [76.921622, 43.234291],
                icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
            });
        });


        load().then((mapglAPI) => {
            // container — id of the div element in your html
            map = new mapglAPI.Map('map-container', {
                center: [76.921622, 43.234291],
                zoom: 17,
                key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
            });
        });
        directions.pedestrianRoute({
            points: [
                [43.247481, 76.908734],
                [43.234178, 76.90829]
            ],
            style: {
                routeLineWidth: ['interpolate', ['linear'], ['zoom'],
                    10, 30, // zoom - width
                    14, 3 // zoom - width
                ],
                substrateLineWidth: ['interpolate', ['linear'], ['zoom'],
                    10, 3, // zoom - width
                    14, 50 // zoom - width
                ],
                // Or just static width value
                haloLineWidth: 60,
            }
        });
        // Destroy the map on unmounted
        return map;
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );;
};