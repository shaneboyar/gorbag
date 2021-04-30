const { MockList } = require("graphql-tools");

const mockStatement = (id) => ({
  id,
  year: 2021,
  month: 4 - id,
  pdf: "www.somepdf.com",
});

const mockDebitTransaction = (id) => ({
  id: id,
  statementId: id < 5 ? 4 : 5,
  amount: 100 * id,
  description: "Test Transaction - " + id,
  date: (1619673517 - 100000 * id).toString(),
  state: "POSTED",
  type: "PURCHASE",
});

const mockDebitAccount = () => ({
  id: 2,
  customerId: 123,
  activated: true,
  currentBalance: 50000,
  expirationDate: "1685423071000",
  lastFour: "1234",
  transactions: [...new Array(10)].map((_, index) =>
    mockDebitTransaction(index + 11)
  ),
  statements: [...new Array(3)].map((_, index) => mockStatement(index + 4)),
});

module.exports = {
  mockDebitAccount,
};
