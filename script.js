// Artist Management Hub - Main Application Script

class ArtistManagementHub {
    constructor() {
        this.data = {
            artists: [],
            bookings: [],
            opportunities: [],
            crises: [],
            tasks: [],
            calendarEvents: [],
            expenses: [],
            settings: {
                autoSave: true,
                notifications: true,
                theme: 'default'
            }
        };
        
        this.currentCalendarDate = new Date();
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateDashboard();
        this.startAutoSave();
        this.handleOAuthCallbacks();
        this.initializeAdamSellouk();
    }

    initializeAdamSellouk() {
        // Check if Adam Sellouk already exists
        const adamExists = this.data.artists.find(artist => artist.name === 'Adam Sellouk');
        if (!adamExists) {
            // Add Adam Sellouk as an artist
            const adam = {
                id: Date.now().toString(),
                name: 'Adam Sellouk',
                genre: 'Electronic/House',
                status: 'established',
                monthlyRevenue: 35000,
                email: 'adam@adamsellouk.com',
                phone: '+1-555-0123',
                bio: 'Established electronic music artist focusing on house, techno, and melodic techno.',
                socialMedia: {
                    instagram: '@adamsellouk',
                    soundcloud: 'adamsellouk',
                    spotify: 'Adam Sellouk'
                },
                milestones: [
                    {
                        title: 'Ultra Europe 2026 Main Stage',
                        progress: 75,
                        description: 'Contract negotiations in progress'
                    }
                ],
                bookings: [],
                expenses: [],
                createdAt: new Date().toISOString()
            };
            
            this.data.artists.push(adam);
            
            // Add travel bookings and expenses
            this.addAdamTravelData(adam);
            this.saveData();
        }
    }

    addAdamTravelData(adam) {
        // September 2025 Travel Schedule
        const travelData = [
            {
                date: '2025-09-13',
                type: 'flight',
                route: 'TLV-ATH-SAW',
                confirmation: 'XXASFT / 16PU8S',
                flightNumbers: 'A 3929 / PC 1192',
                time: '05:00AM / 11:50AM',
                airline: 'Aegean / Pegasus',
                cost: 351.00,
                description: 'Flight to Istanbul via Athens'
            },
            {
                date: '2025-09-14',
                type: 'flight',
                route: 'IST-RMO-TLV',
                confirmation: 'G89DTG',
                flightNumbers: '5F 326 / 5F 509',
                time: '09:30AM / 17:30PM',
                airline: 'FlyOne',
                cost: 213.50,
                description: 'Return flight from Istanbul via Rome'
            },
            {
                date: '2025-09-19',
                type: 'flight',
                route: 'TLV-MXP',
                confirmation: '9A8CIE',
                flightNumbers: 'NO 4046',
                time: '04:55AM / 08:05AM',
                airline: 'Neos',
                cost: 356.22,
                description: 'Flight to Milan'
            },
            {
                date: '2025-09-19',
                type: 'flight',
                route: 'MXP-IBZ',
                confirmation: 'KB2HZZ4',
                flightNumbers: 'EJU 3739',
                time: '14:20PM / 16:15PM',
                airline: 'Easy Jet',
                cost: 254.26,
                seat: 'Window',
                description: 'Flight to Ibiza'
            },
            {
                date: '2025-09-19',
                type: 'show',
                time: '20:00-21:30',
                venue: 'Ibiza Show',
                description: 'Performance in Ibiza'
            }
        ];

        // Add bookings to Adam's profile
        travelData.forEach(item => {
            if (item.type === 'show') {
                const booking = {
                    id: Date.now().toString() + Math.random(),
                    artistId: adam.id,
                    artistName: adam.name,
                    venue: item.venue,
                    date: item.date,
                    time: item.time,
                    status: 'confirmed',
                    fee: 0, // Fee not specified in data
                    notes: item.description,
                    createdAt: new Date().toISOString()
                };
                
                this.data.bookings.push(booking);
                adam.bookings.push(booking.id);
            }
        });

        // Add expenses to Adam's profile and global expenses
        travelData.forEach(item => {
            if (item.cost) {
                const expense = {
                    id: Date.now().toString() + Math.random(),
                    artistId: adam.id,
                    artistName: adam.name,
                    date: item.date,
                    type: 'travel',
                    category: item.type,
                    description: `${item.route} - ${item.airline}`,
                    amount: item.cost,
                    confirmation: item.confirmation,
                    details: {
                        flightNumbers: item.flightNumbers,
                        time: item.time,
                        seat: item.seat || null
                    },
                    createdAt: new Date().toISOString()
                };
                
                this.data.expenses.push(expense);
                adam.expenses.push(expense.id);
            }
        });

        // Add calendar events
        travelData.forEach(item => {
            const calendarEvent = {
                id: Date.now().toString() + Math.random(),
                title: item.type === 'show' ? `${adam.name} - ${item.venue}` : `Flight: ${item.route}`,
                date: item.date,
                time: item.time,
                type: item.type === 'show' ? 'booking' : 'travel',
                artistId: adam.id,
                artistName: adam.name,
                description: item.description,
                details: {
                    confirmation: item.confirmation,
                    flightNumbers: item.flightNumbers,
                    airline: item.airline,
                    cost: item.cost,
                    seat: item.seat
                },
                createdAt: new Date().toISOString()
            };
            
            this.data.calendarEvents.push(calendarEvent);
        });
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
            case 'calendar':
                this.renderCalendar();
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

        container.innerHTML = this.data.artists.map(artist => {
            const artistBookings = this.data.bookings.filter(b => b.artistId === artist.id);
            const artistTasks = this.data.tasks.filter(t => t.artistId === artist.id && !t.completed);
            const artistOpportunities = this.data.opportunities.filter(o => o.artistId === artist.id);
            
            return `
                <div class="artist-card" onclick="app.showArtistDetail('${artist.id}')">
                <div class="artist-header">
                    <h3>${artist.name}</h3>
                    <div class="artist-actions">
                        <button onclick="event.stopPropagation(); app.editArtist('${artist.id}')" class="btn-outline">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="event.stopPropagation(); app.deleteArtist('${artist.id}')" class="btn-danger">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="artist-details">
                    <p><strong>Monthly Revenue:</strong> $${(artist.monthlyRevenue || 0).toLocaleString()}</p>
                </div>
                <div class="artist-stats">
                    <div class="artist-stat">
                        <div class="artist-stat-number">${artistBookings.length}</div>
                        <div class="artist-stat-label">Bookings</div>
                    </div>
                    <div class="artist-stat">
                        <div class="artist-stat-number">${artistTasks.length}</div>
                        <div class="artist-stat-label">Tasks</div>
                    </div>
                    <div class="artist-stat">
                        <div class="artist-stat-number">${artistOpportunities.length}</div>
                        <div class="artist-stat-label">Opportunities</div>
                    </div>
                </div>
                </div>
            `;
        }).join('');
    }

