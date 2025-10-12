// ===== Helper =====
const exists = id => document.getElementById(id);

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
    submissions.push({ name, favoriteMember: memberMatched, armySince, message, date: new Date().toISOString() });
    localStorage.setItem('armySubmissions', JSON.stringify(submissions));

    feedback.style.color = "#32CD32";
    feedback.textContent = "Thanks! Your message has been saved.";
    form.reset();
  });
}

// ===== COMMUNITY =====
if (exists('community-container')) {
  const container = document.getElementById('community-container');

  // Check localStorage, if empty, pre-fill with example posts
  let submissions = JSON.parse(localStorage.getItem('armySubmissions')) || [];

  if (submissions.length === 0) {
    submissions = [
      {
        name: "Esther",
        favoriteMember: "RM",
        armySince: "2019",
        message: "I love RM’s leadership and rap skills!",
        date: new Date().toISOString()
      },
      {
        name: "Michael",
        favoriteMember: "Jimin",
        armySince: "2018",
        message: "Jimin’s dance moves always inspire me.",
        date: new Date().toISOString()
      },
      {
        name: "Faith",
        favoriteMember: "OT7",
        armySince: "2017",
        message: "I support all 7 members equally. Bangtan forever!",
        date: new Date().toISOString()
      }
    ];
    localStorage.setItem('armySubmissions', JSON.stringify(submissions));
  }

  // Display posts
  container.innerHTML = submissions.length
    ? submissions.map(sub => `
      <div class="community-card">
        <h3>${sub.name}</h3>
        <p><strong>Favorite Member:</strong> ${sub.favoriteMember}</p>
        <p><strong>ARMY Since:</strong> ${sub.armySince}</p>
        <p>${sub.message}</p>
        <small>${new Date(sub.date).toLocaleString()}</small>
      </div>`).join('')
    : "<p>No submissions yet. Be the first to join!</p>";
}


// ===== MEMBERS HOVER =====
if (exists('members')) {
  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)');
    card.addEventListener('mouseleave', () => card.style.boxShadow = 'none');
  });
}

// ===== SHOWS HOVER =====
if (exists('shows')) {
  document.querySelectorAll('.show-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  });
}

// ===== INDEX =====
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

// ===== FOOTER =====
if (exists('footer')) {
  const footer = document.getElementById('footer');
  const credit = document.createElement('p');  
  credit.textContent = "Website by Esther Gathatwa. All Rights Reserved.";
  footer.appendChild(credit);
}

// ===== BODY COLORS =====
const bodyColors = {
  'join-body': '#FFF0F5',
  'index-body': '#F8F0FF',
  'members-body': '#F0FFF0',
  'shows-body': '#FFF5E6',
  'community-body': '#F0FFFF'
};

Object.keys(bodyColors).forEach(id => {
  if (exists(id)) document.getElementById(id).style.backgroundColor = bodyColors[id];
});
// Default body color
if (!Object.keys(bodyColors).some(id => exists(id))) {
  document.body.style.backgroundColor = '#FFFFFF';
} 
// ===== NAVBAR ACTIVE LINK =====
const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split('/').pop();  
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
