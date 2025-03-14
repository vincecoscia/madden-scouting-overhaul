import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useGetAllPlayers } from '../../queries/player'
import { PlayerRow } from './PlayerRow'

export const SeasonProspects = ({ seasonId }) => {
  const [activeTab, setActiveTab] = useState('all')
  const [isFilterByOpen, setIsFilterByOpen] = useState(false)
  const [sortState, setSortState] = useState({ attribute: null, order: 'default' })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

  const { data: players = [], refetch } = useGetAllPlayers(seasonId, {
    position: activeTab === 'all' ? undefined : activeTab,
    sortBy: sortState.attribute,
    sortOrder: sortState.order,
    searchTerm: debouncedSearchTerm
  })

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setSortState({ attribute: null, order: 'default' })
  }

  const convertInchesToFeet = (inches) => {
    const feet = Math.floor(inches / 12)
    const remainingInches = inches % 12
    return `${feet}' ${remainingInches}"`
  }

  const determineSparqColor = (sparq) => {
    if (sparq > 86) {
      return 'fill-amber-300'
    } else if (sparq > 79) {
      return 'fill-green-500'
    } else if (sparq > 69) {
      return 'fill-blue-500'
    } else {
      return 'fill-red-500'
    }
  }

  const sortPlayers = (sortBy) => {
    let order = 'asc'
    if (sortState.attribute === sortBy) {
      order = sortState.order === 'asc' ? 'desc' : sortState.order === 'desc' ? 'default' : 'asc'
    }

    setSortState({ attribute: sortBy, order })

    refetch({
      position: activeTab === 'all' ? undefined : activeTab,
      sortBy: sortBy,
      sortOrder: order
    })
  }

  return (
    <>
      <div className="mb-2">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={
              `z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-blue-900 absolute top-12` +
              (isFilterByOpen ? ' block' : ' hidden')
            }
          >
            <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdown-button">
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
                  onClick={() => handleFilterBy('all', typedValue)}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
                  onClick={() => handleFilterBy('firstName', typedValue)}
                >
                  First Name
                </button>
              </li>
            </ul>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) => handleFilterBy(selectedAttribute, e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Add sorting for players here */}
      <div className="flex rounded bg-neutral-900 mb-2 mr-3">
        <button
          className="border-r border-gray-600 flex flex-col justify-center items-center w-28 py-4 relative"
          onClick={() => sortPlayers('initialDraftRank')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
              sortState.order === 'asc' && sortState.attribute === 'initialDraftRank'
                ? 'block'
                : 'hidden'
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>

          <p className="">Initial Rank</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
              sortState.order === 'desc' && sortState.attribute === 'initialDraftRank'
                ? 'block'
                : 'hidden'
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div className="flex ml-8 w-96 pr-8 border-r border-gray-600 justify-around">
          <button className="relative flex items-center" onClick={() => sortPlayers('firstName')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute top-0 left-2 ${
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
              className={`w-6 h-6 stroke-blue-600 absolute bottom-0 left-2 ${
                sortState.order === 'desc' && sortState.attribute === 'firstName'
                  ? 'block'
                  : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <button className="relative flex items-center" onClick={() => sortPlayers('college')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute top-0 left-4 ${
                sortState.order === 'asc' && sortState.attribute === 'college' ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <p className="">College</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute bottom-0 left-4 ${
                sortState.order === 'desc' && sortState.attribute === 'college' ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <button className="relative flex items-center" onClick={() => sortPlayers('conference')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute top-0 left-7 ${
                sortState.order === 'asc' && sortState.attribute === 'conference'
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
              className={`w-6 h-6 stroke-blue-600 absolute bottom-0 left-7 ${
                sortState.order === 'desc' && sortState.attribute === 'conference'
                  ? 'block'
                  : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
        <button
          className="flex justify-center items-center w-24 border-r border-gray-600 relative"
          onClick={() => sortPlayers('position')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
              sortState.order === 'asc' && sortState.attribute === 'position' ? 'block' : 'hidden'
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <p className="">Position</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
              sortState.order === 'desc' && sortState.attribute === 'position' ? 'block' : 'hidden'
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div className="flex justify-center w-24 items-center border-r border-gray-600">
          <button className="relative mr-4" onClick={() => sortPlayers('height')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute -top-4 -right-2 ${
                sortState.order === 'asc' && sortState.attribute === 'height' ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <p className="">H</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute -bottom-4 -right-[0.41rem] ${
                sortState.order === 'desc' && sortState.attribute === 'height' ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <button className=" relative" onClick={() => sortPlayers('weight')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute -top-4 -right-[0.36rem] ${
                sortState.order === 'asc' && sortState.attribute === 'weight' ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <p className="">W</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute -bottom-4 -right-[0.35rem] ${
                sortState.order === 'desc' && sortState.attribute === 'weight' ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
        <button
          className="flex flex-col justify-center w-24 items-center border-r border-gray-600 relative"
          onClick={() => sortPlayers('sparq')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
              sortState.order === 'asc' && sortState.attribute === 'sparq' ? 'block' : 'hidden'
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <p className="">SPARQ</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
              sortState.order === 'desc' && sortState.attribute === 'sparq' ? 'block' : 'hidden'
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <button className="flex-1 border-r border-gray-600">Key Attributes</button>
        <button className="flex flex-col justify-center items-center w-56 border-gray-600 relative">
          Scouting
        </button>
      </div>

      {/* Add players */}
      <div className="flex flex-col gap-y-2 h-[560px] overflow-hidden overflow-y-scroll">
        {players.map((player) => (
          <PlayerRow
            key={player.id}
            player={player}
            convertInchesToFeet={convertInchesToFeet}
            determineSparqColor={determineSparqColor}
          />
        ))}
      </div>
    </>
  )
}
