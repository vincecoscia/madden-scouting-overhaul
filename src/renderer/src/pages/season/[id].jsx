import { NavLink, useParams } from 'react-router-dom'
import { useGetAllSeasons, useGetSeason } from '../../queries/season'
import { useGetFranchise } from '../../queries/franchise'
import { BackButton } from '../../components/utilities/Buttons'
import { Loading } from '../../components/utilities/Loading'

function SeasonId() {
  const { id } = useParams()

  const { data: season, isLoading } = useGetSeason(id)

  const franchiseId = season ? season.franchiseId : ''

  const { data: franchise, isLoading: isFranchiseLoading } = useGetFranchise(franchiseId)

  console.log('id:', id)
  console.log('season:', season)
  console.log('franchise:', franchise)

  if (isLoading || isFranchiseLoading) {
    return <Loading />
  }

  return (
    <div>
      {season.name}
    </div>
  )

  
}

export default SeasonId
