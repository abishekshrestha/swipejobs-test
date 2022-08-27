import './header.scss';
import { IUser } from '../../models/job';
import logo from '../../assets/swipejobs.svg';

const Header = ({ firstName, lastName }: IUser) => {
  return (
    <header className='header'>
      <img src={logo} className='header-logo' alt='logo' />
      <div className='user-name'>
        {firstName} {lastName}
      </div>
    </header>
  );
};

export default Header;
