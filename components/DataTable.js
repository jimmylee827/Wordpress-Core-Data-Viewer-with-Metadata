import React, { useState } from 'react';

const DataTable = ({ data, type }) => {
    const [expandedData, setExpandedData] = useState({});

    // Function to handle metadata retrieval
    const getMetaData = async (id) => {
        console.log("type",type,"id",id);
        try {
            // Check if metadata for the specific type and id is already loaded
            if (expandedData[type] && expandedData[type][id]) {
                // If metadata is already loaded, just toggle visibility
                setExpandedData({
                    ...expandedData,
                    [type]: {
                        ...expandedData[type],
                        [id]: {
                            ...expandedData[type][id],
                            isVisible: !expandedData[type][id].isVisible,
                        },
                    },
                });
            } else {
                // Fetch metadata from the server
                const res = await fetch(`/api/metadata/${type}/${id}`);
                const metaData = await res.json();

                console.log("metaData",metaData);
                
                // Update state with new metadata
                setExpandedData({
                    ...expandedData,
                    [type]: {
                        ...expandedData[type],
                        [id]: {
                            data: metaData,
                            isVisible: true,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('Error fetching metadata:', error);
        }
    };
    
    let idKey = 'ID';
    switch (type) {
        case 'comments':
            idKey = 'comment_ID';
            break;
        case 'terms':
            idKey = 'term_id';
            break;
    }
    const renderTable = (item) => {
        const keys = Object.keys(item);
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            {keys.map((key, idx) => (
                                <th key={key}>
                                    {idx==0 && (<button onClick={() => getMetaData(item[idKey])}>Meta</button>)}
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {keys.map((key) => (
                                <td key={key}>
                                    {typeof item[key] === 'string' ? `"${item[key]}"` : item[key]}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <style jsx>{`
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                `}</style>
            </>
        );
    };

    const renderMetadataTable = (metadata) => {
        // Sort metadata by meta_key in ascending order
        const sortedMetadata = [...metadata].sort((a, b) => {
            if (a.meta_key < b.meta_key) return -1;
            if (a.meta_key > b.meta_key) return 1;
            return 0;
        });
    
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Meta Key</th>
                            <th>Meta Value</th>
                            <th className="meta-id-header">Meta ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMetadata.map((metaItem) => (
                            <tr key={metaItem.meta_id}>
                                <td>{metaItem.meta_key}</td>
                                <td>{typeof metaItem.meta_value === 'string' ? `"${metaItem.meta_value}"` : metaItem.meta_value}</td>
                                <td className="meta-id-cell">{metaItem.meta_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <style jsx>{`
                    table {
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                    .meta-id-header, .meta-id-cell {
                        font-size: smaller;
                        color: #999; // Light grey color
                    }
                `}</style>
            </>
        );
    };    
    
    return (
        <div>
            <h2>{type}</h2>
            <div>
                {data.map((item) => (
                    <div key={item[idKey]}>
                        {renderTable(item)}
                        {expandedData[type] && expandedData[type][item[idKey]] && expandedData[type][item[idKey]].isVisible && (
                            <div>
                                <strong>Metadata of {String(item[idKey])}:</strong>
                                {renderMetadataTable(expandedData[type][item[idKey]].data)}
                            </div>
                        )}
                        <br/>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;
