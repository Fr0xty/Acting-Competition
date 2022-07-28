import '../styles/UserTypeSelect.scss';

import userIcon from '../assets/images/user_icon.svg';

interface UserTypeSelectProperties {
    userType: string;
    setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const UserTypeSelect = ({ userType, setUserType }: UserTypeSelectProperties) => {
    return (
        <div className="user-type-select">
            <div className="user-type-select">
                <img src={userIcon} alt="user icon" />
                <span>{userType[0].toUpperCase().concat(userType.slice(1, userType.length))}</span>
                <div className="buttons no-select">
                    <button
                        className={`admin-btn ${userType === 'admin' && 'selected'}`}
                        onClick={() => {
                            setUserType('admin');
                        }}
                    >
                        Admin
                    </button>
                    <button
                        className={`participant-btn ${userType === 'participant' && 'selected'}`}
                        onClick={() => {
                            setUserType('participant');
                        }}
                    >
                        Participant
                    </button>
                    <button
                        className={`judge-btn ${userType === 'judge' && 'selected'}`}
                        onClick={() => {
                            setUserType('judge');
                        }}
                    >
                        Judge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserTypeSelect;
