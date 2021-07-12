import L from "leaflet";
import { stringToRGBA } from "./stringToRGBA";
import latinize from 'latinize';

export const createCustomMarker: (category: string) => L.DivIcon = (category: string): L.DivIcon => {
    const latinizedCategory: string = latinize(category).replace(new RegExp(' ', 'g'), '_');
    const icon: L.DivIcon = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 0],
        popupAnchor: [24, 5],
        html: `<svg width="48px" height="48px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 365 560" enable-background="new 0 0 365 560" xml:space="preserve">
                <g>
                <defs>
                    <radialGradient id="gradient_${latinizedCategory}">
                        <stop offset="1%" stop-color="${stringToRGBA(latinizedCategory, 1)}" />
                        <stop offset="98%" stop-color="${stringToRGBA(latinizedCategory, 0.88)}" />
                    </radialGradient>
                </defs>
                <path fill="url(#gradient_${latinizedCategory})" stroke="white" stroke-width="16" d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9
                    C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8
                    c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"/>
                </g>
                </svg>
            `
    })
    return icon;
}