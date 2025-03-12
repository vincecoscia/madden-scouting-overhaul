export const SeasonOverview = (props) => {
  const { draftPicks, season, scouts, players, franchise } = props

  console.log('SeasonOverview scouts:', scouts)
  console.log('SeasonOverview players:', players)
  console.log('SeasonOverview franchise:', franchise)
  console.log('SeasonOverview season:', season)
  console.log('SeasonOverview draftPicks:', draftPicks)

  return <div>Season Overview</div>
}
