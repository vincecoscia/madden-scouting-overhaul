import { NavLink, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useGetAllSeasons, useGetSeason } from '../../queries/season'
import { useGetFranchise } from '../../queries/franchise'
import { useGetAllPlayers, useCreatePlayers } from '../../queries/player'
import { BackButton } from '../../components/utilities/Buttons'
import { Loading } from '../../components/utilities/Loading'
import Table from '../../components/Table'

function SeasonId() {
  const [selectedFilePath, setSelectedFilePath] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [filteredPlayers, setFilteredPlayers] = useState([])

  const { id } = useParams()

  const { data: season, isLoading } = useGetSeason(id)

  const franchiseId = season ? season.franchiseId : ''

  const { data: franchise, isLoading: isFranchiseLoading } = useGetFranchise(franchiseId)

  const {
    data: players,
    isLoading: isPlayersLoading,
    refetch: refetchPlayers
  } = useGetAllPlayers(id)

  const { mutateAsync: createPlayers } = useCreatePlayers({
    onSuccess: () => {
      console.log('createPlayers success')
      refetchPlayers()
    }
  })

  function handleFileSelection(event) {
    const file = event.target.files[0]
    if (file) {
      setSelectedFilePath(file.path)
    }
  }

  function handleSubmit() {
    console.log('Submit button clicked')
    console.log('SEASON ID:', season.id)
    if (selectedFilePath) {
      createPlayers({ players: selectedFilePath, seasonId: season.id })
    } else {
      console.error('selectedFilePath is undefined or not valid:', selectedFilePath)
    }
  }

  function handleTabClick(tab) {
    setActiveTab(tab)
    // filter players by position
    if (tab === 'all') {
      setFilteredPlayers(players)
    } else {
      const filtered = players.filter((player) => player.position === tab)
      setFilteredPlayers(filtered)
    }
  }

  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Position',
      accessor: 'position',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'College',
      accessor: 'college',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Age',
      accessor: 'age',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Height',
      accessor: 'height',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Weight',
      accessor: 'weight',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Overall',
      accessor: 'overall',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Trait Development',
      accessor: 'traitDevelopment',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Contract Status',
      accessor: 'contractStatus',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Motivation 1',
      accessor: 'motivation1',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Motivation 2',
      accessor: 'motivation2',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Motivation 3',
      accessor: 'motivation3',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Hit Power',
      accessor: 'hitPower',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Jumping',
      accessor: 'jumping',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Agility',
      accessor: 'agility',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Acceleration',
      accessor: 'acceleration',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Kick Power',
      accessor: 'kickPower',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Kick Accuracy',
      accessor: 'kickAccuracy',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Break Sack',
      accessor: 'breakSack',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Block Shed',
      accessor: 'blockShed',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'BC Vision',
      accessor: 'bcVision',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Awareness',
      accessor: 'awareness',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Catch In Traffic',
      accessor: 'catchInTraffic',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Catch',
      accessor: 'catch',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Carrying',
      accessor: 'carrying',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Break Tackle',
      accessor: 'breakTackle',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Deep Route',
      accessor: 'deepRoute',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Medium Route',
      accessor: 'mediumRoute',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Short Route',
      accessor: 'shortRoute',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Confidence',
      accessor: 'confidence',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Change Of Direction',
      accessor: 'changeOfDirection',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Impact Blocking',
      accessor: 'impactBlocking',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Finesse Moves',
      accessor: 'finesseMoves',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Power Moves',
      accessor: 'powerMoves',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Juke Move',
      accessor: 'jukeMove',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Injury',
      accessor: 'injury',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Kick Return',
      accessor: 'kickReturn',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Man Coverage',
      accessor: 'manCoverage',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Long Snapping',
      accessor: 'longSnapping',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Lead Block',
      accessor: 'leadBlock',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Press',
      accessor: 'press',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Run Block',
      accessor: 'runBlock',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Run Block Power',
      accessor: 'runBlockPower',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Run Block Finesse',
      accessor: 'runBlockFinesse',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Release',
      accessor: 'release',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pursuit',
      accessor: 'pursuit',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Speed',
      accessor: 'speed',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Spectacular Catch',
      accessor: 'spectacularCatch',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Strength',
      accessor: 'strength',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Stiff Arm',
      accessor: 'stiffArm',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Stamina',
      accessor: 'stamina',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Spin Move',
      accessor: 'spinMove',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw Accuracy',
      accessor: 'throwAccuracy',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw Accuracy Short',
      accessor: 'throwAccuracyShort',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw Accuracy Mid',
      accessor: 'throwAccuracyMid',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw Accuracy Deep',
      accessor: 'throwAccuracyDeep',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Tackle',
      accessor: 'tackle',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw Under Pressure',
      accessor: 'throwUnderPressure',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw Power',
      accessor: 'throwPower',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Throw On The Run',
      accessor: 'throwOnTheRun',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Zone Coverage',
      accessor: 'zoneCoverage',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Trucking',
      accessor: 'trucking',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Toughness',
      accessor: 'toughness',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Play Action',
      accessor: 'playAction',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pass Block',
      accessor: 'passBlock',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pass Block Power',
      accessor: 'passBlockPower',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pass Block Finesse',
      accessor: 'passBlockFinesse',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Is Visible',
      accessor: 'isVisible',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pro Day Three Cone Drill',
      accessor: 'proDayThreeConeDrill',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pro Day Twenty Yard Shuttle',
      accessor: 'proDayTwentyYardShuttle',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pro Day Vertical Jump',
      accessor: 'proDayVerticalJump',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pro Day Forty Yard Dash',
      accessor: 'proDayFortyYardDash',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pro Day Bench Press',
      accessor: 'proDayBenchPress',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Pro Day Broad Jump',
      accessor: 'proDayBroadJump',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Three Cone Drill',
      accessor: 'combineThreeConeDrill',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Twenty Yard Shuttle',
      accessor: 'combineTwentyYardShuttle',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Vertical Jump',
      accessor: 'combineVerticalJump',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Forty Yard Dash',
      accessor: 'combineFortyYardDash',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Bench Press',
      accessor: 'combineBenchPress',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Broad Jump',
      accessor: 'combineBroadJump',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Initial Draft Rank',
      accessor: 'initialDraftRank',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'True Overall Ranking',
      accessor: 'trueOverallRanking',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Combine Overall Ranking',
      accessor: 'combineOverallRanking',
      sortingFn: 'auto',
      enableSorting: true
    },
    {
      Header: 'Production Grade',
      accessor: 'productionGrade',
      sortingFn: 'auto',
      enableSorting: true
    }
];



  if (isLoading || isFranchiseLoading || isPlayersLoading) {
    return <Loading />
  }

  if (!season) {
    return <div>Season not found</div>
  }

  if (!players || players.length === 0) {
    return (
      <div>
        <h2>No Players Found - Upload Franchise File</h2>
        <input type="file" className="text-white" onChange={handleFileSelection} />
        <button className="px-4 py-2 bg-slate-700 text-white" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    )
  }

  return (
    <div>
      <BackButton />
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
      <Table columns={columns} data={filteredPlayers.length !== 0 ? filteredPlayers : players} />
    </div>
  )
}

export default SeasonId
