import React, { useState } from 'react'

export const useForm = (initialForm,validationForm) => {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState(null);

    const handleChange=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setForm({
            ...form,
            [name]:value
        });
    };

    const handleSubmit=(e)=>{

    };

    return {form,loading,errors,response,handleChange,handleSubmit};
}
