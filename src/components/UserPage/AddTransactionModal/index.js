import './index.css'

const AddTransactionModal = ({show, children}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassName}>
      <section className="modal-main-container">{children}</section>
    </div>
  )
}
export default AddTransactionModal
