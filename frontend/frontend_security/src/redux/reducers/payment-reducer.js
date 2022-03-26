import paymentType from "../types/payment-type";

const initialState = {
  payment: {},
  payerInfo: null,
  transaction: null,
  shippingAddress: null,
};

const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case paymentType.DO_PAYMENT:
      return { ...state };

    case paymentType.DO_REVIEW_PAYMENT:
      var payerInfo = { ...state.payerInfo };
      var transaction = { ...state.transaction };
      var shippingAddress = { ...state.shippingAddress };

      payerInfo = payload.payerInfo;
      transaction = payload.transaction;
      shippingAddress = payload.shippingAddress;
      return {
        ...state,
        payerInfo,
        transaction,
        shippingAddress,
      };

    case paymentType.DO_EXECUTE_PAYMENT:
      var payerInfo = { ...state.payerInfo };
      var transaction = { ...state.transaction };

      payerInfo = payload.payerInfo;
      transaction = payload.transaction;

      return {
        ...state,
        payerInfo,
        transaction,
      };

    default:
      return state;
  }
};

export default paymentReducer;
