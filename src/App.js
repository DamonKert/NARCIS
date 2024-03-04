import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import 'swiper/css';
import 'swiper/css/scrollbar';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import CartDetail from './Page/CartDetail/CartDetail';
import CustomerInfo from './Page/CartDetail/CustomerInfo';
import OrderCompleted from './Page/CartDetail/OrderCompleted';

const HomePage = React.lazy(() => import('./Page/HomePage'));

const DefaultPage = React.lazy(() => import('./Page/DefaultPage'));

const CartDetailPage = React.lazy(() => import('./Page/CartDetail/CartDetailPage'));

const ProductDetailPage = React.lazy(() => import('./Page/ProductDetail/ProductDetailPage'));

const CategoryPage = React.lazy(() => import('./Page/Category/CategoryPage'));

const Error404 = React.lazy(() => import('./Page/404/Error404'));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense> <DefaultPage></DefaultPage></Suspense>}>
          <Route index element={<Suspense> <HomePage /></Suspense>}></Route>
          <Route path='product/:name' element={<Suspense> <ProductDetailPage /> </Suspense>}></Route>
          <Route path='order' element={<Suspense> <CartDetailPage /></Suspense>}>
            <Route index path='cart' element={<Suspense><CartDetail /></Suspense>}></Route>
            <Route path='profile' element={<Suspense><CustomerInfo /></Suspense>}></Route>
            <Route path='completed' element={<Suspense><OrderCompleted /></Suspense>}></Route>
          </Route>
          <Route path='category/:name/:child' element={<Suspense><CategoryPage /></Suspense>}></Route>
          <Route path='category/:name' element={<Suspense><CategoryPage /></Suspense>}></Route>

        </Route>
        <Route path=''></Route>
        <Route path='*' element={<Suspense><Error404 /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
