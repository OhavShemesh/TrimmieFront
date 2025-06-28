import axios from "axios";
import { useEffect, useState } from "react";

const useBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const getAllBusinesses = async () => {
            try {
                const response = await axios.get("http://localhost:8181/businesses"); // note '/api/'
                const data = response.data;
                setBusinesses(data);
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
            }
        };
        getAllBusinesses()
    }, [])


    return { setBusinesses, businesses }

}

export default useBusinesses