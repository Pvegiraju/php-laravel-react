import { FormEvent, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { setToken, setUser } = useAppContext();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({} as any);

    async function handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setToken(data.token);
            setUser(data.user);

            navigate('/');
        }
    }

    return (
        <>
            <h1 className="title">Login</h1>

            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>

                {errors.message && <p className="error">{errors.message}</p>}
                <button className="primary-btn">Login</button>
            </form>
        </>
    );
}
