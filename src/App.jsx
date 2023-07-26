import { useState } from 'react';
import Header from './components/header/Header';
import router from './router/Index';
import { RouterProvider } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  )
}

export default App
