import Layout, { siteTitle } from '../components/layout/layout';
import Userpanel from '../components/userpanel/userpanel';
import ShoppingLists from '../components/shoppinglists/shoppinglists';
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <Layout home>
      <section>
        <Userpanel />
        {user && !error && !isLoading &&
          <Link href="/shoppinglists">Own shopping lists</Link>
        }
      </section>
    </Layout>
  );
}

