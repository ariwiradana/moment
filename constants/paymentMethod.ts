export interface PaymentMethod {
  paymentProvider: string;
  accountName: string;
  accountNumber: string;
  iconSrc: string;
  color: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    paymentProvider: "BCA",
    accountName: "I Made Ari Wiradana",
    accountNumber: "146-241-4093",
    iconSrc: "/dashboard/payment/bca.png",
    color: "#0048BA",
  },
  {
    paymentProvider: "BNI",
    accountName: "I Made Ari Wiradana",
    accountNumber: "637-256-007",
    iconSrc: "/dashboard/payment/bni.png",
    color: "#005F6B1A",
  },
  // {
  //   paymentProvider: "GoPay",
  //   accountName: "I Made Ari Wiradana",
  //   accountNumber: "0812-4676-8627",
  //   iconSrc: "/dashboard/payment/gopay.png",
  // },
  // {
  //   paymentProvider: "ShopeePay",
  //   accountName: "I Made Ari Wiradana",
  //   accountNumber: "0812-4676-8627",
  //   iconSrc: "/dashboard/payment/shopeepay.png",
  // },
];
