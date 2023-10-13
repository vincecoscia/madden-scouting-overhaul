import { useState } from 'react'
import { useCreateFranchise } from '../../queries/franchise'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BackButton } from '../../components/utilities/Buttons'
import ind from '../../assets/logos/ind.png'
import ari from '../../assets/logos/ari.png'
import atl from '../../assets/logos/atl.png'
import bal from '../../assets/logos/bal.png'
import buf from '../../assets/logos/buf.png'
import car from '../../assets/logos/car.png'
import chi from '../../assets/logos/chi.png'
import cin from '../../assets/logos/cin.png'
import cle from '../../assets/logos/cle.png'
import dal from '../../assets/logos/dal.png'
import den from '../../assets/logos/den.png'
import det from '../../assets/logos/det.png'
import gb from '../../assets/logos/gb.png'
import hou from '../../assets/logos/hou.png'
import jac from '../../assets/logos/jac.png'
import kc from '../../assets/logos/kc.png'
import lac from '../../assets/logos/lac.png'
import lar from '../../assets/logos/lar.png'
import lv from '../../assets/logos/lv.png'
import mia from '../../assets/logos/mia.png'
import min from '../../assets/logos/min.png'
import ne from '../../assets/logos/ne.png'
import no from '../../assets/logos/no.png'
import nyg from '../../assets/logos/nyg.png'
import nyj from '../../assets/logos/nyj.png'
import phi from '../../assets/logos/phi.png'
import pit from '../../assets/logos/pit.png'
import sea from '../../assets/logos/sea.png'
import sf from '../../assets/logos/sf.png'
import tb from '../../assets/logos/tb.png'
import ten from '../../assets/logos/ten.png'
import wsh from '../../assets/logos/wsh.png'

const teams = [
  { name: 'Arizona Cardinals', logo: ari, abbreviation: 'ari' },
  { name: 'Atlanta Falcons', logo: atl, abbreviation: 'atl' },
  { name: 'Baltimore Ravens', logo: bal, abbreviation: 'bal' },
  { name: 'Buffalo Bills', logo: buf, abbreviation: 'buf' },
  { name: 'Carolina Panthers', logo: car, abbreviation: 'car' },
  { name: 'Chicago Bears', logo: chi, abbreviation: 'chi' },
  { name: 'Cincinnati Bengals', logo: cin, abbreviation: 'cin' },
  { name: 'Cleveland Browns', logo: cle, abbreviation: 'cle' },
  { name: 'Dallas Cowboys', logo: dal, abbreviation: 'dal' },
  { name: 'Denver Broncos', logo: den, abbreviation: 'den' },
  { name: 'Detroit Lions', logo: det, abbreviation: 'det' },
  { name: 'Green Bay Packers', logo: gb, abbreviation: 'gb' },
  { name: 'Houston Texans', logo: hou, abbreviation: 'hou' },
  { name: 'Indianapolis Colts', logo: ind, abbreviation: 'ind' },
  { name: 'Jacksonville Jaguars', logo: jac, abbreviation: 'jac' },
  { name: 'Kansas City Chiefs', logo: kc, abbreviation: 'kc' },
  { name: 'Los Angeles Chargers', logo: lac, abbreviation: 'lac' },
  { name: 'Los Angeles Rams', logo: lar, abbreviation: 'lar' },
  { name: 'Las Vegas Raiders', logo: lv, abbreviation: 'lv' },
  { name: 'Miami Dolphins', logo: mia, abbreviation: 'mia' },
  { name: 'Minnesota Vikings', logo: min, abbreviation: 'min' },
  { name: 'New England Patriots', logo: ne, abbreviation: 'ne' },
  { name: 'New Orleans Saints', logo: no, abbreviation: 'no' },
  { name: 'New York Giants', logo: nyg, abbreviation: 'nyg' },
  { name: 'New York Jets', logo: nyj, abbreviation: 'nyj' },
  { name: 'Philadelphia Eagles', logo: phi, abbreviation: 'phi' },
  { name: 'Pittsburgh Steelers', logo: pit, abbreviation: 'pit' },
  { name: 'Seattle Seahawks', logo: sea, abbreviation: 'sea' },
  { name: 'San Francisco 49ers', logo: sf, abbreviation: 'sf' },
  { name: 'Tampa Bay Buccaneers', logo: tb, abbreviation: 'tb' },
  { name: 'Tennessee Titans', logo: ten, abbreviation: 'ten' },
  { name: 'Washington Commanders', logo: wsh, abbreviation: 'wsh' }
]

function CreateFranchise() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [abbreviation, setAbbreviation] = useState('')

  const mutation = useCreateFranchise()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const franchise = {
      name,
      description,
      team: selectedTeam,
      abbreviation
    }

    try {
      console.log('Franchise:', franchise)
      const newFranchise = await mutation.mutateAsync(franchise)
      console.log('New franchise:', newFranchise)
      toast.success('Franchise created successfully')
      // Clear form
      setName('')
      setDescription('')
      setSelectedTeam('')
      setAbbreviation('')
      // Route to Home page
      navigate(`/franchise/${newFranchise.id}`)
    } catch (error) {
      console.error('Failed to create franchise', error)
      toast.error('Failed to create franchise')
    }
  }

  return (
    <div className="px-8 py-2">
      <BackButton />
      <h1 className="text-2xl mb-6">Create a Franchise</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md bg-slate-800 border-slate-600 active:border-blue-500 focus-visible:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-200">
            Description (Optional)
          </label>
          <input
            type="text"
            id="team"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md bg-slate-800 border-slate-600 active:border-blue-500 focus-visible:border-blue-500"
          />
        </div>
        <p className="text-sm font-medium text-gray-200">Select a Team</p>
        <div className="grid grid-cols-8 gap-4">
          {teams.map((team, index) => (
            <div key={index} className="">
              <img
                src={team.logo}
                alt={team.name}
                className={`cursor-pointer rounded border w-24 ${
                  selectedTeam === team.name ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => {
                  setSelectedTeam(team.name)
                  setAbbreviation(team.abbreviation)
                }}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Franchise
        </button>
      </form>
    </div>
  )
}

export default CreateFranchise
