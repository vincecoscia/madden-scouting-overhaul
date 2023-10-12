import { useState, useEffect } from 'react'

function Upload() {
  const [selectedFilePath, setSelectedFilePath] = useState(null)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    function handlePlayerData(event, data) {
      setPlayers(data)
    }

    window.api.ipcRenderer.on('player-data', (data) => {
      // Ensure data exists and is an array
      console.log('Received player data:', data)
      if (data && Array.isArray(data)) {
        setPlayers(data)
      } else {
        console.error('Received unexpected data:', data)
      }
    })
    

    return () => {
      window.api.ipcRenderer.removeListener('player-data', handlePlayerData)
    }
  }, [])

  function handleFileSelection(event) {
    const file = event.target.files[0]
    if (file) {
      setSelectedFilePath(file.path)
    }
  }

  function handleSubmit() {
    console.log('Submit button clicked')
    console.log(window.api.ipcRenderer)
    if (selectedFilePath) {
      window.api.ipcRenderer.send('upload-file', selectedFilePath)
    }
  }

  return (
    <div>
      <h2>Upload Franchise File</h2>
      <input type="file" className='text-white' onChange={handleFileSelection} />
      <button className="px-4 py-2 bg-slate-700 text-white" onClick={handleSubmit}>Upload</button>

      <h3 className="text-white">Player Data:</h3>
      <ul className="text-white">
        {players.map((player) => (
          <li key={player.ID}>
            {player.FirstName} {player.LastName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Upload
