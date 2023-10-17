import { useState } from 'react'
import { Portrait } from '../Portrait'

export const SeasonProspects = (props) => {
  const { players } = props
  const [activeTab, setActiveTab] = useState('all')
  const [filteredPlayers, setFilteredPlayers] = useState(players)
  const [sortBy, setSortBy] = useState('initialDraftRank')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterBy, setFilterBy] = useState('all')
  const [isFilterByOpen, setIsFilterByOpen] = useState(false)
  const [inputFilter, setInputFilter] = useState('')

  const handleTabClick = (tab) => {
    setActiveTab(tab)

    if (tab === 'all') {
       setFilteredPlayers(players)
    } else {
      setFilteredPlayers(players.filter((player) => player.position === tab))
    }
  }

  const handleSortBy = (sort) => {
    setSortBy(sort)
    if (sortOrder === 'asc') {
      setSortOrder('desc')
    } else if (sortOrder === 'desc') {
      setSortOrder('none')
    } else {
      setSortOrder('asc')
    }

    // setFilteredPlayers(sortPlayers(filterPlayersByPosition(players)))
  }

  const handleSortOrder = (order) => {
    setSortOrder(order)
  }

  const sortPlayers = (players) => {
    return players.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy]
      } else if (sortOrder === 'desc') {
        return b[sortBy] - a[sortBy]
      } else {
        // dont sort
        return 0
      }
    })
  }

  const filterPlayersByPosition = (players) => {
    if (activeTab === 'all') {
      return players
    } else {
      return players.filter((player) => player.position === activeTab)
    }
  }

  const handleFilterBy = (filter) => {
    setIsFilterByOpen(false)
    setFilterBy(filter)
  }



  const filterPlayersByInput = (input) => {
    if (input === '') {
      setFilteredPlayers(filterPlayersByPosition(players))
    }
    // use filterBy to filter players
    else if (filterBy === 'all') {
      setFilteredPlayers(
        players.filter((player) => {
          return (
            player.firstName.toLowerCase().includes(input.toLowerCase()) ||
            player.lastName.toLowerCase().includes(input.toLowerCase()) ||
            player.college.toLowerCase().includes(input.toLowerCase()) ||
            player.conference.toLowerCase().includes(input.toLowerCase()) ||
            player.sparq.toString().includes(input.toLowerCase())
          )
        })
      )
    } else if (filterBy === 'firstName') {
      setFilteredPlayers(
        players.filter((player) => {
          return player.firstName.toLowerCase().includes(input.toLowerCase())
        })
      )
    } else if (filterBy === 'lastName') {
      setFilteredPlayers(
        players.filter((player) => {
          return player.lastName.toLowerCase().includes(input.toLowerCase())
        })
      )
    } else if (filterBy === 'college') {
      setFilteredPlayers(
        players.filter((player) => {
          return player.college.toLowerCase().includes(input.toLowerCase())
        })
      )
    } else if (filterBy === 'conference') {
      setFilteredPlayers(
        players.filter((player) => {
          return player.conference.toLowerCase().includes(input.toLowerCase())
        })
      )
    } else if (filterBy === 'sparq') {
      setFilteredPlayers(
        players.filter((player) => {
          return player.sparq.toString().includes(input.toLowerCase())
        })
      )
    } else {
      setFilteredPlayers(filterPlayersByPosition(players))
    }
  }

  const handleInputFilter = (e) => {
    setInputFilter(e.target.value)
    filterPlayersByInput(e.target.value)
  }

  const convertInchesToFeet = (inches) => {
    const feet = Math.floor(inches / 12)
    const remainingInches = inches % 12
    return `${feet}' ${remainingInches}"`
  }

  return (
    <>
      <div className='mb-2'>
        <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-700 text-gray-400">
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'all' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('all')}
            >
              All
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'QB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('QB')}
            >
              QB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'HB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('HB')}
            >
              HB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'FB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('FB')}
            >
              FB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'WR' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('WR')}
            >
              WR
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'TE' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('TE')}
            >
              TE
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'LT' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('LT')}
            >
              LT
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'LG' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('LG')}
            >
              LG
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'C' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('C')}
            >
              C
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'RG' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('RG')}
            >
              RG
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer  hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'RT' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('RT')}
            >
              RT
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'LE' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('LE')}
            >
              LE
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'RE' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('RE')}
            >
              RE
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'DT' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('DT')}
            >
              DT
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'LOLB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('LOLB')}
            >
              LOLB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'MLB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('MLB')}
            >
              MLB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-800 hover:text-gray-300` +
                (activeTab === 'ROLB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('ROLB')}
            >
              ROLB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 cursor-pointer` +
                (activeTab === 'CB' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('CB')}
            >
              CB
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 cursor-pointer` +
                (activeTab === 'FS' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('FS')}
            >
              FS
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 cursor-pointer` +
                (activeTab === 'SS' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('SS')}
            >
              SS
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 cursor-pointer` +
                (activeTab === 'K' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('K')}
            >
              K
            </p>
          </li>
          <li className="mr-2">
            <p
              className={
                `inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:text-gray-300 cursor-pointer` +
                (activeTab === 'P' ? ' bg-gray-800 text-blue-500' : '')
              }
              onClick={() => handleTabClick('P')}
            >
              P
            </p>
          </li>
        </ul>
      </div>
      {/* Add input filtering here */}
      <div className="flex items-center px-8 bg-gray-700 mb-4">
        <p className="text-xl text-white py-4 border-r border-gray-500 pr-8">Filter</p>
        {/* <input
          className="text-black pl"
          type="text"
          placeholder="Search"
          value={inputFilter}
          onChange={handleInputFilter}
        /> */}
          <div className="flex relative pl-8">
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              type="button"
              onClick={() => setIsFilterByOpen(!isFilterByOpen)}
            >
              All{' '}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-blue-900 absolute top-12` + (isFilterByOpen ? ' block' : ' hidden')}
            >
              <ul
                className="py-2 text-sm text-gray-200"
                aria-labelledby="dropdown-button"
              >
                                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
                    onClick={() => handleFilterBy('all')}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
                    onClick={() => handleFilterBy('firstName')}
                  >
                    First Name
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Images
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Finance
                  </a>
                </li>
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              </button>
            </div>
          </div>

      </div>

      {/* Add sorting for players here */}

      <div className="flex items-center px-8 bg-gray-700 rounded mb-4">
        <p className="text-xl text-white py-4 border-r border-gray-500 pr-8">Sort By</p>
        <div className="flex items-center space-x-2 pl-8">
          <button
            className="text-white hover:underline underline-offset-2"
            onClick={() => handleSortBy('initialDraftRank')}
          >
            Initial Rank
          </button>
          <button
            className="text-white hover:underline underline-offset-2"
            onClick={() => handleSortBy('height')}
          >
            Height
          </button>
          <button
            className="text-white hover:underline underline-offset-2"
            onClick={() => handleSortBy('weight')}
          >
            Weight
          </button>
          <button
            className="text-white hover:underline underline-offset-2"
            onClick={() => handleSortBy('sparq')}
          >
            SPARQ
          </button>
          <button
            className="text-white hover:underline underline-offset-2"
            onClick={() => handleSortBy('isScouted')}
          >
            Is Scouted
          </button>
        </div>
      </div>

      {/* Add players */}
      <div className="flex flex-col gap-y-2 h-[610px] overflow-hidden overflow-y-scroll">
        {filteredPlayers.map((player) => (
          <div className="flex rounded bg-neutral-900">
            <div className="border-r border-gray-600 flex justify-center items-center w-28">
              <p className='text-2xl'>{player.initialDraftRank}</p>
            </div>
            <div className="flex ml-8 w-96 pr-8 border-r border-gray-600">
              <Portrait id={player.portrait} />
              <div className=" flex flex-col justify-center py-2 ml-8">
                <p className='text-xl font-semibold'>
                  {player.firstName} {player.lastName}
                </p>
                <p>
                  {player.college} | {player.conference}
                </p>
              </div>
            </div>
            <div className='flex justify-center items-center w-24 border-r border-gray-600'>
              <p className='text-3xl font-semibold'>{player.position}</p>
            </div>
            <div className="flex flex-col justify-center w-24 items-center border-r border-gray-600">
              <p className='text-xl font-semibold'>{convertInchesToFeet(player.height)}</p>
              <p className='text-2xl'>{player.weight}</p>
              </div>
          </div>
        ))}
      </div>
    </>
  )
}
