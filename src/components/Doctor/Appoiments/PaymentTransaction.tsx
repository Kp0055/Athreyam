import React, { useEffect, useState } from "react";
import { FaUser, FaMoneyBill, FaVideo, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentTransaction = () => {
  const [paymentTranscation, setPaymentTranscation] = useState([]);

  useEffect(() => {
    const transaction = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/doctor/paymentTranscation",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Fetching failed");
        }

        const data = await response.json();
        setPaymentTranscation(data);
      } catch (error) {
        console.error("Server error:", error);
      }
    };

    transaction();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-green-700";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-4">
        Payment Transactions
      </h2>

      {paymentTranscation.length === 0 ? (
        <div className="text-center text-gray-500">No transactions available.</div>
      ) : (
        paymentTranscation.map((transaction: any, idx: number) => (
          <div
            key={idx}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-all space-y-4 bg-slate-100"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <FaUser />
                <span className="font-medium">Patient</span>
              </div>
              <span className="font-semibold text-gray-900">{transaction.patientName}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <FaVideo />
                <span className="font-medium">Consultation Type</span>
              </div>
              <span className="font-semibold text-gray-900">{transaction.consultationType}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {transaction.paymentStatus.toLowerCase() === "paid" ? (
                  <FaCheckCircle className="text-green-700" />
                ) : (
                  <FaTimesCircle className="text-red-700" />
                )}
                <span className="text-gray-700 font-medium">Payment Status</span>
              </div>
              <span className={`font-semibold ${getStatusColor(transaction.paymentStatus)}`}>
                {transaction.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <FaMoneyBill />
                <span className="font-medium">Amount</span>
              </div>
              <span className="font-semibold text-gray-900">₹{transaction.fee}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentTransaction;
