const mockCustomer = () => ({
  id: 123,
  contactInfo: {
    firstName: "Test",
    lastName: "User",
    phoneNumber: "(123) 456-7890",
    address: {
      street1: "123 Test Street",
      city: "Richmond",
      state: "Virginia",
      stateAbbreviated: "VA",
      zipCode: "12345",
    },
    formattedAddress: "123 Test Street, Richmond, VA 23223",
  },
  financialInfo: {
    eligibleForUpdate: true,
    lastUpdated: 1619744337000,
    monthlyIncome: 500000,
    monthlyLiving: 100000,
    shouldGetCLIPTout: false,
  },
  accountIds: [1, 2],
});

module.exports = {
  mockCustomer,
};
