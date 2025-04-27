import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormField from './FormField';
import { useTheme } from "../providers/ThemeContext";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../providers/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardForm({ cardId }) {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { token } = useUser();
    const { id: paramId } = useParams();
    const finalCardId = cardId || paramId;
    const isEdit = !!finalCardId;

    const [initialValues, setInitialValues] = useState(null);
    const [isLoading, setIsLoading] = useState(isEdit);

    useEffect(() => {
        if (!isEdit) {
            setInitialValues({
                title: '', subtitle: '', description: '', email: '', phone: '', web: '',
                imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '',
                houseNumber: '', zip: ''
            });
            return;
        }

        setIsLoading(true);
        axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${finalCardId}`, {
            headers: { 'x-auth-token': token }
        })
            .then(({ data }) => {
                setInitialValues({
                    title: data.title,
                    subtitle: data.subtitle,
                    description: data.description,
                    email: data.email,
                    phone: data.phone,
                    web: data.web,
                    imageUrl: data.image.url,
                    imageAlt: data.image.alt,
                    state: data.address.state || '',
                    country: data.address.country,
                    city: data.address.city,
                    street: data.address.street,
                    houseNumber: data.address.houseNumber,
                    zip: data.address.zip
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [finalCardId, token, isEdit]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        subtitle: Yup.string().required('Subtitle is required'),
        description: Yup.string().required('Description is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^\+?[0-9]{10,12}$/, 'Phone number must be between 10-12 digits').required('Phone number is required'),
        web: Yup.string().url('Invalid URL'),
        imageUrl: Yup.string().url('Invalid URL'),
        imageAlt: Yup.string(),
        state: Yup.string(),
        country: Yup.string().required('Country is required'),
        city: Yup.string().required('City is required'),
        street: Yup.string().required('Street is required'),
        houseNumber: Yup.string().required('House number is required'),
        zip: Yup.string()
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const payload = {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            phone: values.phone,
            email: values.email,
            web: values.web,
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
            }
        };

        try {
            let method = isEdit ? 'put' : 'post';
            let requestUrl = isEdit
                ? `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${finalCardId}`
                : 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards';

            const { data } = await axios[method](requestUrl, payload, {
                headers: { 'x-auth-token': token }
            });
            toast.success(isEdit ? "Card updated successfully" : "Card created successfully");
            navigate(`/cards/${isEdit ? finalCardId : data._id}`);
        } catch (error) {
            console.error(error);
            setErrors({ email: 'Card creation failed' });
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) return (
        <div className="container mt-5 text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading card data...</p>
        </div>
    );

    if (!initialValues) return (
        <div className="container mt-5 text-center">
            <div className="alert alert-danger">Failed to load card data</div>
        </div>
    );

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className={`card shadow ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
                        <div className="card-body">
                            <h1 className="text-center mb-4">{isEdit ? 'Edit Card' : 'Create Card'}</h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
                                        <div className="row mb-3">
                                            <FormField label="Title" name="title" touched={touched} errors={errors} />
                                            <FormField label="Subtitle" name="subtitle" touched={touched} errors={errors} />
                                            <FormField label="Description" name="description" touched={touched} errors={errors} />
                                            <FormField label="Email" name="email" type="email" touched={touched} errors={errors} />
                                            <FormField label="Phone" name="phone" type="tel" touched={touched} errors={errors} />
                                            <FormField label="Web" name="web" type="text" touched={touched} errors={errors} />
                                            <FormField label="Image URL" name="imageUrl" type="text" touched={touched} errors={errors} />
                                            <FormField label="Image Alt" name="imageAlt" type="text" touched={touched} errors={errors} />
                                            <FormField label="State" name="state" type="text" touched={touched} errors={errors} />
                                            <FormField label="Country" name="country" type="text" touched={touched} errors={errors} />
                                            <FormField label="City" name="city" type="text" touched={touched} errors={errors} />
                                            <FormField label="Street" name="street" type="text" touched={touched} errors={errors} />
                                            <FormField label="House Number" name="houseNumber" type="text" touched={touched} errors={errors} />
                                            <FormField label="Zip" name="zip" type="text" touched={touched} errors={errors} />
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
                                                        {isEdit ? 'Updating Card...' : 'Creating Card...'}
                                                    </>
                                                ) : (
                                                    isEdit ? 'Update Card' : 'Create Card'
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

export default CardForm;