import Modal from '../Modal'
import AddTransactionModal from '../AddTransactionModal'
import './index.css'

const TransactionItem = props => {
  const {
    transactionDetails,
    onClickDeleteItem,
    show,
    showUpdate,
    showModal,
    hideUpdateModal,
    showUpdateModal,
    hideModal,
    onChangeUsernameInput,
    onChangeTypeInput,
    onChangeCategoryInput,
    onChangeAmountInput,
    onChangeDateInput,
    onClickAddTransactionItem,
    userUpdateDetails,
  } = props
  const {date, type, amount, name, category, id} = transactionDetails
  const {
    userName,
    amountName,
    categoryName,
    dateName,
    typeName,
  } = userUpdateDetails

  // Create a Date object from the timestamp

  const dateObj = new Date(date)

  const options = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const onClickDelete = () => {
    onClickDeleteItem(id)
  }

  const formattedDate = dateObj.toLocaleString('en-US', options)
  console.log(formattedDate)

  const isTrue = type === 'debit' || type === 'dedit' ? 'red-2' : 'green-1'

  const isDebit =
    type === 'debit' || type === 'dedit' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <circle
          cx="15"
          cy="15"
          r="14"
          transform="rotate(180 15 15)"
          stroke="#718EBF"
          strokeWidth="2"
        />
        <path
          d="M14.4697 20.0303C14.7626 20.3232 15.2374 20.3232 15.5303 20.0303L20.3033 15.2574C20.5962 14.9645 20.5962 14.4896 20.3033 14.1967C20.0104 13.9038 19.5355 13.9038 19.2426 14.1967L15 18.4393L10.7574 14.1967C10.4645 13.9038 9.98959 13.9038 9.6967 14.1967C9.40381 14.4896 9.40381 14.9645 9.6967 15.2574L14.4697 20.0303ZM14.25 9L14.25 19.5L15.75 19.5L15.75 9L14.25 9Z"
          fill="#718EBF"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <circle
          cx="15"
          cy="15"
          r="14"
          transform="rotate(180 15 15)"
          stroke="#718EBF"
          strokeWidth="2"
        />
        <path
          d="M15.5303 8.46967C15.2374 8.17678 14.7626 8.17678 14.4697 8.46967L9.6967 13.2426C9.40381 13.5355 9.40381 14.0104 9.6967 14.3033C9.98959 14.5962 10.4645 14.5962 10.7574 14.3033L15 10.0607L19.2426 14.3033C19.5355 14.5962 20.0104 14.5962 20.3033 14.3033C20.5962 14.0104 20.5962 13.5355 20.3033 13.2426L15.5303 8.46967ZM15.75 19.5L15.75 9L14.25 9L14.25 19.5L15.75 19.5Z"
          fill="#718EBF"
        />
      </svg>
    )

  const onChangeUsername = event => {
    onChangeUsernameInput(event.target.value)
  }

  const onChangeType = event => {
    onChangeTypeInput(event.target.value)
  }

  const onChangeCategory = event => {
    onChangeCategoryInput(event.target.value)
  }

  const onChangeAmount = event => {
    onChangeAmountInput(event.target.value)
  }

  const onChangeDate = event => {
    onChangeDateInput(event.target.value)
  }
  const onClickAddTransaction = () => {
    onClickAddTransactionItem(id)
  }

  return (
    <li className="all-trans-container-1">
      {isDebit}
      <div className="name-logo-container-1">
        <p className="type-text-1">{name}</p>
      </div>
      <p className="Spotify-text-1">{category}</p>
      <p className="category-text-1">{formattedDate}</p>

      {isTrue === 'red-2' ? (
        <p className={isTrue}>-${amount}</p>
      ) : (
        <p className={isTrue}>+${amount}</p>
      )}

      <main>
        <AddTransactionModal show={showUpdate}>
          <div className="pop-up-transaction-container">
            <div className="pop-up-trans-container">
              <div className="add-transaction-div">
                <h1 className="add-transaction-text">Update Transaction</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={hideUpdateModal}
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
                  You can update your transaction here
                </p>
                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="name">
                    Transaction Name
                  </label>
                  <input
                    value={userName}
                    type="text"
                    id="name"
                    className="trans-username-input-field"
                    onChange={onChangeUsername}
                    placeholder="Enter Name"
                  />
                </div>

                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="type">
                    Transaction Type
                  </label>

                  <select
                    value={typeName}
                    id="type"
                    className="trans-username-input-field"
                    onChange={onChangeType}
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
                    value={categoryName}
                    id="category"
                    className="trans-username-input-field"
                    onChange={onChangeCategory}
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
                    value={amountName}
                    type="text"
                    id="amount"
                    className="trans-username-input-field"
                    onChange={onChangeAmount}
                    placeholder="Enter Amount"
                  />
                </div>

                <div className="trans-input-div">
                  <label className="trans-input-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    value={dateName}
                    type="date"
                    id="date"
                    className="trans-username-input-field"
                    onChange={onChangeDate}
                    placeholder="Select Date"
                  />
                </div>
                <div>
                  <button
                    className="add-transfer-button"
                    type="button"
                    onClick={onClickAddTransaction}
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AddTransactionModal>
        <button
          onClick={showUpdateModal}
          className="logout-button"
          type="button"
        >
          <img
            className="pencil-logo"
            alt="pencil"
            src="data:image/jpeg;base64,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"
          />
        </button>
      </main>

      <main>
        <Modal show={show}>
          <div className="pop-up-main-container">
            <div className="pop-up-container">
              <div className="logout-popup-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 19.6667C15.4533 19.6667 15 19.2133 15 18.6667V12C15 11.4533 15.4533 11 16 11C16.5467 11 17 11.4533 17 12V18.6667C17 19.2133 16.5467 19.6667 16 19.6667Z"
                    fill="#D97706"
                  />
                  <path
                    d="M16 24C15.92 24 15.8266 23.9867 15.7333 23.9733C15.6533 23.96 15.5733 23.9334 15.4933 23.8934C15.4133 23.8667 15.3333 23.8267 15.2533 23.7734C15.1866 23.72 15.12 23.6667 15.0533 23.6133C14.8133 23.36 14.6666 23.0134 14.6666 22.6667C14.6666 22.32 14.8133 21.9734 15.0533 21.72C15.12 21.6667 15.1866 21.6133 15.2533 21.56C15.3333 21.5067 15.4133 21.4667 15.4933 21.44C15.5733 21.4 15.6533 21.3734 15.7333 21.36C15.9066 21.32 16.0933 21.32 16.2533 21.36C16.3466 21.3734 16.4266 21.4 16.5066 21.44C16.5866 21.4667 16.6666 21.5067 16.7466 21.56C16.8133 21.6133 16.88 21.6667 16.9466 21.72C17.1866 21.9734 17.3333 22.32 17.3333 22.6667C17.3333 23.0134 17.1866 23.36 16.9466 23.6133C16.88 23.6667 16.8133 23.72 16.7466 23.7734C16.6666 23.8267 16.5866 23.8667 16.5066 23.8934C16.4266 23.9334 16.3466 23.96 16.2533 23.9733C16.1733 23.9867 16.08 24 16 24Z"
                    fill="#D97706"
                  />
                  <path
                    d="M24.08 29.5466H7.91997C5.31997 29.5466 3.3333 28.6 2.31997 26.8933C1.31997 25.1866 1.4533 22.9866 2.71997 20.7066L10.8 6.17331C12.1333 3.77331 13.9733 2.45331 16 2.45331C18.0266 2.45331 19.8666 3.77331 21.2 6.17331L29.28 20.72C30.5466 23 30.6933 25.1866 29.68 26.9066C28.6666 28.6 26.68 29.5466 24.08 29.5466ZM16 4.45331C14.7466 4.45331 13.52 5.41331 12.5466 7.14664L4.47997 21.6933C3.5733 23.32 3.42663 24.8133 4.0533 25.8933C4.67997 26.9733 6.06663 27.56 7.9333 27.56H24.0933C25.96 27.56 27.3333 26.9733 27.9733 25.8933C28.6133 24.8133 28.4533 23.3333 27.5466 21.6933L19.4533 7.14664C18.48 5.41331 17.2533 4.45331 16 4.45331Z"
                    fill="#D97706"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h1 className="modal-text">
                    Are you sure you want to Delete?
                  </h1>
                  <p className="modal-desc-text">
                    This transaction will be deleted immediately. You can’t undo
                    this action.
                  </p>
                </div>

                <div>
                  <button
                    className="modal-logout-button"
                    type="button"
                    onClick={onClickDelete}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="modal-close-button"
                    type="button"
                    onClick={hideModal}
                  >
                    No, Leave it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <button onClick={showModal} className="logout-button" type="button">
          <img
            className="trash-icon"
            alt="trash"
            src="data:image/jpeg;base64,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"
          />
        </button>
      </main>
    </li>
  )
}

export default TransactionItem
