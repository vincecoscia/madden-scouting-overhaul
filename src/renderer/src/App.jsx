import Upload from './components/Upload'
import NFLlogo from './assets/logos/nfl.png'
// import router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from 'react-query'
import FranchiseId from './pages/franchise/[id]'

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
    <div className="bg-slate-950 h-screen w-full text-white">
      <div className="flex items-center justify-center bg-red-700 fixed top-0 w-full">
        <img src={NFLlogo} alt="Madden Scouting Overhaul" className="w-20" />
        <h1 className="text-white text-7xl font-giorgio uppercase">Madden Scouting Overhaul</h1>
      </div>
      <div className="h-full flex">
        <div className="mt-20">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/franchise/:id" element={ <FranchiseId/>} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
    </QueryClientProvider>
  )
}

export default App
