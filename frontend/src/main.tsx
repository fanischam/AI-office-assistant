import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import LoginScreen from './screens/LoginScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import ChatScreen from './screens/ChatScreen.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/chat' element={<ChatScreen />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
