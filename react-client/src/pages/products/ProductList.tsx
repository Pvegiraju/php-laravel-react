import { useEffect, useState } from 'react';
import { Product } from './types';
import { useAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductList() {
    const { token } = useAppContext();
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [errors, setErrors] = useState({} as any);

    async function getProducts() {
        const res = await fetch('/api/products', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data: Product[] = await res.json();

        if (res.ok) {
            setProducts(data);
        }
    }

    async function handleDelete(id: string): Promise<void> {
        console.log('/api/products/${id}');
        const res = await fetch(`/api/products/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            alert('Product deleted successfully!');
            navigate(0);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <h1 className="title">Products</h1>
            <div className="mb-5 ">
                <Link to="/products/create" className="nav-link bg-black">
                    Add Product
                </Link>
            </div>
            {errors && <p>{errors.message}</p>}
            <br />
            <br />
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id}>
                        <div className="flex flex-row mb-4 p-4 border rounded-md border-dashed border-slate-400">
                            <img className="w-24 h-24 mx-6" src={product.image} />
                            <div>
                                <div className="mb-2 flex items-start justify-between">
                                    <h2 className="font-bold text-2xl">{product.name}</h2>
                                </div>
                                <p>{product.description}</p>
                            </div>
                            <div className="w-40">
                                <button onClick={() => handleDelete(product._id)} className="nav-link text-center w-24 bg-red-500">
                                    Delete
                                </button>
                                <br />
                                <br />
                                <Link to={`/products/edit/${product._id}`} className="nav-link text-center w-24 bg-black inline-block">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>There are no products</p>
            )}
        </>
    );
}
