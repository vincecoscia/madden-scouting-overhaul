import { useEffect, useState } from 'react'
const { ipcRenderer } = window.api

function PlayerComponent() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    ipcRenderer.on('player-data', (data) => {
      setPlayers(data)
    })

    return () => {
      // Clean up the listener when the component is unmounted
      ipcRenderer.removeAllListeners('player-data')
    }
  }, [])

  return (
    <div>
      {players.map((player) => (
        <div key={player.ID}>
          {player.FirstName} {player.LastName}
        </div>
      ))}
    </div>
  )
}

export default PlayerComponent
