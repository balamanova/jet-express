import React, {useState} from "react";
import MapContext from "./MapContext";
import {load} from "@2gis/mapgl";
import axios from "axios";
import {API_URL} from "../login/LoginForm";
import {Directions} from "@2gis/mapgl-directions";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import { Select } from 'antd';
const { Option } = Select;



function renderTableHeader(coordinates) {
    return coordinates.filter(function(value, index) {
             return value.id != null;
        }).map((key, index) => {
            return <tr>
                <td> {key.name}</td>
                <td>{key.ui_total_duration}</td>
                <td>{key.ui_total_distance.value} {key.ui_total_distance.unit}</td>
            </tr>
        })
}


export function Movie({ totalTime, destination,coordinates }) {

    return <div id="map-container" style={{ width: '100%',
        height: '100%',
        position: "absolute" }}>

        <div className={"ruler-div"}>
            <img className={"ruler-img"} src={require('../images/ruler.jpg')} />
            <div className={"ruler-info-div"}>
                <div className={"ruler-info-d"} >{totalTime} min</div>
                <div className={"ruler-info-d"} >{destination/1000} km</div>
            </div>
        </div>
        <div className={"info-table-div"}>
            <table id='students'>
                <tr>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Distance</th>
                </tr>
                {renderTableHeader(coordinates)}
            </table>
        </div>
    </div>;
}

const MapWrapper = React.memo(Movie);

export const MapGL = () => {
    const [coordinates, setCoordinates] = useState([]);
    const [time, setTime] = useState([]);
    const [destination, setDestination] = useState([]);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const context = React.useContext(MapContext);
    React.useLayoutEffect( () => {
        let selectedRpws = localStorage.getItem("selectedRpws");
        axios.get(API_URL + "/?y=43.245676&x=76.905397&keys=" + selectedRpws).then(res => {
            setCoordinates(res.data.points)
            setTime(res.data.time)
            setDestination(res.data.destination)
        })

    }, [])
    React.useEffect( () =>  {
        let map;
        console.log(time)
        if(coordinates.length > 0) {
            load().then((mapglAPI) => {
                map = new mapglAPI.Map('map-container', {
                    center: [coordinates[0].x, coordinates[0].y],
                    zoom: 15,
                    key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
                });


                var list = [];

                for (var item in coordinates) {
                    list.push([coordinates[item].x, coordinates[item].y]);
                    var marker = new mapglAPI.HtmlMarker(map, {
                        html: `<div class="popup">
                        <div class="popup-content">
                           ${coordinates[item].name}
                        </div>
                        <div class="popup-tip"></div>
                    </div> `,
                    });
                    marker.setCoordinates( [coordinates[item].x, coordinates[item].y])
                }


                new mapglAPI.Marker(map, {
                    coordinates: coordinates[0],
                    label: {
                        text: "You are here",
                        offset: [0, 25],
                        relativeAnchor: [0.5, 0],
                        image: {
                            url: 'https://docs.2gis.com/img/mapgl/tooltip-top.svg',
                            size: [100, 50],
                            stretchX: [
                                [10, 40],
                                [60, 90],
                            ],
                            stretchY: [[20, 40]],
                            padding: [20, 10, 10, 10],
                        },
                    },
                });

                const directions = new Directions(map, {
                    directionsApiKey: 'rurbbn3446',
                });

                directions.pedestrianRoute({
                    points: list,
                    style: {
                        routeLineWidth: ['interpolate', ['linear'], ['zoom'],
                            5, 10, // zoom - width
                            7, 3 // zoom - width
                        ],
                        substrateLineWidth: ['interpolate', ['linear'], ['zoom'],
                            5, 3, // zoom - width
                            7, 20 // zoom - width
                        ],
                        // Or just static width value
                        haloLineWidth: 30,
                    }
                });

                const popup = new mapglAPI.HtmlMarker(map, {
                    coordinates: [coordinates[1].x, coordinates[1].y],
                    html: `<div class="popup">
                        <div class="popup-content">
                            Change status
                            <Select
                              defaultValue="IN_STOCK"
                              style={{
                                width: 120,
                              }}
                              onChange={handleChange}
                            >
                              <Option value="IN_STOCK" >IN_STOCK</Option>
                              <Option value="PROCESSING">PROCESSING</Option>
                              <Option value="DELIVERED">DELIVERED</Option>
                              <Option value="ERROR_PROCESSING">ERROR_PROCESSING</Option>
                            </Select>

                        </div>
                        <div class="popup-tip"></div>
                    </div>`,
                });

            });
            // Destroy the map, if Map component is going to be unmounted
            return map;
        }

    }, [coordinates]);
    return (
        <div>
            <div className={"header"}>
                <div style={{}}>
                    <img className={"header-img"} src={require('../images/logo.png')} />
                </div>
                <div style={{width: "80%"}}></div>
            <div className={"overlayStyle"}>
                <Dropdown overlay={menu} >
                    <a onClick={(e) => {
                        e.preventDefault()
                    }}>
                        <Space className={"button-click"}>
                            {localStorage.getItem("name")}
                            <DownOutlined style={{ fontSize: '13px' }}/>
                        </Space>
                    </a>
                </Dropdown>
            </div>

            </div>
            <MapWrapper totalTime = {time} destination = {destination} coordinates = {coordinates} />
        </div>

    );
};

const onClick = ({ key }) => {
    // const navigate = useNavigate();
    // navigate(key)
};

const menu = (
    <Menu
        onClick={onClick}
        items={[
            {
                key: '/product',
                label: (
                    <a rel="noopener noreferrer" href="/product">
                        Products
                    </a>
                )
            },
            {
                key: '/',
                label: (
                    <a rel="noopener noreferrer" href="/">
                        LogOut
                    </a>
                )
            }
        ]}
    />
);