    showArtistDetail(artistId) {
        const artist = this.data.artists.find(a => a.id === artistId);
        if (!artist) return;

        const container = document.getElementById('artists-grid');
        container.innerHTML = `
            <div class="artist-detail-view">
                <div class="artist-detail-header">
                    <div class="artist-detail-title">
                        <button onclick="app.renderArtists()" class="btn-outline">
                            <i class="fas fa-arrow-left"></i>
                            Back to Artists
                        </button>
                        <h2>${artist.name}</h2>
                    </div>
                    <div class="artist-actions">
                        <button onclick="app.editArtist('${artist.id}')" class="btn-outline">
                            <i class="fas fa-edit"></i>
                            Edit Artist
                        </button>
                    </div>
                </div>

                <div class="artist-detail-tabs">
                    <button class="artist-tab active" onclick="app.showArtistTab('overview')">
                        <i class="fas fa-chart-line"></i>
                        Overview
                    </button>
                    <button class="artist-tab" onclick="app.showArtistTab('bookings')">
                        <i class="fas fa-calendar-alt"></i>
                        Bookings
                    </button>
                    <button class="artist-tab" onclick="app.showArtistTab('tasks')">
                        <i class="fas fa-tasks"></i>
                        Tasks
                    </button>
                    <button class="artist-tab" onclick="app.showArtistTab('opportunities')">
                        <i class="fas fa-lightbulb"></i>
                        Opportunities
                    </button>
                </div>

                <div id="artist-tab-overview" class="artist-tab-content active">
                    ${this.renderArtistOverview(artist)}
                </div>
                <div id="artist-tab-bookings" class="artist-tab-content">
                    ${this.renderArtistBookings(artist)}
                </div>
                <div id="artist-tab-tasks" class="artist-tab-content">
                    ${this.renderArtistTasks(artist)}
                </div>
                <div id="artist-tab-opportunities" class="artist-tab-content">
                    ${this.renderArtistOpportunities(artist)}
                </div>
            </div>
        `;
    }

    showArtistTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.artist-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[onclick="app.showArtistTab('${tabName}')"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.artist-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`artist-tab-${tabName}`).classList.add('active');
    }

    renderArtistOverview(artist) {
        const artistBookings = this.data.bookings.filter(b => b.artistId === artist.id);
        const artistTasks = this.data.tasks.filter(t => t.artistId === artist.id);
        const artistOpportunities = this.data.opportunities.filter(o => o.artistId === artist.id);
        const completedTasks = artistTasks.filter(t => t.completed);
        const pendingTasks = artistTasks.filter(t => !t.completed);

        return `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Total Bookings</h3>
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-number">${artistBookings.length}</div>
                        <div class="stat-label">All Time</div>
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Active Tasks</h3>
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-number">${pendingTasks.length}</div>
                        <div class="stat-label">Pending</div>
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Opportunities</h3>
                        <i class="fas fa-lightbulb"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-number">${artistOpportunities.length}</div>
                        <div class="stat-label">Open</div>
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Monthly Revenue</h3>
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="card-content">
                        <div class="stat-number">$${(artist.monthlyRevenue || 0).toLocaleString()}</div>
                        <div class="stat-label">Current</div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 2rem;">
                <h3>Artist Details</h3>
                <div style="background: rgba(102, 126, 234, 0.05); padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
                    <p><strong>Genre:</strong> ${artist.genre || 'Not specified'}</p>
                    <p><strong>Created:</strong> ${new Date(artist.createdAt).toLocaleDateString()}</p>
                    ${artist.notes ? `<p><strong>Notes:</strong> ${artist.notes}</p>` : ''}
                </div>
            </div>
        `;
    }

    renderArtistBookings(artist) {
        const artistBookings = this.data.bookings.filter(b => b.artistId === artist.id);
        
        if (artistBookings.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>No bookings for ${artist.name} yet</p>
                    <button class="btn-secondary" onclick="addBooking('${artist.id}')">Add First Booking</button>
                </div>
            `;
        }

        return `
            <div class="artist-items-list">
                ${artistBookings.map(booking => `
                    <div class="artist-item">
                        <h4>${booking.title}</h4>
                        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
                        <p><strong>Venue:</strong> ${booking.venue}</p>
                        <p><strong>Fee:</strong> $${booking.fee?.toLocaleString() || 'TBD'}</p>
                        <p><strong>Status:</strong> ${booking.status}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderArtistTasks(artist) {
        const artistTasks = this.data.tasks.filter(t => t.artistId === artist.id);
        
        if (artistTasks.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>No tasks for ${artist.name} yet</p>
                    <button class="btn-secondary" onclick="addTask('${artist.id}')">Add First Task</button>
                </div>
            `;
        }

        const pendingTasks = artistTasks.filter(t => !t.completed);
        const completedTasks = artistTasks.filter(t => t.completed);

        return `
            <div style="margin-bottom: 2rem;">
                <h4>Pending Tasks (${pendingTasks.length})</h4>
                <div class="artist-items-list">
                    ${pendingTasks.length === 0 ? '<p style="color: #666; font-style: italic;">No pending tasks</p>' : 
                        pendingTasks.map(task => `
                            <div class="artist-item priority-${task.priority}">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <h4>${task.title}</h4>
                                        ${task.description ? `<p>${task.description}</p>` : ''}
                                        <p><strong>Due:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
                                        <p><strong>Priority:</strong> ${task.priority}</p>
                                    </div>
                                    <button onclick="completeTask('${task.id}')" class="task-complete">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
            ${completedTasks.length > 0 ? `
                <div>
                    <h4>Completed Tasks (${completedTasks.length})</h4>
                    <div class="artist-items-list">
                        ${completedTasks.map(task => `
                            <div class="artist-item" style="opacity: 0.6;">
                                <h4>${task.title} <i class="fas fa-check-circle" style="color: #27ae60;"></i></h4>
                                ${task.description ? `<p>${task.description}</p>` : ''}
                                <p><strong>Completed:</strong> ${new Date(task.completedAt).toLocaleDateString()}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    renderArtistOpportunities(artist) {
        const artistOpportunities = this.data.opportunities.filter(o => o.artistId === artist.id);
        
        if (artistOpportunities.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-lightbulb"></i>
                    <p>No opportunities for ${artist.name} yet</p>
                    <button class="btn-secondary" onclick="addOpportunity('${artist.id}')">Add First Opportunity</button>
                </div>
            `;
        }

        return `
            <div class="artist-items-list">
                ${artistOpportunities.map(opportunity => `
                    <div class="artist-item">
                        <h4>${opportunity.title}</h4>
                        <p>${opportunity.description}</p>
                        <p><strong>Type:</strong> ${opportunity.type}</p>
                        <p><strong>Status:</strong> ${opportunity.status}</p>
                        <p><strong>Deadline:</strong> ${new Date(opportunity.deadline).toLocaleDateString()}</p>
                    </div>
                `).join('')}
            </div>
        `;
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

    editArtist(id) {
        const artist = this.data.artists.find(a => a.id === id);
        if (!artist) return;

        this.showModal('Edit Artist', `
            <form id="artist-form">
                <div class="form-group">
                    <label for="artist-name">Artist Name *</label>
                    <input type="text" id="artist-name" value="${artist.name}" required>
                </div>
                <div class="form-group">
                    <label for="artist-genre">Genre</label>
                    <select id="artist-genre">
                        <option value="">Select Genre</option>
                        <option value="House" ${artist.genre === 'House' ? 'selected' : ''}>House</option>
                        <option value="Techno" ${artist.genre === 'Techno' ? 'selected' : ''}>Techno</option>
                        <option value="Tech House" ${artist.genre === 'Tech House' ? 'selected' : ''}>Tech House</option>
                        <option value="Melodic Techno" ${artist.genre === 'Melodic Techno' ? 'selected' : ''}>Melodic Techno</option>
                        <option value="Groovy House" ${artist.genre === 'Groovy House' ? 'selected' : ''}>Groovy House</option>
                        <option value="Funk" ${artist.genre === 'Funk' ? 'selected' : ''}>Funk</option>
                        <option value="Other" ${artist.genre === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="artist-status">Status</label>
                    <select id="artist-status">
                        <option value="Developing" ${artist.status === 'Developing' ? 'selected' : ''}>Developing</option>
                        <option value="Established" ${artist.status === 'Established' ? 'selected' : ''}>Established</option>
                        <option value="Inactive" ${artist.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="artist-revenue">Monthly Revenue ($)</label>
                    <input type="number" id="artist-revenue" value="${artist.monthlyRevenue || 0}" min="0" step="100">
                </div>
                <div class="form-group">
                    <label for="artist-notes">Notes</label>
                    <textarea id="artist-notes" placeholder="Additional notes about this artist...">${artist.notes || ''}</textarea>
                </div>
            </form>
        `, [
            { text: 'Cancel', class: 'btn-secondary', action: 'close' },
            { text: 'Update Artist', class: 'btn-primary', action: () => this.saveArtist(id) }
        ]);
    }

    saveArtist(editId = null) {
        const form = document.getElementById('artist-form');
        const formData = new FormData(form);
        
        const artist = {
            id: editId || Date.now().toString(),
            name: document.getElementById('artist-name').value,
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

    // Calendar Management
    renderCalendar() {
        this.updateCalendarView();
        this.renderUpcomingCalendarEvents();
    }

    updateCalendarView() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        const monthYearElement = document.getElementById('calendar-month-year');
        const calendarGrid = document.getElementById('calendar-grid');
        
        if (!monthYearElement || !calendarGrid) return;
        
        const year = this.currentCalendarDate.getFullYear();
        const month = this.currentCalendarDate.getMonth();
        
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Get events for this month
        const monthEvents = this.getEventsForMonth(year, month);
        
        let calendarHTML = '';
        
        // Add day headers
        dayNames.forEach(day => {
            calendarHTML += `<div class="calendar-day-header">${day}</div>`;
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1).getDate();
            calendarHTML += `<div class="calendar-day other-month">
                <div class="calendar-day-number">${prevMonthDay}</div>
            </div>`;
        }
        
        // Add days of current month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const isToday = currentDate.toDateString() === today.toDateString();
            const dayEvents = monthEvents.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate.getDate() === day;
            });
            
            calendarHTML += `<div class="calendar-day ${isToday ? 'today' : ''}" onclick="app.selectCalendarDay(${year}, ${month}, ${day})">
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-day-events">
                    ${dayEvents.slice(0, 3).map(event => 
                        `<div class="calendar-event ${event.type}" title="${event.title}">${event.title}</div>`
                    ).join('')}
                    ${dayEvents.length > 3 ? `<div class="calendar-event">+${dayEvents.length - 3} more</div>` : ''}
                </div>
            </div>`;
        }
        
        // Add empty cells for days after month ends
        const totalCells = calendarGrid.children.length;
        const remainingCells = 42 - (startingDayOfWeek + daysInMonth); // 6 rows * 7 days = 42
        for (let i = 1; i <= remainingCells && (startingDayOfWeek + daysInMonth + i - 1) < 42; i++) {
            calendarHTML += `<div class="calendar-day other-month">
                <div class="calendar-day-number">${i}</div>
            </div>`;
        }
        
        calendarGrid.innerHTML = calendarHTML;
    }

    getEventsForMonth(year, month) {
        const events = [];
        
        // Add calendar events
        if (this.data.calendarEvents) {
            events.push(...this.data.calendarEvents.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate.getFullYear() === year && eventDate.getMonth() === month;
            }));
        }
        
        // Add tasks as events
        events.push(...this.data.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.getFullYear() === year && taskDate.getMonth() === month;
        }).map(task => ({
            id: task.id,
            title: task.title,
            start: task.dueDate,
            type: 'task',
            source: 'internal'
        })));
        
        // Add bookings as events
        events.push(...this.data.bookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate.getFullYear() === year && bookingDate.getMonth() === month;
        }).map(booking => ({
            id: booking.id,
            title: booking.title,
            start: booking.date,
            type: 'booking',
            source: 'internal'
        })));
        
        // Add opportunities as events
        events.push(...this.data.opportunities.filter(opportunity => {
            const oppDate = new Date(opportunity.deadline);
            return oppDate.getFullYear() === year && oppDate.getMonth() === month;
        }).map(opportunity => ({
            id: opportunity.id,
            title: opportunity.title,
            start: opportunity.deadline,
            type: 'opportunity',
            source: 'internal'
        })));
        
        return events.sort((a, b) => new Date(a.start) - new Date(b.start));
    }

    renderUpcomingCalendarEvents() {
        const container = document.getElementById('upcoming-events');
        if (!container) return;
        
        const now = new Date();
        const twoWeeksFromNow = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000));
        
        const upcomingEvents = [];
        
        // Add calendar events
        if (this.data.calendarEvents) {
            upcomingEvents.push(...this.data.calendarEvents.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate >= now && eventDate <= twoWeeksFromNow;
            }));
        }
        
        // Add tasks
        upcomingEvents.push(...this.data.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return !task.completed && taskDate >= now && taskDate <= twoWeeksFromNow;
        }).map(task => ({
            ...task,
            start: task.dueDate,
            type: 'task'
        })));
        
        // Add bookings
        upcomingEvents.push(...this.data.bookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= now && bookingDate <= twoWeeksFromNow;
        }).map(booking => ({
            ...booking,
            start: booking.date,
            type: 'booking'
        })));
        
        // Add opportunities
        upcomingEvents.push(...this.data.opportunities.filter(opportunity => {
            const oppDate = new Date(opportunity.deadline);
            return oppDate >= now && oppDate <= twoWeeksFromNow;
        }).map(opportunity => ({
            ...opportunity,
            start: opportunity.deadline,
            type: 'opportunity'
        })));
        
        // Sort by date
        upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
        
        if (upcomingEvents.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-check"></i>
                    <p>No upcoming events</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = upcomingEvents.map(event => {
            const eventDate = new Date(event.start);
            const artist = event.artistId ? this.data.artists.find(a => a.id === event.artistId) : null;
            
            return `
                <div class="event-item ${event.type}">
                    <div class="event-content">
                        <div class="event-title">${event.title}</div>
                        <div class="event-details">
                            <div class="event-time">
                                <i class="fas fa-clock"></i>
                                ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div class="event-type">
                                <i class="fas fa-${event.type === 'task' ? 'tasks' : event.type === 'booking' ? 'calendar-alt' : event.type === 'opportunity' ? 'lightbulb' : 'calendar'}"></i>
                                ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </div>
                            ${artist ? `<span>${artist.name}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    previousMonth() {
        this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
        this.updateCalendarView();
    }

    nextMonth() {
        this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
        this.updateCalendarView();
    }

    selectCalendarDay(year, month, day) {
        const selectedDate = new Date(year, month, day);
        this.showNotification(`Selected ${selectedDate.toLocaleDateString()}`, 'info');
        // You could add functionality here to show events for that day or create new events
    }

    addCalendarEvent() {
        this.showModal('Add Calendar Event', `
            <form id="calendar-event-form">
                <div class="form-group">
                    <label for="event-title">Event Title *</label>
                    <input type="text" id="event-title" required>
                </div>
                <div class="form-group">
                    <label for="event-description">Description</label>
                    <textarea id="event-description" placeholder="Event details..."></textarea>
                </div>
                <div class="form-group">
                    <label for="event-start-date">Start Date *</label>
                    <input type="datetime-local" id="event-start-date" required>
                </div>
                <div class="form-group">
                    <label for="event-end-date">End Date</label>
                    <input type="datetime-local" id="event-end-date">
                </div>
                <div class="form-group">
                    <label for="event-artist">Related Artist</label>
                    <select id="event-artist">
                        <option value="">No specific artist</option>
                        ${this.data.artists.map(artist => 
                            `<option value="${artist.id}">${artist.name}</option>`
                        ).join('')}
                    </select>
                </div>
            </form>
        `, [
            { text: 'Cancel', class: 'btn-secondary', action: 'close' },
            { text: 'Add Event', class: 'btn-primary', action: () => this.saveCalendarEvent() }
        ]);
    }

    saveCalendarEvent() {
        const event = {
            id: Date.now().toString(),
            title: document.getElementById('event-title').value,
            description: document.getElementById('event-description').value,
            start: document.getElementById('event-start-date').value,
            end: document.getElementById('event-end-date').value,
            artistId: document.getElementById('event-artist').value,
            type: 'calendar',
            source: 'internal',
            createdAt: new Date().toISOString()
        };

        if (!event.title.trim()) {
            this.showNotification('Event title is required', 'error');
            return;
        }

        if (!event.start) {
            this.showNotification('Start date is required', 'error');
            return;
        }

        if (!this.data.calendarEvents) {
            this.data.calendarEvents = [];
        }

        this.data.calendarEvents.push(event);
        
        // If Google Calendar is connected, try to sync
        if (typeof integrations !== 'undefined' && integrations.integrations.googleCalendar.connected) {
            integrations.createCalendarEvent(event).then(() => {
                this.showNotification('Event added and synced with Google Calendar', 'success');
            }).catch(() => {
                this.showNotification('Event added locally (sync failed)', 'info');
            });
        }
        
        this.saveData();
        this.closeModal();
        this.renderCalendar();
        this.showNotification('Calendar event added successfully', 'success');
    }

    async syncCalendar() {
        const syncButton = document.getElementById('sync-calendar-btn');
        if (!syncButton) return;
        
        if (typeof integrations === 'undefined' || !integrations.integrations.googleCalendar.connected) {
            this.showNotification('Please connect Google Calendar first in Settings', 'error');
            return;
        }
        
        syncButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
        syncButton.disabled = true;
        
        try {
            const result = await integrations.getCalendarEvents();
            if (result.success) {
                // Merge Google Calendar events with local events
                const googleEvents = result.events.filter(event => 
                    !this.data.calendarEvents.some(localEvent => localEvent.id === event.id)
                );
                
                if (!this.data.calendarEvents) {
                    this.data.calendarEvents = [];
                }
                
                this.data.calendarEvents.push(...googleEvents);
                this.saveData();
                this.renderCalendar();
                this.showNotification(`Synced ${googleEvents.length} events from Google Calendar`, 'success');
            }
        } catch (error) {
            this.showNotification('Failed to sync with Google Calendar', 'error');
        } finally {
            syncButton.innerHTML = '<i class="fas fa-sync"></i> Sync Calendar';
            syncButton.disabled = false;
        }
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
                    tasks: [],
                    calendarEvents: [],
                    expenses: [],
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
window.addCalendarEvent = () => app.addCalendarEvent();
window.exportData = () => app.exportData();
window.importData = () => app.importData();
window.clearAllData = () => app.clearAllData();