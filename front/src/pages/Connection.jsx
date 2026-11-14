import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";

import { useToast } from "../components/ToastNotification/ToastNotification";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Field from "../components/Field/Field";
import NavTabs from "../components/NavTabs/NavTabs";

import formStyles from "../form.module.css";

export default function Connection() {
    const [ errors, setErrors ] = useState({});
    const [ submitting, setSubmitting ] = useState(false);

    const toast = useToast();
    const { login } = useAuth()
    const location = useLocation();
    const registered = location.state?.registered ?? false;
    const email = location.state?.email ?? "";
    const from = location.state?.from ?? "/";

    useEffect(() => {
        if(registered) {
            toast.success({
                title: "Inscription réussie",
                message: "A présent, connecte toi ! 🤗", 
            })
        }
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        try {
            await login(userData);
            // navigate(from, { state: { connected: true } });
        } catch (error) {
            if ([401, 422].includes(error.status)) {
                setErrors(error.errors);
                toast.error({
                    title: "Connexion échouée",
                    message: "Le formulaire contient des erreurs. 😣", 
                })
            }
        } finally {
            setSubmitting(false);
        }
    }

    return <>
        <Header titre="Gestion de match de foot simple, rapide et efficace" authPage={true}/>
        <NavTabs/>
        <form onSubmit={handleSubmit} className={formStyles.form} noValidate>
            <Field id="email" label="Email" type="email" error={errors.email} placeholder="maxlebloc@gmail.com" defaultValue={email} required/>
            <Field id="password" label="Mot de passe" type="password" error={errors.password}  placeholder="********" required/>
            <Button type="submit" disabled={submitting}>Se connecter</Button>
            <p style={{ marginTop: "1rem", textAlign: "center" }}>Pas encore de compte ? passe sur <NavLink to="/inscription" style={{ textDecoration: "underline" }}>inscription</NavLink>.</p>
        </form>
    </>;
}