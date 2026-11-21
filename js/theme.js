var theme = localStorage.getItem("mehrah-theme");
if (theme == null) {
  theme = "light";
}

var themeLink = document.getElementById("theme-css");
var themeBtn = document.getElementById("theme-toggle");

function applyTheme() {
  if (themeLink == null) {
    return;
  }

  if (theme == "dark") {
    themeLink.href = "css/theme-dark.css";
    if (themeBtn != null) {
      themeBtn.innerHTML = "الوضع الفاتح";
    }
  } else {
    themeLink.href = "css/theme-light.css";
    if (themeBtn != null) {
      themeBtn.innerHTML = "الوضع الداكن";
    }
  }
}

function toggleTheme() {
  if (theme == "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  localStorage.setItem("mehrah-theme", theme);
  applyTheme();
}

applyTheme();

if (themeBtn != null) {
  themeBtn.onclick = toggleTheme;
}
