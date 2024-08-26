import { FormEvent, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
    });

    const [errors, setErrors] = useState({} as any);

    async function getProduct() {
        const res = await fetch(`/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.ok) {
            setFormData({
                name: data.name,
                description: data.description,
                image: data.image,
            });
        }
    }

    async function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch(`/api/products/${id}`, {
            method: 'put',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            alert('Product updated successfully!');
            navigate('/');
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
            <h1 className="title">Update Product</h1>
            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Product Image URL"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                    {errors.image && <p className="error">{errors.image[0]}</p>}
                </div>

                <div>
                    <textarea
                        rows={6}
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                    {errors.description && <p className="error">{errors.description[0]}</p>}
                </div>

                <button className="primary-btn">Update</button>
            </form>
        </>
    );
}
