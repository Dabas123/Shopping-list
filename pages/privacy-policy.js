import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout/layout';
import Userpanel from '../components/userpanel/userpanel';
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function PP() {

    return (
        <Layout>
            <section style={{padding: 10}}>
                <h1>Privacy Policy</h1>
                <p>Updated: 04 September, 2022</p>
                <h2>WHAT INFORMATION DO WE COLLECT?</h2>
                <p>This section sets out the categories and details of personal information that we collect</p>
                <h3>Account registration information</h3>
                <p>When you register for a Utenasoft account, we collect your name and email address, your username and any additional information you provide.
                    We need to collect your personal information for account registration purposes.
                    In some instances in order to use certain Products or Services, we require account registration.
                    This requires a name associated with your account, an email address at which we can contact you, and in some cases, additional information, including a contact address, and a password to help secure your personal information.</p>
                <p>WE DO NOT AND WILL NOT SELL YOUR PERSONAL INFORMATION.</p>
                <h3>WHO DO WE SHARE YOUR PERSONAL DATA WITH?</h3>
                <p>We share personal data with third parties who provide professional services.</p>
                <p>We use to next third parties to help deliver our products and services to you:</p>
                <ul>
                    <li>
                        Authentication service providers: <a href='https://auth0.com/' rel="noreferrer" target='_blank'>Auth0® Inc.</a>
                        <p>Check out her <a href='https://auth0.com/privacy' rel="noreferrer" target='_blank'>Privacy policy</a> for more info.</p>
                    </li>
                </ul>
                <h3>Cookies and Similar Technologies</h3>
                <p>When you visit our sites or when you use our apps, we may collect personal data from you automatically using cookies or similar technologies. A cookie is a small file that can be placed on your device that allows us to recognize and remember you.
                    We may place cookies on your device (with your consent, where applicable), as well as partner with third parties, including authorisation partners (auth0.com), who may use cookies or other similar technologies.</p>                
            </section>
        </Layout>
    );
}