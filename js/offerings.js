
var offerings = [
  {
    name: "لقاء الحرفيين",
    desc: "لقاء تعريفي مجاني تتعرف فيه على حرف النادي ومدربيه، وتجرب أكثر من حرفة.",
    meta: "مبتدئ | ساعة واحدة",
    level: "beginner",
    material: "",
    price: 0,
    priceText: "٠ ريال",
    img: "images/artisans-meetup.jpg",
    alt: "مجموعة حرفيين يجتمعون حول طاولة"
  },
  {
    name: "أساسيات التطريز",
    desc: "تعلم الغرز الأساسية وطريقة شد القماش على الإطار، واطلع بأول قطعة مطرزة لك.",
    meta: "مبتدئ | ساعتان",
    level: "beginner",
    material: "textile",
    price: 100,
    priceText: "١٠٠ ريال",
    img: "images/embrodry.png",
    alt: "إطار تطريز وخيوط ملونة"
  },
  {
    name: "صناعة الشموع",
    desc: "اخلط الشمع والألوان والروائح، واصنع شمعتك المعطرة بنفسك.",
    meta: "متوسط | ساعة",
    level: "middle",
    material: "wax",
    price: 150,
    priceText: "١٥٠ ريال",
    img: "images/candles.jpg",
    alt: "شموع مصنوعة يدويًا"
  },
  {
    name: "صناعة الفخار",
    desc: "شكل الطين على العجلة، واصنع كوبك أو مزهريتك الأولى.",
    meta: "متوسط | ساعة",
    level: "middle",
    material: "clay",
    price: 350,
    priceText: "٣٥٠ ريال",
    img: "images/pottery.jpg",
    alt: "قطع فخار مصنوعة يدويًا"
  },
  {
    name: "الرسم على الخزف",
    desc: "زين قطع الخزف بالألوان والنقوش بأسلوبك الخاص.",
    meta: "متقدم | ساعة",
    level: "advanced",
    material: "clay",
    price: 230,
    priceText: "٢٣٠ ريال",
    img: "images/ceramic-painting.jpg",
    alt: "قطع خزف مرسومة يدويًا"
  }
];

var list = document.getElementById("offerings-list");
var sortSelect = document.getElementById("offerings-sort");
var countText = document.getElementById("offerings-count");
var resetBtn = document.getElementById("offerings-reset");
var levelBoxes = document.getElementsByClassName("filter-level");
var materialBoxes = document.getElementsByClassName("filter-material");
var priceBoxes = document.getElementsByClassName("filter-price");
var arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

// ===== الفلاتر =====

function getChecked(boxes) {
  var values = [];
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      values.push(boxes[i].value);
    }
  }
  return values;
}

function getPriceGroup(price) {
  if (price == 0) return "free";
  if (price < 200) return "under200";
  return "over200";
}

function matches(selected, value) {
  if (selected.length == 0) return true;
  for (var i = 0; i < selected.length; i++) {
    if (selected[i] == value) return true;
  }
  return false;
}


function showOfferings() {
  var levels = getChecked(levelBoxes);
  var materials = getChecked(materialBoxes);
  var prices = getChecked(priceBoxes);

  var html = "";
  var count = 0;

  for (var i = 0; i < offerings.length; i++) {
    var o = offerings[i];

    if (matches(levels, o.level) && matches(materials, o.material) && matches(prices, getPriceGroup(o.price))) {
      count++;
      html += '<article class="card offerings-card">' +
                '<img src="' + o.img + '" alt="' + o.alt + '">' +
                '<div class="offerings-info">' +
                  '<h3>' + o.name + '</h3>' +
                  '<p>' + o.desc + '</p>' +
                  '<p class="offerings-meta">' + o.meta + '</p>' +
                '</div>' +
                '<div class="offerings-action">' +
                  '<p class="offerings-price">' + o.priceText + '</p>' +
                  '<a href="request-join.html" class="btn btn-small">التسجيل</a>' +
                '</div>' +
              '</article>';
    }
  }

  if (count == 0) {
    html = '<p class="offerings-empty">لا توجد ورش مطابقة، جرب تغيير الفلاتر.</p>';
  }

  list.innerHTML = html;

  if (count == 1) {
    countText.innerHTML = "ورشة واحدة";
  } else if (count == 2) {
    countText.innerHTML = "ورشتان";
  } else {
    countText.innerHTML = arabicDigits[count] + " ورش";
  }
}


function shuffleOfferings() {
  for (var i = offerings.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = offerings[i];
    offerings[i] = offerings[j];
    offerings[j] = temp;
  }
}

function comesBefore(a, b, choice) {
  if (choice == "price-low") return a.price < b.price;
  if (choice == "price-high") return a.price > b.price;
  if (choice == "name-az") return a.name < b.name;
  if (choice == "name-za") return a.name > b.name;
  return false;
}

function sortOfferings() {
  var choice = sortSelect.value;

  for (var i = 0; i < offerings.length - 1; i++) {
    for (var j = 0; j < offerings.length - 1 - i; j++) {
      if (comesBefore(offerings[j + 1], offerings[j], choice)) {
        var temp = offerings[j];
        offerings[j] = offerings[j + 1];
        offerings[j + 1] = temp;
      }
    }
  }

  showOfferings();
}


sortSelect.onchange = sortOfferings;

function addFilterEvents(boxes) {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].onchange = showOfferings;
  }
}

addFilterEvents(levelBoxes);
addFilterEvents(materialBoxes);
addFilterEvents(priceBoxes);

function resetFilters() {
  setTimeout(showOfferings, 10);
}

resetBtn.onclick = resetFilters;

shuffleOfferings();
showOfferings();
