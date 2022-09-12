import styles from './shoppinglist.module.css';
import ShoppingListItem from './shoppinglistitem'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function ShoppingList({ title, id, deleteEvent }) {
    const router = useRouter()
    const [folded, setFolded] = useState(false)
    const [addActive, setAddActive] = useState(false)
    const [itemText, setItemText] = useState('')
    const [data, setData] = useState({ items: [] })

    const handleFolded = () => {
        setFolded(folded ? false : true)
        //The folded status is still old, not the inverted!
        if (!folded) {
            //after this function, folded state value will be true
            //thus must be refresh data
            refreshData()
        }
    }

    const handleAdd = (event) => {
        setAddActive(addActive ? false : true)
    }

    const handleItemText = (event) => {
        setItemText(event.target.value)
    }

    const itemTextKeyUp = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSave()
        }
      }

    const handleDeleteEvent = () => {
        deleteEvent(id)
    }

    const refreshData = () => {
        (async () => {
            const req = new Request('http://localhost:3000/api/item?list_id=' + id,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
            const res = await fetch(req);
            setData(await res.json());
        })();
    }

    const handleSave = async (event) => {
        const req = new Request('http://localhost:3000/api/item',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ list_id: id, itemtext: itemText })
            });
        const res = await fetch(req);
        const data = await res.json();
        setItemText('')
        setAddActive()
        refreshData()
    }

    const handleDeleteItem = async (event, id) => {
        const req = new Request('http://localhost:3000/api/item',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id })
            });
        const res = await fetch(req);
        const data = await res.json();
        refreshData()
    }

    const handleItemStatus = async (id, status) => {
        const req = new Request('http://localhost:3000/api/item',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id, status: status })
            });
        const res = await fetch(req);
        const data = await res.json();
        refreshData()
    }

    return (
        <div>
            <div className={styles.head}>
                <div className={styles.deleteBtn}>
                    <svg onClick={handleDeleteEvent} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.openBtn}>
                    <svg onClick={handleFolded} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 3.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768L5.854 5.146z" />
                    </svg>
                </div>
            </div>
            {folded &&
                <div className={styles.body}>
                    <div className={styles.itemAddBtn}>
                        <svg onClick={handleAdd} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                    </div>
                    {addActive &&
                        <div className={styles.itemAddPanel}>
                            <input type="text" name="itemText" placeholder='Item' value={itemText}
                                onChange={handleItemText} onKeyUp={itemTextKeyUp}></input>
                            <button onClick={handleSave}>Add</button>
                        </div>
                    }
                    {data.items.map((item, index) => (
                        <div className={styles.itemContainer}>
                            <ShoppingListItem
                                id={item.id}
                                text={item.title}
                                status={item.status}
                                handleDelete={handleDeleteItem}
                                handleStatus={handleItemStatus} />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
