import Upload from './components/Upload'
import NFLlogo from './assets/logos/nfl.png'

function App() {
  return (
    <div className="bg-slate-950 h-screen w-screen">
      <img src={NFLlogo} alt="Madden Scouting Overhaul" className='w-36'/>
      <div className="container mx-auto">
        <h1 className="text-white text-2xl">Madden Scouting Overhaul</h1>
        <Upload />
      </div>
    </div>
  )
}

export default App
