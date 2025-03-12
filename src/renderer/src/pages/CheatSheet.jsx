import { useState, useEffect } from 'react'
import { CheatSheetPlayers } from '../components/CheatSheetPlayers'

function CheatSheet() {
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
    <div className="p-4 ">
      <div className="bg-gray-600 p-4 mb-2">
        {!players || players.length > 0 ? (
          <div>
            <button className="px-4 py-2 rounded bg-red-500 text-white" onClick={() => setPlayers([])}>Reset</button>
          </div>
        ) : (
          <div className="flex flex-col w-fit gap-y-2">
            <div>
              <label className="block mb-2 font-medium  text-white" htmlFor="file_input">
                Upload Franchise file
              </label>
              <input
                className="block w-full text-sm  border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={handleFileSelection}
              />
            </div>
            <button className="px-4 py-2 bg-green-600 text-white" onClick={handleSubmit}>
              Upload
            </button>
          </div>
        )}
      </div>

      <CheatSheetPlayers players={players} />
    </div>
  )
}

export default CheatSheet
