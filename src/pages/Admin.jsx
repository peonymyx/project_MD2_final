import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import jwt from '../service/jwt';
import { useNavigate } from 'react-router-dom';
import { randomId, } from '@mieuteacher/meomeojs';
import { api } from '../service/apis';
import { uploadFileToStorage } from '../../firebase';
import { productAction } from '../store/slice/product.slice';
export default function Admin() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userGet, setUserGet] = useState(null)
    const userStore = useSelector(store => store.userStore)
    const [images, setImages] = useState(null)
    const productStore = useSelector(store => store.productStore);
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 10;
    const lastIndex = currentPage * recordPerPage
    const firtIndex = lastIndex - recordPerPage
    const records = productStore.data.slice(firtIndex, lastIndex);
    const npage = Math.ceil(productStore.data.length / recordPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        console.log(userGet, "test");
    }, [userGet])

    useEffect(() => {
        api.userApi.getAll()
            .then(res => {
                setUsers(res.data)

            })
    }, [])

    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " VNĐ"
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY)
            if (user.isAdmin != true) {
                alert("You don't have access")
                navigate('/');
            }
        }
        else {
            alert("You don't have access")
            navigate('/');
        }
    }, [])

    function prePage() {
        if (currentPage !== firtIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }


    return (
        <div id='main'>
            <div className='admin'>
                <div className='products'>
                    <div className='products_head'>
                        <h2>Manage Products</h2>
                        <button onClick={() => {
                            document.getElementsByClassName("addProduct")[0].style.display = "block";
                        }}>+</button>
                    </div>

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Tools</th>
                                <th>Availability</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                records.map((product, index )=> {

                                    return (
                                        <tr key={randomId()}>
                                            <td>{firtIndex + index + 1}</td>
                                            <td>
                                                {product.images != null ?
                                                    <img src={product.images} alt="" />
                                                    : <></>
                                                }
                                                {product.productName}
                                            </td>
                                            <td>
                                                {product.category}
                                            </td>

                                            <td>
                                                {formatCash(String(product.price))}
                                            </td>
                                            <td> <button onClick={() => {
                                                api.productApi.deleteById(product.id)
                                                window.location.reload()
                                            }}>Delete</button>
                                            </td>
                                            <td>

                                                {
                                                    product.status == true ?
                                                        <label className="switch">
                                                            <input type="checkbox" defaultChecked onClick={() => {

                                                                if (confirm("Change the Availability of this good? ")) {
                                                                    api.productApi.editStatus(product.id, !product.status);
                                                                    window.location.reload();
                                                                }
                                                                else { window.location.reload() }

                                                            }} />
                                                            <span className="slider round" />
                                                        </label>
                                                        : <label className="switch">
                                                            <input type="checkbox" onChange={() => {
                                                                if (confirm("Change the Availability of this good? ")) {
                                                                    api.productApi.editStatus(product.id, !product.status);
                                                                    window.location.reload();
                                                                }
                                                                else { window.location.reload() }


                                                            }} />
                                                            <span className="slider round" />
                                                        </label>
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <nav style={{zIndex:"0"}}>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <a className='page-link' onClick={() => {
                                    if(currentPage == 1){
                                        return
                                    }else{
                                        prePage()
                                    }
                                    
                                }}>Prev </a>
                            </li>

                            {
                                numbers.map((n, i) => {
                                    return (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={randomId()}>
                                            <a className='page-link' onClick={() => {
                                                changeCPage(n)
                                            }}> {n} </a>
                                        </li>
                                    )
                                })
                            }
                            <li className='page-item'>
                                <a className='page-link' onClick={() => {
                                    if(currentPage == npage){
                                        return
                                       
                                    }
                                    else{
                                         nextPage()
                                    }
                                }}>Next </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='users'>
                    <h2>Manage Users</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Receipts</th>
                                <th>Set Admin</th>
                                <th>Availability</th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                users.map(user => {
                                    if (user.email != "phuongtran.31221021478@st.ueh.edu.vn")
                                        return (
                                            <tr key={randomId()}>
                                                <td>{user.id}</td>
                                                <td>

                                                    {user.userName}
                                                </td>
                                                <td>
                                                    {user.email}
                                                </td>
                                                <td>
                                                    <button onClick={() => {

                                                        api.userApi.findByEmail(user.email)
                                                            .then(res => {
                                                                setUserGet(res.data[0])
                                                            })

                                                        document.getElementsByClassName("receipts")[0].style.display = "block"
                                                    }}>More...</button>
                                                </td>

                                                <td>
                                                    {
                                                        user.isAdmin == true ?
                                                            <label className="switch">
                                                                <input type="checkbox" defaultChecked onChange={() => {
                                                                    if (confirm("Disable the administration of this person? ")) {
                                                                        api.userApi.editAdmin(user.id, !user.isAdmin)
                                                                        window.location.reload()
                                                                    }
                                                                    else { window.location.reload() }



                                                                }} />
                                                                <span className="slider round" />
                                                            </label>
                                                            : <label className="switch">
                                                                <input type="checkbox" onChange={() => {
                                                                    if (confirm("Change the administration of this person? ")) {
                                                                        api.userApi.editAdmin(user.id, !user.isAdmin)
                                                                        window.location.reload()
                                                                    }
                                                                    else { window.location.reload() }

                                                                }} />
                                                                <span className="slider round" />
                                                            </label>
                                                    }
                                                </td>
                                                <td>

                                                    {
                                                        user.status == false ?
                                                            <label className="switch">
                                                                <input type="checkbox" defaultChecked onChange={() => {
                                                                    if (confirm("Change Login Permission of this user? ")) {
                                                                        api.userApi.editStatus(user.id, !user.status)
                                                                        window.location.reload()
                                                                    }
                                                                    else {
                                                                        window.location.reload();
                                                                    }


                                                                }} />
                                                                <span className="slider round" />
                                                            </label>
                                                            : <label className="switch">
                                                                <input type="checkbox" onChange={() => {

                                                                    if (confirm("Change Login Permission of this user? ")) {
                                                                        api.userApi.editStatus(user.id, !user.status)
                                                                        window.location.reload()
                                                                    }
                                                                    else {
                                                                        window.location.reload();
                                                                    }

                                                                }} />
                                                                <span className="slider round" />
                                                            </label>
                                                    }

                                                </td>
                                            </tr>
                                        )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <div className='addProduct'>
                <button onClick={() => {
                    document.getElementsByClassName("addProduct")[0].style.display = "none";
                }}>X</button>
                <h3>New Product</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let newProduct = {
                        productName: e.target.productName.value,
                        price: Number(e.target.price.value),
                        category: e.target.category.value,
                        images: images,
                        introduce: e.target.introduce.value,
                        quantity: 1,
                        status: true,
                    }
                    api.productApi.addProduct(newProduct);
                    window.location.reload()
                    document.getElementsByClassName("addProduct")[0].style.display = "none";
                }}>
                    <input type="text" name='productName' placeholder='name product' />
                    <input type="text" name='price' placeholder='price' />
                    <input type="text" name='category' placeholder='category' />
                    <input type="file" name='images' multiple placeholder="product's image" onChange={async (e) => {
                        if (e.target.files.length != 0) {
                            let url = await uploadFileToStorage(e.target.files[0], "products")
                            console.log("url", url);
                            setImages(url ? url : null)
                        }
                    }} />
                    <textarea placeholder='introduce' name='introduce' cols="100" rows="5"></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className='receipts'>

                <button
                    onClick={() => {
                        document.getElementsByClassName("receipts")[0].style.display = "none";
                    }}>X</button>
                <h3>User's Receipts</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Order code</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Goods</th>
                            <th scope='col'>Total</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            userGet?.receipts.map(receipt => {
                                return (
                                    <tr key={randomId()}>
                                        <td>{receipt.id}</td>
                                        <td>{receipt.Date}</td>
                                        <td>

                                            {receipt.products.map(product => {
                                                return (
                                                    <ul>
                                                        <li>
                                                            {product.productName} || Quantity: {product.quantity}
                                                        </li>
                                                    </ul>
                                                )
                                            })}
                                        </td>
                                        <td>{formatCash(String(receipt.total))}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}
