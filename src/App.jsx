import { useState } from 'react';
import logotiao from './static/images/logo.png';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <header>
      <img src={logotiao} alt="logo-tiao" loading='lazy'/>
      <nav>
        
      </nav>
    </header>
      <section className='container__all'>

      <div className="modal__estatico">
        <main>
          
        </main>
      </div>

      </section>
    </>
  )
}

export default App
