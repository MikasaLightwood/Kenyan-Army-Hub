// Common helper
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
    const armySince = document.getElementById('army-since').value; // new field
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
  const submissions = JSON.parse(localStorage.getItem('armySubmissions')) || [];

}
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
if (exists('footer')) {
  const footer = document.getElementById('footer');
  const credit = document.createElement('p');  
    credit.textContent = "Website by Esther Gathatwa. All Rights Reserved.";
    footer.appendChild(credit);
    }   
if (exists('join-body')) {
  document.getElementById('join-body').style.backgroundColor = '#FFF0F5'; // light lavender
}   
if (exists('index-body')) {
    document.getElementById('index-body').style.backgroundColor = '#F8F0FF'; // very light purple
}
if (exists('members-body')) {
    document.getElementById('members-body').style.backgroundColor = '#F0FFF0'; // light green
}
if (exists('shows-body')) {
    document.getElementById('shows-body').style.backgroundColor = '#FFF5E6'; // light orange
}   
if (exists('community-body')) {
    document.getElementById('community-body').style.backgroundColor = '#F0FFFF'; // light cyan
}

// ===== END =====

