import styles from './shoppinglists.module.css';

export default function ShoppingLists({ data }) {
    return (
        <div>
            <div>Shopping lists</div>
            <div>{data}</div>
        </div>
    )
}



