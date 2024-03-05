import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedTeamsData = data.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({teamsData: updatedTeamsData, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state
    return (
      <div className="app-container">
        <div className="teams-list-container">
          <div className="heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading"> IPL Dashboard </h1>
          </div>
          {isLoading ? (
            <div testid="loader" className="loader-container">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <ul className="team-list">
              {teamsData.map(teams => (
                <TeamCard teamDetails={teams} key={teams.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
