import router from './router/Index.jsx';
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App