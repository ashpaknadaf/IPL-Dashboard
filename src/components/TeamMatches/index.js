import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: [],
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormatedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getFormatedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormatedData(eachMatch),
      ),
    }
    this.setState({teamMatchesData: updatedData, isLoading: false})
  }

  renderRecentMatchList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-match-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchList()}
      </div>
    )
  }

  getClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb-className'
      case 'KKR':
        return 'kkr-className'
      case 'KXIP':
        return 'KXIP-className'
      case 'CSK':
        return 'csk-className'
      case 'RR':
        return 'rr-className'
      case 'MI':
        return 'mi-className'
      case 'SRH':
        return 'srh-className'
      case 'DC':
        return 'dc-className'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getClassName()}`

    return (
      <div className={className}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}
export default TeamMatches
