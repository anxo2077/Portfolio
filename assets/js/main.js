function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  if (page === '' || page === '/') {
    return 'index.html';
  }
  
  return page;
}

function setActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    
    const anchor = link.querySelector('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      
      if (href === currentPage) {
        link.classList.add('active');
      }
    }
  });
}

function setupContactForm() {
  var form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }
      
      var formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(function(response) {
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset();
        } else {
          alert('Error sending message. Please try again.');
        }
      })
      .catch(function(error) {
        alert('Error sending message. Please try again.');
      });
    });
  }
}
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavLink();
  setupContactForm();
});