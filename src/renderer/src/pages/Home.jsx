import { NavLink } from 'react-router-dom'
import { useGetAllFranchises } from '../queries/franchise'

function Home() {
  // Get all franchises
  const { data: franchises, isLoading } = useGetAllFranchises()

  console.log('franchises:', franchises)

  return (
    <div className="flex h-full w-screen">
      <div className="grow px-4 pt-4">
        <h2 className="text-3xl font-semibold">Franchises</h2>
        // TODO: Map over franchises here and display them, if loading display a loading message
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col space-y-4">
            {franchises?.map((franchise) => (
              <NavLink
                key={franchise.ID}
                to={`/franchise/${franchise.id}`}
                className="text-xl"
                activeClassName="text-blue-300"
              >
                {franchise.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div className="grow bg-blue-600 px-10 pt-4">
        <h3 className="text-2xl">About</h3>
        // TODO: Add instructions here
      </div>
    </div>
  )
}

export default Home
