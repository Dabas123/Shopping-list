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

    function handleDeleteEvent() {
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
            <div>{title}</div>
            <button onClick={handleFolded}>O</button>
            <button onClick={handleDeleteEvent}>X</button>
            {folded &&
                <div>
                    <button onClick={handleAdd}>Add new</button>
                    {addActive &&
                        <div>
                            <input type="text" name="itemText" placeholder='Item' value={itemText}
                                onChange={handleItemText}></input>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    }
                    {data.items.map((item, index) => (
                        <div>
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
