import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
// import BetTickets from './components/BetTickets';
// import ScoreBoard from './components/ScoreBoard';
import MatchDetails from './components/MatchDetails';
import LiveMatches from './components/LiveMatches';
import UpcomingMatches from './components/UpcomingMatches';
import RecentMatches from './components/RecentMatches';
import ApiKeyTest from './ApiKeyTest';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-matches" element={<LiveMatches />} />
        <Route path="/upcoming-matches" element={<UpcomingMatches />} />
        <Route path="/recent-matches" element={<RecentMatches />} />
        {/* <Route path="/bettickets" element={<BetTickets />} /> */}
        <Route path="/match/:matchId" element={<MatchDetails />} />
        {/* <Route path="/scoreboard" element={<ScoreBoard />} /> */}
      </Routes>
      <ApiKeyTest />
      <Footer />
    </Router>
  );
}

export default App;
