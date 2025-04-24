import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Startseite</h1>
      <button onClick={() => navigate('/game')}>Start</button>
    </div>
  )
}

export default HomePage