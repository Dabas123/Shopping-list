import styles from './userpanel.module.css';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'

export default function Userpanel() {
    const { user, error, isLoading } = useUser();

    return (
        <div className={styles.main}>
            {
                !user && !error && !isLoading &&
                <div>
                    <p>Please log in to use this app!</p>
                    <Link href={'/api/auth/login'}><button>Login</button></Link>
                </div>
            }
            {
                user && !error && !isLoading &&
                <div>
                    <p>Log in as <strong>{user.email}</strong></p>
                    <Link href={'/api/auth/logout'}><button>Logout</button></Link>
                </div>
            }
        </div>
    );
}