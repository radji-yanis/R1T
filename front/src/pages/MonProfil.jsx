import { useState, useEffect, useTransition } from 'react'
import Header from "../components/Header/Header";
import Profile from '../components/Profile/Profile';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import { getUserById } from '../api/utilisateurs';

export default function MonProfil() {
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {

        (async () => {
            try {
                const data = await getUserById(1);
        console.log(data);
                setUserProfile(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingProfile(false);
            }
        })();
    }, [])

    return (
        <>
            <Header titre="Mon profil"/>
            {loadingProfile ? 
                <Loader/> :
                <>
                    <Profile userProfile={userProfile}/>
                    <Button style={{ marginBottom: "var(--space-sm)" }}>Modifier le profil</Button>
                    <Button isSecondary>Déconnexion</Button>
                </>
            }
        </>
    );

}