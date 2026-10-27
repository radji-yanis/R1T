import styles from './Profile.module.css';

export default function Profile ({ userProfile }) {    
    return (
        <> 
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    {userProfile.avatar_id}
                </div>
                <h2 className={styles.pseudo}>{userProfile.pseudo}</h2>       
                <div>
                    <h3>Email</h3>
                    <p>{userProfile.email}</p>
                    <h3>Style de jeu</h3>
                    <p>{userProfile.style}</p>
                </div>
            </div>
        </>
    )
}