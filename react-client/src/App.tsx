import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AppProvider, useAppContext } from './context/AppContext';
import ProductList from './pages/products/ProductList';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';

export default function App() {
    return (
        <AppProvider>
            <MainComponent />
        </AppProvider>
    );
}

function MainComponent() {
    const { user } = useAppContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={user ? <ProductList /> : <Login />} />
                    <Route path="/login" element={user ? <ProductList /> : <Login />} />
                    <Route path="/register" element={user ? <ProductList /> : <Register />} />

                    <Route path="/products/create" element={user ? <ProductCreate /> : <Register />} />
                    <Route path="/products/edit/:id" element={user ? <ProductEdit /> : <Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
