const donateButton = document.getElementById("donate-btn-2");
  donateButton.addEventListener("click", function () {
  donateButton.style.backgroundColor = "rgba(180, 244, 97, 1)";
  donateButton.style.border = "none";
  historyButton.style.backgroundColor = "transparent";
  historyButton.style.border = "1px solid black";
});
const historyButton = document.getElementById("history-btn");
  historyButton.addEventListener("click", function () {
  historyButton.style.backgroundColor = "rgba(180, 244, 97, 1)";
  historyButton.style.border = "none";
  donateButton.style.backgroundColor = "transparent";
  donateButton.style.border = "1px solid black";
});

let walletBalance = 5000;
const mainBalanceDisplay = document.getElementById("main-balance");
mainBalanceDisplay.innerText = walletBalance + " BDT";

const donationBalances = [0, 0, 0];

const transactions = [];

function getCurrentTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  return `${date}, ${time}`;
}

function addTransactionHistory(index, amount) {
  const timestamp = getCurrentTimestamp();
  const transaction = `Donated ${amount} BDT to Donation ${
    index + 1
  } on ${timestamp}`;

  transactions.push(transaction);
}

function displayTransactionHistory() {
  const transactionHistory = document.getElementById("transaction-history");
  transactionHistory.innerHTML = "";

  transactions.forEach((transaction) => {
    const newTransaction = document.createElement("li");
    newTransaction.innerText = transaction;
    transactionHistory.appendChild(newTransaction);
  });
}

function handleDonation(index) {
  const amountInput = document.getElementById(
    `amount${index > 0 ? index + 1 : ""}`
  );
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0 || amount > walletBalance) {
    alert(
      "Please enter a valid amount less than or equal to your wallet balance."
    );
    return;
  }

  walletBalance -= amount;
  if (walletBalance < 0) {
    walletBalance = 0;
  }

  donationBalances[index] += amount;

  mainBalanceDisplay.innerText = walletBalance + " BDT";
  document.getElementById(`main-balance${index + 1}`).innerText =
    donationBalances[index] + " BDT";

  addTransactionHistory(index, amount);

  alert("Congratulations! Your donation was successful!");
}

const donateButtons = [
  document.getElementById("donate-btn"),
  document.getElementById("donate-btn2"),
  document.getElementById("donate-btn3"),
];

donateButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    handleDonation(index);
  });
});

historyButton.addEventListener("click", function (event) {
  event.preventDefault();
  displayTransactionHistory();
});
