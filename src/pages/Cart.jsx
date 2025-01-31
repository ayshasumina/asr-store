import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../redux/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const ourCart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDecrement = (product)=>{
        if(product.quantity>1){
            dispatch(decQuantity(product.id))
        }else{
            dispatch(removeCartItem(product.id))
        }
    }

    const checkout = ()=>{
        dispatch(emptyCart())
        alert("Order placed successfully. Thank you for purchasing with us!!!")
        navigate('/')
    }

    return (
        <>
            <Header/>
            <div style={{marginTop:'150px'}} className='container'>
               { 
               ourCart?.length>0 ?
               <div className='cart'>
                    <h1>Cart Summary</h1>
                    <div className="row mt-4">
                        <div className="col-lg-8">
                            <table className="table shadow">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ourCart?.map((product,index)=>(
                                            <tr key={product?.id}>
                                        <td>{index+1}</td>
                                        <td>{product?.title.slice(0,20)}...</td>
                                        <td><img width={'50px'} height={'50px'} src={product?.thumbnail} alt="" /></td>
                                        <td>
                                            <div className="d-flex">
                                                <button onClick={()=>handleDecrement(product)} className='btn fw-bolder'>-</button>
                                                <input value={product?.quantity} style={{width:'50px'}} className='fw-bolder me-1 ms-1' type="text" readOnly />
                                                <button onClick={()=>dispatch(incQuantity(product?.id))} className='btn fw-bolder'>+</button>
                                            </div>
                                        </td>
                                        <td>$ {product?.totalPrice}</td>
                                        <td>
                                            <button onClick={()=>dispatch(removeCartItem(product?.id))} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
                                        </td>
                                    </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="float-end">
                                <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-2'>EMPTY CART</button>
                                <Link to={'/'} className='btn btn-primary'>SHOP MORE</Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <div className="border rounded shadow p-3">
                            <h4>Total Amount : <span className='text-danger'>$ 4500</span></h4>
                            <hr/>
                            <div className="d-grid">
                                <button onClick={checkout} className="btn btn-success">CheckOut</button>
                            </div>
                        </div>
                    </div>
               </div>
              </div>

               :
               <div style={{height:'60vh'}} className="d-flex justify-content-center align-items-center flex-column">
                <img width={'400px'} height={'400px'} src="https://www.unboxindustry.com/assets/images/wishlistEmpty.png" alt="empty" />
                <h3 className='text-danger'>Your Cart is Empty!!!</h3>
               </div>
               }
            </div>
        </>
    )
}

export default Cart