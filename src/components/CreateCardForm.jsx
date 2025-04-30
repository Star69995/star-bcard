import React from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserContext';
import { useNavigate } from 'react-router-dom';
import CardForm from './CardForm';

export default function CreateCardForm() {
    const { token } = useUser();
    const navigate = useNavigate();

    const defaultValues = {
        title: '', subtitle: '', description: '', email: '', phone: '', web: '',
        imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '',
        houseNumber: '', zip: ''
    };

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
                alt: values.imageAlt,
            },
            address: {
                state: values.state,
                country: values.country,
                city: values.city,
                street: values.street,
                houseNumber: Number(values.houseNumber),
                zip: Number(values.zip),
            },
        };

        const phoneRegex = /^\+?[0-9]{10,12}$/
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

        if (!phoneRegex.test(values.phone)) {
            setErrors({ phone: 'Invalid Israeli phone number' });
            setSubmitting(false);
            return;
        }

        if (!emailRegex.test(values.email)) {
            setErrors({ email: 'Invalid email address' });
            setSubmitting(false);
            return;
        }

        if (values.web && !urlRegex.test(values.web)) {
            setErrors({ web: 'Invalid URL' });
            setSubmitting(false);
            return;
        }

        if (values.imageUrl && !urlRegex.test(values.imageUrl)) {
            setErrors({ imageUrl: 'Invalid Image URL' });
            setSubmitting(false);
            return;
        }

        try {
            const { data } = await axios.post(
                'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
                payload,
                { headers: { 'x-auth-token': token } }
            );
            navigate(`/cards/${data._id}`);
        } catch (error) {
            console.error('Error response:', error.response?.data || error.message);
            setErrors({ title: 'Failed to create card' });
        } finally {
            setSubmitting(false);
        }
    };

    return <CardForm initialValues={defaultValues} onSubmit={handleSubmit} isEdit={false} />;
}
