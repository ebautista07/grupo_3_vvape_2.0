window.addEventListener('load',function(){
    let formulario = document.querySelector('form.loginForm')

    console.log(formulario)

    formulario.addEventListener('submit',function(event){
        // event.preventDefault();
        let errors = []
        // valiudaciones de campos formulario

        let validEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        let email = document.querySelector('input.email')
        if(!email.value.match(validEmail)){
            errors.push("Por favor ingresa un email válido");
        }else if(email.value == ''){
            errors.push('Llena el campo de email');
        }

        let password = document.querySelector('input.password')
        if(password.value == ''){
            errors.push('Llena el campo de contraseña');
        }else if(password.value.length < 8){
            errors.push('El campo de contraseña debe contener mínimo 8 caracteres')
        }

        if (errors.length > 0){
            event.preventDefault();
            let ulErrors = document.querySelector('div.errorsMsg ul')
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>'
            }
        }
    })
}); 

console.log(errors);

