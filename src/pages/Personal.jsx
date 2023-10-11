import { randomId } from '@mieuteacher/meomeojs';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Personal() {
    const userStore = useSelector(store => store.userStore)
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
          return ((index % 3) ? next : (next + '.')) + prev
        }) + " VNĐ"
      }
    return (
        <div id='main'>
            <div className='personal'>
                <div className='per_head'>
                    <div className='per_main'>
                        <h2>Welcome {userStore.data.userName}</h2>
                        <span>Here you can keep track of your recent activity, request return/exchange authorizations for orders you have received, and view and edit your account information or list of favorite items.</span>
                    </div>
                    <div className='per_contact'>
                        <h3>Contact Information</h3>
                        <div className='contact'>
                            <span>
                                {userStore.data.userName}
                            </span>
                            <span>
                                {userStore.data.email}
                            </span>
                        </div>

                    </div>
                </div>
                <div className='Orders'>
                    <h3>Orders</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Order</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Total</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                userStore.receipts.map(receipt =>{
                                    return(
                                        <tr key={randomId()}>
                                            <td>{receipt.products.map(product =>(
                                                <ul>
                                                    <li>
                                                        {product.productName} || quantity: 
                                                        {product.quantity}
                                                    </li>
                                                </ul>
                                            ))}</td>
                                            <td>{receipt.Date}</td>
                                            <td>{receipt.status}</td>
                                            <td>{formatCash(String(receipt.total))}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
