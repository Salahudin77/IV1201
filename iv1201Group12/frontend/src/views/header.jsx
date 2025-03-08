import { useNavigate } from "react-router-dom";
import "../styles/header.css";

export const Header = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/appLogin");
    };

    return (
        <>
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">😁 Recruitment AB</h1>
                    <div className="header-buttons">
                        <button
                            className="header-button home-button"
                            onClick={handleHomeClick}
                        >
                            Home
                        </button>

                        <button
                            className="header-button logout-button"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <div className="header-spacer"></div>
        </>
    );
};

export default Header;