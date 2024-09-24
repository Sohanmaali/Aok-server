export const generateBillNumber = async (req, model): Promise<string> => {
  // Find the last bill number in the Bill collection
  const lastBill = await model
    .findOne({ bill_number: { $exists: true, $ne: null } }) // Ensure bill_number exists and is not null
    .sort({ bill_number: -1 }) // Sort by bill_number in descending order
    .exec();

  if (!lastBill || isNaN(parseInt(lastBill.bill_number, 10))) {
    return '000001';
  }

  const lastBillNumber = parseInt(lastBill.bill_number, 10);
  const nextBillNumber = lastBillNumber + 1;

  return nextBillNumber.toString().padStart(6, '0');
};
