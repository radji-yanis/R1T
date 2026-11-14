import { useState, useEffect, useTransition } from 'react'
import Header from "../components/Header/Header";
import Profile from '../components/Profile/Profile';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import { getUserById } from '../api/utilisateurs';
import { useAuth } from '../context/AuthContext';

export default function MonProfil() {
    const { user, loading, logout } = useAuth();

    return (
        <>
            <Header titre="Mon profil"/>
            {loading ? 
                <Loader/> :
                <>
                    <Profile userProfile={user}/>
                    <Button style={{ marginBottom: "var(--space-sm)" }}>Modifier le profil</Button>
                    <Button onClick={logout} isSecondary>Déconnexion</Button>
                </>
            }
        </>
    );

}