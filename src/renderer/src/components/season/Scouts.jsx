import { Portrait } from '../Portrait'

export const SeasonScouts = (props) => {
  const { season, franchiseScouts, seasonScouts } = props

  const convertThousands = (number) => {
    // Return number divided by 1000 with 1 decimal place
    return (number / 1000).toFixed(2)
  }

  return (
    <div>
      <div className="flex justify-end w-full">
        {season.balance > 999 ? (
          <span>{convertThousands(season.balance)}M</span>
        ) : (
          <span>{season.balance}K</span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-x-4 h-[800px]">
        <div className="flex flex-col rounded bg-neutral-900 h-[800px]">
          <div className="flex justify-center w-full py-2 border-b border-gray-600 ">
            <p className="text-xl">Hired Scouts</p>
          </div>

          {seasonScouts.length > 0 ? (
            <div>
              {seasonScouts.map((scout) => {
                return (
                  <div key={scout.id} className="flex justify-between items-center py-2 px-4">
                    <div className="flex items-center">
                      <Portrait id={scout.portraitId} />
                      <p className="ml-2">{scout.firstName}</p>
                      <p className="ml-2">{scout.lastName}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-2">{scout.evalution}</p>
                      <p className="mr-2">{scout.salary}</p>
                      <p className="mr-2">{scout.yearsLeft}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-2/3">
              <p className="text-xl">No scouts hired</p>
              <p>Please hire scouts from the next panel</p>
            </div>
          )}
        </div>
        <div className="flex flex-col rounded bg-neutral-900 mb-2 col-span-2 h-[800px] overflow-hidden">
          <div className="flex justify-center w-full py-2 border-b border-gray-600 ">
            <p className="text-xl">Available Scouts</p>
          </div>
          {franchiseScouts.length > 0 ? (
            <div className="overflow-y-scroll flex flex-col gap-y-2 px-2 py-2">
              {franchiseScouts.map((scout) => {
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
                    <div className="flex h-full items-center justify-center border-r border-gray-600 w-24">
                      <p className="text-xl">
                        {scout.cost > 999 ? (
                          <span>{convertThousands(scout.cost)}M</span>
                        ) : (
                          <span>{scout.cost}K</span>
                        )}
                      </p>
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
