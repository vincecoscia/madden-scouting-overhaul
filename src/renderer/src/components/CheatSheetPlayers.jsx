import { useState, useEffect } from 'react'

export const CheatSheetPlayers = (props) => {
  const { players } = props
  const [activeTab, setActiveTab] = useState('all')
  const [filteredPlayers, setFilteredPlayers] = useState(players)
  const [sortState, setSortState] = useState({ attribute: null, order: 'default' })

  const playerAttributes = players[0] ? Object.keys(players[0]) : []

  const handleTabClick = (tab) => {
    setActiveTab(tab)

    if (tab === 'all') {
      setSortState({ attribute: null, order: 'default' })
      setFilteredPlayers(players)
    } else {
      setSortState({ attribute: null, order: 'default' })
      setFilteredPlayers(players.filter((player) => player.position === tab))
    }
  }

  const convertInchesToFeet = (inches) => {
    const feet = Math.floor(inches / 12)
    const remainingInches = inches % 12
    return `${feet}' ${remainingInches}"`
  }

  const sortPlayers = (sortBy) => {
    console.log('sortBy:', sortBy)

    let order = 'asc'
    if (sortState.attribute === sortBy) {
      order = sortState.order === 'asc' ? 'desc' : sortState.order === 'desc' ? 'default' : 'asc'
    }

    setSortState({ attribute: sortBy, order })

    let sortedPlayers
    if (order === 'default') {
      sortedPlayers = [...filteredPlayers] // Assuming players is the original unsorted array
    } else {
      sortedPlayers = [...filteredPlayers].sort((a, b) => {
        let comparison = 0
        if (typeof a[sortBy] === 'number') {
          comparison = a[sortBy] - b[sortBy]
        } else {
          comparison = a[sortBy].localeCompare(b[sortBy])
        }

        return order === 'desc' ? -comparison : comparison
      })
    }

    setFilteredPlayers(sortedPlayers)
  }

  if (!players || !players.length) {
    return <div>Please Upload a Franchise File to see players</div>
  }

  return (
    <>
      {/* Filter by Position */}
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
      {/* Add sorting for players here */}
      {/* <div className="flex rounded bg-neutral-900 mb-2 mr-3">
        {playerAttributes.map((attribute) => (
          <button
            key={attribute}
            className="border-r border-gray-600 flex flex-col justify-center items-center py-4 relative"
            onClick={() => sortPlayers(attribute)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute top-0 ${
                sortState.order === 'asc' && sortState.attribute === attribute ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>

            <p className="">{attribute}</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 stroke-blue-600 absolute bottom-0 ${
                sortState.order === 'desc' && sortState.attribute === attribute ? 'block' : 'hidden'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        ))}
      </div> */}
      {/* Players */}
      <div className='h-[calc(100vh-255px)] w-full overflow-scroll'>
      <table className="w-full text-sm text-left text-gray-400">
      <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
        <tr>
          {Object.keys(players[0] || {}).map(key => (
            <th
              key={key}
              className="px-6 py-3 cursor-pointer"
              onClick={() => sortPlayers(key)}
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlayers.map((player, index) => (
          <tr key={index} className="border-b bg-gray-800 border-gray-700">
            {Object.values(player).map((value, idx) => (
              <td key={idx} className="px-6 py-4">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  )
}
