const formulario = document.getElementById('checkout-form');
const userInputs = document.querySelectorAll('.user-info input');
const payInputs = document.querySelectorAll('.order-info input');
const deliveryInputs = document.querySelectorAll('.send-info input');

// Expresiones regulares
const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 numeros.
};

// Campos a confirmar
const fields = {
    name: false,
    lastname: false,
    email: false,
    phone: false,
    dni: false,
    clientCity: false,
    clientState: false,
    payMethod: false,
    deliveryMethod: false,
};

// Validando campos
const validateField = (expression, input, field) => {
    if (expression.test(input.value)) {
        document
            .getElementById(`group__${field}`)
            .classList.remove('input__error');
        document
            .getElementById(`group__${field}`)
            .classList.add('input__success');

        fields[field] = true;
    } else {
        document
            .getElementById(`group__${field}`)
            .classList.add('input__error');
        document
            .getElementById(`group__${field}`)
            .classList.remove('input__success');

        fields[field] = false;
    }
};

const validateForm = (userInputs) => {
    switch (userInputs.target.name) {
        case 'name':
            validateField(expressions.name, userInputs.value, 'name');
            break;
        case 'lastname':
            validateField(expressions.name, userInputs.target, 'lastname');
            break;
        case 'email':
            validateField(expressions.email, userInputs.target, 'email');
            break;
        case 'phone':
            validateField(expressions.phone, userInputs.target, 'phone');
            break;
        case 'dni':
            validateField(expressions.phone, userInputs.target, 'dni');
            break;
        case 'city':
            validateField(expressions.name, userInputs.target, 'clientCity');
            break;
        case 'state':
            validateField(expressions.name, userInputs.target, 'clientState');
            break;
    }
};

userInputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

// Habilitar boton
