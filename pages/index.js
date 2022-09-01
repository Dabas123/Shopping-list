import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import Login from '../components/login/login';
import { useContext, useEffect } from 'react'
import GlobalContext from '../utils/global-context'

export default function Home() {
  const global = useContext(GlobalContext)

  function loginHandle(userName, password) {
    global.update({
      count: global.count + 1
    });

  }

  useEffect(() => {
    global.update({      
      username: 'useEffect'
    });
  }, [global.count]);

  return (
    <Layout home>
      <section>
        <Login loginHandle={loginHandle} />
        <label>Count: {global.count}</label>
        <label>User: {global.username}</label>
      </section>
    </Layout>
  );
}