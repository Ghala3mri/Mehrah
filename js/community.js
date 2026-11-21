// ===== Community Page (Extra Functionality) =====


// ---------- Helper functions ----------

// Returns true if the text is empty or has spaces only
function isEmpty(text) {
  return text.search(/\S/) == -1;
}

// Returns true if the chosen file name ends with an image extension
function isImageFile(fileName) {
  return fileName.search(/\.(jpg|jpeg|png|gif|webp)$/i) != -1;
}

// Changes a number like 35 to Arabic digits like ٣٥
function toArabicDigits(number) {
  var arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  var text = "" + number;
  var result = "";
  for (var i = 0; i < text.length; i++) {
    result += arabicDigits.charAt(text.charAt(i));
  }
  return result;
}

// Builds the HTML of one post card (same structure as the posts in the page)
function postHTML(post) {
  var tag = "";
  if (post.workshop != "") {
    tag = '<a href="offerings.html" class="community-post-tag">من ورشة ' + post.workshop + '</a>';
  } else {
    tag = '<span class="community-post-tag">مشاركة في تحدي الأسبوع</span>';
  }

  return '<article class="community-post">' +
           '<img src="' + post.image + '" alt="' + post.alt + '" class="community-post-img">' +
           '<div class="community-post-author">' +
             '<img src="' + post.avatar + '" alt="" class="community-post-avatar">' +
             '<h3>' + post.name + '</h3>' +
           '</div>' +
           '<p class="community-post-text">' + post.text + '</p>' +
           tag +
           '<ul class="community-stats community-post-stats">' +
             '<li class="community-stat">' +
               '<img src="images/heart.png" alt="" class="community-icon">' +
               post.likes + ' <span class="visually-hidden">إعجابات</span>' +
             '</li>' +
             '<li class="community-stat">' +
               '<img src="images/comment.png" alt="" class="community-icon">' +
               post.comments + ' <span class="visually-hidden">تعليقًا</span>' +
             '</li>' +
           '</ul>' +
         '</article>';
}

var postsList = document.getElementById("posts-list");


// 1) (I will attend) buttons 

var attendButtons = document.querySelectorAll(".community-event .btn");

function attendEvent() {
  // The event name is the h3 inside the same event box
  var eventName = this.parentNode.getElementsByTagName("h3")[0].innerHTML;

  if (this.innerHTML == "سأحضر") {
    var answer = confirm("هل تريد تأكيد حضورك لفعالية: " + eventName + "؟");
    if (answer) {
      this.innerHTML = "تم التسجيل ✓";
      alert("تم تسجيل حضورك في " + eventName + "، نراك هناك!");
    }
  } else {
    var cancelAnswer = confirm("هل تريد إلغاء حضورك لفعالية: " + eventName + "؟");
    if (cancelAnswer) {
      this.innerHTML = "سأحضر";
    }
  }
}

for (var i = 0; i < attendButtons.length; i++) {
  attendButtons[i].onclick = attendEvent;
}


// 2) (Show more) button

var moreButton = document.getElementById("more-btn");

// More member posts (array of objects)
var morePosts = [
  {
    name: "ديم الزهراني",
    avatar: "images/avatar-woman.jpg",
    image: "images/post-deem.jpg",
    alt: "تطريز يدوي لوردة وردية داخل إطار خشبي",
    text: "أول وردة أطرّزها بيدي، وتعلّمت أن الصبر سر كل غرزة",
    workshop: "أساسيات التطريز",
    likes: "٩",
    comments: "١٥"
  },
  {
    name: "سارة العمري",
    avatar: "images/avatar-woman.jpg",
    image: "images/post-sara.jpg",
    alt: "كوب خزفي مرسوم يدويًا بزهور ملوّنة",
    text: "لوّنت كوبي بألوان الربيع، وصار أقرب قطعة إلى قلبي",
    workshop: "الرسم على الخزف",
    likes: "٧",
    comments: "١٠"
  },
  {
    name: "عبدالرحمن القحطاني",
    avatar: "images/avatar-man.jpg",
    image: "images/post-abdulrahman.jpg",
    alt: "صحن فخاري بنقوش زرقاء مرسومة يدويًا",
    text: "أول صحن أشكّله بيدي، والنقوش الزرقاء أعطته روحًا مختلفة",
    workshop: "صناعة الفخار",
    likes: "٥",
    comments: "٨"
  }
];

function showMorePosts() {
  for (var i = 0; i < morePosts.length; i++) {
    postsList.innerHTML += postHTML(morePosts[i]);
  }
  // Hide the button (and its box) after showing the posts
  moreButton.parentNode.style.display = "none";
}

moreButton.onclick = showMorePosts;


// 3) (New post) button 

