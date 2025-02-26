import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from './route.constant';
import LoginLayout from '@/Layout/LoginLayout/LoginLayout';
import AppLayout from '@/Layout/AppLayout';
import BedRoomPage from '@/pages/BedRoomPage/BedRoomPage';
import KitChenPage from '@/pages/KitChenPage/KitChenPage';
import WorkRoomPage from '@/pages/WorkRoomPage/WorkRoomPage';
import Cart from '@/pages/CartPage/CartPage';
import CheckOut from '@/pages/CheckOut/CheckOut';
import OrderPage from '@/pages/OrderPage/OrderPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import FindAccounts from '@/pages/Account/FindAcounts/FindAcounts';
import Recover from '@/pages/Account/Recover/Recover';
import EnterCode from '@/pages/Account/EnterCode/EnterCode';
import PasswordNew from '@/pages/Account/PasswordNew/PasswordNew';
import AdminLayout from '@/Layout/AdminLayout/AdminLayout';
import Statistic from '@/pages/Statistic/Statistic';
import TrashProduct from '@/pages/TrashProduct/TrashProduct';
import ManageProduct from '@/pages/ListProduct/ManageProduct/ManageProduct';
import ListProduct from '@/pages/ListProduct/ListProduct';
import ListOrderProduct from '@/pages/ListOrderProduct/ListOrderProduct';
import ListOrderProductDetails from '@/pages/ListOrderProductDetails/ListOrderProductDetails';
import ListMaterial from '@/pages/ListMaterial/ListMaterial';
import ManageCustomer from '@/pages/ManageCustomer/ManageCustomer';
import RoleLayout from '@/components/Role/RoleLayout';

const MainLayout = React.lazy(() => import('@/Layout/MainLayout/MainLayout'));
const HomePage = React.lazy(() => import('@/pages/HomePage/HomePage'));
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetailPage/ProductDetailPage'));
const LivingRoomPage = React.lazy(() => import('@/pages/LivingRoomPage/LivingRoomPage'));
const Login = React.lazy(() => import('@/pages/Login/Login'));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <MainLayout />,
        children: [
          {
            path: ROUTE_PATH.HOME,
            element: (
              <Suspense>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.LIVINGROOM,
            element: (
              <Suspense>
                <LivingRoomPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.BEDROOM,
            element: (
              <Suspense>
                <BedRoomPage />
              </Suspense>
            ),
          },

          {
            path: ROUTE_PATH.KETCHEN,
            element: (
              <Suspense>
                <KitChenPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.CART,
            element: (
              <Suspense>
                <Cart />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.WORKROOM,
            element: (
              <Suspense>
                <WorkRoomPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.CHECKOUT,
            element: (
              <Suspense>
                <CheckOut />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.LISTORDER,
            element: (
              <Suspense>
                <OrderPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.PROFILE,
            element: (
              <Suspense>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.PRODUCT_DETAIL(':param', ':id'),
            element: (
              <Suspense>
                <ProductDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <LoginLayout />,
        children: [
          {
            path: ROUTE_PATH.LOGIN,
            element: (
              <Suspense>
                <Login />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.FINDACCOUNT,
            element: (
              <Suspense>
                <FindAccounts />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.RECOVER,
            element: (
              <Suspense>
                <Recover />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.ENTERCODE,
            element: (
              <Suspense>
                <EnterCode />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.PASSWORDNEW,
            element: (
              <Suspense>
                <PasswordNew />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: (
          <RoleLayout role={['ADMIN', 'MANAGEMENT_BOARD']}>
            <AdminLayout />
          </RoleLayout>
        ),
        children: [
          {
            path: ROUTE_PATH.REVENUA,
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN', 'MANAGEMENT_BOARD']}>
                  <Statistic />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.MANAGEPRODUCT,
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN', 'MANAGEMENT_BOARD']}>
                  <ListProduct />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.TRASHPRODUCT,
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN']}>
                  <TrashProduct />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.ADDPRODUCT(':action'),
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN']}>
                  <ManageProduct />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.EDITPRODUCT(':id', ':action'),
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN']}>
                  <ManageProduct />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.LISTORDERPRODUCT,
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN', 'MANAGEMENT_BOARD']}>
                  <ListOrderProduct />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.LISTORDERPRODUCTDETAILS,
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN', 'MANAGEMENT_BOARD']}>
                  <ListOrderProductDetails />
                </RoleLayout>
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.MATERIAL,
            element: (
              <Suspense>
                <ListMaterial />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.MANAGECUSTOMER,
            element: (
              <Suspense>
                <RoleLayout role={['ADMIN', 'MANAGEMENT_BOARD']}>
                  <ManageCustomer />
                </RoleLayout>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
