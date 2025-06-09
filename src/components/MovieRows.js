import React, { useState } from "react";
import "./MovieRows.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({ title, items }) => {
    const [scrollX, setScrollX] = useState(-400);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    };

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);

        let listWidth = items.results.length * 150;
        if (window.innerWidth - listWidth > x) {
            x = window.innerWidth - listWidth - 60 // Ajuste para evitar overflow
        }
        setScrollX(x);
    }


    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow-left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }}  />
            </div>

            <div className="movieRow-right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }}  />
            </div>

            {items && items.results && items.results.length > 0 && (
                
                <div className='movieRow-listarea'>
                    <div className='movieRow-list' style={{
                        marginLeft: scrollX,
                        width: items.results.length * 150,
                    }}>
                        
                        {items.results.map((item, key) => (
                            <div key={key} className='movieRow-item'>
                                {item.poster_path && (
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                                        alt={item.original_title || item.name} 
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}  