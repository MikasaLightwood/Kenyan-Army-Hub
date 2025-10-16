// ================= HOME PAGE: DYNAMIC GREETING START =================
const greetingEl = document.getElementById("greeting");
if (greetingEl) {
  const hour = new Date().getHours();
  let greetingText = "Welcome to the BTS ARMY Hub 💜";

  if (hour < 12) greetingText = "Good morning, ARMY 💜Effort makes you. You will regret someday if you don't do your best now.- BTS Jungkook";
  else if (hour < 18) greetingText = "Good afternoon, ARMY 💜 If the plan doesn't work, change the plan, but never the Goal. - BTS Jin";
  else greetingText = "Good evening, ARMY 💜 Don't be trapped in someone else's dream. - BTS V";

  greetingEl.textContent = greetingText;
  console.log("Dynamic greeting displayed:", greetingText);
}
// ================= HOME PAGE: DYNAMIC GREETING END =================

// ================= MEMBERS PAGE LOGIC =================
const memberCards = document.querySelectorAll(".member-card");

if (memberCards.length) {
  console.log("Members page loaded: BTS member cards found.");

  // ================= FUN FACTS =================
  const funFacts = [
    "RM learned English by watching 'Friends'!",
    "Jin studied acting before joining BigHit.",
    "SUGA originally wanted to be a producer.",
    "J-Hope was part of an underground dance crew.",
    "Jimin studied contemporary dance in Busan.",
    "V was the hidden member before debut!",
    "Jungkook almost joined another company before BigHit!"
  ];

  const factContainer = document.createElement("section");
  factContainer.className = "fun-facts";
  factContainer.style.textAlign = "center";
  factContainer.style.padding = "1.5rem 1rem";
  factContainer.style.fontWeight = "600";
  factContainer.style.color = "#6E1E91";
  factContainer.style.fontSize = "1.1rem";
  factContainer.textContent = `💜 Fun Fact: ${funFacts[0]}`;

  // Insert before footer
  const footer = document.querySelector("footer");
  if (footer) {
    footer.parentNode.insertBefore(factContainer, footer);
  }

  // Rotate facts every 10 seconds
  let factIndex = 1;
  setInterval(() => {
    factContainer.textContent = `💜 Fun Fact: ${funFacts[factIndex]}`;
    factIndex = (factIndex + 1) % funFacts.length;
  }, 10000);
}


// ================= SHOWS PAGE: ADD YOUTUBE LINKS =================
const showCards = document.querySelectorAll(".show-card");
if (showCards.length) {
  const youtubeLinks = {
    "Burn the Stage": "https://www.youtube.com/watch?v=g_6FoBgps9Y",
    "Break the Silence": "https://www.youtube.com/watch?v=QfctZceL6mw",
    "Bring the Soul": "https://www.youtube.com/watch?v=AwrClxIhsYc",
    "BTS World": "https://www.youtube.com/watch?v=Sztf6ppbqQE"
  };

  showCards.forEach(card => {
    const titleEl = card.querySelector("h3");
    const infoEl = card.querySelector(".show-info");

    if (titleEl && infoEl) {
      const title = titleEl.textContent.trim();
      const ytLink = youtubeLinks[title];
      if (ytLink) {
        const a = document.createElement("a");
        a.href = ytLink;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Watch on YouTube";
        a.style.display = "block";
        a.style.marginTop = "8px";
        infoEl.appendChild(a);
      }
    }
  });
}

// ================= JOIN FORM LOGIC =================
if (joinForm) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(joinForm);
    const name = formData.get("name")?.trim();
    const favoriteMember = formData.get("favorite-member")?.trim();
    const armySince = formData.get("army-since")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !favoriteMember || !armySince || !message) {
      formFeedback.textContent = "Please fill all fields!";
      formFeedback.style.color = "red";
      return;
    }

    const members = JSON.parse(localStorage.getItem("members")) || [];
    members.push({ name, favoriteMember, armySince, message, date: new Date().toISOString() });
    localStorage.setItem("members", JSON.stringify(members));

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = {
      id: Date.now(),
      username: name,
      content: `${message} 💜 Favorite Member: ${favoriteMember}`,
      date: new Date().toISOString()
    };
    savedPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(savedPosts));

    formFeedback.textContent = `Welcome, ${name}! 💜 You have successfully joined Kenyan Army Hub Community.`;
    formFeedback.style.color = "green";

    joinForm.reset();
  });
}

// ================= COMMUNITY POSTS LOGIC =================
const postsContainer = document.getElementById("posts-container");
if (postsContainer) {
  let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Add sample posts if none exist
  if (!savedPosts || savedPosts.length === 0) {
    savedPosts = [
      { id: 1, username: "Stacy", content: "BTS forever 💜", date: new Date().toISOString() },
      { id: 2, username: "Alex", content: "Can't wait for their next album!", date: new Date().toISOString() },
      { id: 3, username: "Jordan", content: "Love all the BTS content!", date: new Date().toISOString() },
      { id: 4, username: "Mia", content: "Army life is the best life!", date: new Date().toISOString() },
      { id: 5, username: "Leo", content: "Watching every BTS documentary twice 😎", date: new Date().toISOString() }
    ];
    localStorage.setItem("posts", JSON.stringify(savedPosts));
  }

  // Render posts (newest first)
  savedPosts.reverse().forEach(createPostElement);

  const postForm = document.getElementById("post-form");
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(postForm);
      const username = formData.get("username")?.trim();
      const content = formData.get("content")?.trim();

      if (!username || !content) return;

      const newPost = { id: Date.now(), username, content, date: new Date().toISOString() };
      savedPosts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(savedPosts));

      createPostElement(newPost);
      postForm.reset();
    });
  }

  // ================= RE-SCATTER ON LOAD & RESIZE =================
  function scatterPosts() {
    const containerWidth = postsContainer.offsetWidth;
    const containerHeight = postsContainer.offsetHeight;
    const maxLeft = Math.max(0, containerWidth - 220 - 20);
    const maxTop = Math.max(0, containerHeight - 150 - 20);

    document.querySelectorAll(".post-scatter").forEach(postEl => {
      postEl.style.left = `${Math.random() * maxLeft}px`;
      postEl.style.top = `${Math.random() * maxTop}px`;
    });
  }

  window.addEventListener("load", scatterPosts);
  window.addEventListener("resize", scatterPosts);
}

// ================= RESPONSIVE NAVIGATION =================
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");    
if (navToggle) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) navLinks.classList.remove("active");
  });
}

// ================= READ MORE LINKS =================
document.querySelectorAll('.read-more').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});
