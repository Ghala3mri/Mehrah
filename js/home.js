
var homePieces = [
  { name: "جرة ماء بالفخار", price: 80 },
  { name: "شمعة معطرة", price: 60 },
  { name: "طبق خزفي", price: 100 },
  { name: "مزهرية فخارية", price: 50 }
];

var homeGoalMax = 5000;
var homeGoalBar = document.getElementById("home-goal-bar");
var homeGoalText = document.getElementById("home-goal-text");
var homeArabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

var homeGoalTotal = 3300;
var savedTotal = localStorage.getItem("mehrah-goal");
if (savedTotal != null) {
  homeGoalTotal = parseInt(savedTotal);
}

var homeSold = [];
var savedSold = localStorage.getItem("mehrah-sold");
if (savedSold != null) {
  homeSold = JSON.parse(savedSold);
}

function toArabicNumber(number) {
  if (number == 0) {
    return homeArabicDigits[0];
  }
  var result = "";
  while (number > 0) {
    result = homeArabicDigits[number % 10] + result;
    number = Math.floor(number / 10);
  }
  return result;
}

function showGoal() {
  homeGoalBar.value = homeGoalTotal;
  homeGoalText.innerHTML = toArabicNumber(homeGoalTotal) + " من " + toArabicNumber(homeGoalMax) + " ريال";
}

function isSold(index) {
  for (var i = 0; i < homeSold.length; i++) {
    if (homeSold[i] == index) {
      return true;
    }
  }
  return false;
}

function markSold(index) {
  var btn = document.getElementById("buy-" + index);
  btn.innerHTML = "تم الاقتناء";
  btn.style.backgroundColor = "#96A681";
  btn.style.cursor = "default";
  btn.onclick = null;
}

function buyPiece(index) {
  if (isSold(index)) {
    return;
  }

  var piece = homePieces[index];
  var answer = confirm("هل تريد اقتناء " + piece.name + " بسعر " + toArabicNumber(piece.price) + " ريال؟\nيذهب كامل المبلغ للجمعية الخيرية أو الأسرة المحتاجة التي يختارها المتبرع بالقطعة.");

  if (answer) {
    homeGoalTotal = homeGoalTotal + piece.price;
    homeSold.push(index);

    localStorage.setItem("mehrah-goal", homeGoalTotal);
    localStorage.setItem("mehrah-sold", JSON.stringify(homeSold));

    showGoal();
    markSold(index);

    alert("شكرًا لك! تم اقتناء " + piece.name + "، وسيذهب مبلغ " + toArabicNumber(piece.price) + " ريال للجمعية الخيرية أو الأسرة المحتاجة التي اختارها المتبرع.");
  }
}

function showDonations() {
  var saved = localStorage.getItem("mehrah-donations");
  if (saved == null) {
    return;
  }

  var donations = JSON.parse(saved);
  var galleryRow = document.getElementById("gallery-row");
  var cardsHTML = "";

  for (var i = 0; i < donations.length; i++) {
    var piece = donations[i];
    var index = homePieces.length;
    homePieces.push({ name: piece.name, price: piece.price });

    cardsHTML = cardsHTML +
      '<article class="card home-piece">' +
        '<img src="' + piece.img + '" alt="' + piece.name + '">' +
        '<h3>' + piece.name + '</h3>' +
        '<p class="home-piece-maker">صنعت بيد: ' + piece.maker + '</p>' +
        '<a href="offerings.html" class="home-review-offer">من ورشة ' + piece.workshop + '</a>' +
        '<div class="home-piece-bottom">' +
          '<p class="home-piece-price">' + toArabicNumber(piece.price) + ' ريال</p>' +
          '<button type="button" class="btn btn-small" id="buy-' + index + '" onclick="buyPiece(' + index + ')">اقتنِ القطعة</button>' +
        '</div>' +
      '</article>';
  }

  galleryRow.innerHTML = galleryRow.innerHTML + cardsHTML;
}

showDonations();
showGoal();
for (var i = 0; i < homeSold.length; i++) {
  markSold(homeSold[i]);
}