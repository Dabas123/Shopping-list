import styles from './shoppinglist.module.css';
import ShoppingListItem from './sl_item'
import { useState } from 'react';


export default function ShoppingList({ title, id }) {
    const [folded, setFolded] = useState(false)
    const data = { list: [{ name: 'Peter' }, { name: 'Adam' }] }

    const handleFolded = () => {
        setFolded(folded?false:true)        
    }

    return (
        <div>
            <div>{title}</div>
            <button onClick={handleFolded}>O</button>
            {folded &&
                <div>
                    {data.list.map((item, index) => (
                        <div>
                            <ShoppingListItem text={item.name} />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
