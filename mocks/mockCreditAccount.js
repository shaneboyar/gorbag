const { MockList } = require("graphql-tools");

const mockStatement = (id) => ({
  id,
  year: 2021,
  month: 4 - id,
  pdf: "www.somepdf.com",
});

const mockCreditTransaction = (id) => ({
  id: id,
  statementId: id < 5 ? 1 : 2,
  amount: 100 * id,
  description: "Test Transaction - " + id,
  date: (1619673517 - 100000 * id).toString(),
  scheduled: false,
  cancelableUntil: null,
  state: id === 1 ? "SCHEDULED" : "POSTED",
  type: id === 1 ? "PAYMENT" : "PURCHASE",
  paymentSource: null,
});

const mockCreditAccount = (customerId = 123) => ({
  id: customerId === 123 ? 1 : 000,
  customerId,
  activated: true,
  availableCredit: 100000,
  creditLimit: 100000,
  currentBalance: 0,
  currentBill: {
    dueDate: "1622351071000",
    minDue: 0,
    statementId: 1,
    statementBalance: 0,
    remainingStatementBalance: 0,
    daysUntilDue: 30,
    alert: null,
  },
  expirationDate: 1685423071000,
  lastFour: "1234",
  productName: String,
  statements: [...new Array(3)].map((_, index) => mockStatement(index + 1)),
  transactions: [...new Array(10)].map((_, index) =>
    mockCreditTransaction(index + 1)
  ),
});

const mockSomeoneElsesCreditAccount = () => mockCreditAccount(000);

module.exports = {
  mockCreditAccount,
  mockSomeoneElsesCreditAccount,
};
