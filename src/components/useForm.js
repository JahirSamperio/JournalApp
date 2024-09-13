import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm); //Recibe el arreglo que se le envie desde el componente del formulario
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators();
    }, [formState])

    //Se usa para cambiar el render de cada nota
    useEffect( () => {
        setFormState(initialForm);
    }, [initialForm])
    
    const isFormValid = useMemo( () => {
        
        for(const formValue of Object.keys(formValidation)){
            if(formValidation[formValue] !== null) return false
        }
        return true;
    }, [formValidation])

    const onInputChange = ({target}) => { //recibe el evento
        const {name, value} = target; //Desestructura el evento en el nombre y valor del input
        setFormState({
            ...formState, //mantiene los campos anteriores sin mutar
            [name]: value //Establece el valor de acuerdo al nombre del input
        })
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)){ //El nombre de la propiedad del objeto (email, password, displayName)
            const [ fn, errorMessage] = formValidations[formField]; //Desestructuramos la funcion(fn) y el errorMessage, del formValidations[email] seria formValidations.email
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage //Checa si hay errores y si retorna false para enviar un errorMessage
        }

        setFormValidation(formCheckedValues); //Enviamos los mensajes de error de regreso
    }

    return { 
        ...formState, //Retornas los valores para poder ser desestructurados
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        
        ...formValidation
    }
}