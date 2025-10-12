// Common helper
const exists = id => document.getElementById(id);

// ===== INITIALIZE PRE-FILLED COMMUNITY POSTS =====
const initialPosts = [
  {
    name: "Alice",
    favoriteMember: "Jimin",
    armySince: "2018",
    message: "I’ve been an ARMY since high school! Jimin’s smile always makes my day 💜",
    date: new Date().toISOString()
  },
  {
    name: "Brian",
    favoriteMember: "RM",
    armySince: "2016",
    message: "Namjoon’s leadership inspires me. Proud to be ARMY!",
    date: new Date().toISOString()
  },
  {
    name: "Cathy",
    favoriteMember: "OT7",
    armySince: "2017",
    message: "Can’t pick one, they’re all amazing! Bangtan forever.",
    date: new Date().toISOString()
  }
];

// Check localStorage, set initial posts if none exist
if (!localStorage.getItem('armySubmissions')) {
  localStorage.setItem('armySubmissions', JSON.stringify(initialPosts));
}

// ===== JOIN FORM =====
if (exists('join-form')) {
  const form = document.getElementById('join-form');
  const feedback = document.getElementById('form-feedback');

  const validMembers = {
    RM: ["rm", "namjoon"],
    Jin: ["jin", "seokjin", "worldwide handsome"],
    Suga: ["suga", "yoongi", "agust d"],
    "J-Hope": ["j-hope", "hoseok", "hobi"],
    Jimin: ["jimin", "chimchim"],
    V: ["v", "tae", "taehyung"],
    Jungkook: ["jungkook", "kookie", "jeon jungkook"],
    OT7: ["ot7", "bangtan", "bts"]
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const memberInput = document.getElementById('favorite-member').value.trim().toLowerCase();
    const armySince = document.getElementById('army-since').value;
    const message = document.getElementById('message').value.trim();

    const memberMatched = Object.keys(validMembers).find(m => validMembers[m].includes(memberInput));
    if (!memberMatched) {
      feedback.style.color = "#FF0000";
      feedback.textContent = "Enter a valid BTS member or OT7 nickname.";
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('armySubmissions')) || [];
    submissions.unshift({ name, favoriteMember: memberMatched, armySince, message, date: new Date().toISOString() });
    localStorage.setItem('armySubmissions', JSON.stringify(submissions));

    feedback.style.color = "#32CD32";
    feedback.textContent = "Thanks! Your message has been saved.";
    form.reset();
  });
}

// ===== COMMUNITY PAGE - SCATTERED POSTS =====
if (exists('posts-container')) {
  const container = document.getElementById('posts-container');
  container.style.position = 'relative';
  container.style.height = '800px';
  container.innerHTML = '';

  const submissions = JSON.parse(localStorage.getItem('armySubmissions')) || [];
  const postWidth = 200;
  const padding = 20;

  if (submissions.length) {
    submissions.forEach(sub => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post-scatter';
      postDiv.innerHTML = `
        <h4>${sub.name}</h4>
        <p><strong>Favorite Member:</strong> ${sub.favoriteMember}</p>
        <p><strong>ARMY Since:</strong> ${sub.armySince}</p>
        <p>${sub.message}</p>
        <small>${new Date(sub.date).toLocaleString()}</small>
      `;
      container.appendChild(postDiv);

      // Scatter positioning
      const maxTop = container.clientHeight - postDiv.offsetHeight;
      const maxLeft = container.clientWidth - postWidth;

      postDiv.style.top = Math.floor(Math.random() * maxTop) + 'px';
      postDiv.style.left = Math.floor(Math.random() * maxLeft) + 'px';
    });
  } else {
    container.innerHTML = "<p>No submissions yet. Be the first to join!</p>";
  }
}

// ===== STATIC HOVER EFFECTS =====
if (exists('members')) {
  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)');
    card.addEventListener('mouseleave', () => card.style.boxShadow = 'none');
  });
}

if (exists('shows')) {
  document.querySelectorAll('.show-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  });
}

// ===== INDEX PAGE =====
if (exists('about')) {
  const about = document.getElementById('about');
  const greeting = document.createElement('p');
  greeting.textContent = "Welcome ARMY! Connect, share, and celebrate BTS with us.";
  about.appendChild(greeting);
}
if (exists('photo-gallery')) {
  const gallery = document.getElementById('photo-gallery');
  const caption = document.createElement('p');  
  caption.textContent = "Relive the magic of BTS concerts and ARMY moments!";
  gallery.appendChild(caption);
}

// ===== JOIN & BODY COLORS =====
if (exists('join-body')) document.getElementById('join-body').style.backgroundColor = '#FFF0F5';
if (exists('index-body')) document.getElementById('index-body').style.backgroundColor = '#F8F0FF';
if (exists('members-body')) document.getElementById('members-body').style.backgroundColor = '#F0FFF0';
if (exists('shows-body')) document.getElementById('shows-body').style.backgroundColor = '#FFF5E6';
if (exists('community-body')) document.getElementById('community-body').style.backgroundColor = '#F0FFFF';
if (exists('about-body')) document.getElementById('about-body').style.backgroundColor = '#FFFFF0';