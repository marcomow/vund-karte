import L from "leaflet";
import { fetchPlacesList } from "./fetchPlacesList";

export const createMap: () => Promise<void> = async (): Promise<void> => {
    const mymap: L.Map = L.map('map').setView([56.9496, 24.1052], 8);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    const placesList = await fetchPlacesList();
    placesList.forEach(place=>{
        L.marker([place['Latitude'], place['Longitude']]).addTo(mymap);
    });
}