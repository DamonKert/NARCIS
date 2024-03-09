import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';

import 'swiper/css';
import 'swiper/css/scrollbar';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import CartDetail from './Page/Customer/CartDetail/CartDetail';
import CustomerInfo from './Page/Customer/CartDetail/CustomerInfo';
import OrderCompleted from './Page/Customer/CartDetail/OrderCompleted';

//Customer
const HomePage = React.lazy(() => import('./Page/Customer/HomePage'));

const CustomerDefaultPage = React.lazy(() => import('./Page/Customer/DefaultPage'));

const CartDetailPage = React.lazy(() => import('./Page/Customer/CartDetail/CartDetailPage'));

const ProductDetailPage = React.lazy(() => import('./Page/Customer/ProductDetail/ProductDetailPage'));

const CategoryPage = React.lazy(() => import('./Page/Customer/Category/CategoryPage'));

const RecentlyPage = React.lazy(() => import('./Page/Customer/RecentlyDetail/RecentlyPage'));

//Admin
const Login = React.lazy(() => import('./Page/Admin/Login'));

const AdminProfile = React.lazy(() => import('./Page/Admin/Profile/Profile'));

const AdminDashboard = React.lazy(() => import('./Page/Admin/Dashboard/Dashboard'));

const AdminMiddleware = React.lazy(() => import('./Page/Admin/Middleware'));
const AdminDefaultPage = React.lazy(() => import('./Page/Admin/DefaultLayout'));

const AdminUser = React.lazy(() => import('./Page/Admin/User/User'));
const AdminUserForm = React.lazy(() => import('./Page/Admin/User/UserForm'));

const AdminModel = React.lazy(() => import('./Page/Admin/Model/Model'));
const AdminModelForm = React.lazy(() => import('./Page/Admin/Model/ModelForm'));

const AdminOrder = React.lazy(() => import('./Page/Admin/Order/Order'));
const AdminOrderForm = React.lazy(() => import('./Page/Admin/Order/OrderForm'));

const AdminCloth = React.lazy(() => import('./Page/Admin/Cloth/Cloth'));
const AdminClothForm = React.lazy(() => import('./Page/Admin/Cloth/ClothForm'));

const AdminCategory = React.lazy(() => import('./Page/Admin/Category/Category'));
const AdminCategoryForm = React.lazy(() => import('./Page/Admin/Category/CategoryForm'));

const AdminProvince = React.lazy(() => import('./Page/Admin/Province/Province'));

const Error404 = React.lazy(() => import('./Page/404/Error404'));



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense> <CustomerDefaultPage></CustomerDefaultPage></Suspense>}>
          <Route index element={<Suspense> <HomePage /></Suspense>}></Route>
          <Route path='product/:name' element={<Suspense> <ProductDetailPage /> </Suspense>}></Route>
          <Route path='order' element={<Suspense> <CartDetailPage /></Suspense>}>
            <Route index path='cart' element={<Suspense><CartDetail /></Suspense>}></Route>
            <Route path='profile' element={<Suspense><CustomerInfo /></Suspense>}></Route>
            <Route path='completed' element={<Suspense><OrderCompleted /></Suspense>}></Route>
          </Route>
          <Route path='View-Recently' element={<Suspense><RecentlyPage /></Suspense>} />
          <Route path='category/:name/:child' element={<Suspense><CategoryPage /></Suspense>}></Route>
          <Route path='category/:name' element={<Suspense><CategoryPage /></Suspense>}></Route>

        </Route>
        <Route path='/Admin' element={<Suspense><AdminMiddleware /></Suspense>}>
          <Route path='' element={<Suspense><AdminDefaultPage /></Suspense>}>

            <Route path='User' element={<Suspense><AdminUser /></Suspense>}></Route>
            <Route path='User-Form' element={<Suspense><AdminUserForm /></Suspense>}></Route>
            <Route path='User-Edit/:id' element={<Suspense><AdminUserForm /></Suspense>}></Route>

            <Route path='Cloth' element={<Suspense><AdminCloth /></Suspense>}></Route>
            <Route path='Cloth-Form' element={<Suspense><AdminClothForm /></Suspense>}></Route>
            <Route path='Cloth-Edit/:id' element={<Suspense><AdminClothForm /></Suspense>}></Route>

            <Route path='Model' element={<Suspense><AdminModel /></Suspense>}></Route>
            <Route path='Model-Form' element={<Suspense><AdminModelForm /></Suspense>}></Route>
            <Route path='Model-Edit/:id' element={<Suspense><AdminModelForm /></Suspense>}></Route>

            <Route path='Category' element={<Suspense><AdminCategory /></Suspense>}></Route>
            <Route path='Category-Form' element={<Suspense><AdminCategoryForm /></Suspense>}></Route>
            <Route path='Category-Edit/:id' element={<Suspense><AdminCategoryForm /></Suspense>}></Route>

            <Route path='Province' element={<Suspense><AdminProvince /></Suspense>}></Route>

            <Route path='Order' element={<Suspense><AdminOrder /></Suspense>}></Route>
            <Route path='Order-Form' element={<Suspense><AdminOrderForm /></Suspense>}></Route>
            <Route path='Order-Edit/:id' element={<Suspense><AdminOrderForm /></Suspense>}></Route>

            <Route path='Profile' element={<Suspense><AdminProfile /></Suspense>}></Route>
            <Route path='Dashboard' element={<Suspense><AdminDashboard /></Suspense>}></Route>

          </Route>
          <Route path='Login' element={<Suspense><Login /></Suspense>}></Route>
        </Route>
        <Route path='*' element={<Suspense><Error404 /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
