import Layout, { siteTitle } from '../components/layout/layout';
import styles from '../styles/Home.module.css'
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useState } from 'react';
import ShoppingList from '../components/shoppinglist/shoppinglist';

export default function ShoppingListsSite({ data }) {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [addActive, setAddActive] = useState(false)
  const [titleText, setTitleText] = useState('')

  const handleAdd = (event) => {
    setAddActive(true)
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleSave = async (event) => {
    const req = new Request('http://localhost:3000/api/addlist',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userid: user.sub, title: titleText })
      });
    const res = await fetch(req);
    const data = await res.json();
    console.log(data)  
    setTitleText('')
    setAddActive(false)
    refreshData()
  }

  function titleTextHandle(event) {
    setTitleText(event.target.value)
  }

  return (
    <Layout>
      <section>
        {user && <p>Hello {user.email}!</p>}
        <button onClick={handleAdd}>Add new</button>
        {addActive &&
          <div>
            <input type="text" name="title" placeholder='Title' value={titleText}
              onChange={titleTextHandle}></input>
            <button onClick={handleSave}>Save</button>
          </div>
        }
        {data.lists.map((item, index) => (
          <div>
            <ShoppingList title={item.title} id={item.ID}/>            
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
        body: JSON.stringify({ userid: session.user.sub, apikey: process.env.API_KEY })
      });
    const res = await fetch(req);
    const data = await res.json();
    return { props: { data } };
  }
});
