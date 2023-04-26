import React from 'react'
import Card, {Rank, Suit} from './components/card'

function App() {
  return (
    <section className="p-4">
      <div className="flex flex-wrap -ml-4">
        {Object.keys(Suit).map((suit: any) => {
            if (isNaN(suit)) {
                return
            }
          return (
              <div className="flex mb-4" key={suit}>
                {Object.keys(Rank).map((rank: any) => {
                    if (isNaN(rank)) {
                        return
                    }
                  return (
                      <Card key={`${suit}-${rank}`} suit={suit} rank={rank} />
                  )
                })}
              </div>
          )
        })}
      </div>
    </section>
  );
}

export default App;
