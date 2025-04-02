import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    toast.success('Order successful!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const handleCheckout = () => {
    setCart([]); 
    navigate('/'); 
  };

  const handleDelete = (id) => {
    const newCart = cart.filter((product) => product.id !== id); 
    setCart(newCart); 
    toast.success('Product deleted from cart!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  // Truncate function
  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return description.substring(0, length) + '...';
    }
    return description;
  };

  return (
    <>
      <div
        className="container my-5"
        style={{
          width: '54%',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        {cart.length === 0 ? (
          <div className="text-center">
            <h1>Your Cart is Empty</h1>
            <Link to="/" className="btn btn-warning">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          cart.map((product) => (
            <div className="card mb-3 my-5" style={{ width: '700px' }} key={product.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.imgSrc}
                    className="img-fluid rounded-start"
                    alt={product.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      {truncateDescription(product.description, 100)} {/* Truncate to 100 characters */}
                    </p>
                    <button className="btn btn-primary mx-3">{product.price} ₹</button>
                    <button className="btn btn-warning" onClick={handleBuyNow}>
                      Buy Now
                    </button>
                    <button 
                      className="btn btn-danger mx-3"
                      onClick={() => handleDelete(product.id)} 
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length !== 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button onClick={handleCheckout} className="btn btn-warning mx-5">
            CheckOut
          </button>
          <button onClick={() => setCart([])} className="btn btn-danger">
            Clear Cart
          </button>
        </div>
      )}

      <ToastContainer /> 
    </>
  );
};

export default Cart;
