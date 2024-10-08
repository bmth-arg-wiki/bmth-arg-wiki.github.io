const createIcon = (color) => {
    return L.divIcon({
        className: 'map-marker',
        html: `<i class="fa-solid fa-location-dot ${color}"></i>`,
        iconSize: [24, 36]
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Manually set the map bounds
    const bounds= [[0, 0], [1772 / 5, 3543 / 5]];

    // Initialize Leaflet map with image overlay
    const map = L.map('map', {
        crs: L.CRS.Simple,
        maxBounds: bounds,
        minZoom: 0.9,
        maxZoom: 4,
        center: [0, 680],
        zoom: 0.9
    });

    // Define image bounds based on your image dimensions
    L.imageOverlay('/assets/imgs/map.jpg', bounds).addTo(map);
    map.fitBounds(bounds);

    // Get marker data from the HTML
    const markerDataDivs = document.querySelectorAll('#marker-data div');

    // Loop through each div and create a marker
    markerDataDivs.forEach(function(div) {
    const lat = div.getAttribute('data-lat');
    const lng = div.getAttribute('data-lng');
    const title = div.getAttribute('data-title');
    const description = div.getAttribute('data-description');
    const url = div.getAttribute('data-url');
    let customIcon;

    if (div.getAttribute('data-custom-icon')) {
        customIcon = L.icon({
            iconUrl: div.getAttribute('data-custom-icon'),
            iconSize: [50, 50]
        });
    } else {
        customIcon = createIcon(div.getAttribute('data-icon-color'));
    }

    const popupContent = `<p><a href='${url}'>${title}</a></p><p>${description}</p>`
    const popupOptions = {
        icon: customIcon,
        keepInView: true,
    };

    // Create marker with lat, lng, and popup content
    L.marker([lat, lng], popupOptions).addTo(map)
        .bindPopup(popupContent);
    });
});



