import PropTypes from 'prop-types';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const userData = {
    uid: user.uid,
  };
  const handleClick = () => {
    registerUser(userData).then(() => updateUser(userData.uid));
  };
  return (
    <div className="profileInfo">
      <h1>Welcome to Mosaica</h1>
      <button type="button" className="button1" onClick={handleClick}>
        Create User?
      </button>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
