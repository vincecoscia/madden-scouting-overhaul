import { NavLink, useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useGetAllSeasons, useGetSeason } from '../../queries/season'
import { useGetFranchise } from '../../queries/franchise'
import { useGetAllPlayers, useCreatePlayers } from '../../queries/player'
import { useGetScoutsByFranchise } from '../../queries/scout'
import { useGetDraftPicksBySeason } from '../../queries/draftPick'

import { SeasonOverview as Overview } from '../../components/season/Overview'
import { SeasonScouts as Scouts } from '../../components/season/Scouts'
import { SeasonProspects as Prospects } from '../../components/season/Prospects'
import { BackButton } from '../../components/utilities/Buttons'
import { Loading } from '../../components/utilities/Loading'

function SeasonId() {
  const [selectedFilePath, setSelectedFilePath] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const { id } = useParams()

  const { data: season, isLoading } = useGetSeason(id)

  const franchiseId = season ? season.franchiseId : ''

  const { data: franchise, isLoading: isFranchiseLoading } = useGetFranchise(franchiseId)

  const {
    data: players,
    isLoading: isPlayersLoading,
    refetch: refetchPlayers
  } = useGetAllPlayers(id)

  const { data: scouts, isLoading: isScoutsLoading } = useGetScoutsByFranchise(franchiseId)

  const { data: draftPicks, isLoading: isDraftPicksLoading } = useGetDraftPicksBySeason(id)

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

  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles:', acceptedFiles)
    console.log(getInputProps())
    if (acceptedFiles.length > 0) {
      setSelectedFilePath(acceptedFiles[0].path)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, useFsAccessApi: false })

  function handleSubmit() {
    console.log('Submit button clicked')
    console.log('SEASON ID:', season.id)
    if (selectedFilePath) {
      setIsUploading(true)
      createPlayers({ players: selectedFilePath, seasonId: season.id, franchiseId: franchiseId })
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

  if (isLoading || isFranchiseLoading || isPlayersLoading) {
    return <Loading />
  }

  if (!season) {
    return <div>Season not found</div>
  }

  if (!players || players.length === 0) {
    return (
      <>
        <BackButton />
        <div className="flex flex-col justify-center h-2/3">
          <div className="flex flex-col gap-y-4 items-center">
            <h2 className="font-semibold text-2xl">
              Welcome to {season.name} of {franchise.name}
            </h2>
            <p>Upload a franchise file to get started</p>

            <div className="flex items-center justify-center w-1/2">
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {/* ... rest of your code ... */}
                  {selectedFilePath ? (
                    <p className="mb-2 text-sm text-gray-50">
                      <span className="font-semibold">File Selected:</span> {selectedFilePath}
                    </p>
                  ) : selectedFilePath && isUploading ? (
                    <>
                      <p className="mb-2 text-sm text-gray-50">Upload in Progress</p>
                      <Loading />
                    </>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-50">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                        franchise file
                      </p>
                      <p className="text-xs text-gray-300">
                        Franchise files are located in /Documents/Madden NFL 24/saves
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              className="px-4 py-2 bg-blue-700 text-white rounded w-64"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="mx-8 mt-4">
      <BackButton />

      <div className="flex gap-x-4 mt-8">
        <button
          className={`px-6 py-2 ${
            activeTab === 'overview' ? 'text-white border-b-2 border-blue-700' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('overview')}
        >
          Overview
        </button>
        <button
          className={`px-6 py-2 ${
            activeTab === 'scouts' ? 'text-white border-b-2 border-blue-700' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('scouts')}
        >
          Scouts
        </button>
        <button
          className={`px-6 py-2 ${
            activeTab === 'prospects' ? 'text-white border-b-2 border-blue-700' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('prospects')}
        >
          Prospects
        </button>
        <button
          className={`px-6 py-2 ${
            activeTab === 'targeted' ? 'text-white border-b-2 border-blue-700' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('targeted')}
        >
          Targeted
        </button>
      </div>
      <div>
        {activeTab === 'overview' && (
          <Overview season={season} franchise={franchise} players={players} scouts={scouts} draftPicks={draftPicks} />
        )}
        {activeTab === 'scouts' && (
          <Scouts season={season} franchise={franchise} players={players} scouts={scouts} draftPicks={draftPicks} />
        )}
        {activeTab === 'prospects' && (
          <Prospects season={season} franchise={franchise} players={players} scouts={scouts} draftPicks={draftPicks} />
        )}  
      </div>
    </div>
  )
}

export default SeasonId
