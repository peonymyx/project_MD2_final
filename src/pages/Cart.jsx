import { randomId } from '@mieuteacher/meomeojs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../store/slice/user.slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Cart() {
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore)
    const [total, setTotal] = useState(0);
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " VNĐ"
    }
    useEffect(() => {
        let number
        number = userStore.cart.reduce((value, cur) => {
            return value += cur.quantity * cur.price
        }, 0)
        setTotal(number);

    }, [userStore.cart])
    return (
        <div id='main'>
            <div className='Cart'>
                <div className='Orders'>
                    <h3>Your bag</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Product</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Total</th>
                                <th scope='col'>Tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userStore.cart.map((item) => {
                                    return (
                                        <tr key={randomId()}>
                                            <td>{item.productName}</td>
                                            <td>{formatCash(String(item.price))}</td>
                                            <td>
                                                <input id='quantity' type="number" min={1} defaultValue={item.quantity} onChange={(e) => {
                                                    dispatch(userAction.changeQuantity({
                                                        id: item.id,
                                                        quantity: Number(e.target.value),
                                                    }))
                                                }} />
                                            </td>
                                            <td>
                                                {formatCash(String(item.price * item.quantity))}
                                            </td>
                                            <td>
                                                <button onClick={() => {
                                                    dispatch(userAction.delItem(item.id))
                                                    console.log("davao");
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}> Total </td>
                                <td>{formatCash(String(total))}</td>
                                <td><button onClick={() => {
                                    var today = new Date()
                                    let newReceipt = {
                                        Date: today.getHours()+':'+ today.getMinutes()+':'+ today.getSeconds()+"  "+today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear(),
                                        id: randomId(),
                                        status:"waiting",
                                        total: total,
                                        products: [...userStore.cart]
                                    }
                                    console.log(newReceipt.Date);
                                    if (!newReceipt.products.length) {
                                        alert(" Your Cart is currently empty. ")
                                        return;
                                    } else {
                                        dispatch(userAction.addNewReceipt(newReceipt))
                                    }

                                }}>Checkout</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
        </div>
    )
}
