import Layout, { siteTitle } from '../components/layout/layout';
import Userpanel from '../components/userpanel/userpanel';
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <Layout home>
      <section>
        <Userpanel />
        {user && !error && !isLoading &&  
        <div className={styles.appicon}>        
          <Link href="/shoppinglistpage">
            <div>
              <Image
                src="/favicon.png"
                alt="shopping list app image"
                width= '64'
                height= '64'
                className={styles.appimage}
              />
            </div>
          </Link>
          </div>
        }
      </section>
    </Layout >
  );
}

