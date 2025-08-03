// Add responsive mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const container = document.querySelector('.container');
    
    if (mobileMenuBtn && sidebar && container) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            this.classList.toggle('active');
            container.classList.toggle('mobile-menu-open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!sidebar.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                sidebar.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
                container.classList.remove('mobile-menu-open');
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
                container.classList.remove('mobile-menu-open');
            }
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                    container.classList.remove('mobile-menu-open');
                }
            }, 100);
        });
    }
});

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const chatItems = document.querySelectorAll('.chat-list');
    
    if (searchInput && chatItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            chatItems.forEach(function(chatItem) {
                const chatText = chatItem.textContent.toLowerCase();
                
                if (chatText.includes(searchTerm)) {
                    chatItem.style.display = 'flex';
                } else {
                    chatItem.style.display = 'none';
                }
            });
            
            // If search is empty, show all chats
            if (searchTerm === '') {
                chatItems.forEach(function(chatItem) {
                    chatItem.style.display = 'flex';
                });
            }
        });
    }
});

// Add chat selection
document.addEventListener('DOMContentLoaded', function() {
    const chatItems = document.querySelectorAll('.chat-list');
    const chatHeader = document.querySelector('.chat-header p');
    const chatContent = document.querySelector('.chat-content');
    
    if (chatItems.length > 0 && chatHeader && chatContent) {
        chatItems.forEach(function(chatItem) {
            chatItem.addEventListener('click', function() {
                // Remove active class from all chat items
                chatItems.forEach(function(item) {
                    item.classList.remove('active-chat');
                });
                
                // Add active class to clicked item
                this.classList.add('active-chat');
                
                // Get chat details
                const chatName = this.querySelector('p').textContent.split('\n')[0].trim();
                const messageElement = this.querySelector('.message');
                const chatMessage = messageElement ? messageElement.textContent : 'New conversation';
                
                // Update chat header
                chatHeader.textContent = `💬 Chat with ${chatName}`;
                
                // Update chat content with selected chat
                chatContent.innerHTML = `
                    <div class="message-bubble user">
                        <p>${chatMessage}</p>
                    </div>
                    <div class="message-bubble bot">
                        <p>Hello! I'm here to help you with "${chatMessage}". What would you like to know?</p>
                    </div>
                `;
                
                // Close mobile menu if open
                const sidebar = document.getElementById('sidebar');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                const container = document.querySelector('.container');
                
                if (window.innerWidth <= 768 && sidebar && mobileMenuBtn && container) {
                    sidebar.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                    container.classList.remove('mobile-menu-open');
                }
            });
        });
    }
});

// Add smooth scrolling for better mobile experience
document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add touch feedback for mobile interactions
    const interactiveElements = document.querySelectorAll('.chat-list, .sidebar ul.menu li, .upgrade-btn, .mobile-menu-btn');
    
    interactiveElements.forEach(function(element) {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Reset transform after animation
        element.addEventListener('transitionend', function() {
            if (this.style.transform === 'scale(1)') {
                this.style.transition = '';
            }
        });
    });
    
    // Improve scroll behavior on mobile
    const scrollableElements = document.querySelectorAll('.chat-list-container, .sidebar');
    scrollableElements.forEach(function(element) {
        element.style.webkitOverflowScrolling = 'touch';
    });
});