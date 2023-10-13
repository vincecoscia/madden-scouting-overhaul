// Create a franchise page getting params from the URL
import { NavLink, useParams } from 'react-router-dom'
import { useGetFranchise } from '../../queries/franchise'
import { useGetAllSeasons, useCreateSeason } from '../../queries/season'
import { BackButton } from '../../components/utilities/Buttons'
import { Loading } from '../../components/utilities/Loading'

function FranchiseId() {
  const { id } = useParams()

  const { data: franchise, isLoading } = useGetFranchise(id)

  const { data: seasons, isLoading: isSeasonsLoading } = useGetAllSeasons(id)

  const { mutate: createSeason } = useCreateSeason()

  const handleCreateSeason = () => {
    // If there are no seasons, create the first season with year as 2023
    const baseYear = 2023
    const numberOfSeasons = seasons.length
    const year = baseYear + numberOfSeasons

    const season = {
      name: `Season ${numberOfSeasons + 1}`,
      week: 1,
      year: year,
      franchiseId: id,
      balance: 2000,
    }

    createSeason(season)
  }



  console.log('id:', id)
  console.log('franchise:', franchise) 
  console.log('seasons:', seasons)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between mb-2">
        <BackButton />
        <div className="flex gap-x-1 mt-1">
          <p className="font-medium">{franchise.name}</p>
          <span className="text-gray-400">|</span>
          <p className="text-gray-500">
            <span className="font-medium">Last Saved:</span> {franchise.updatedAt.toLocaleString()}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-white text-3xl mb-2">{franchise.team} Franchise</h2>
        <div className="grid grid-cols-12">
          <div className="bg-slate-900 col-span-2 rounded">
            <div className="py-2 px-4 bg-slate-800 rounded-t">
              <h3 className="text-xl text-white text-center">Seasons</h3>
            </div>
            <div className="p-4">
              {isSeasonsLoading ? (
                <Loading />
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    className="bg-slate-800 rounded p-2 text-white hover:bg-slate-700"
                    onClick={handleCreateSeason}
                  >
                    Create New Season
                  </button>
                  {seasons?.map((season) => (
                    <NavLink                 
                      key={season.id}
                      to={`/season/${season.id}`} 
                      className="flex justify-between items-center px-5 bg-slate-800 rounded p-2 hover:bg-slate-700">
                      <p className="text-white">{season.name}</p>
                      <p className="text-white font-medium">{season.year}</p>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FranchiseId
