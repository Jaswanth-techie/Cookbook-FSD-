import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import UserProfile from './UserProfile';

const TopRightControls = () => {
    const { user } = useAuth();

    return (
        <div className="flex items-center gap-3">
            {user ? (
                <UserProfile />
            ) : (
                <Link
                    to="/login"
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primaryHover hover:to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                    Sign In
                </Link>
            )}
            <ThemeToggle />
        </div>
    );
};

export default TopRightControls;
