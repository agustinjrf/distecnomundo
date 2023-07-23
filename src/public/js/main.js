// *Inicializar biblioteca de animaciones
AOS.init();

// Cookies

if (localStorage.getItem('cookies') == 'true') {
    document.getElementById('cookies').classList.add('cookies-hidden');
    console.log('true');
} else {
    // Poner baner de cookies
    console.log('false');
    document.getElementById('cookies').classList.remove('cookies-hidden');
}

function cookiesAlert() {
    // Quitar baner de cookies
    document.getElementById('cookies').classList.add('cookies-hidden');
    localStorage.setItem('cookies', 'true');
    console.log(localStorage.getItem('cookies') == 'true');
}

// *Abrir/Cerrar el menús desplegables
function toggleMenu() {
    const menu = document.querySelector('#menu');

    menu.classList.toggle('animate__slideOutLeft');
    menu.classList.remove('hidden');
    menu.classList.toggle('animate__slideInLeft');
}

function filterToggle() {
    const filter = document.querySelector('#filter');

    filter.classList.toggle('animate__slideOutLeft');
    filter.classList.remove('hidden');
    filter.classList.toggle('animate__slideInLeft');
    document
        .querySelector('.catalog__filter.main__filter')
        .classList.toggle('disable');
}

// *Visualizar producto
function preview(img) {
    document.getElementById('img-main').src = `${img}`;
}

// *Aumentar o disminuir la cantidad de productos
function productNumber(op) {
    let productNumber = document.getElementById('quantity');

    if (op == 'add' && productNumber.value < 20) {
        productNumber.value = parseInt(productNumber.value) + 1;
    }

    if (op == 'less' && productNumber.value > 0) {
        productNumber.value = parseInt(productNumber.value) - 1;
    }
}

function readCookie(name) {
    return (
        decodeURIComponent(
            document.cookie.replace(
                new RegExp(
                    '(?:(?:^|.*;)\\s*' +
                        name.replace(/[\-\.\+\*]/g, '\\$&') +
                        '\\s*\\=\\s*([^;]*).*$)|^.*$'
                ),
                '$1'
            )
        ) || null
    );
}

// Leemos la cookie
let updatePrice = readCookie('price');

document.getElementById('updatePrice').innerHTML = `$${updatePrice}`;

// Metodo de envio

let localInput = document.getElementById('local');
let deliveryInput = document.getElementById('delivery');
let mrwInput = document.getElementById('mrw');

let localForm = document.getElementById('localform');
let deliveryForm = document.getElementById('deliveryform');
let mrwForm = document.getElementById('mrwform');

localInput.addEventListener('click', () => {
    if (localInput.checked) {
        deliveryInput.checked = false;
        mrwInput.checked = false;

        localForm.classList.remove('hidden');
        deliveryForm.classList.add('hidden');
        mrwForm.classList.add('hidden');
    }
});

deliveryInput.addEventListener('click', () => {
    if (deliveryInput.checked) {
        localInput.checked = false;
        mrwInput.checked = false;

        deliveryForm.classList.remove('hidden');
        localForm.classList.add('hidden');
        mrwForm.classList.add('hidden');
    }
});

mrwInput.addEventListener('click', () => {
    if (mrwInput.checked) {
        localInput.checked = false;
        deliveryInput.checked = false;

        mrwForm.classList.remove('hidden');
        localForm.classList.add('hidden');
        deliveryForm.classList.add('hidden');
    }
});
