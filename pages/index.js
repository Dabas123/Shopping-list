import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import Login from '../components/login/login';

export default function Home() {

  function loginHandle(userName, password){
    console.log(userName, password);
  }

  return (
    <Layout home>
      <section>
        <Login loginHandle={loginHandle}/>
      </section>
    </Layout>
  );
}