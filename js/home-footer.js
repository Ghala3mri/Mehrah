/* =========================================================
   الصفحة الرئيسية: زر العودة للأعلى + الساعة في الفوتر
   (عايده)
   ========================================================= */


/* ========== 1. زر العودة للأعلى ========== */

// نجيب الزر من الصفحة باستخدام الـ id
var backToTopBtn = document.getElementById("back-to-top");

// كم بكسل لازم ينزل المستخدم عشان يطلع الزر
var showAfter = 300;

// دالة تطلّع الزر أو تخفيه حسب مكان المستخدم في الصفحة
function toggleBackToTop() {
  if (window.scrollY > showAfter) {
    backToTopBtn.className = "btn show";   // نزل كفاية: نطلّع الزر
  } else {
    backToTopBtn.className = "btn";        // فوق: نخفي الزر
  }
}

// دالة ترجع المستخدم لأعلى الصفحة بحركة ناعمة
function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (backToTopBtn != null) {
  window.onscroll = toggleBackToTop;   // كل ما يسوي سكرول نشيّك
  backToTopBtn.onclick = goToTop;      // لما يضغط الزر نرجعه فوق
  toggleBackToTop();                   // مرة أول ما تفتح الصفحة
}


/* ========== 2. الساعة الحيّة في الفوتر ========== */

// نجيب مكان الساعة من الصفحة باستخدام الـ id
var footerClock = document.getElementById("footer-clock");

// دالة تضيف صفر قبل الرقم إذا كان خانة وحدة، مثل 5 تصير 05
function addZero(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

// دالة تكتب الوقت الحالي داخل الفوتر
function updateClock() {
  var now = new Date();          // الوقت الحالي من جهاز المستخدم
  var hours = now.getHours();    // من 0 إلى 23
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // نحدد صباحًا أو مساءً، ونحوّل الساعة لنظام 12 ساعة
  var period = "ص";
  if (hours >= 12) {
    period = "م";
  }
  hours = hours % 12;
  if (hours == 0) {
    hours = 12;
  }

  footerClock.innerHTML = "الساعة الآن: " + hours + ":" + addZero(minutes) + ":" + addZero(seconds) + " " + period;
}

if (footerClock != null) {
  updateClock();                  // مرة فورًا عشان ما يطلع فاضي
  setInterval(updateClock, 1000); // وبعدين كل ثانية (1000 ملي ثانية)
}
