import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardDetails.style.scss';
import MapContainer from './MapContainer.component';

const CardDetails2 = ({ match }) => {

    const [info, setInfo] = useState({});

    useEffect(() => {
        fetch(`https://bikewise.org:443/api/v2/incidents/${match.params.id}`)
            .then(data => data.json())
            .then(data => setInfo(data.incident))

    }, [match.params.id])

    let date = new Date(info.updated_at * 1000);
    date = date.toLocaleString();
    return (
        info.id ?
            <>
                <div className='main-div-details'>
                    <div className='card-details-img'>
                        {info.media.image_url_thumb ? <img src={info.media.image_url_thumb} alt='' /> : <p>Imagen No disponible</p>}
                    </div>
                    <div className='card-details-map'>
                        <div className='card-details-info'>
                            <h3>{info.title}</h3>
                            <p>{date} - {info.address}</p>
                        </div>
                        <MapContainer />
                        <div className='card-details-description'>
                            <p>DESCRIPTION OF INCIDENT</p>
                            {info.description ? <p>{info.description}</p> : <p>No Description</p>}
                        </div>
                    </div>
                </div>
                <Link to='/'>Back to Home</Link>
            </>

            :
            <p>Loading Details...</p>


    )
}

export default CardDetails2;