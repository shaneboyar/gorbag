const { gql } = require("apollo-server");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Customer {
    id: Int!
    contactInfo: ContactInfo!
    financialInfo: FinancialInfo!
    accountIds: [Int]!
    accounts: [Account]!
  }

  type ContactInfo {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    address: Address!
    formattedAddress: String!
  }

  type Address {
    street1: String!
    street2: String
    city: String!
    state: String!
    stateAbbreviated: String!
    zipCode: String!
  }

  type FinancialInfo {
    eligibleForUpdate: Boolean!
    lastUpdated: String
    monthlyIncome: Int
    monthlyLiving: Int
    shouldGetCLIPTout: Boolean!
  }

  interface Account {
    id: Int!
    customerId: Int!
    activated: Boolean!
    currentBalance: Int!
    expirationDate: String!
    lastFour: String!
    statements: [Statement]!
    transactions: [Transaction]
  }

  type CreditAccount implements Account {
    id: Int!
    customerId: Int!
    activated: Boolean!
    currentBalance: Int!
    expirationDate: String!
    lastFour: String!
    statements: [Statement]!
    transactions: [CreditTransaction]
    availableCredit: Int!
    creditLimit: Int!
    currentBill: CurrentBill!
    productName: String!
  }

  interface Transaction {
    id: Int!
    statementId: Int!
    amount: Int!
    description: String!
    date: String!
    state: TransactionState!
    type: TransactionType!
  }

  type CreditTransaction implements Transaction {
    id: Int!
    statementId: Int!
    amount: Int!
    description: String!
    date: String!
    state: TransactionState!
    type: TransactionType!
    scheduled: Boolean!
    cancelableUntil: String
    paymentSource: String
  }

  enum TransactionState {
    PENDING
    POSTED
    SCHEDULED
  }

  enum TransactionType {
    PURCHASE
    PAYMENT
    CASHBACK
    REFUND
  }

  type CurrentBill {
    dueDate: String!
    minDue: Int!
    statementId: Int!
    statementBalance: Int!
    remainingStatementBalance: Int!
    daysUntilDue: Int!
    alert: String
  }

  type Statement {
    id: Int!
    year: Int!
    month: Int!
    pdf: String!
  }

  type DebitAccount implements Account {
    id: Int!
    customerId: Int!
    activated: Boolean!
    currentBalance: Int!
    expirationDate: String!
    lastFour: String!
    transactions: [DebitTransaction]!
    statements: [Statement]!
  }

  type DebitTransaction implements Transaction {
    id: Int!
    statementId: Int!
    amount: Int!
    description: String!
    date: String!
    state: TransactionState!
    type: TransactionType!
  }

  type Query {
    customer: Customer!
    account(id: Int!): Account
    transactions(accountId: Int!): [Transaction]!
    # statementTransactions(
    #   statementId: Int!
    #   offest: Int
    #   limit: Int
    # ): [Transaction]!
    scheduledPayments(accountId: Int!): [CreditTransaction]!
  }

  type Mutation {
    updateContactInfo(contactInfo: ContactInfoInput!): ContactInfo!
    updateFinancialInfo(financialInfo: FinancialInfoInput!): FinancialInfo!
    createPayment(paymentInfo: PaymentInput!): Transaction!
  }

  input ContactInfoInput {
    firstName: String
    lastName: String
    phoneNumber: String
    address: AddressInput
    formattedAddress: String
  }

  input AddressInput {
    street1: String
    street2: String
    city: String
    state: String
    stateAbbreviated: String
    zipCode: String
  }

  input FinancialInfoInput {
    monthlyIncome: Int!
    monthlyLiving: Int!
  }

  input PaymentInput {
    amount: Int!
    pumpId: Int!
    paymentType: PaymentType!
    paymentDate: String
  }

  enum PaymentType {
    MINIMUM_PAYMENT
    STATEMENT_BALANCE
    CURRENT_BALANCE
    CUSTOM_AMOUNT
  }
`;

module.exports = {
  typeDefs,
};
