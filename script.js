// Artist Management Hub - Main Application Script

class ArtistManagementHub {
    constructor() {
        this.data = {
            artists: [],
            bookings: [],
            opportunities: [],
            crises: [],
            tasks: [],
            settings: {
                autoSave: true,
                notifications: true,
                theme: 'default'
            }
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateDashboard();
        this.startAutoSave();
        this.handleOAuthCallbacks();
    }

    handleOAuthCallbacks() {
        // Handle OAuth callbacks from integrations
        if (typeof integrations !== 'undefined') {
            integrations.handleOAuthCallback();
        }
    }

    // Data Management
    loadData() {
        try {
            const savedData = localStorage.getItem('artistManagementData');
            if (savedData) {
                this.data = { ...this.data, ...JSON.parse(savedData) };
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('artistManagementData', JSON.stringify(this.data));
            this.showNotification('Data saved successfully', 'success');
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data', 'error');
        }
    }

    startAutoSave() {
        if (this.data.settings.autoSave) {
            setInterval(() => {
                this.saveData();
            }, 30000); // Auto-save every 30 seconds
        }
    }

    // Navigation
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Close modals when clicking overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // Update section-specific content
        this.updateSectionContent(sectionName);
    }

    updateSectionContent(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'artists':
                this.renderArtists();
                break;
            case 'bookings':
                this.renderBookings();
                break;
            case 'opportunities':
                this.renderOpportunities();
                break;
            case 'crisis':
                this.renderCrises();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    renderSettings() {
        // Render integrations when settings section is shown
        if (typeof integrations !== 'undefined') {
            integrations.renderIntegrations();
        }
    }

    // Dashboard
    updateDashboard() {
        document.getElementById('artist-count').textContent = this.data.artists.length;
        document.getElementById('booking-count').textContent = this.data.bookings.filter(b => b.status === 'pending').length;
        document.getElementById('opportunity-count').textContent = this.data.opportunities.filter(o => o.status === 'open').length;
        
        const totalRevenue = this.data.artists.reduce((sum, artist) => sum + (artist.monthlyRevenue || 0), 0);
        document.getElementById('revenue-total').textContent = `$${totalRevenue.toLocaleString()}`;

        this.renderUpcomingTasks();
        this.renderRecentActivity();
    }

    renderRecentActivity() {
        const activityContainer = document.getElementById('recent-activity');
        
        if (this.data.artists.length === 0 && this.data.bookings.length === 0 && this.data.opportunities.length === 0) {
            activityContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No recent activity</p>
                </div>
            `;
            return;
        }

        // Show recent items (this would be expanded with actual activity tracking)
        activityContainer.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-info-circle"></i>
                <span>Welcome to your Artist Management Hub!</span>
                <small>Start by adding your first artist</small>
            </div>
        `;
    }

    renderUpcomingTasks() {
        const container = document.getElementById('upcoming-tasks');
        if (!container) return;
        
        const now = new Date();
        const sevenDaysFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
        
        const upcomingTasks = this.data.tasks
            .filter(task => !task.completed)
            .filter(task => {
                const dueDate = new Date(task.dueDate);
                return dueDate <= sevenDaysFromNow;
            })
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        if (upcomingTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <p>No upcoming tasks</p>
                    <small>You're all caught up!</small>
                </div>
            `;
            return;
        }
        
        container.innerHTML = upcomingTasks.map(task => {
            const dueDate = new Date(task.dueDate);
            const isOverdue = dueDate < now;
            const isToday = dueDate.toDateString() === now.toDateString();
            const isTomorrow = dueDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
            
            let dueDateLabel = dueDate.toLocaleDateString();
            if (isOverdue) dueDateLabel = 'Overdue';
            else if (isToday) dueDateLabel = 'Due today';
            else if (isTomorrow) dueDateLabel = 'Due tomorrow';
            
            const artist = task.artistId ? this.data.artists.find(a => a.id === task.artistId) : null;
            
            return `
                <div class="task-item priority-${task.priority} ${isOverdue ? 'overdue' : ''}">
                    <div class="task-content">
                        <div class="task-header">
                            <h4>${task.title}</h4>
                            <button onclick="completeTask('${task.id}')" class="task-complete-btn">
                                <i class="fas fa-check"></i>
                            </button>
                        </div>
                        ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                        <div class="task-meta">
                            ${artist ? `<span class="task-artist">${artist.name}</span>` : ''}
                            <span class="task-due ${isOverdue ? 'overdue' : isToday ? 'today' : ''}">${dueDateLabel}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Artists Management
    renderArtists() {
        const container = document.getElementById('artists-grid');
        
        if (this.data.artists.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-plus"></i>
                    <p>No artists added yet</p>
                    <button class="btn-secondary" onclick="app.addArtist()">Add Your First Artist</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.artists.map(artist => `
            <div class="artist-card">
                <div class="artist-header">
                    <h3>${artist.name}</h3>
                    <div class="artist-actions">
                        <button onclick="app.editArtist('${artist.id}')" class="btn-outline">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteArtist('${artist.id}')" class="btn-danger">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="artist-details">
                    <p><strong>Genre:</strong> ${artist.genre || 'Not specified'}</p>
                    <p><strong>Status:</strong> ${artist.status || 'Active'}</p>
                    <p><strong>Monthly Revenue:</strong> $${(artist.monthlyRevenue || 0).toLocaleString()}</p>
                </div>
            </div>
        `).join('');
    }

    addArtist() {
        this.showModal('Add Artist', `
            <form id="artist-form">
                <div class="form-group">
                    <label for="artist-name">Artist Name *</label>
                    <input type="text" id="artist-name" required>
                </div>
                <div class="form-group">
                    <label for="artist-genre">Genre</label>
                    <select id="artist-genre">
                        <option value="">Select Genre</option>
                        <option value="House">House</option>
                        <option value="Techno">Techno</option>
                        <option value="Tech House">Tech House</option>
                        <option value="Melodic Techno">Melodic Techno</option>
                        <option value="Groovy House">Groovy House</option>
                        <option value="Funk">Funk</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="artist-status">Status</label>
                    <select id="artist-status">
                        <option value="Developing">Developing</option>
                        <option value="Established">Established</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="artist-revenue">Monthly Revenue ($)</label>
                    <input type="number" id="artist-revenue" min="0" step="100">
                </div>
                <div class="form-group">
                    <label for="artist-notes">Notes</label>
                    <textarea id="artist-notes" placeholder="Additional notes about this artist..."></textarea>
                </div>
            </form>
        `, [
            { text: 'Cancel', class: 'btn-secondary', action: 'close' },
            { text: 'Add Artist', class: 'btn-primary', action: () => this.saveArtist() }
        ]);
    }

    saveArtist(editId = null) {
        const form = document.getElementById('artist-form');
        const formData = new FormData(form);
        
        const artist = {
            id: editId || Date.now().toString(),
            name: document.getElementById('artist-name').value,
            genre: document.getElementById('artist-genre').value,
            status: document.getElementById('artist-status').value,
            monthlyRevenue: parseInt(document.getElementById('artist-revenue').value) || 0,
            notes: document.getElementById('artist-notes').value,
            createdAt: editId ? this.data.artists.find(a => a.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!artist.name.trim()) {
            this.showNotification('Artist name is required', 'error');
            return;
        }

        if (editId) {
            const index = this.data.artists.findIndex(a => a.id === editId);
            this.data.artists[index] = artist;
        } else {
            this.data.artists.push(artist);
        }

        this.saveData();
        this.closeModal();
        this.renderArtists();
        this.updateDashboard();
        this.showNotification(`Artist ${editId ? 'updated' : 'added'} successfully`, 'success');
    }

    deleteArtist(id) {
        if (confirm('Are you sure you want to delete this artist? This action cannot be undone.')) {
            this.data.artists = this.data.artists.filter(a => a.id !== id);
            this.saveData();
            this.renderArtists();
            this.updateDashboard();
            this.showNotification('Artist deleted successfully', 'success');
        }
    }

    // Bookings Management
    renderBookings() {
        const container = document.getElementById('bookings-list');
        
        if (this.data.bookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>No booking offers yet</p>
                    <button class="btn-secondary" onclick="app.addBooking()">Add Your First Booking</button>
                </div>
            `;
            return;
        }

        // Render bookings list (implementation would go here)
        container.innerHTML = '<p>Bookings will be displayed here</p>';
    }

    addBooking() {
        this.showNotification('Booking management coming soon!', 'info');
    }

    // Opportunities Management
    renderOpportunities() {
        const container = document.getElementById('opportunities-list');
        
        if (this.data.opportunities.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-lightbulb"></i>
                    <p>No opportunities tracked yet</p>
                    <button class="btn-secondary" onclick="app.addOpportunity()">Add Your First Opportunity</button>
                </div>
            `;
            return;
        }

        // Render opportunities list (implementation would go here)
        container.innerHTML = '<p>Opportunities will be displayed here</p>';
    }

    addOpportunity() {
        this.showNotification('Opportunity management coming soon!', 'info');
    }

    // Crisis Management
    renderCrises() {
        const container = document.getElementById('crisis-list');
        
        if (this.data.crises.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shield-alt"></i>
                    <p>No active crises</p>
                    <small>Hopefully it stays that way!</small>
                </div>
            `;
            return;
        }

        // Render crises list (implementation would go here)
        container.innerHTML = '<p>Crisis management will be displayed here</p>';
    }

    addCrisis() {
        this.showNotification('Crisis management coming soon!', 'info');
    }

    // Task Management
    addTask() {
        this.showModal('Add Task', `
            <form id="task-form">
                <div class="form-group">
                    <label for="task-title">Task Title *</label>
                    <input type="text" id="task-title" required>
                </div>
                <div class="form-group">
                    <label for="task-description">Description</label>
                    <textarea id="task-description" placeholder="Task details..."></textarea>
                </div>
                <div class="form-group">
                    <label for="task-artist">Artist</label>
                    <select id="task-artist">
                        <option value="">General Task</option>
                        ${this.data.artists.map(artist => 
                            `<option value="${artist.id}">${artist.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="task-due-date">Due Date *</label>
                    <input type="date" id="task-due-date" required>
                </div>
                <div class="form-group">
                    <label for="task-priority">Priority</label>
                    <select id="task-priority">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </form>
        `, [
            { text: 'Cancel', class: 'btn-secondary', action: 'close' },
            { text: 'Add Task', class: 'btn-primary', action: () => this.saveTask() }
        ]);
    }

    saveTask() {
        const task = {
            id: Date.now().toString(),
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            artistId: document.getElementById('task-artist').value,
            dueDate: document.getElementById('task-due-date').value,
            priority: document.getElementById('task-priority').value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        if (!task.title.trim()) {
            this.showNotification('Task title is required', 'error');
            return;
        }

        if (!task.dueDate) {
            this.showNotification('Due date is required', 'error');
            return;
        }

        this.data.tasks.push(task);
        this.saveData();
        this.closeModal();
        this.updateDashboard();
        this.showNotification('Task added successfully', 'success');
    }

    completeTask(id) {
        const task = this.data.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            task.completedAt = new Date().toISOString();
            this.saveData();
            this.renderUpcomingTasks();
            this.showNotification('Task completed!', 'success');
        }
    }

    // Modal Management
    showModal(title, content, actions = []) {
        const modalContainer = document.getElementById('modal-container');
        
        const actionsHtml = actions.map(action => 
            `<button class="${action.class}" onclick="${action.action === 'close' ? 'app.closeModal()' : 'app.executeModalAction(' + actions.indexOf(action) + ')'}">${action.text}</button>`
        ).join('');

        modalContainer.innerHTML = `
            <div class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close" onclick="app.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-content">
                        ${content}
                    </div>
                    <div class="modal-actions">
                        ${actionsHtml}
                    </div>
                </div>
            </div>
        `;

        // Store action functions for later execution
        this.modalActions = actions;
    }

    executeModalAction(index) {
        const action = this.modalActions[index];
        if (action && typeof action.action === 'function') {
            action.action();
        }
    }

    closeModal() {
        document.getElementById('modal-container').innerHTML = '';
        this.modalActions = [];
    }

    // Data Import/Export
    exportData() {
        try {
            const dataStr = JSON.stringify(this.data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `artist-management-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            this.showNotification('Data exported successfully', 'success');
        } catch (error) {
            console.error('Export error:', error);
            this.showNotification('Error exporting data', 'error');
        }
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    if (confirm('This will replace all current data. Are you sure?')) {
                        this.data = { ...this.data, ...importedData };
                        this.saveData();
                        this.updateDashboard();
                        this.updateSectionContent(document.querySelector('.nav-item.active').dataset.section);
                        this.showNotification('Data imported successfully', 'success');
                    }
                } catch (error) {
                    console.error('Import error:', error);
                    this.showNotification('Error importing data - invalid file format', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            if (confirm('This will permanently delete all artists, bookings, opportunities, and settings. Continue?')) {
                this.data = {
                    artists: [],
                    bookings: [],
                    opportunities: [],
                    crises: [],
                    settings: {
                        autoSave: true,
                        notifications: true,
                        theme: 'default'
                    }
                };
                
                localStorage.removeItem('artistManagementData');
                this.updateDashboard();
                this.updateSectionContent(document.querySelector('.nav-item.active').dataset.section);
                this.showNotification('All data cleared successfully', 'success');
            }
        }
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    z-index: 1001;
                    animation: slideIn 0.3s ease;
                }
                .notification-success { background: #27ae60; }
                .notification-error { background: #e74c3c; }
                .notification-info { background: #3498db; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the application
const app = new ArtistManagementHub();

// Make integrations available globally for onclick handlers
window.integrations = integrations;

// Global functions for HTML onclick handlers
window.addArtist = () => app.addArtist();
window.addTask = () => app.addTask();
window.completeTask = (id) => app.completeTask(id);
window.addBooking = () => app.addBooking();
window.addOpportunity = () => app.addOpportunity();
window.addCrisis = () => app.addCrisis();
window.exportData = () => app.exportData();
window.importData = () => app.importData();
window.clearAllData = () => app.clearAllData();