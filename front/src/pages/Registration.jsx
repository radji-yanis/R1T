import { useState } from "react";
import { register } from "../api/auth";
import { NavLink, useNavigate } from "react-router";

import { useToast } from "../components/ToastNotification/ToastNotification";

import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Field from "../components/Field/Field";
import NavTabs from "../components/NavTabs/NavTabs";

import formStyles from "../form.module.css";

export default function Inscription() {
  const [ errors, setErrors ] = useState({});
  const [ submitting, setSubmitting ] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    try {
      const { user } = await register(userData);
      navigate('/connexion', { state: { registered: true, email: user.email } });
    } catch (error) {
      if ([409, 422].includes(error.status)) {
        setErrors(error.errors);
        toast.error({
          title: "Inscription échouée",
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
      <Field id="pseudo" label="Pseudo" error={errors.pseudo} placeholder="MaxLeBloc" required/>
      <Field id="email" label="Email" type="email" error={errors.email} placeholder="maxlebloc@gmail.com" required/>
      <Field id="password" label="Mot de passe" type="password" error={errors.password}  placeholder="********" required/>
      <Button type="submit" disabled={submitting}>S'inscrire</Button>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>Déjà inscrit ? passe sur <NavLink to="/connexion" style={{ textDecoration: "underline" }}>connexion</NavLink>.</p>
    </form>
  </>;
}