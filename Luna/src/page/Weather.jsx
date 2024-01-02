import React, { useEffect } from 'react'
import axios from 'axios';

export default function weather() {
    const [city, setcity] = useState('');
    const [weather, setweather] = useState(null);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('003be56097f17c57ab769c11407de85c');
            setweather(response.data);
        }catch (error){
            console.error(error)
        }
    }

    useEffect(() =>{
        fetchData();
    })
  return (
    <div>
    </div>
  )
}
