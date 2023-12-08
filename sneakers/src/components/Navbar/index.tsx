import { CONTACT_ROUTE, NEWS_ROUTE, ACCOUNT_ROUTE, SNEAKERS_ROUTE } from '../../app/routing/config';
import '../../styles/style.css';
import { Link } from 'react-router-dom';

const navbar = () => {
    return ( 
        <>
            <div className='route'>
                <Link to={CONTACT_ROUTE} className='routeLink'>Страница контактов</Link>
                <Link to={NEWS_ROUTE} className='routeLink'>Страница Новостей</Link>
                <Link to={ACCOUNT_ROUTE} className='routeLink'>Страница Аккаунта</Link>
                <Link to={SNEAKERS_ROUTE} className='routeLink'>Страница Каталога Кроссовок</Link>
                <button className='btnAuto'>
                    Авторизация
                </button>
            </div>
        </>
     );
}
 
export default navbar;