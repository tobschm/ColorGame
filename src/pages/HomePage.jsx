import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className='mainContainer'>
      <h1>Startseite</h1>
      <button className='startButton' onClick={() => navigate('/game')}>Start</button>
    </div>
  )
}

export default HomePage