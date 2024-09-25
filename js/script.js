// initial stage
document.getElementById("cards-id").classList.remove("hidden");
document.getElementById("transaction-section-id").classList.add("hidden");
const donateButton = document.getElementById("donate-btn-2");
donateButton.style.backgroundColor = "rgba(180, 244, 97, 1)";
donateButton.style.border="none";
//toggling
const historyButton = document.getElementById("history-btn");
donateButton.addEventListener("click", function () {
  donateButton.style.backgroundColor = "rgba(180, 244, 97, 1)";
  donateButton.style.border = "none";
  historyButton.style.backgroundColor = "transparent";
  historyButton.style.border = "1px solid black";
  showSection("cards-id");
});

//transaction section
function showSection(id) {
  document.getElementById("cards-id").classList.add("hidden");
  document.getElementById("transaction-section-id").classList.add("hidden");

  document.getElementById(id).classList.remove("hidden");
}
historyButton.addEventListener("click", function () {
  historyButton.style.backgroundColor = "rgba(180, 244, 97, 1)";
  historyButton.style.border = "none";
  donateButton.style.backgroundColor = "transparent";
  donateButton.style.border = "1px solid black";
  showSection("transaction-section-id");
});
const p =document.createElement('p');
const heading1 = document.getElementById("heading1")
const heading2 = document.getElementById("heading2")
const heading3 = document.getElementById("heading3")
p.innerText = `, ${amount} BDT is ${heading1}`
p.innerText += `, ${amount} BDT is ${heading2}`
p.innerText += `, ${amount} BDT is ${heading2}`
// console.log(p);
document.getElementById("transaction-container").appendChild(p);
getCurrentTimestamp();
// time stamp
function getCurrentTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  return `${date}, ${time}`;
}

//wallet section
let walletBalance = 5000;
const mainBalanceDisplay = document.getElementById("main-balance");
mainBalanceDisplay.innerText = walletBalance + " BDT";

const donationBalances = [0, 0, 0];

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
});
