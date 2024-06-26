import React from 'react';
import FormCreateUser from '../components/FormCreateUser';

const CreateUser = () => {
    const handleSave = (formData) => {
        console.log('User data:', formData);
        // Lógica para manejar el guardado del usuario
    };
    return (
        <div>
            <FormCreateUser onSave={handleSave} />
        </div>
    );
};

export default CreateUser;