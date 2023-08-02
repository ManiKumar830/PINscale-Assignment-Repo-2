import {Link} from 'react-router-dom'
import './index.css'

const UserDetailsPage = props => {
  const {pageDetails, onChangePageView, isActive} = props
  const {id, BlueImageUrl, NormalImageUrl, text, link} = pageDetails

  const onClickPageFilter = () => {
    onChangePageView(id)
  }

  return (
    <>
      {isActive ? (
        <Link className="link-el" to={link}>
          <li className="li-el">
            <button
              onClick={onClickPageFilter}
              type="button"
              className="dashboard-container button-blue"
            >
              <img className="home-logo" alt={text} src={BlueImageUrl} />
              <p className="allTrans-text active_page">{text}</p>
            </button>
          </li>
        </Link>
      ) : (
        <Link className="link-el" to={link}>
          <li className="li-el">
            <button
              onClick={onClickPageFilter}
              type="button"
              className="dashboard-container"
            >
              <img className="home-logo" alt={text} src={NormalImageUrl} />
              <p className="allTrans-text">{text}</p>
            </button>
          </li>
        </Link>
      )}
    </>
  )
}

export default UserDetailsPage
