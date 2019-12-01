export function findValidation(form){
    const inputs = form.querySelectorAll("input");
    for(let i = 0; i < inputs.length; i++){
        console.log(inputs[i].id, inputs[i].validity);
    }
}