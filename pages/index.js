import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const IndexPage = () => {
    const [currentData, setCurrentData] = useState([]);
    const [dataType, setDataType] = useState('');

    const fetchData = async (type) => {
        const res = await fetch(`/api/${type}`);
        const data = await res.json();
        setCurrentData(data);
        setDataType(type);
    };

    return (
        <div>
            <button onClick={() => fetchData('users')}>Users</button>
            <button onClick={() => fetchData('posts')}>Posts</button>
            <button onClick={() => fetchData('comments')}>Comments</button>
            <button onClick={() => fetchData('terms')}>Terms</button>
            <DataTable data={currentData} type={dataType} />
        </div>
    );
};

export default IndexPage;
