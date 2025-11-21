import ThemeToggle from './ThemeToggle';
import UserProfile from './UserProfile';

const TopRightControls = () => {
    return (
        <div className="fixed top-6 right-6 z-[1002] flex items-center gap-3">
            <UserProfile />
            <ThemeToggle />
        </div>
    );
};

export default TopRightControls;
