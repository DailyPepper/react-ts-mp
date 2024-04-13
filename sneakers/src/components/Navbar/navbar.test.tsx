import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './index';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar компонент', () => {
    it('отображает ссылки на разделы навигации', () => {
        render(
          <Router>
            <Navbar />
          </Router>
        );
        expect(screen.getByRole('link', { name: /каталог товаров/i })).toBeTruthy();
        expect(screen.getByRole('link', { name: /новости/i })).toBeTruthy();
        expect(screen.getByRole('link', { name: /контакты/i })).toBeTruthy();
        expect(screen.getByRole('link', { name: /аккаунт/i })).toBeTruthy();
    });
});
