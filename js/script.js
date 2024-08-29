/// burger
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__body");
const openModal = document.querySelectorAll("button[data-open-modal]");
let modal = document.querySelector(".modal");
let success = document.querySelector(".success");
let closeModal = document.querySelectorAll(".close");
let modalBody = document.querySelector(".modal__body");
const form = document.querySelectorAll("form[data-form]");
const sendFormBtn = document.querySelector("button[data-send-btn]");
const required = document.querySelectorAll(".required");
const textError = document.querySelector(".modal__error-big");

burger?.addEventListener("click", (e) => {
  menu?.classList.toggle("menu-open");
});
const header = document.querySelector(".header");
const home = document.querySelector(".home");
window.addEventListener("scroll", function () {
  if (pageYOffset > 40) {
    header.style.position = "fixed";
    home.style.marginTop = "155px";
  } else {
    header.style.position = "static";
    home.style.marginTop = "82px";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let phoneInputs = document.querySelectorAll(".tel");

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  let onPhonePaste = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  };

  let onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  };
  let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  };
  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }
});

openModal.forEach((open) => {
  actionModal(open, modal, modalBody);
});

closeModal.forEach((close) => {
  modalClose(modal, close, modalBody);
  modalClose(document.querySelector('.cookie'), close, document.querySelector('.cookie__body'));
});

for (let i = 0; i < form.length; i++) {
  form[i].addEventListener("change", function (e) {
    e.preventDefault();
    let hasError = false;

    for (let i = 0; i < required.length; i++) {
      if (!required[i].querySelector(".modal__input").value.trim()) {
        required[i].classList.add("error");

        required[i].querySelector(".modal__error").textContent =
          "This field is required.";
        hasError = true;
        console.log(required[i].querySelector(".tel")?.value.length)
      
       } else if (required[i].querySelector(".tel")?.value.length < 18 && required[i].querySelector(".tel")?.value.length  > 0) {
        hasError = true
        required[i].querySelector(".modal__error").textContent =
     "Invalid phone";
      } else {
        required[i].classList.remove("error");
      }
    }
    if (hasError == false) {
      textError.textContent = "";
      // sendFormBtn.addEventListener("click", (e) => {
      modalClose(modal, sendFormBtn, modalBody);
      actionModal(
        sendFormBtn,
        document.querySelector(".success"),
        document.querySelector(".success .modal__body")
      );
      document.querySelectorAll(".success .close").forEach(close => {
          modalClose(
            document.querySelector(".success"),
            close,
            document.querySelector(".success .modal__body")
          );
      })
     
      
      // });
    } else {
      textError.textContent = "Please fill in all required fields";
    }
    sendFormBtn.disabled = hasError;
  });
}

function actionModal(btn, modal, body, closeBtn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.lastElementChild.style.background = "rgba(0,0,0,0.5)";
    modal.style.visibility = "visible";
    body.style.opacity = "1";
  });
}
function modalClose(modal, close, modalBody) {
  close.addEventListener("click", (e) => {
    
    modal.lastElementChild.style.background = "transparent";
    modal.style.visibility = "hidden";
    modalBody.style.opacity = "0";
  });
}
