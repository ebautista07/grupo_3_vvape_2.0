window.addEventListener('load',function(){
    let formulario = document.querySelector('form.createForm')

    formulario.addEventListener('submit',function(event){
        // event.preventDefault();
        let errors = []
        // valiudaciones de campos formulario

        let name = document.querySelector('input.name')
        if(name.value == ''){
            errors.push('Llena el campo de nombre');
        }else if(name.value.length < 5){
            errors.push('El campo de nombre debe contener mínimo 5 caracteres')
        }
        
        let description = document.querySelector('input.description')
        if(description.value == ''){
            errors.push('Llena el campo de descripción');
        }else if(description.value.length < 20){
            errors.push('El campo de descripción debe contener mínimo 20 caracteres')
        }

        let category = document.querySelector('select.category')
        if(category.value == ''){
            errors.push('Selecciona el tipo de producto');
        }

        // let img = document.querySelector('input.img');
        // let filePath = img.value;
        // let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        // if(!allowedExtensions.exec(filePath)){
        //     errors.push('Por favor adjunta archivos con una extensión válida ejm:.jpeg/.jpg/.png/.gif.');
        //     // user_img.value = '';
        //     // return false;
        // }
        


        if (errors.length > 0){
            event.preventDefault();
            let ulErrors = document.querySelector('div.errorsMsg ul')
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>'
            }
        }
    })
}); 


