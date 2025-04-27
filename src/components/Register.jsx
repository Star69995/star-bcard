import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormField from './FormField';
import { useTheme } from "../providers/ThemeContext";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

    const { theme } = useTheme();
    const navigate = useNavigate()


    // Initial form values
    const initialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        biz: false,
        imageUrl: '',
        imageAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: ''
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required'),
        lastName: Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
            .required('Password is required'),
        phone: Yup.string()
            .matches(/^\+?[0-9]{10,12}$/, 'Phone number must be between 10-12 digits')
            .required('Phone number is required'),
        biz: Yup.boolean(),
        imageUrl: Yup.string()
            .url('Invalid URL'),
        imageAlt: Yup.string(),
        state: Yup.string(),
        country: Yup.string()
            .required('Country is required'),
        city: Yup.string()
            .required('City is required'),
        street: Yup.string()
            .required('Street is required'),
        houseNumber: Yup.string()
            .required('House number is required'),
        zip: Yup.string()

    });

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const payload = {
                name: {
                    first: values.firstName,
                    middle: values.middleName,
                    last: values.lastName
                },
                phone: values.phone,
                email: values.email,
                password: values.password,
                image: {
                    url: values.imageUrl,
                    alt: values.imageAlt
                },
                address: {
                    state: values.state,
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    houseNumber: Number(values.houseNumber),
                    zip: Number(values.zip)
                },
                isBusiness: values.biz
            }

            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', payload)

            const loginRes = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
                email: values.email,
                password: values.password
            })

            localStorage.setItem('token', loginRes.data)

            toast.success('Registration successful!')
            
            // navigate to home page
            navigate('/')
        } catch (error) {
            console.error(error)
            setErrors({ email: 'Registration or login failed' })
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
                            <h1 className="text-center mb-4">Register</h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
                                        <div className="row mb-3">
                                            <FormField label="First Name" name="firstName" touched={touched} errors={errors} />
                                            <FormField label="Middle Name" name="middleName" touched={touched} errors={errors} />
                                            <FormField label="Last Name" name="lastName" touched={touched} errors={errors} />
                                            <FormField label="Email" name="email" type="email" touched={touched} errors={errors} />
                                            <FormField label="Phone" name="phone" type="tel" touched={touched} errors={errors} />
                                            <FormField label="Password" name="password" type="password" touched={touched} errors={errors} />
                                            <FormField label="Image URL" name="imageUrl" type="text" touched={touched} errors={errors} />
                                            <FormField label="Image Alt" name="imageAlt" type="text" touched={touched} errors={errors} />
                                            <FormField label="State" name="state" type="text" touched={touched} errors={errors} />
                                            <FormField label="Country" name="country" type="text" touched={touched} errors={errors} />
                                            <FormField label="City" name="city" type="text" touched={touched} errors={errors} />
                                            <FormField label="Street" name="street" type="text" touched={touched} errors={errors} />
                                            <FormField label="House Number" name="houseNumber" type="text" touched={touched} errors={errors} />
                                            <FormField label="Zip" name="zip" type="text" touched={touched} errors={errors} />

                                            <div className="col-md-6 mt-3">
                                                <Field
                                                    type="checkbox"
                                                    id="biz"
                                                    name="biz"
                                                    className="form-check-input"
                                                />
                                                <label className="form-check-label ms-2" htmlFor="biz">
                                                    Signup as business
                                                </label>
                                                <ErrorMessage name="biz" component="div" className="invalid-feedback" />
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
                                                        Registering...
                                                    </>
                                                ) : (
                                                    'Register'
                                                )}
                                            </button>
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

export default Register;