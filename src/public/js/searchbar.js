//*Barra de búsqueda
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', () => {
    // Tomar los valores ingresados en el input
    const searchString = searchBar.value;

    // Obtener una NodeList con los productos
    const listItems = document.querySelectorAll('a.item');

    //? Contador para dar un mensaje en caso de ausencia de productos
    let thereIsProducts = 0;

    // Filtrar cada producto
    for (let i = 0; i < listItems.length; i++) {
        let item = listItems[i];

        const itemContent = item
            .querySelector('div.product__footer h3')
            .innerHTML.toLowerCase();

        if (itemContent.includes(searchString)) {
            item.classList.remove('hidden');

            thereIsProducts++;
            document.querySelector('div.thereIsNot').classList.add('hidden');
        } else {
            item.classList.add('hidden');

            if (thereIsProducts == 0 && i + 1 == listItems.length) {
                //? Dar mensaje de ausencia de productos
                document
                    .querySelector('div.thereIsNot')
                    .classList.remove('hidden');
            }
        }
    }
});

// *Filtro
function category(tag) {
    // Obtener una NodeList con los productos
    const listItems = document.querySelectorAll('a.item');

    // Filtrar cada producto
    for (let i = 0; i < listItems.length; i++) {
        let item = listItems[i];

        if (item.dataset.categoria.includes(tag)) {
            //console.log('removed');
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
            //console.log('added');
        }

        if (category == 'todos') {
            item.classList.remove('hidden');
        }
    }
}
