import throttle from "lodash.throttle";
const STORAGE_KEY = 'feedback-form-state';
const dataForm = {};
const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector(".feedback-form input"),
    textarea: document.querySelector(".feedback-form textarea"),
};
refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onSubmit);
storageForm();
function onInput(evt) {
    dataForm[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
  };
  function storageForm() {
    const savedInputs = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedInputs) {
      refs.email.value = savedInputs.email;
      refs.textarea.value = savedInputs.message;
    }
  }
  
  function onSubmit(evt) {
    evt.preventDefault();
  
    evt.currentTarget.reset();
    const savedInputs = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!savedInputs) {
      alert(
        'The form is not filled! Please fill in all fields and try sending again'
      );
      return;
    }
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
  }