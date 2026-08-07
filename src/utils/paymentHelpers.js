const payments = [
  { id: 1, amount: 18450, status: "Paid", salesPersonId: 12, managerId: 4, paymentDate: "2026-08-07T10:25:00" },
  { id: 2, amount: 21500, status: "Paid", salesPersonId: 14, managerId: 4, paymentDate: "2026-08-07T08:40:00" },
  { id: 3, amount: 12400, status: "Pending", salesPersonId: 13, managerId: 4, paymentDate: "2026-08-07T14:05:00" },
  { id: 4, amount: 45500, status: "Paid", salesPersonId: 15, managerId: 4, paymentDate: "2026-08-05T12:10:00" },
  { id: 5, amount: 25200, status: "Paid", salesPersonId: 11, managerId: 4, paymentDate: "2026-08-03T09:25:00" },
  { id: 6, amount: 16400, status: "Paid", salesPersonId: 12, managerId: 4, paymentDate: "2026-07-30T11:15:00" },
  { id: 7, amount: 9800, status: "Paid", salesPersonId: 14, managerId: 4, paymentDate: "2026-08-01T17:20:00" },
  { id: 8, amount: 32400, status: "Paid", salesPersonId: 12, managerId: 4, paymentDate: "2026-08-06T15:55:00" },
  { id: 9, amount: 51000, status: "Paid", salesPersonId: 13, managerId: 4, paymentDate: "2026-07-25T13:35:00" },
];

function parseDate(value) {
  return new Date(value);
}

function isSameDay(dateA, dateB) {
  // Compare local year, month and date for daily payment totals.
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function isSameWeek(date, referenceDate) {
  // Use Monday as the first day of the week for weekly totals.
  const startOfWeek = new Date(referenceDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
}

function isSameMonth(date, referenceDate) {
  return (
    date.getFullYear() === referenceDate.getFullYear() &&
    date.getMonth() === referenceDate.getMonth()
  );
}

function filterSuccessfulPayments(managerId) {
  // Only include fully paid records for the current manager.
  return payments.filter(
    (payment) => payment.managerId === managerId && payment.status === "Paid"
  );
}

export function getDailyPayment(managerId) {
  const today = new Date();
  // Sum payments that occurred on the current day.
  return filterSuccessfulPayments(managerId)
    .filter((payment) => isSameDay(parseDate(payment.paymentDate), today))
    .reduce((sum, payment) => sum + payment.amount, 0);
}

export function getWeeklyPayment(managerId) {
  const today = new Date();
  // Sum payments for the current week belonging to this manager.
  return filterSuccessfulPayments(managerId)
    .filter((payment) => isSameWeek(parseDate(payment.paymentDate), today))
    .reduce((sum, payment) => sum + payment.amount, 0);
}

export function getMonthlyPayment(managerId) {
  const today = new Date();
  // Sum payments for the current calendar month belonging to this manager.
  return filterSuccessfulPayments(managerId)
    .filter((payment) => isSameMonth(parseDate(payment.paymentDate), today))
    .reduce((sum, payment) => sum + payment.amount, 0);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
