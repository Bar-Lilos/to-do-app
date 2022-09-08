import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

type Props = {
    
}
 
const Solution: React.FC<Props> = ({}) => {
    const [] = useState();
    
    const {
        data: fetchedData,
        isLoading: dataLoading,
        error: dataError
    } = useQuery('data fetching', () => {})
    
    return (
        <>
            aaa
        </>
    );
}

export default Solution;