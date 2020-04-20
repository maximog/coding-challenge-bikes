import React from 'react';

import CardContainer from '../components/Card-Container.component'
import Button from '../components/Button.component';
import ErrorBoundary from '../components/error-boundary.component';

const HomePage = ({ results, currentPage, handleClic, handleSelect, isLoaded }) => (

    <ErrorBoundary>
        {results.length && isLoaded ?
        <>
            <div className='search-results'>
                <div className='total-results'>
                    <h4>total: {results.length}</h4>
                </div>
                <CardContainer results={results} page={currentPage} handleSelect={handleSelect} />
            </div>

            <div className='other-pages'>
                <Button name='<< First' action={() => handleClic('first')} />
                <Button name='< Prev' action={() => handleClic('prev')} />
                <Button name={`${currentPage}`} action={() => handleClic(currentPage)} />
                <Button name={`${currentPage+1}`} action={() => handleClic(currentPage+1)} />
                <Button name={`${currentPage+2}`} action={() => handleClic(currentPage+2)} />
                <Button name='Next >' action={() => handleClic('next')} />
                <Button name='Last >>' action={() => handleClic('last')} />
            </div>
        </>
            :
        <p>{isLoaded ? 'No results' : 'Loading Results....'}</p>}
    </ErrorBoundary>
);

export default HomePage;