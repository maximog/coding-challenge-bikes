import React from 'react';
import Card from './Card.component';

const CardContainer = ({ results, page, handleSelect }) => {
    return (
        <div>
            {results.map((incident, index) => index >= (page * 10 - 10) && index < (page * 10) ?
                <Card key={incident.id} info={incident} handleSelect={handleSelect} />
                :
                null)}
        </div>
    )
}

export default CardContainer;