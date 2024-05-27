import React from 'react'
import Header from '../components/Header'
import { Col, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const Wishlist = () => {
    const ourWishlist = useSelector(state=>state.wishlistReducer)
    const ourCart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch()

    const handleCart = (product)=>{
        const existingProduct = ourCart?.find(item=>item.id==product.id)
        if(existingProduct){
            dispatch(addToCart(product))
            dispatch(removeWishlistItem(product.id))
            alert("Product quantity is Incrementing!!!")
        }
        else{
            dispatch(addToCart(product))
            dispatch(removeWishlistItem(product.id))
        }
    }
    
    return (
        <>
            <Header/>
            <div style={{marginTop:'150px'}} className="conainer-fluid">
               {
                ourWishlist?.length>0?
                <div>
                     <h3 className='text-secondary'>Your Wishlist</h3>
                <Row className='my-5'>
                    {
                        ourWishlist?.map(product=>(
                            <Col key={product.id} className='mb-5 me-2' sm={12} md={6} lg={4} xl={3}>
                             <Card className='shadow rounded' style={{ width: '18rem' }}>
                                 <Card.Img height={'180px'} variant="top" src={product?.thumbnail} />
                            <Card.Body>
                             <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                        <div className='d-flex justify-content-around mt-3'>
                        <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn'> <i class="fa-solid fa-heart-circle-xmark text-danger"></i> </button>
                        <button onClick={()=>handleCart(product)} className='btn'> <i class="fa-solid fa-cart-plus text-success"></i> </button>
                    </div>
                    </Card.Body>
                    </Card>
                    </Col>

                        ))
                    }
                </Row>
               </div>
               :
               <div style={{height:'60vh'}} className="d-flex justify-content-center align-items-center flex-column">
                <img width={'400px'} height={'400px'} src="https://www.unboxindustry.com/assets/images/wishlistEmpty.png" alt="empty" />
                <h3 className='text-danger'>Your Wishlist is Empty!!!</h3>
               </div>
                }
            </div> 
        </>
    )
}

export default Wishlist