const {
  mockCustomer,
  mockCreditAccount,
  mockDebitAccount,
  mockSomeoneElsesCreditAccount,
} = require("./mocks");

const accounts = [
  mockCreditAccount(),
  mockDebitAccount(),
  mockSomeoneElsesCreditAccount(),
];

const resolvers = {
  Query: {
    customer: mockCustomer,
    account: (parent, args, context, info) => {
      const account = accounts.find((account) => account.id === args.id);
      if (account.customerId === context.customerId) {
        return account;
      } else {
        throw new Error("Unauthorized");
      }
    },
    transactions: (parent, args, context, info) => {
      return accounts.find((account) => account.id === args.accountId)
        .transactions;
    },
    scheduledPayments: (parent, args, context, info) => {
      return accounts
        .find((account) => account.id === args.accountId)
        .transactions.filter(
          (transaction) => transaction.state === "SCHEDULED"
        );
    },
  },
  Account: {
    __resolveType: (account, context, info) => {
      if (account.creditLimit) {
        return "CreditAccount";
      } else {
        return "DebitAccount";
      }
    },
  },
  Customer: {
    accountIds: (parent, args, context, info) => {
      return parent.accountIds;
    },
  },
  Transaction: {
    __resolveType: (obj, context, info) => {
      if (typeof obj.scheduled === "boolean") {
        return "CreditTransaction";
      } else {
        return "DebitTransaction";
      }
    },
  },
};

module.exports = {
  resolvers,
};
