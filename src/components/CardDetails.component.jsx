import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardDetails.style.scss';
import MapContainer from './MapContainer.component';

const CardDetails = ({ selectedBike }) => {

    const [info, setInfo] = useState([-37.3162834, -121.9503546]);
    const [mapLoaded, setMapLoaded] = useState(false);
    //con react router usaba match.params.id
    useEffect(() => {
        fetch(`https://bikewise.org:443/api/v2/locations?query=${selectedBike.title.split(" ").join("%20")}`)
            .then(data => data.json())
            .then(data => {
                const filteredElem = data.features.length > 1 ?
                    data.features.filter(result => selectedBike.id === result.properties.id)[0]
                    :
                    data.features[0];

                console.log(filteredElem)

                setInfo(filteredElem.geometry.coordinates);
                setMapLoaded(true);
            })
    }, [selectedBike])

    let date = new Date(selectedBike.updated_at * 1000);
    date = date.toLocaleString();
    return (
        selectedBike.id ?
            <>
                <div className='main-div-details'>
                    <div className='card-details-img'>
                        {
                            selectedBike.media.image_url_thumb ?
                                <img src={selectedBike.media.image_url_thumb} alt='' /> :
                                <p>Imagen No disponible</p>
                        }
                    </div>
                    <div className='card-details-map'>
                        <div className='card-details-info'>
                            <h3>{selectedBike.title}</h3>
                            <p>{date} - {selectedBike.address}</p>
                        </div>
                        {mapLoaded ? <MapContainer info={info} /> : <p>Loading map...</p>}
                        <div className='card-details-description'>
                            <h5>DESCRIPTION OF INCIDENT</h5>
                            {
                                selectedBike.description ?
                                    <p>{selectedBike.description}</p> :
                                    <p>No Description</p>
                            }
                        </div>
                    </div>
                </div>
                <Link to='/'>Back to Home</Link>
            </>

            :
            <p>Loading Details...</p>


    )
}

export default CardDetails;