import { Portrait } from '../Portrait'
import { useGetRelevantStats } from '../../queries/bucket'

export const PlayerRow = ({ player, convertInchesToFeet, determineSparqColor }) => {
  const {
    data: relevantStats,
    isLoading: isRelevantStatsLoading,
    isError
  } = useGetRelevantStats(player.position)

  return (
    <div key={player.id} className="flex rounded bg-neutral-900">
      <div className="border-r border-gray-600 flex justify-center items-center w-28">
        <p className="text-2xl">{player.initialDraftRank}</p>
      </div>
      <div className="flex ml-8 w-96 pr-8 border-r border-gray-600">
        <Portrait id={player.portrait} />
        <div className="flex flex-col justify-center py-2 ml-8">
          <p className="text-xl font-semibold">
            {player.firstName} {player.lastName}
          </p>
          <p>
            {player.college} | <span className="">{player.conference}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-24 border-r border-gray-600">
        <p className="text-3xl font-semibold">{player.position}</p>
      </div>
      <div className="flex flex-col justify-center w-24 items-center border-r border-gray-600">
        <p className="text-xl font-semibold">{convertInchesToFeet(player.height)}</p>
        <p className="text-2xl">{player.weight}</p>
      </div>
      <div className="flex flex-col justify-center w-24 items-center border-r border-gray-600 relative">
        <svg
          fill="#000000"
          className={`h-16 w-16 absolute top-50% right-50% stroke-slate-50 stroke-2 rotate-90 ${determineSparqColor(
            player.sparq
          )}`}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 184.751 184.751"
          xmlSpace="preserve"
        >
          <path d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z" />
        </svg>
        <p className="text-2xl z-10 drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,1)]">
          {player.sparq}
        </p>
      </div>
      <div className="flex flex-1 justify-between mt-2 border-r border-gray-600">
        {!isRelevantStatsLoading && relevantStats?.length > 0 && (
          <div className="flex justify-between w-full mx-8">
            {relevantStats.slice(0, 5).map((statObject, index) => (
              <div key={index} className='flex flex-col items-center w-36 text-center'>
                <p className="text-sm mb-4">
                  {statObject.name}
                </p>
                <p className='text-2xl'>{player[statObject.stat]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-56">
        <p className="text-xl">Scouting</p>
      </div>
    </div>
  )
}
