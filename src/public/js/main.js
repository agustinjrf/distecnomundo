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

    //menu.classList.toggle('animate__slideOutLeft');
    menu.classList.toggle('hidden');
    //menu.classList.toggle('animate__slideInLeft');
}

function filterToggle() {
    const filter = document.querySelector('#filter');

    //filter.classList.toggle('animate__slideOutLeft');
    filter.classList.toggle('hidden');
    //filter.classList.toggle('animate__slideInLeft');
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
document.getElementById('updatePrice2').innerHTML = `$${updatePrice}`;

// Metodo de envio

let localInput = document.getElementById('local');
let deliveryInput = document.getElementById('delivery');
let mrwInput = document.getElementById('mrw');
let libertyInput = document.getElementById('liberty');
let zoomInput = document.getElementById('zoom');
let tealcaInput = document.getElementById('tealca');

let localForm = document.getElementById('localform');
let deliveryForm = document.getElementById('deliveryform');
let mrwForm = document.getElementById('mrwform');
let libertyForm = document.getElementById('libertyform');
let zoomForm = document.getElementById('zoomform');
let tealcaForm = document.getElementById('tealcaform');

localInput.addEventListener('click', () => {
    if (localInput.checked) {
        deliveryInput.checked = false;
        mrwInput.checked = false;
        libertyInput.checked = false;
        zoomInput.checked = false;
        tealcaInput.checked = false;

        localForm.classList.remove('hidden');
        deliveryForm.classList.add('hidden');
        mrwForm.classList.add('hidden');
        libertyForm.classList.add('hidden');
        zoomForm.classList.add('hidden');
        tealcaForm.classList.add('hidden');
    }
});

deliveryInput.addEventListener('click', () => {
    if (deliveryInput.checked) {
        localInput.checked = false;
        mrwInput.checked = false;
        libertyInput.checked = false;
        zoomInput.checked = false;
        tealcaInput.checked = false;

        localForm.classList.add('hidden');
        deliveryForm.classList.remove('hidden');
        mrwForm.classList.add('hidden');
        libertyForm.classList.add('hidden');
        zoomForm.classList.add('hidden');
        tealcaForm.classList.add('hidden');
    }
});
mrwInput.addEventListener('click', () => {
    if (mrwInput.checked) {
        localInput.checked = false;
        deliveryInput.checked = false;
        libertyInput.checked = false;
        zoomInput.checked = false;
        tealcaInput.checked = false;

        localForm.classList.add('hidden');
        deliveryForm.classList.add('hidden');
        mrwForm.classList.remove('hidden');
        libertyForm.classList.add('hidden');
        zoomForm.classList.add('hidden');
        tealcaForm.classList.add('hidden');
    }
});
libertyInput.addEventListener('click', () => {
    if (libertyInput.checked) {
        localInput.checked = false;
        deliveryInput.checked = false;
        mrwInput.checked = false;
        zoomInput.checked = false;
        tealcaInput.checked = false;

        localForm.classList.add('hidden');
        deliveryForm.classList.add('hidden');
        mrwForm.classList.add('hidden');
        libertyForm.classList.remove('hidden');
        zoomForm.classList.add('hidden');
        tealcaForm.classList.add('hidden');
    }
});
zoomInput.addEventListener('click', () => {
    if (zoomInput.checked) {
        localInput.checked = false;
        deliveryInput.checked = false;
        mrwInput.checked = false;
        libertyInput.checked = false;
        tealcaInput.checked = false;

        localForm.classList.add('hidden');
        deliveryForm.classList.add('hidden');
        mrwForm.classList.add('hidden');
        libertyForm.classList.add('hidden');
        zoomForm.classList.remove('hidden');
        tealcaForm.classList.add('hidden');
    }
});
tealcaInput.addEventListener('click', () => {
    if (tealcaInput.checked) {
        localInput.checked = false;
        deliveryInput.checked = false;
        mrwInput.checked = false;
        libertyInput.checked = false;
        zoomInput.checked = false;

        localForm.classList.add('hidden');
        deliveryForm.classList.add('hidden');
        mrwForm.classList.add('hidden');
        libertyForm.classList.add('hidden');
        zoomForm.classList.add('hidden');
        tealcaForm.classList.remove('hidden');
    }
});

// Cerrando ventanas de alerta
function closeAlert() {
    const closeAlert = document.querySelector('.alert__item');
    closeAlert.classList.toggle('close');
}

function closePushAlert() {
    const pushAlert = document.querySelector('.alert .push');
    pushAlert.classList.toggle('close');
}
setTimeout(closePushAlert, 6000);

// Listener del boton para cerrar.
document.querySelector('#btn-close').addEventListener('click', () => {
    overlay.classList.remove('active');
});
