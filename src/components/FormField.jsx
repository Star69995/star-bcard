import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';

function FormField({ label, name, type = 'text', touched, errors }) {
    return (

        <div className="col-md-6">
                <label htmlFor={name}>{label}</label>
                <Field
                    type={type}
                    id={name}
                    name={name}
                    className={`form-control ${touched[name] && errors[name] ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name={name} component="div" className="invalid-feedback" />
            </div>
    
    );
}

export default FormField;