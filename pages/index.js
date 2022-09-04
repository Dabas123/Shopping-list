import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout/layout';
import Userpanel from '../components/userpanel/userpanel';
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <Layout home>
      <section>
        <Userpanel/>                
      </section>
    </Layout>
  );
}