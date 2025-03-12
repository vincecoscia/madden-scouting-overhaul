import { Portrait } from '../Portrait'
import { useState } from 'react'
import { MessageModal } from '../utilities/MessageModal'
import { useHireScoutForSeason, useFireScoutFromSeason } from '../../queries/scout'
import { useLockScouts } from '../../queries/season'
import { toast } from 'react-toastify'

export const SeasonScouts = (props) => {
  const { season, franchiseScouts, seasonScouts } = props
  const [sortedFranchiseScouts, setSortedFranchiseScouts] = useState(franchiseScouts)
  const [sortState, setSortState] = useState({ attribute: null, order: 'default' })

  console.log('BEST POSITIONS', season.best[0].position)
  console.log('WORST POSITIONS', season.worst)

  const { mutateAsync: hireScoutForSeason } = useHireScoutForSeason({
    onSuccess: () => {
      console.log('hireScoutForSeason success')
    },
    onError: (error) => {
      console.error('TOAST ERROR:', error) // This will log the full error object
      toast.error(error.errorMessage || 'An error occurred') // Display the custom error message or a default one
    }
  })

  const { mutateAsync: fireScoutFromSeason } = useFireScoutFromSeason({
    onSuccess: () => {
      console.log('fireScoutFromSeason success')
    }
  })

  const { mutateAsync: lockScouts } = useLockScouts({
    onSuccess: () => {
      console.log('lockScouts success')
    }
  })

  const sortScouts = (sortBy) => {
    console.log('sortBy:', sortBy)

    let order = 'asc'
    if (sortState.attribute === sortBy) {
      order = sortState.order === 'asc' ? 'desc' : sortState.order === 'desc' ? 'default' : 'asc'
    }

    setSortState({ attribute: sortBy, order })

    let sortedScouts
    if (order === 'default') {
      sortedScouts = [...franchiseScouts] // Assuming scouts is the original unsorted array
    } else {
      sortedScouts = [...franchiseScouts].sort((a, b) => {
        let comparison = 0
        if (typeof a[sortBy] === 'number') {
          comparison = a[sortBy] - b[sortBy]
        } else {
          comparison = a[sortBy].localeCompare(b[sortBy])
        }

        return order === 'desc' ? -comparison : comparison
      })
    }

    setSortedFranchiseScouts(sortedScouts)
  }

  const convertThousands = (number) => {
    // Return number divided by 1000 with 1 decimal place
    return (number / 1000).toFixed(2)
  }

  return (
    <div>
      <div className="flex gap-x-4">
        <div className="pr-4  rounded mb-4 bg-blue-700 w-fit flex items-center">
          <p className="py-5 px-4 rounded-l bg-neutral-800">Season Balance: </p>
          {season.balance > 999 ? (
            <p className="py-4 ml-4 text-xl">{convertThousands(season.balance)}M</p>
          ) : (
            <p className="py-4 ml-4 text-xl">{season.balance}K</p>
          )}
        </div>
        <div className="pr-4  rounded mb-4 bg-blue-700 w-fit flex items-center">
          <p className="py-5 px-4 rounded-l bg-neutral-800">Best Positions</p>
          <div className="flex gap-x-2 ml-4">
            {season.best.map((best, index) => {
              // Include index here
              return (
                <p className="text-xl text-white">
                  {best.position ? best.position.toString() : ''}
                  {index !== season.best.length - 1 ? ',' : ''}
                </p>
              )
            })}
          </div>
        </div>
        <div className="pr-4  rounded mb-4 bg-blue-700 w-fit flex items-center">
          <p className="py-5 px-4 rounded-l bg-neutral-800">Worst Positions</p>
          <div className="flex gap-x-2 ml-4">
            {season.worst.map((worst, index) => {
              return (
                <p className="text-xl text-white">
                  {worst.position ? worst.position.toString() : ''}
                  {index !== season.worst.length - 1 ? ',' : ''}
                </p>
              )
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-4 h-[680px]">
        <div className="flex flex-col rounded bg-neutral-900 h-[680px]">
          <div className="flex justify-center w-full py-2 border-b border-gray-600 ">
            <p className="text-xl">Hired Scouts</p>
          </div>

          {seasonScouts.length > 0 ? (
            <div className="flex flex-col justify-between h-full">
              <div className="overflow-y-scroll flex flex-col gap-y-2 ml-2 py-2">
                {seasonScouts.map((scout) => {
                  return (
                    <div
                      key={scout.id}
                      className="flex items-center rounded bg-neutral-800 gap-y-2"
                    >
                      <div className="flex items-center border-r border-gray-600 w-64 pl-2">
                        <Portrait id={scout.portrait} />
                        <div className=" ml-2">
                          <p className="text-lg">
                            {scout.firstName} {scout.lastName}
                          </p>
                          <p>{scout.specialty}</p>
                        </div>
                      </div>
                      <div className="flex h-full items-center justify-center border-r border-gray-600 w-24">
                        <p className="text-2xl">{scout.evaluation}</p>
                      </div>
                      <div className="flex h-full items-center justify-center border-r border-gray-600 w-24">
                        <p className="text-2xl">{scout.reputation}</p>
                      </div>
                      <div className="flex h-full items-center justify-center w-32">
                        <button
                          className="px-4 py-2 bg-red-700 text-white rounded"
                          onClick={() =>
                            fireScoutFromSeason({
                              scoutId: scout.id,
                              seasonId: season.id,
                              cost: scout.cost
                            })
                          }
                        >
                          Fire
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex mb-2 w-full">
                <button
                  className="py-2 bg-green-700 text-white rounded w-full mx-2"
                  onClick={() =>
                    lockScouts(season.id)
                  }
                >
                  Lock In Scouts
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-2/3">
              <p className="text-xl">No scouts hired</p>
              <p>Please hire scouts from the next panel</p>
            </div>
          )}
        </div>
        <div className="flex flex-col rounded bg-neutral-900 mb-2 col-span-2 h-[680px] overflow-hidden">
          <div className="flex justify-center w-full py-2 border-b border-gray-600 ">
            <p className="text-xl">Available Scouts</p>
          </div>
          <div className="flex items-center rounded bg-neutral-800 gap-y-2 mx-2 mt-2">
            <button
              className="border-r border-gray-600 flex flex-col justify-center items-center w-80 py-4 relative"
              onClick={() => sortScouts('firstName')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'firstName'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>

              <p className="">Name</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'firstName'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="border-r border-gray-600 flex h-full items-center justify-center w-24 py-4 relative"
              onClick={() => sortScouts('evaluation')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'evaluation'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>

              <p className="">Evaluation</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'evaluation'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="border-r border-gray-600 flex h-full items-center justify-center w-24 py-4 relative"
              onClick={() => sortScouts('reputation')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'reputation'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <p className="">Reputation</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'reputation'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="border-r border-gray-600 flex h-full items-center justify-center w-28 py-4 relative"
              onClick={() => sortScouts('bias')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'bias' ? 'block' : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <p className="">Bias</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'bias' ? 'block' : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="border-r border-gray-600 flex h-full items-center justify-center w-28 py-4 relative"
              onClick={() => sortScouts('specialty')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'specialty'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <p className="">Specialty</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'specialty'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="border-r border-gray-600 flex h-full items-center justify-center w-28 py-4 relative"
              onClick={() => sortScouts('conferenceSpecialty')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'conferenceSpecialty'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <p className="">Conference</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'conferenceSpecialty'
                    ? 'block'
                    : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="flex h-full items-center justify-center w-24 py-4 relative border-r border-gray-600"
              onClick={() => sortScouts('cost')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                  sortState.order === 'asc' && sortState.attribute === 'cost' ? 'block' : 'hidden'
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <p className="">Cost</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                  sortState.order === 'desc' && sortState.attribute === 'cost' ? 'block' : 'hidden'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {franchiseScouts.length > 0 ? (
            <div className="overflow-y-scroll flex flex-col gap-y-2 px-2 py-2">
              {sortedFranchiseScouts.map((scout) => {
                return (
                  <div key={scout.id} className="flex items-center rounded bg-neutral-800 gap-y-2">
                    <div className="flex items-center border-r border-gray-600 w-80 pl-4">
                      <Portrait id={scout.portrait} />
                      <div className=" ml-4">
                        <p className="text-xl">
                          {scout.firstName} {scout.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-24">
                      <p className="text-2xl">{scout.evaluation}</p>
                    </div>
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-24">
                      <p className="text-2xl">{scout.reputation}</p>
                    </div>
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-28">
                      <p className="">{scout.bias}</p>
                    </div>
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-28">
                      <p className="">{scout.specialty}</p>
                    </div>
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-28">
                      <p className="">{scout.conferenceSpecialty}</p>
                    </div>
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-24">
                      <p className="text-xl">
                        {scout.cost > 999 ? (
                          <span>{convertThousands(scout.cost)}M</span>
                        ) : (
                          <span>{scout.cost}K</span>
                        )}
                      </p>
                    </div>
                    <div className="flex h-full items-center justify-center w-60 ml-2">
                      {seasonScouts.some((seasonScout) => seasonScout.id === scout.id) ? (
                        <div className="px-12 py-2 bg-green-700 text-white rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      ) : seasonScouts.length >= 5 ? (
                        <div className="text-white">Max Scouts Hired (5)</div>
                      ) : (
                        <button
                          className="px-12 py-2 text-white rounded bg-blue-700"
                          onClick={() =>
                            hireScoutForSeason({
                              scoutId: scout.id,
                              seasonId: season.id,
                              cost: scout.cost,
                              balance: season.balance
                            })
                          }
                        >
                          Hire
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-2/3">
              <p className="text-xl">No scouts available</p>
              <p>Please generate scouts from the next panel</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
