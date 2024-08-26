import { FormEvent, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCreate() {
    const navigate = useNavigate();
    const { token } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
    });

    const [errors, setErrors] = useState({} as any);

    async function handleCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch('/api/products', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            alert('Product created successfully!');
            navigate('/');
        }
    }

    return (
        <>
            <h1 className="title">Create Product</h1>
            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
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

                <button className="primary-btn">Create</button>
            </form>
        </>
    );
}
