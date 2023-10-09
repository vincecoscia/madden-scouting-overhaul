import Upload from './components/Upload'
import NFLlogo from './assets/logos/nfl.png'

function App() {

function getFranchise() {
  console.log('get franchise')
  window.api.ipcRenderer.send('get-franchise', 1)
}

function createExampleFranchise() {
  console.log('create franchise')
  window.api.ipcRenderer.send('create-franchise', {
    name: 'Example Franchise',
    team: 'Example Team',
    description: 'Example Description'
  })
}

  return (
    <div className="bg-slate-950 h-screen w-screen text-white">
    <div className="flex items-center justify-center">
      <img src={NFLlogo} alt="Madden Scouting Overhaul" className='w-36'/>
      <h1 className="text-white text-7xl font-giorgio uppercase">Madden Scouting Overhaul</h1>
    </div>
      <div className="container mx-auto">
      <p>Franchises</p>

      <button className="px-4 py-2 bg-slate-700 text-white" onClick={createExampleFranchise}>TEST</button>
       
      </div>
    </div>
  )
}

export default App
