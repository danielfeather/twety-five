import React from 'react'
import Card, {Rank, Suit} from './components/card'

function App() {
  return (
    <>
      <header className="flex">
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
        <Card suite={Suit.CLUBS} rank={Rank.ACE} />
      </header>
    </>
  );
}

export default App;
