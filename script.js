
// VALIDADOR DO FORMULÁRIO DE CADASTRO
let signupValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');
        signupValidator.clearerros();
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = signupValidator.checkInput(input);
            if (check !== true) {
                send = false;
                signupValidator.showError(input, check);
            }
        }
        if (send) {
            form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let r in rules){
                let rDetails = rules[r].split('=');
                let inputString = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
                switch (rDetails[0]) {
                    case "required-string":
                        if (!inputString.test(input.value)) { //verifica se há números no input
                        return "Este campo nao aceita numeros.";
                        }
                    break;
                    case 'required':
                        if (input.value.trim() === '') {
                            return `Este campo não pode ser vazio.`;
                        }
                    break;
                    case 'min':
                       if (input.value.length < rDetails[1]) {
                           return `O campo precisa ter pelo menos ${rDetails[1]} caracteres`;
                       } 
                    break;
                    case 'email':
                       if (input.value != '') {
                           let expRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                           if (!expRegular.test(input.value.toLowerCase())) {
                               return `E-mail digitado não é válido!`;
                           }
                       } 
                    break;
                
                    default:
                        break;
                }
            }
        }
        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#F00';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearerros:()=>{
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';         
        }
        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();          
        }
    }
};

// VALIDADOR DO FORMULÁRIO DE LOGIN
let loginValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();

        let send = true;
        let inputs = form2.querySelectorAll('input');
        loginValidator.clearerros();
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = loginValidator.checkInput(input);
            if (check !== true) {
                send = false;
                loginValidator.showError(input, check);
            }
        }
        if (send) {
            form2.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let r in rules){
                let rDetails = rules[r].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value.trim() === '') {
                            return `Este campo não pode ser vazio.`;
                        }
                    break;
                    case 'min':
                       if (input.value.length < rDetails[1]) {
                           return `O campo precisa ter pelo menos ${rDetails[1]} caracteres`;
                       } 
                    break;
                    case 'email':
                       if (input.value != '') {
                           let expRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                           if (!expRegular.test(input.value.toLowerCase())) {
                               return `E-mail digitado não é válido!`;
                           }
                       } 
                    break;               
                    default:
                        break;
                }
            }
        }
        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#F00';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearerros:()=>{
        let inputs = form2.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';            
        }
        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();            
        }
    }
};
const c = (el)=> document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);

c('.rightside--creat-account').style.display = 'none';
c('.rightside--access-account').style.display = 'none';

cs('.signup, .login').forEach((item)=>{
    item.addEventListener('click', ()=>{
      switch (item.innerHTML) {
          case "Cadastre-se":
            screenSignup();
              break;
          case "Login":
            screenLogin();
              break;     
          default:
              break;
      }
    })
})
function screenSignup() {
    mainScreen();
    btnSignupChangeColor();
    c('.rightside--creat-account').style.opacity = '0';
    c('.rightside--access-account').style.display = 'none';
    c('.rightside--creat-account').style.display = 'block';
    setTimeout(()=>{
        c('.rightside--creat-account').style.opacity = '1';
        c('.rightside--access-account').style.opacity = '0';
        c('.rightside--creat-account').style.transition = 'all linear 0.5s';
    }, 300)
}
function screenLogin() {
    mainScreen();
    btnLoginChangeColor();
    c('.rightside--access-account').style.opacity = '0';
    c('.rightside--access-account').style.display = 'block';
    c('.rightside--creat-account').style.display = 'none';
    setTimeout(()=>{
        c('.rightside--access-account').style.opacity = '1';
        c('.rightside--creat-account').style.opacity = '0';
        c('.rightside--access-account').style.right = '0';
        c('.rightside--access-account').style.transition = 'all linear 0.5s';
    }, 300) 
}
function mainScreen() {
    c('.leftside').style.opacity = '0';
    setTimeout(()=>{
        c('.leftside').style.transition = 'all linear 0.5s';
        c('.leftside').style.opacity = '1';       
    }, 300)
}

function btnSignupChangeColor() {
    c('.login').style = '';
    c('.signup').style.backgroundColor = '#999';
    c('.signup').style.color = '#000';
    c('.signup').style.border = '2px solid #000';
}
function btnLoginChangeColor() {
    c('.signup').style = '';
    c('.login').style.backgroundColor = '#999';
    c('.login').style.color = '#000';
    c('.login').style.border = '2px solid #000';
}
let form = document.querySelector(".signup--Validator");
let form2 = document.querySelector(".login--Validator");
form.addEventListener('submit', signupValidator.handleSubmit)
form2.addEventListener('submit', loginValidator.handleSubmit)