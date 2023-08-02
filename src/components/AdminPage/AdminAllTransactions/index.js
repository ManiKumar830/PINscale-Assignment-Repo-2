import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// eslint-disable-next-line import/no-extraneous-dependencies
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import AdminSideBar from '../AdminSideBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AdminAllTransactions extends Component {
  state = {
    allTransactionsDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'admin',
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()

      const newData = jsonData.last_7_days_transactions_totals_admin.map(
        eachItem => ({
          id: v4(),
          date: eachItem.date,
          sum: eachItem.sum,
          type: eachItem.type,
        }),
      )

      console.log(newData)

      this.setState({
        allTransactionsDetails: newData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Not Found</h1>
    </div>
  )

  renderTransactionView = () => {
    const {allTransactionsDetails} = this.state

    return (
      <div>
        <div className="Transaction-Header-container-1">
          <h1 className="accounts-text">Transactions</h1>
        </div>

        <div className="all-transactions-ul-el">
          <div className="transaction-heading-container">
            <p className="userName-text ut">UserName</p>
            <p className="userName-text Transaction-Name">Transaction Name</p>
            <p className="userName-text Category-text">Category</p>
            <p className="userName-text date-text">Date</p>
            <p className="userName-text amount-text">Amount</p>
          </div>
          <ul>
            {allTransactionsDetails.map(eachItem => (
              <TransactionItem
                key={eachItem.id}
                transactionDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderAllTransactionView = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTransactionView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container-2">
        <AdminSideBar />

        {this.renderAllTransactionView()}
      </div>
    )
  }
}

export default AdminAllTransactions
