import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import CardForm from './CardForm';

export default function EditCardForm() {
    const { token } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                    { headers: { 'x-auth-token': token } }
                );
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
                    houseNumber: String(data.address.houseNumber),
                    zip: String(data.address.zip)
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id, token]);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const payload = {
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
                phone: values.phone,
                email: values.email,
                web: values.web,
                image: { url: values.imageUrl, alt: values.imageAlt },
                address: {
                    state: values.state,
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    houseNumber: Number(values.houseNumber),
                    zip: Number(values.zip)
                }
            };

            await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                payload,
                { headers: { 'x-auth-token': token } }
            );

            navigate(`/cards/${id}`);
        } catch (error) {
            console.error(error);
            setErrors({ title: 'Failed to update card' });
        } finally {
            setSubmitting(false);
        }
    };

    if (!initialValues) return <div>Loading...</div>;

    return <CardForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />;
}
