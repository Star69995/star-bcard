import { Field, ErrorMessage } from 'formik';
import React from 'react';
import { useTheme } from '../providers/ThemeContext'; 

function FormField({ label, name, type = 'text', touched, errors }) {
    const { theme } = useTheme(); 

    // הגדרת סטיילים לשדה הקלט על פי המצב
    const inputStyle = theme === 'dark'
        ? { backgroundColor: '#333333', color: '#e0e0e0', border: '1px solid #444444' }
        : { backgroundColor: '#ffffff', color: '#212529', border: '1px solid #ced4da' };

    return (
        <div className="col-md-6">
            <label htmlFor={name}>{label}</label>
            <Field
                type={type}
                id={name}
                name={name}
                className={`form-control ${touched[name] && errors[name] ? 'is-invalid' : ''}`}
                style={inputStyle}  
            />
            <ErrorMessage name={name} component="div" className="invalid-feedback" />
        </div>
    );
}

export default FormField;
