export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.buttonSelector);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableSubmitButton()
    }
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.disableButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  disableButton() {
    this._buttonElement.setAttribute('disabled', '');
    this._buttonElement.classList.add(this._settings.disableButtonClass);
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    input.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.inputErrorClassSpan);
  };

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.inputErrorClassSpan);
    errorElement.textContent = '';
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  inputErrorClassSpan: 'popup__span_visibility',
  disableButtonClass: 'popup__button_disabled'
}
