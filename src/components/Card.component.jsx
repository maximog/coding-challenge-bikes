import React from 'react';
import {Link} from 'react-router-dom';

import './Card.style.scss';

const Card = ({ info, match, history, handleSelect }) => {
    let date = new Date(info.occurred_at*1000);
    date = date.toLocaleString();

    return (
        
        
    <div className='main-div' onClick={() => handleSelect(info)}>
        <div className='card-img'>
           {info.media.image_url_thumb ? <img src={info.media.image_url_thumb} alt='' /> : <p>No Image</p> }
        </div>
        <div className='card-info'>
        <Link to={`/cardDetails/${info.id}`}><h3>{info.title}</h3></Link>
            <p>{date} at {info.address}</p>
            <h5>DESCRIPTION OF INCIDENT</h5>
            {info.description ? <p>{info.description}</p> : <p>Not available</p>}    
        </div>
    </div>
    
  
)}

export default Card;