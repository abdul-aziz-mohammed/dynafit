// Import necessary components and icons from Material-UI and React Router
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function BottomNav() {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();
    const [value, setValue] = React.useState('workout');

    // Handle changes in the bottom navigation
    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case "logout":
                // Clear the current user's session and navigate to the homepage
                setCurrentUser(null);
                navigate("/");
                break;
            case "diet":
                // Navigate to the diet dashboard
                navigate("/diet-dashboard");
                break;
            default:
                // Navigate to the selected page based on the newValue
                navigate('/' + newValue);
                break;
        }
    };

    return (
        // Render the BottomNavigation component with BottomNavigationActions
        <BottomNavigation style={{ position: 'sticky', bottom: 0 }} value={value} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Workout" value="workout-dashboard" icon={<FitnessCenterIcon />} />
            <BottomNavigationAction label="Diet" value="diet-dashboard" icon={<RestaurantMenuIcon />} />
            <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
            <BottomNavigationAction label="Logout" value="logout" icon={<LogoutIcon />} />
        </BottomNavigation>
    );
}

export default BottomNav;
