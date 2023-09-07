import React from 'react';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ProductCard = ({product,link})=>{
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600?15:20,
        value:product.rating,
        isHalf:true,
    }
    return(
        <Link className = "productCard" to ={`/product/${product._id}`}>
            <img src={product.images[0].url} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                <span className = "productCardSpan">({product.reviews.length} Reviews)</span>
            </div>
            <span>&#8377;{product.price}</span>
        </Link>
    );
};

export default ProductCard;