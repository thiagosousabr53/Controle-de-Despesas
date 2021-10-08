const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))
let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransactions : []

const revomeTransaction = ID => {
  transactions = transactions
    .filter(transaction =>
      transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDOM = ({ amount, name, id }) => {
  const operator = amount < 0 ? '-' : '+'
  const CSSClass = amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(amount)
  const li = document.createElement('li')


  li.classList.add(CSSClass)
  li.innerHTML = `
  ${name} 
  <span>${operator} R$ ${Math.abs(amountWithoutOperator)}</span>
  <button class="delete-btn" onClick="revomeTransaction(${id})">
  x
  </button>
  `
  transactionUl.append(li)

}
const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
  .filter(value => value < 0)
  .reduce((accumalator, value) => accumalator + value, 0))
  .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
  .filter(value => value > 0)
  .reduce((accumalator, value) => accumalator + value, 0)
  .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
  .reduce((accumalator, transaction) => accumalator + transaction, 0)
  .toFixed(2)

const updateBalanceValues = () => {
  const transactionsAmounts = transactions
    .map(({ amount }) => amount)

  const total = getTotal(transactionsAmounts)
  const income = getIncome(transactionsAmounts)
  const expense = getExpenses(transactionsAmounts)



  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`

}

const init = () => {
  transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}
init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generatedID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionsAmount) => {
  transactions.push({
    id: generatedID(),
    name: transactionName,
    amount: Number(transactionsAmount)
  })
}
const cleanInputs = () => {
  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionsAmount = inputTransactionAmount.value.trim()
  const isSomeInputEmpty = transactionName === '' || transactionsAmount === ''


  if (isSomeInputEmpty) {
    alert('Por favor, preença tanto o nome quanto o valor da transação!')
    return
  }

  addToTransactionsArray(transactionName, transactionsAmount)
  init()
  updateLocalStorage()
  cleanInputs()

}

form.addEventListener('submit', handleFormSubmit)