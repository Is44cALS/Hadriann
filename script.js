document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const fileInput = document.getElementById('fileInput');
    const fileButton = document.getElementById('fileButton');
    const callButton = document.getElementById('callButton');

    
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');
    contextMenu.innerHTML = `
        <button id="deleteMessage">Apagar Mensagem</button>
        <button id="cancelAction">Cancelar</button>
    `;
    document.body.appendChild(contextMenu);

    let currentMessage = null;

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(type);
        messageDiv.innerHTML = text;
        messageDiv.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            currentMessage = messageDiv;
            showContextMenu(event.clientX, event.clientY);
        });
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showContextMenu(x, y) {
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    }

    function hideContextMenu() {
        contextMenu.style.display = 'none';
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            addMessage(text, 'sent');
            messageInput.value = '';
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    fileButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let fileHTML;
                if (file.type.startsWith('image/')) {
                    fileHTML = `<img src="${e.target.result}" alt="Imagem" style="max-width: 100%; max-height: 300px;">`;
                } else if (file.type.startsWith('video/')) {
                    fileHTML = `<video controls style="max-width: 100%; max-height: 300px;"><source src="${e.target.result}" type="${file.type}">Seu navegador não suporta o elemento de vídeo.</video>`;
                } else if (file.type.startsWith('audio/')) {
                    fileHTML = `<audio controls><source src="${e.target.result}" type="${file.type}">Seu navegador não suporta o elemento de áudio.</audio>`;
                }
                addMessage(fileHTML, 'sent');
            };
            reader.readAsDataURL(file);
        }
    });

    callButton.addEventListener('click', () => {
        alert('Iniciar chamada de áudio (implementação necessária)');
    });

    
    document.getElementById('deleteMessage').addEventListener('click', () => {
        if (currentMessage) {
            messagesContainer.removeChild(currentMessage);
            hideContextMenu();
        }
    });

    document.getElementById('cancelAction').addEventListener('click', () => {
        hideContextMenu();
    });

    
    document.addEventListener('click', (event) => {
        if (!contextMenu.contains(event.target)) {
            hideContextMenu();
        }
    });
});