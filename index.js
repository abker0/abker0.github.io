const lines = [
  'Hello World!',
  "I'm Adam Baker.",
  'Welcome to my website.'
];
let line = 0, char = 0, output = '';

function type() {
  if (line < lines.length) {
    let currentLine = lines[line].slice(0, char);
    
    let display = output + '<span class="blinking-cursor"></span>' + currentLine;
    document.getElementById('terminal').innerHTML = display;

    if (char < lines[line].length) {
      char++;
      setTimeout(type, 80);
    } else {
      
      output += '<span class="prompt">&gt;</span>' + lines[line] + '<br>';
      char = 0;
      line++;
      setTimeout(type, 500);
    }
  } else {
    showInputLine();
  }
}

function showInputLine() {
  document.getElementById('terminal').innerHTML = 
    output + 
    `<span class="terminal-input-line"><span class="prompt">&gt;</span><span id="terminal-editable" class="terminal-editable" contenteditable="true" spellcheck="false"></span></span>`;
  const editable = document.getElementById('terminal-editable');
  editable.focus({ preventScroll: true }); 
  placeCursorAtEnd(editable);
  editable.addEventListener('input', updateBlockCursor);
  editable.addEventListener('keydown', handleInputEnter);
  updateBlockCursor();
}

function handleInputEnter(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const editable = document.getElementById('terminal-editable');
    const text = editable.textContent;
    if (!text) return;
    
    let html = '';
    for (let i = 0; i < text.length; i++) {
      html += `<span class='disintegrate' style='display:inline-block;'>${text[i]}</span>`;
    }
    editable.innerHTML = html + '<span class="block-cursor">▉</span>';
    
    const chars = editable.querySelectorAll('.disintegrate');
    chars.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('disappear');
      }, i * 40);
    });
    
    setTimeout(() => {
      editable.innerHTML = '<span class="block-cursor">▉</span>';
      placeCursorAtEnd(editable);
    }, chars.length * 40 + 400);
  }
}

function updateBlockCursor() {
  const editable = document.getElementById('terminal-editable');
  if (!editable) return;
  editable.innerHTML = editable.textContent.replace(/▉/g, '');
  let text = editable.textContent;
  editable.innerHTML = text + '<span class="block-cursor">▉</span>';
  placeCursorAtEnd(editable);
}

function placeCursorAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  if (!el.childNodes.length) {
    range.setStart(el, 0);
  } else {
    range.setStart(el.childNodes[0], el.childNodes[0].length || 0);
  }
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

window.onload = type;


const detailToggles = document.querySelectorAll('.details-toggle');
detailToggles.forEach(button => {
    button.addEventListener('click', () => {
        
        const portfolioItem = button.closest('.portfolio-item');
        if (portfolioItem) {
            
            const detailsDiv = portfolioItem.querySelector('.portfolio-item-details');
            if (detailsDiv) {
                if (detailsDiv.style.display === 'none' || detailsDiv.style.display === '') {
                    detailsDiv.style.display = 'block';
                    button.textContent = 'Hide Details';
                } else {
                    detailsDiv.style.display = 'none';
                    button.textContent = 'View Details';
                }
            }
        }
    });
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Toggle mobile menu with improved animations
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on window resize if it gets too wide
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Account for navbar height in mobile
      const offset = window.innerWidth <= 768 ? 60 : 52;
      
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});
