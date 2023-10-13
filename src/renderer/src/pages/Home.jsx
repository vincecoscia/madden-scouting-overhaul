import { NavLink } from 'react-router-dom'
import { useGetAllFranchises } from '../queries/franchise'
import nflLogo from '../assets/logos/nfl.png'
import ind from '../assets/logos/ind.png'
import ari from '../assets/logos/ari.png'
import atl from '../assets/logos/atl.png'
import bal from '../assets/logos/bal.png'
import buf from '../assets/logos/buf.png'
import car from '../assets/logos/car.png'
import chi from '../assets/logos/chi.png'
import cin from '../assets/logos/cin.png'
import cle from '../assets/logos/cle.png'
import dal from '../assets/logos/dal.png'
import den from '../assets/logos/den.png'
import det from '../assets/logos/det.png'
import gb from '../assets/logos/gb.png'
import hou from '../assets/logos/hou.png'
import jac from '../assets/logos/jac.png'
import kc from '../assets/logos/kc.png'
import lac from '../assets/logos/lac.png'
import lar from '../assets/logos/lar.png'
import lv from '../assets/logos/lv.png'
import mia from '../assets/logos/mia.png'
import min from '../assets/logos/min.png'
import ne from '../assets/logos/ne.png'
import no from '../assets/logos/no.png'
import nyg from '../assets/logos/nyg.png'
import nyj from '../assets/logos/nyj.png'
import phi from '../assets/logos/phi.png'
import pit from '../assets/logos/pit.png'
import sea from '../assets/logos/sea.png'
import sf from '../assets/logos/sf.png'
import tb from '../assets/logos/tb.png'
import ten from '../assets/logos/ten.png'
import wsh from '../assets/logos/wsh.png'

const logos = {
  nfl: nflLogo,
  ind: ind,
  ari: ari,
  atl: atl,
  bal: bal,
  buf: buf,
  car: car,
  chi: chi,
  cin: cin,
  cle: cle,
  dal: dal,
  den: den,
  det: det,
  gb: gb,
  hou: hou,
  jac: jac,
  kc: kc,
  lac: lac,
  lar: lar,
  lv: lv,
  mia: mia,
  min: min,
  ne: ne,
  no: no,
  nyg: nyg,
  nyj: nyj,
  phi: phi,
  pit: pit,
  sea: sea,
  sf: sf,
  tb: tb,
  ten: ten,
  wsh: wsh
}

function Home() {
  // Get all franchises
  const { data: franchises, isLoading } = useGetAllFranchises()

  console.log('franchises:', franchises)

  return (
    <div className="flex h-full w-screen">
      <div className="m-4 px-4 py-4 bg-slate-900 flex-1">
        <h2 className="text-xl mb-2">Choose your Franchise</h2>
        {isLoading ? (
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 items-start">
            <NavLink
              to="/franchise/create"
              className="px-4 py-2 border border-dashed border-slate-600  rounded hover:bg-slate-500 flex justify-center items-center"
            >
              <p className="text-xl">New Franchise</p>
            </NavLink>
            {franchises?.map((franchise) => (
              <NavLink
                key={franchise.id}
                to={`/franchise/${franchise.id}`}
                className="pl-4 pr-6 py-2 bg-slate-600 rounded hover:bg-slate-500 flex justify-center items-center space-x-2"

              >
                <img
                  className="w-10"
                  src={logos[franchise.abbreviation.toLowerCase()]}
                  alt={`${franchise.name} Logo`}
                />
                <p className="text-xl">{franchise.name}</p>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div className="bg-neutral-900 px-10 pt-4">
        <h3 className="text-2xl">About</h3>
        // TODO: Add instructions here
      </div>
    </div>
  )
}

export default Home
