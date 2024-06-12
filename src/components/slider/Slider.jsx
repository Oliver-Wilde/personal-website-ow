import React, { useState } from 'react';
import './Slider.css'; // Assuming you've saved your CSS in Slider.css

const items = [
    { id: 1, title: "Lossless Youths", description: "Lorem ipsum...", imageUrl: "https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg" },
    { id: 2, title: "Estrange Bond", description: "Lorem ipsum...", imageUrl: "https://i.redd.it/tc0aqpv92pn21.jpg" },
    // Add the rest of your items here
];

function Slider() {
    const [sliderItems, setSliderItems] = useState(items);

    const moveItemToEnd = (itemIndex) => {
        const newItems = [...sliderItems];
        const item = newItems.splice(itemIndex, 1)[0];
        newItems.push(item);
        setSliderItems(newItems);
    };

    const moveItemToStart = (itemIndex) => {
        const newItems = [...sliderItems];
        const item = newItems.splice(itemIndex, 1)[0];
        newItems.unshift(item);
        setSliderItems(newItems);
    };

    return (
        <main>
            <ul className='Slider'>
                {sliderItems.map((item, index) => (
                    <li key={item.id} className='item' style={{ backgroundImage: `url(${item.imageUrl})` }}>
                        <div className='content'>
                            <h2 className='title'>{item.title}</h2>
                            <p className='description'>{item.description}</p>
                            <button>Read More</button>
                        </div>
                    </li>
                ))}
            </ul>
            <nav className='nav'>
                <button className='btn prev' onClick={() => moveItemToStart(sliderItems.length - 1)}>Prev</button>
                <button className='btn next' onClick={() => moveItemToEnd(0)}>Next</button>
            </nav>
        </main>
    );
}

export default Slider;
