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
    // window.api.ipcRenderer.on('player-data', (event, data) => {
    //   console.log('Event:', event);
    //   console.log('Data:', data);
    
    //   if (data) {
    //     setPlayers(data);
    //   } else {
    //     console.error('Data is undefined');
    //   }
    // });
    

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
      <input type="file" onChange={handleFileSelection} />
      <button onClick={handleSubmit}>Upload</button>

      <h3>Player Data:</h3>
      <ul>
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
