window.addEventListener('load',function(){
    let formulario = document.querySelector('form.registerForm')

    console.log(formulario)
    formulario.addEventListener('submit',function(event){
        // event.preventDefault();
        let errors = []
        // valiudaciones de campos formulario

        let birth_date = document.querySelector('input.birth_date')
        if(birth_date.value == ''){
            errors.push('Llena tu fecha de nacimiento');
        }

        let name = document.querySelector('input.name')
        if(name.value == ''){
            errors.push('Llena el campo de nombre');
        }else if(name.value.length < 2){
            errors.push('El campo de nombre debe contener mínimo 2 caracteres')
        }
        
        let last_name = document.querySelector('input.last_name')
        if(last_name.value == ''){
            errors.push('Llena el campo de apellido');
        }else if(last_name.value.length < 2){
            errors.push('El campo de apellido debe contener mínimo 2 caracteres')
        }

        let validEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        let email = document.querySelector('input.email')
        if(!email.value.match(validEmail)){
            errors.push("Por favor ingresa un email válido");
        }

        let password = document.querySelector('input.password')
        if(password.value == ''){
            errors.push('Llena el campo de contraseña');
        }else if(password.value.length < 8){
            errors.push('El campo de contraseña debe contener mínimo 8 caracteres')
        }

        let user_img = document.querySelector('input.user_img');
        let filePath = user_img.value;
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(!allowedExtensions.exec(filePath)){
            errors.push('Por favor adjunta archivos con una extensión válida ejm:.jpeg/.jpg/.png/.gif.');
            // user_img.value = '';
            // return false;
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


