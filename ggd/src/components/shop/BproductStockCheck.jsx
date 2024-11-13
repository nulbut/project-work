import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BproductStockCheck = () => {
    const nav = useNavigate();
    const [outOfStockCount, setOutOfStockCount] = useState(0);

    const fetchOutOfStockCount = async () => {
        try {
            const response = await 
            
            axios
            .get('/out-of-stock-count');
            setOutOfStockCount(response.data); 
            // 받아온 품절 상품 개수를 상태에 저장
        } catch (error) {
            console.error("Error fetching out of stock count:", error);
        }
    };
    useEffect(() => {
        fetchOutOfStockCount();
    }, []);

    const stockgo = () => {
        nav("/bmypage/bproductstock");
      };
    return (
        <div>
            <p onClick={stockgo}>{outOfStockCount}</p>
        </div>
    );
};

export default BproductStockCheck;