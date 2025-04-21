import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormField from './FormField';
import { useTheme } from "../providers/ThemeContext";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserContext';

function Login() {
    const { updateUserFromToken } = useUser();
    const { theme } = useTheme();
    const navigate = useNavigate()

    // Initial form values
    const initialValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    });

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            // console.log("Login values:", values)
            const res = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
                email: values.email,
                password: values.password
            })
            // console.log("Login response:", res.data)

            updateUserFromToken(res.data);
            
            // navigate to home page
            navigate('/')

            // אפשר לנתב לדף אחר אם רוצים:
            // navigate('/dashboard')
        } catch (error) {
            console.error(error)
            setErrors({ password: 'Invalid email or password' })
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className={`card shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
                        <div className="card-body">
                            <h1 className="text-center mb-4">Login</h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
                                        <div className="row mb-3">
                                            <FormField label="Email" name="email" type="email" touched={touched} errors={errors} />
                                            <FormField label="Password" name="password" type="password" touched={touched} errors={errors} />

                                            <div className="col-12 mt-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {/* <div>
                                                        <Field
                                                            type="checkbox"
                                                            id="rememberMe"
                                                            name="rememberMe"
                                                            className="form-check-input"
                                                        />
                                                        <label className="form-check-label ms-2" htmlFor="rememberMe">
                                                            Remember me
                                                        </label>
                                                    </div> */}
                                                    <div>
                                                        <a href="/forgot-password" className={`text-decoration-none ${theme === "dark" ? "text-light" : "text-primary"}`}>
                                                            Forgot Password?
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-primary"}`}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Logging in...
                                                    </>
                                                ) : (
                                                    'Login'
                                                )}
                                            </button>
                                        </div>

                                        <div className="text-center mt-3">
                                            <p>
                                                Don't have an account yet?{' '}
                                                <a href="/register" className={`text-decoration-none ${theme === "dark" ? "text-light" : "text-primary"}`}>
                                                    Register now
                                                </a>
                                            </p>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;