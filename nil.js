
        (function() {
            // Configuration - Customize these values
            const CONFIG = {
                apiEndpoint: 'https://your-express-server.com/api/chat', // Replace with your Express server URL
                websiteId: 'website-123', // Unique identifier for each website
                theme: {
                    primaryColor: '#4F46E5',
                    secondaryColor: '#F3F4F6',
                    textColor: '#1F2937',
                    backgroundColor: '#FFFFFF'
                }
            };

            // Chat Widget Styles
            const styles = `
                /* Chat Widget Styles */
                #chat-widget-container {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    z-index: 9999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                #chat-toggle-btn {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: ${CONFIG.theme.primaryColor};
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                #chat-toggle-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                }

                #chat-toggle-btn svg {
                    width: 24px;
                    height: 24px;
                    fill: white;
                    transition: transform 0.3s ease;
                }

                #chat-toggle-btn.active svg {
                    transform: rotate(180deg);
                }

                #chat-widget {
                    position: absolute;
                    bottom: 80px;
                    left: 0;
                    width: 350px;
                    height: 500px;
                    background: ${CONFIG.theme.backgroundColor};
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid #E5E5E5;
                }

                #chat-widget.active {
                    display: flex;
                    animation: slideUp 0.3s ease;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                #chat-header {
                    background: ${CONFIG.theme.primaryColor};
                    color: white;
                    padding: 20px;
                    text-align: center;
                    position: relative;
                }

                #chat-header h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                }

                #chat-header p {
                    margin: 5px 0 0 0;
                    font-size: 14px;
                    opacity: 0.9;
                }

                #chat-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: #FAFAFA;
                }

                .message {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: flex-start;
                }

                .message.user {
                    justify-content: flex-end;
                }

                .message-bubble {
                    max-width: 80%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .message.bot .message-bubble {
                    background: white;
                    color: ${CONFIG.theme.textColor};
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                .message.user .message-bubble {
                    background: ${CONFIG.theme.primaryColor};
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .message.bot::before {
                    content: '🤖';
                    margin-right: 8px;
                    font-size: 16px;
                }

                .typing-indicator {
                    display: none;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .typing-indicator::before {
                    content: '🤖';
                    margin-right: 8px;
                    font-size: 16px;
                }

                .typing-dots {
                    background: white;
                    padding: 12px 16px;
                    border-radius: 18px;
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                .typing-dots span {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    background: #999;
                    border-radius: 50%;
                    margin: 0 2px;
                    animation: typing 1.4s infinite;
                }

                .typing-dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.4;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }

                #chat-input-container {
                    padding: 20px;
                    background: white;
                    border-top: 1px solid #E5E5E5;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                #chat-input {
                    flex: 1;
                    border: 1px solid #D1D5DB;
                    border-radius: 20px;
                    padding: 12px 16px;
                    font-size: 14px;
                    outline: none;
                    resize: none;
                    max-height: 80px;
                    min-height: 20px;
                }

                #chat-input:focus {
                    border-color: ${CONFIG.theme.primaryColor};
                }

                #chat-send-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: ${CONFIG.theme.primaryColor};
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                #chat-send-btn:hover {
                    background: #3730A3;
                    transform: scale(1.05);
                }

                #chat-send-btn:disabled {
                    background: #D1D5DB;
                    cursor: not-allowed;
                    transform: none;
                }

                #chat-send-btn svg {
                    width: 16px;
                    height: 16px;
                    fill: white;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    #chat-widget {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 120px);
                        left: 20px;
                        right: 20px;
                    }
                }

                /* Scrollbar Styles */
                #chat-messages::-webkit-scrollbar {
                    width: 6px;
                }

                #chat-messages::-webkit-scrollbar-track {
                    background: transparent;
                }

                #chat-messages::-webkit-scrollbar-thumb {
                    background: #D1D5DB;
                    border-radius: 3px;
                }

                #chat-messages::-webkit-scrollbar-thumb:hover {
                    background: #9CA3AF;
                }
            `;

            // Inject styles
            const styleElement = document.createElement('style');
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);

            // Chat Widget HTML
            const chatWidgetHTML = `
                <div id="chat-widget-container">
                    <button id="chat-toggle-btn">
                        <svg viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                        </svg>
                    </button>
                    <div id="chat-widget">
                        <div id="chat-header">
                            <h3>Chat Support</h3>
                            <p>Hi! How can I help you today?</p>
                        </div>
                        <div id="chat-messages">
                            <div class="message bot">
                                <div class="message-bubble">
                                    Hello! I'm your AI assistant. How can I help you today?
                                </div>
                            </div>
                        </div>
                        <div class="typing-indicator">
                            <div class="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div id="chat-input-container">
                            <textarea id="chat-input" placeholder="Type your message..." rows="1"></textarea>
                            <button id="chat-send-btn">
                                <svg viewBox="0 0 24 24">
                                    <path d="m2 21 21-9L2 3v7l15 2-15 2v7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Initialize chat widget
            function initChatWidget() {
                // Add chat widget to DOM
                document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

                // Get elements
                const toggleBtn = document.getElementById('chat-toggle-btn');
                const chatWidget = document.getElementById('chat-widget');
                const chatInput = document.getElementById('chat-input');
                const sendBtn = document.getElementById('chat-send-btn');
                const messagesContainer = document.getElementById('chat-messages');
                const typingIndicator = document.querySelector('.typing-indicator');

                // Toggle chat widget
                toggleBtn.addEventListener('click', () => {
                    const isActive = chatWidget.classList.contains('active');
                    if (isActive) {
                        chatWidget.classList.remove('active');
                        toggleBtn.classList.remove('active');
                    } else {
                        chatWidget.classList.add('active');
                        toggleBtn.classList.add('active');
                        chatInput.focus();
                    }
                });

                // Handle input changes
                chatInput.addEventListener('input', () => {
                    // Auto-resize textarea
                    chatInput.style.height = 'auto';
                    chatInput.style.height = Math.min(chatInput.scrollHeight, 80) + 'px';
                });

                // Send message function
                async function sendMessage() {
                    const message = chatInput.value.trim();
                    if (!message) return;

                    // Add user message
                    addMessage(message, 'user');
                    chatInput.value = '';
                    chatInput.style.height = 'auto';

                    // Show typing indicator
                    showTypingIndicator();

                    try {
                        // Send request to your Express server
                        const response = await fetch(CONFIG.apiEndpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                message: message,
                                websiteId: CONFIG.websiteId,
                                timestamp: new Date().toISOString()
                            })
                        });

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        
                        // Hide typing indicator
                        hideTypingIndicator();
                        
                        // Add bot response
                        addMessage(data.response || 'Sorry, I encountered an error. Please try again.', 'bot');

                    } catch (error) {
                        console.error('Chat error:', error);
                        hideTypingIndicator();
                        addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.', 'bot');
                    }
                }

                // Add message to chat
                function addMessage(text, sender) {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = `message ${sender}`;
                    messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
                    messagesContainer.appendChild(messageDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }

                // Show typing indicator
                function showTypingIndicator() {
                    typingIndicator.style.display = 'flex';
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }

                // Hide typing indicator
                function hideTypingIndicator() {
                    typingIndicator.style.display = 'none';
                }

                // Event listeners
                sendBtn.addEventListener('click', sendMessage);
                
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                });

                // Close chat when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('#chat-widget-container')) {
                        chatWidget.classList.remove('active');
                        toggleBtn.classList.remove('active');
                    }
                });
            }

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initChatWidget);
            } else {
                initChatWidget();
            }

        })();
