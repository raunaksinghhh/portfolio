// Initialize Firebase (replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firestore database
  const db = firebase.firestore();
  
  document.addEventListener('DOMContentLoaded', function() {
      // Custom cursor
      const cursor = document.querySelector('.cursor');
      
      document.addEventListener('mousemove', function(e) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
      });
      
      document.addEventListener('mousedown', function() {
          cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      });
      
      document.addEventListener('mouseup', function() {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
      
      // Mobile menu toggle
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const navLinksItems = document.querySelectorAll('.nav-links li a');
      
      // Toggle menu when hamburger is clicked
      if (hamburger) {
          hamburger.addEventListener('click', function() {
              this.classList.toggle('active');
              navLinks.classList.toggle('active');
              document.body.classList.toggle('menu-open');
          });
      }
      
      // Close menu when nav item is clicked
      navLinksItems.forEach(item => {
          item.addEventListener('click', function() {
              hamburger.classList.remove('active');
              navLinks.classList.remove('active');
              document.body.classList.remove('menu-open');
          });
      });
      
      // Handle resize to reset menu state
      window.addEventListener('resize', function() {
          if (window.innerWidth >= 1024) {
              hamburger.classList.remove('active');
              navLinks.classList.remove('active');
              document.body.classList.remove('menu-open');
          }
      });
      
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              e.preventDefault();
              
              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              
              window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: 'smooth'
              });
          });
      });
      
      // Active navigation link based on scroll position
      const sections = document.querySelectorAll('section');
      const navItems = document.querySelectorAll('.nav-links a');
      
      window.addEventListener('scroll', function() {
          let current = '';
          
          sections.forEach(section => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.clientHeight;
              
              if (pageYOffset >= sectionTop - 200) {
                  current = section.getAttribute('id');
              }
          });
          
          navItems.forEach(item => {
              item.classList.remove('active');
              if (item.getAttribute('href') === '#' + current) {
                  item.classList.add('active');
              }
          });
      });
      
      // Reveal animations on scroll
      const revealElements = document.querySelectorAll('.reveal');
      
      function revealOnScroll() {
          revealElements.forEach(element => {
              const elementTop = element.getBoundingClientRect().top;
              const windowHeight = window.innerHeight;
              
              if (elementTop < windowHeight - 100) {
                  element.classList.add('active');
              }
          });
      }
      
      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll(); // Initial check
      
      // Form submission
      const contactForm = document.querySelector('.contact-form');
      
      if (contactForm) {
          contactForm.addEventListener('submit', function(e) {
              e.preventDefault();
              
              // Get form values
              const name = document.getElementById('name').value;
              const email = document.getElementById('email').value;
              const subject = document.getElementById('subject').value;
              const message = document.getElementById('message').value;
              
              // Save to Firebase
              db.collection('contactMessages').add({
                  name: name,
                  email: email,
                  subject: subject,
                  message: message,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
              })
              .then(() => {
                  console.log('Message saved to Firebase!');
                  
                  // Show success message
                  const successMessage = document.createElement('div');
                  successMessage.classList.add('form-success');
                  successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                  
                  contactForm.reset();
                  contactForm.appendChild(successMessage);
                  
                  // Remove success message after 5 seconds
                  setTimeout(() => {
                      successMessage.remove();
                  }, 5000);
              })
              .catch(error => {
                  console.error('Error saving message: ', error);
                  
                  // Show error message
                  const errorMessage = document.createElement('div');
                  errorMessage.classList.add('form-error');
                  errorMessage.textContent = 'There was an error sending your message. Please try again.';
                  
                  contactForm.appendChild(errorMessage);
                  
                  // Remove error message after 5 seconds
                  setTimeout(() => {
                      errorMessage.remove();
                  }, 5000);
              });
          });
      }
      
      // Page loader
      const loader = document.querySelector('.loader');
      
      if (loader) {
          window.addEventListener('load', function() {
              loader.classList.add('hidden');
          });
      }
      
      // Create animated web background
      createWebBackground();
  });
  
  function createWebBackground() {
      const backgroundShapes = document.querySelector('.background-shapes');
      
      // Clear existing shapes
      backgroundShapes.innerHTML = '';
      
      // Create web nodes
      for (let i = 0; i < 20; i++) {
          const node = document.createElement('div');
          node.classList.add('web-node');
          
          // Random size between 10px and 30px
          const size = Math.random() * 20 + 10;
          node.style.width = `${size}px`;
          node.style.height = `${size}px`;
          
          // Random position
          node.style.left = `${Math.random() * 100}vw`;
          node.style.top = `${Math.random() * 100}vh`;
          
          // Random color
          const colors = ['rgba(108, 99, 255, 0.2)', 'rgba(255, 101, 132, 0.2)', 'rgba(0, 184, 169, 0.2)'];
          node.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          
          // Random animation
          node.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite ${Math.random() * 5}s`;
          
          backgroundShapes.appendChild(node);
      }
      
      // Create canvas for connections
      const connections = document.createElement('div');
      connections.classList.add('connections');
      document.body.appendChild(connections);
      
      const canvas = document.createElement('canvas');
      connections.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions
      function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Create nodes array
      const nodes = [];
      for (let i = 0; i < 50; i++) {
          nodes.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: Math.random() * 1 - 0.5,
              vy: Math.random() * 1 - 0.5,
              radius: Math.random() * 2 + 1
          });
      }
      
      // Update and draw web
      function drawWeb() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Update node positions
          nodes.forEach(node => {
              node.x += node.vx;
              node.y += node.vy;
              
              // Bounce off edges
              if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
              if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;
              
              // Draw node
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(108, 99, 255, 0.5)';
              ctx.fill();
          });
          
          // Draw connections
          for (let i = 0; i < nodes.length; i++) {
              for (let j = i + 1; j < nodes.length; j++) {
                  const dx = nodes[i].x - nodes[j].x;
                  const dy = nodes[i].y - nodes[j].y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance < 150) {
                      ctx.beginPath();
                      ctx.moveTo(nodes[i].x, nodes[i].y);
                      ctx.lineTo(nodes[j].x, nodes[j].y);
                      ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 - distance/750})`;
                      ctx.lineWidth = 0.5;
                      ctx.stroke();
                  }
              }
          }
          
          requestAnimationFrame(drawWeb);
      }
      
      drawWeb();
      
      // Add mouse interaction
      const mouseNode = { x: 0, y: 0, radius: 100 };
      
      document.addEventListener('mousemove', function(e) {
          mouseNode.x = e.clientX;
          mouseNode.y = e.clientY;
      });
  }
  
  // Apply gradient text animation to section titles
  document.querySelectorAll('.section-title').forEach(title => {
      title.classList.add('animate-gradient');
  });
  
  // Add dynamic hover effects to tech items
  document.querySelectorAll('.tech-item').forEach(item => {
      item.addEventListener('mouseenter', function() {
          const randomDelay = Math.random() * 0.5;
          this.style.transitionDelay = `${randomDelay}s`;
      });
      
      item.addEventListener('mouseleave', function() {
          this.style.transitionDelay = '0s';
      });
  }); 