const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telephone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const fields = {
	user: false,
	name: false,
	password: false,
	email: false,
	telephone: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "user":
			validateField(expressions.user, e.target, 'user');
		break;
		case "name":
			validateField(expressions.name, e.target, 'name');
		break;
		case "password":
			validateField(expressions.password, e.target, 'password');
			validatePassword2();
		break;
		case "password2":
			validatePassword2();
		break;
		case "email":
			validateField(expressions.email, e.target, 'email');
		break;
		case "telephone":
			validateField(expressions.telephone, e.target, 'telephone');
		break;
	}
}

const validateField = (expressions, input, field) => {
	if(expressions.test(input.value)){
		document.getElementById(`group__${field}`).classList.remove('form__group-incorrect');
		document.getElementById(`group__${field}`).classList.add('form__group-correct');
		document.querySelector(`#group__${field} i`).classList.add('fa-check-circle');
		document.querySelector(`#group__${field} i`).classList.remove('fa-times-circle');
		document.querySelector(`#group__${field} .form__input-error`).classList.remove('form__input-error-active');
		fields[field] = true;
	} else {
		document.getElementById(`group__${field}`).classList.add('form__group-incorrect');
		document.getElementById(`group__${field}`).classList.remove('form__group-correct');
		document.querySelector(`#group__${field} i`).classList.add('fa-times-circle');
		document.querySelector(`#group__${field} i`).classList.remove('fa-check-circle');
		document.querySelector(`#group__${field} .form__input-error`).classList.add('form__input-error-active');
		fields[field] = false;
	}
}

const validatePassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`group__password2`).classList.add('form__group-incorrect');
		document.getElementById(`group__password2`).classList.remove('form__group-correct');
		document.querySelector(`#group__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#group__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#group__password2 .form__input-error`).classList.add('form__input-error-active');
		fields['password'] = false;
	} else {
		document.getElementById(`group__password2`).classList.remove('form__group-incorrect');
		document.getElementById(`group__password2`).classList.add('form__group-correct');
		document.querySelector(`#group__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#group__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#group__password2 .form__input-error`).classList.remove('form__input-error-active');
		fields['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const terms = document.getElementById('terms');
	if(fields.user && fields.name && fields.password && fields.email && fields.telephone && terms.checked ){
		form.reset();

		document.getElementById('form__message-success').classList.add('form__message-success-active');
		setTimeout(() => {
			document.getElementById('form__message-success').classList.remove('form__message-success-active');
		}, 5000);

		document.querySelectorAll('.form__group-correct').forEach((icon) => {
			icon.classList.remove('form__group-correct');
		});
	} else {
		document.getElementById('form__message').classList.add('form__message-active');
	}
});