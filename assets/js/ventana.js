function filterOffers() {
    // Obtener el valor del input de búsqueda
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Obtener todas las ofertas dentro de #content
    const offers = document.querySelectorAll('.offer-item');

    // Iterar sobre cada oferta
    offers.forEach(offer => {
        const offerName = offer.getAttribute('data-nombre').toLowerCase();
        
        // Si el nombre de la oferta coincide con el término de búsqueda, mostrarla
        if (offerName.includes(searchTerm)) {
            offer.style.display = ''; // Muestra la oferta
        } else {
            offer.style.display = 'none'; // Oculta la oferta
        }
    });
}












