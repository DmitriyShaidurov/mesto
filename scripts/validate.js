const showInputError = (config, formElement, input, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${input.id}`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputErrorClassSpan);
};

const hideInputError = (config, formElement, input) => {
  const errorElement = formElement.querySelector(`#error-${input.id}`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.inputErrorClassSpan);
  errorElement.textContent = '';
};

const checkInputValidity = (config, formElement, input) => {
  if (!input.validity.valid) {
    showInputError(config, formElement, input, input.validationMessage);
  } else {
    hideInputError(config, formElement, input);
  }
};

function setEventListeners(config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.buttonSelector);
  toggleButtonState(config, inputList, buttonElement)
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(config, formElement, input);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
}

function disableButton(config, buttonElement) {
  buttonElement.setAttribute('disabled', '');
  buttonElement.classList.add(config);
}



function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  inputErrorClassSpan: 'popup__span_visibility',
  disableButtonClass: 'popup__button_disabled'
})

function hasInvalidInput(input) {
  return input.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(config, input, buttonElement) {
  if (hasInvalidInput(input)) {
    disableButton(config.disableButtonClass, buttonElement);
  } else {
    buttonElement.classList.remove(config.disableButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}


