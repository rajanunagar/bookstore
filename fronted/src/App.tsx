import { useEffect, useState } from 'react'
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import OrderList from './components/OrderList';
import CreateBook from './components/CreateBook';
import Profile from './components/Profile';
import { loggedInuserIsAdminOrNot } from './utils/util';
import NotFound from './components/NotFound';

function App() {
const [isAdmin,setIsAdmin] = useState<boolean>(false);
const isUserAdmin = async ()=>{
    const admin = await loggedInuserIsAdminOrNot();
    setIsAdmin(admin);
}

useEffect(()=>{
  isUserAdmin();
},[]);

  return (
    <Authenticator className='mt-5'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="books" element={<BookList />} />
          <Route path="books/:id" element={<BookDetail />} />
          {isAdmin && <Route path="createbook" element={<CreateBook />} />}
          <Route path="orders" element={<OrderList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </Authenticator>
  );
}

export default App;

//npx @aws-amplify/cli codegen - to get latest appsync query