var newPostButton = document.getElementById("new-post-btn");
var postForm = document.getElementById("post-form");
var postName = document.getElementById("post-name");
var postWorkshop = document.getElementById("post-workshop");
var postText = document.getElementById("post-text");
var postImage = document.getElementById("post-image");

// The form is hidden until the user clicks the button
postForm.style.display = "none";

function clearPostForm() {
  postName.value = "";
  postWorkshop.value = "";
  postText.value = "";
  postImage.value = "";
  postForm.style.display = "none";
}

// Show the form, or hide it if it is already shown
newPostButton.onclick = function () {
  if (postForm.style.display == "none") {
    postForm.style.display = "block";
  } else {
    clearPostForm();
  }
};

document.getElementById("post-cancel").onclick = clearPostForm;

function addNewPost() {
  var errors = "";

  if (isEmpty(postName.value)) {
    errors += "- يرجى إدخال الاسم\n";
  } else if (postName.value.search(/^[0-9٠-٩]/) != -1) {
    errors += "- الاسم لا يمكن أن يبدأ بأرقام\n";
  }

  if (isEmpty(postWorkshop.value)) {
    errors += "- يرجى اختيار الورشة\n";
  }

  if (isEmpty(postText.value)) {
    errors += "- يرجى كتابة نص المنشور\n";
  }

  if (isEmpty(postImage.value)) {
    errors += "- يرجى اختيار صورة المنشور\n";
  } else if (!isImageFile(postImage.value)) {
    errors += "- الملف المختار ليس صورة\n";
  }

  if (errors != "") {
    alert("لم يتم نشر المنشور، يرجى تصحيح التالي:\n\n" + errors);
    return false;
  }

  // Read the chosen image, then add the post at the top of the list
  var reader = new FileReader();
  reader.onload = function () {
    var newPost = {
      name: postName.value,
      avatar: "images/avatar-woman.jpg",
      image: reader.result,
      alt: "صورة منشور " + postName.value,
      text: postText.value,
      workshop: postWorkshop.value,
      likes: "٠",
      comments: "٠"
    };
    postsList.innerHTML = postHTML(newPost) + postsList.innerHTML;
    alert("تم نشر منشورك بنجاح، شكرًا لمشاركتك!");
    clearPostForm();
  };
  reader.readAsDataURL(postImage.files[0]);

  return false;
}

postForm.onsubmit = addNewPost;


// 4) (Share your achievement) button

var shareButton = document.getElementById("share-btn");
var shareForm = document.getElementById("share-form");
var shareName = document.getElementById("share-name");
var shareImage = document.getElementById("share-image");
var shareText = document.getElementById("share-text");
var challengeCount = document.getElementById("challenge-count");
var participants = 34;

// The form is hidden until the user clicks the button
shareForm.style.display = "none";

function clearShareForm() {
  shareName.value = "";
  shareImage.value = "";
  shareText.value = "";
  shareForm.style.display = "none";
}

// Show the form, or hide it if it is already shown
shareButton.onclick = function () {
  if (shareForm.style.display == "none") {
    shareForm.style.display = "block";
  } else {
    clearShareForm();
  }
};

document.getElementById("share-cancel").onclick = clearShareForm;

function shareAchievement() {
  var errors = "";

  if (isEmpty(shareName.value)) {
    errors += "- يرجى إدخال الاسم\n";
  } else if (shareName.value.search(/^[0-9٠-٩]/) != -1) {
    errors += "- الاسم لا يمكن أن يبدأ بأرقام\n";
  }

  if (isEmpty(shareImage.value)) {
    errors += "- يرجى اختيار صورة الإنجاز\n";
  } else if (!isImageFile(shareImage.value)) {
    errors += "- الملف المختار ليس صورة\n";
  }

  if (isEmpty(shareText.value)) {
    errors += "- يرجى كتابة وصف الإنجاز\n";
  }

  if (errors != "") {
    alert("لم تتم المشاركة، يرجى تصحيح التالي:\n\n" + errors);
    return false;
  }

  // Read the chosen image, then add the achievement to the posts
  var reader = new FileReader();
  reader.onload = function () {
    var newPost = {
      name: shareName.value,
      avatar: "images/avatar-woman.jpg",
      image: reader.result,
      alt: "صورة إنجاز " + shareName.value,
      text: shareText.value,
      workshop: "",
      likes: "٠",
      comments: "٠"
    };
    postsList.innerHTML = postHTML(newPost) + postsList.innerHTML;

    // Add one to the number of participants
    participants = participants + 1;
    challengeCount.innerHTML = toArabicDigits(participants) + " مشاركة";

    alert("شكرًا لمشاركتك في تحدي الأسبوع! تجد إنجازك في منشورات الأعضاء");
    clearShareForm();
  };
  reader.readAsDataURL(shareImage.files[0]);

  return false;
}

shareForm.onsubmit = shareAchievement;
