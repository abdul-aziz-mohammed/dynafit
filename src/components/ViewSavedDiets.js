import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from '../AuthContext';
import ReactMarkdown from "react-markdown";

//Grace Testcase 31 Save Diet
function ViewSavedDiets() {
    const [savedDiets, setSavedDiets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchSavedDiets = async () => {
            setIsLoading(true);
            if (!currentUser) {
                console.error('No current user found');
                setIsLoading(false);
                return;
            }
            try {
                const userEmail = currentUser.email;
                const response = await api.get(`/fetch-diets/${encodeURIComponent(userEmail)}`);
                const dietsData = response.data.map(diet => {
                    return {
                        dietID: diet.DietID,
                        dietPlan: diet.dietPlan
                    };
                });
                setSavedDiets(dietsData);
            } catch (error) {
                console.error('Failed to fetch diets:', error);
            }
            setIsLoading(false);
        };
    
        fetchSavedDiets();
    }, [currentUser]);
    
    const handleDelete = async (dietID) => {
        if (!currentUser) {
            console.error('No current user found');
            return;
        }
        setIsLoading(true);
        try {
            await api.delete(`/delete-diet/${currentUser.email}/${dietID}`);
            setSavedDiets(savedDiets.filter(diet => diet.dietID !== dietID));
        } catch (error) {
            console.error('Failed to delete diet:', error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Saved Diets</h1>
            {savedDiets.length > 0 ? (
                <ul>
                    {savedDiets.map(diet => (
                        <li key={diet.dietID}>
                            <div>
                                <h2>{diet.dietID}</h2>
                                {/* Directly display dietPlan which is a string */}
                                <ReactMarkdown>{diet.dietPlan}</ReactMarkdown>
                                <button onClick={() => handleDelete(diet.dietID)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved diets found.</p>
            )}
        </div>
    );
}

export default ViewSavedDiets;