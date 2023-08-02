import {Component} from 'react'
import Cookies from 'js-cookie'
import AddTransactionModal from '../AddTransactionModal'

const jwtToken = Cookies.get('jwt_token')
class AddTransactionHeader extends Component {
  state = {
    show: false,
    name: '',
    type: '',
    category: '',
    amount: 0,
    date: '',
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show: false})
  }

  onChangeUsername = event => {
    this.setState({name: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onClickAddTransaction = async () => {
    const {name, type, category, amount, date} = this.state

    const transactionDetails = JSON.stringify({
      name,
      type,
      category,
      amount,
      date,
      user_id: jwtToken,
    })

    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/add-transaction'
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': jwtToken,
      },
      body: transactionDetails,
    }
    const response = await fetch(url, options)
    const jSonData = await response.json()
    console.log(jSonData)
  }

  render() {
    const {show, amount, category, type, date, name} = this.state
    return (
      <main>
        <AddTransactionModal show={show}>
          <div className="pop-up-transaction-container">
            <div className="pop-up-trans-container">
              <div className="add-transaction-div">
                <h1 className="add-transaction-text">Add Transaction</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={this.hideModal}
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="#718EBF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="modal-heading-desc-text">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="name">
                    Transaction Name
                  </label>
                  <input
                    value={name}
                    type="text"
                    id="name"
                    className="trans-username-input-field"
                    onChange={this.onChangeUsername}
                    placeholder="Enter Name"
                  />
                </div>

                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="type">
                    Transaction Type
                  </label>

                  <select
                    value={type}
                    id="type"
                    className="trans-username-input-field"
                    onChange={this.onChangeType}
                    placeholder="Enter Name"
                  >
                    <option>credit</option>
                    <option>debit</option>
                  </select>
                </div>

                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="category">
                    Category
                  </label>

                  <select
                    value={category}
                    id="category"
                    className="trans-username-input-field"
                    onChange={this.onChangeCategory}
                    placeholder="Enter Name"
                  >
                    <option>Transfer</option>
                    <option>Shopping</option>
                  </select>
                </div>

                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="amount">
                    Amount
                  </label>
                  <input
                    value={amount}
                    type="text"
                    id="amount"
                    className="trans-username-input-field"
                    onChange={this.onChangeAmount}
                    placeholder="Enter Amount"
                  />
                </div>

                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    value={date}
                    type="date"
                    id="date"
                    className="trans-username-input-field"
                    onChange={this.onChangeDate}
                    placeholder="Select Date"
                  />
                </div>
                <div>
                  <button
                    className="add-transfer-button"
                    type="button"
                    onClick={this.onClickAddTransaction}
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AddTransactionModal>
        <div className="add-transaction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.99984 4.16666V15.8333M4.1665 9.99999H15.8332"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <button
            onClick={this.showModal}
            className="transaction-button"
            type="button"
          >
            Add Transaction
          </button>
        </div>
      </main>
    )
  }
}

export default AddTransactionHeader
