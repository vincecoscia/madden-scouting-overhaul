import NFLlogo from './assets/logos/nfl.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Components
import Home from './pages/Home'
import CreateFranchise from './pages/franchise/create'
import FranchiseId from './pages/franchise/[id]'
import SeasonId from './pages/season/[id]'
import Upload from './components/Upload'
import CheatSheet from './pages/CheatSheet'

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
      <div className="bg-neutral-950 h-screen w-full text-white">
        <div className="flex justify-between bg-neutral-900 fixed top-0 w-full py-3 px-3">
          <div className="flex items-center">
            <img src={NFLlogo} alt="Madden Scouting Overhaul" className="w-14 mr-2" />
            <h1 className="text-white text-5xl font-giorgio uppercase mb-2">
              Madden Scouting Overhaul
            </h1>
          </div>
          <p className="sel self-center">Version: 0.0.3</p>
        </div>
        <div className="h-full flex">
          <div className="mt-20 w-full">
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cheatsheet" element={<CheatSheet />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/franchise/:id" element={<FranchiseId />} />
                <Route path="/franchise/create" element={<CreateFranchise />} /> 
                <Route path="/season/:id" element={<SeasonId />} />

              </Routes>
            </Router>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </QueryClientProvider>
  )
}

export default App
