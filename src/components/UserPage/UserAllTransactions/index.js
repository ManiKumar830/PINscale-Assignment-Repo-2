import {Component} from 'react'
import Loader from 'react-loader-spinner'
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'

// eslint-disable-next-line import/no-extraneous-dependencies
import {v4} from 'uuid'
import UserSideBar from '../UserSideBar'
import TransactionItem from '../TransactionItem'
import AddTransactionHeader from '../AddTransactionHeader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jwtToken = Cookies.get('jwt_token')

const allPages = [
  {
    id: 1,
    BlueImageUrl:
      'data:image/jpeg;base64,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',
    NormalImageUrl:
      'data:image/jpeg;base64,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',
    text: 'Dashboard',
    link: `/user/dashboard`,
  },

  {
    id: 2,
    BlueImageUrl:
      'data:image/jpeg;base64,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',
    NormalImageUrl:
      'data:image/jpeg;base64,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',
    text: 'All Transactions',
    link: `/user/transaction`,
  },

  {
    id: 3,
    BlueImageUrl:
      'data:image/jpeg;base64,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',
    NormalImageUrl:
      'data:image/jpeg;base64,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',
    text: 'Profile',
    link: `/profile`,
  },
]

class UserAllTransactions extends Component {
  state = {
    activeId: allPages[1].id,
    allTransactionsDetails: [],
    apiStatus: apiStatusConstants.initial,
    filteredData: [],
    show: false,
    showUpdate: false,
    userName: '',
    typeName: '',
    categoryName: '',
    amountName: 0,
    dateName: '',
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=10&offset=1'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': jwtToken,
      },
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()
    console.log(jsonData)
    if (response.ok) {
      console.log(jsonData)
      const newData = jsonData.transactions.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.transaction_name,
        amount: eachItem.amount,
        category: eachItem.category,
        date: eachItem.date,

        type: eachItem.type,
      }))

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

  onClickDeleteItem = async id => {
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction'

    const userId = JSON.stringify({
      id,
    })

    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': jwtToken,
      },
      body: userId,
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()
      const {history} = this.props

      history.replace('/user/dashboard')
      console.log(jsonData)
    }
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show: false})
  }

  showUpdateModal = () => {
    this.setState({showUpdate: true})
  }

  hideUpdateModal = () => {
    this.setState({showUpdate: false})
  }

  onChangeUsernameInput = userName => {
    this.setState({userName})
  }

  onChangeTypeInput = typeName => {
    this.setState({typeName})
  }

  onChangeCategoryInput = categoryName => {
    this.setState({categoryName})
  }

  onChangeAmountInput = amountName => {
    this.setState({amountName})
  }

  onChangeDateInput = dateName => {
    this.setState({dateName})
  }

  onClickAddTransactionItem = async id => {
    const {userName, amountName, categoryName, typeName, dateName} = this.state
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/update-transaction'

    const userDetails = JSON.stringify({
      id,
      name: userName,
      type: typeName,
      category: categoryName,
      amount: amountName,
      date: dateName,
    })

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': jwtToken,
      },
      body: userDetails,
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()
      const {history} = this.props

      history.replace('/user/dashboard')
      console.log(jsonData)
    }
  }

  renderTransactionView = () => {
    const {
      allTransactionsDetails,
      show,
      showUpdate,
      userName,
      amountName,
      categoryName,
      dateName,
      typeName,
    } = this.state

    const userUpdateDetails = {
      userName,
      amountName,
      categoryName,
      dateName,
      typeName,
    }

    return (
      <div className="all-transactions-ul-el">
        <div className="transaction-heading-container">
          <p className="userName-text ut">Transaction Name</p>
          <p className="userName-text Transaction-Name">Category</p>

          <p className="userName-text date-text">Date</p>
          <p className="userName-text amount-text">Amount</p>
        </div>
        <ul>
          {allTransactionsDetails.map(eachItem => (
            <TransactionItem
              userUpdateDetails={userUpdateDetails}
              onClickAddTransactionItem={this.onClickAddTransactionItem}
              onChangeUsernameInput={this.onChangeUsernameInput}
              onChangeTypeInput={this.onChangeTypeInput}
              onChangeCategoryInput={this.onChangeCategoryInput}
              onChangeAmountInput={this.onChangeAmountInput}
              onChangeDateInput={this.onChangeDateInput}
              showUpdateModal={this.showUpdateModal}
              hideUpdateModal={this.hideUpdateModal}
              showUpdate={showUpdate}
              showModal={this.showModal}
              hideModal={this.hideModal}
              onClickDeleteItem={this.onClickDeleteItem}
              show={show}
              key={eachItem.id}
              transactionDetails={eachItem}
            />
          ))}
        </ul>
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

  onChangePageView = id => {
    this.setState({activeId: id})
  }

  onClickLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="bg-container-2">
        <UserSideBar />
        <div>
          <div className="Transaction-Header-container-1">
            <div className="tr-container">
              <div>
                <h1 className="accounts-text">Transactions</h1>
                <div className="all-payments-container">
                  <p className="side-text">All Transactions</p>
                  <p className="side-text">Debit</p>
                  <p className="side-text">Credit</p>
                </div>
              </div>
              <AddTransactionHeader />
            </div>
          </div>

          {this.renderAllTransactionView()}
        </div>
      </div>
    )
  }
}

export default UserAllTransactions
