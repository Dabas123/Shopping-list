import Layout, { siteTitle } from '../components/layout/layout';
import styles from '../styles/Shoppinglistpage.module.css'
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useState } from 'react';
import ShoppingList from '../components/shoppinglist/shoppinglist';

export default function ShoppingListsSite({ data }) {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const [addActive, setAddActive] = useState(false)
  const [titleText, setTitleText] = useState('')

  const handleAdd = (event) => {
    setAddActive(addActive ? false : true)
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const titleTextHandle = (event) => {
    setTitleText(event.target.value)    
  }

  const titleTextKeyUp = (event) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave()
    }
  }

  const handleSave = async (event) => {
    const req = new Request('http://localhost:3000/api/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userid: user.sub, title: titleText })
      });
    const res = await fetch(req);
    const data = await res.json();
    setTitleText('')
    setAddActive(false)
    refreshData()
  }

  const handleDeleteEvent = async (id) => {
    const req = new Request('http://localhost:3000/api/list',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userid: user.sub, id: id })
      });
    const res = await fetch(req);
    const data = await res.json();
    refreshData()
  }

  return (
    <Layout>
      <section>
        <h1 className={styles.header}>Shopping list app</h1>
        <button className={styles.addListBtn} onClick={handleAdd}>Add new shopping list</button>
        {addActive &&
          <div className={styles.addpanel}>
            <input type="text" name="title" placeholder='Title' value={titleText}
              onChange={titleTextHandle} onKeyUp={titleTextKeyUp}></input>
            <button onClick={handleSave}>Add</button>
          </div>
        }
        {data.lists.map((item, index) => (
          <div className={styles.sl_container}>
            <ShoppingList title={item.title} id={item.id} deleteEvent={handleDeleteEvent} />
          </div>
        ))}
      </section>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);

    const req = new Request('http://localhost:3000/api/list?userid=' + session.user.sub
    + '&apikey=' + process.env.API_KEY,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
    const res = await fetch(req);
    const data = await res.json();
    return { props: { data } };
  }
});
