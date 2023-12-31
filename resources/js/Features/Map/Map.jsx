import { 
    MapContainer, 
    Marker,
    Popup,
    TileLayer, 
    useMap,} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const Map = ({config}) => {

    const icon = {
        iconUrl: 'https://s.tmimgcdn.com/scr/1200x750/284700/location-point-icon-vector-illustration-v4_284781-original.jpg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    }

    return (
        <div className='w-full h-full'>
            <MapContainer 
            center={config.view} 
            zoom={10}
            scrollWheelZoom={true}
            minZoom = {8}
            className='h-[20rem]'
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {config.markers.map(marker => {
                    // console.log(marker)
                    if(marker.location.length === 2){
                        return (
                            <Marker 
                            position={marker.location}
                            >
                                <Popup>
                                    {marker.popup}
                                </Popup>
                            </Marker>
                        )
                    }
                })}
            </MapContainer>
        </div>
    )
}

export default Map;