import { USER, PASS } from './config.js'
let id = (id) => document.getElementById(id);
let user = id("loginUser"),
    pass = id("loginPass"),
    confirm = id("loginConfirm"),
    error = id("loginError"),
    dialog = id("loginDialog"),
    container = id("protoContainer");

if (USER.length && PASS.length) {
  const loginCred = {
    user: USER,
    pass: PASS
  };

  dialog.showModal();

  confirm.addEventListener("click", (event) => {
    event.preventDefault();
    validate();
  });

  const validate = () => {
    let testPass = btoa(pass.value) === loginCred.pass;
    let testUser = btoa(user.value) === loginCred.user;

    if (testPass && testUser) {
      success();
    } else {
      error.removeAttribute("hidden");
    }
  }

  const success = () => {
    dialog.close();
    container.removeAttribute("hidden");
  }
} else {
  container.removeAttribute("hidden");
}