
export default function ShoppingListItem({ id, text, status, handleDelete, handleStatus }) {

    function changeStatus(){
        console.log(id)
        if (status === 'Incomplete') {
            handleStatus(id, 'Complete')
        }
        else {
            handleStatus(id, 'InComplete')
        }
    }

    return (
        <div>
            <p>{text}</p>
            <button onClick={() => handleDelete(event, id)}>X</button>
            <button onClick={changeStatus}>C</button>
        </div>
    )
}



