import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FormEvent } from 'react';

export default function Layout() {
    const { user, token, setUser, setToken } = useAppContext();

    const navigate = useNavigate();

    async function handleLogout(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        try {
            const res = await fetch('/api/logout', {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log('Error: ', error);
        }

        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    {user ? (
                        <div className="space-x-4">
                            <form onSubmit={handleLogout}>
                                <button className="nav-link">Logout</button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </div>
                    )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
