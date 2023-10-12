// Create a franchise page getting params from the URL
import { useParams, useLocation } from 'react-router-dom'
import { useGetFranchise } from '../../queries/franchise'

function FranchiseId() {
  const { id } = useParams()

  const location = useLocation()

  console.log('location:', location)
  
  const { data: franchise, isLoading } = useGetFranchise(id)


  console.log('id:', id)
  console.log('franchise:', franchise)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='text-white text-3xl'>
      {franchise.name}
    </div>
  )
}

export default FranchiseId