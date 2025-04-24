import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Willkommen auf der Startseite</h1>
      <button onClick={() => navigate('/game')}>Zum Spiel</button>
    </div>
  )
}

export default HomePage