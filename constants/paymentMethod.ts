export interface PaymentProvider {
  paymentProvider: string;
  accountName: string;
  accountNumber: number;
  iconSrc: string;
}

export interface PaymentMethod {
  type: "Bank Transfer" | "E-wallet";
  paymentProvider: PaymentProvider[];
}

export const paymentMethods: PaymentMethod[] = [
  {
    type: "Bank Transfer",
    paymentProvider: [
      {
        paymentProvider: "BCA",
        accountName: "I Made Ari Wiradana",
        accountNumber: 231313213213,
        iconSrc: "/dashboard/payment/bca.png",
      },
    ],
  },
  {
    type: "E-wallet",
    paymentProvider: [
      {
        paymentProvider: "GoPay",
        accountName: "I Made Ari Wiradana",
        accountNumber: 231313213213,
        iconSrc: "/dashboard/payment/gopay.png",
      },
      {
        paymentProvider: "Dana",
        accountName: "I Made Ari Wiradana",
        accountNumber: 231313213213,
        iconSrc: "/dashboard/payment/dana.png",
      },
      {
        paymentProvider: "ShopeePay",
        accountName: "I Made Ari Wiradana",
        accountNumber: 231313213213,
        iconSrc: "/dashboard/payment/shopeepay.png",
      },
    ],
  },
];
