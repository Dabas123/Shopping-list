import Layout, { siteTitle } from '../components/layout/layout';
import Userpanel from '../components/userpanel/userpanel';
import ShoppingLists from '../components/shoppinglists/shoppinglists';
import styles from '../styles/Home.module.css'
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function ShoppingListsSite({data}) {
  const { user, error, isLoading } = useUser();
    
  return (
    <Layout>
      <section>
        {user && <p>Hello {user.email}!</p>}
        {data.lists.map((user, index) => (
          <div>
            <p>{user.title}</p>
            <p>{user.owner}</p>
            <p>{user.ID}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);

    const req = new Request('http://localhost:3000/api/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({userid: session.user.sub, apikey: process.env.API_KEY})
      });
    const res = await fetch(req);
    const data = await res.json();
    return { props: {data} };
  }
});
