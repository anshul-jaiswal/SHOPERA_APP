import React from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();


    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);

            if (existingItem) {
                toast.success("Increased quantity")
                return prevCart?.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            else {
                toast.success(`${product.name || "Item"} Added to cart!`)
                return [...prevCart, { ...product, quantity: 1 }]
            }

        })

    }


    const increaseQuantity = (id) => {
        setCartItems((prevCart) => prevCart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item))
    }

    const decreaseQuantity = (id) => {
        setCartItems((prevCart) => prevCart.map((item) =>
            item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))
    }


    const removeFromCart = (id) => {
        const removedItem = cartItems.find((item) => item._id === id);
        if (removedItem) {
            toast.success("Removed from cart");
            navigate("/product")

        }
        setCartItems((prevCart) => prevCart.filter((item) => item._id !== id))
    }

    return (<CartContext.Provider
        value={{
            cartItems,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart
        }} >
        {children}
    </CartContext.Provider>)
}

