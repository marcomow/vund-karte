import * as L from 'leaflet';
import { createCustomMarker } from "./createCustomMarker";
import { fetchPlacesList } from "./fetchPlacesList";
import { stringToRGBA } from "./stringToRGBA";
import latinize from 'latinize';
import platform from 'platform';

export const createMap: () => Promise<void> = async (): Promise<void> => {
    const map: L.Map = L.map('map').setView([56.9496, 24.5052], 8);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: `Made with ❤ by <a href="https://marko.kolombo.dev">Marko Kolombo</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    const placesList = await fetchPlacesList();
    if (process.env.NODE_ENV === 'development') {
        console.log(placesList);
    }
    // @ts-ignore
    const legend: L.Control = L.control({ position: 'bottomleft' }) as L.Control;
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        const categories = [...new Set(placesList.map(place => place['Kategorija']))];
        const categoriesTexts = categories.map((category: string): string => {
            const latinizedCategory: string = latinize(category);
            return `<i class="circle" style="background:${stringToRGBA(latinizedCategory, 1)}">${category}</i>`;
        });
        const labels = ['<strong>Kategorijas</strong>', ...categoriesTexts];
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);
    placesList.forEach(place => {
        const icon: L.DivIcon = createCustomMarker(place['Kategorija']);
        const marker: L.Marker = L.marker(
            [place['Latitude'], place['Longitude']],
            { icon }
        );
        const os: string = platform.os.toString().toLowerCase();
        const destinationAddress: string = `${place['Nosaukums']}+${place['Adrese']}+${place['Pilsēta']}`.replace(new RegExp(' ', 'g'), '+');
        const hrefDestination: string = os.startsWith('iOS') || os.startsWith('android') ?
            `geo:${place['Latitude']},${place['Longitude']}?q=${destinationAddress}`
            : `https://maps.${os.startsWith('mac') ? 'apple.com/maps?q=' : 'google.com/maps?saddr=My+Location&daddr='}${destinationAddress}`
            ;
        marker.bindPopup(`
            <b>${place['Nosaukums']}</b>
            <img src="${place['Logo']}">
            <p style="background-color:${stringToRGBA(latinize(place['Kategorija']), 1)};color:white;padding:4px">${place['Kategorija']}</p>
            <p><a href="${hrefDestination}" target="_blank">${place['Pilnā Adrese']} - 🗺️rādit kartē</a></p>
            <p><a href="${place['Mājaslapa']}" target="_blank">mājaslapa 🔗</a></p>
            <p>${place['Komentāri']}</p>
        `);
        marker.addTo(map);
    });
}