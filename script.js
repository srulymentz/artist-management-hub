// Artist Management Hub - Main Application
class ArtistManagementApp {
    constructor() {
        console.log('App starting...');
        this.data = {
            artists: [
                {
                    id: 'adam-sellouk',
                    name: 'Adam Sellouk',
                    genre: 'Electronic, House, Techno',
                    status: 'established',
                    email: 'adam@adamsellouk.com',
                    phone: '+1-555-0123',
                    monthlyRevenue: 35000,
                    milestone: 'Ultra Europe 2026 main stage',
                    progress: 75,
                    nextGoals: 'Major festival circuit expansion',
                    socialMedia: {
                        instagram: '@adamsellouk',
                        soundcloud: 'adamsellouk',
                        spotify: 'Adam Sellouk'
                    }
                }
            ],
            bookings: [
                {
                    id: 'booking1',
                    artistId: 'adam-sellouk',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight TLV-ATH-SAW',
                    date: '2025-09-13',
                    time: '05:00',
                    fee: 351,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'Aegean/Pegasus - Confirmation: XXASFT/16PU8S'
                },
                {
                    id: 'booking2',
                    artistId: 'adam-sellouk',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight IST-RMO-TLV',
                    date: '2025-09-14',
                    time: '09:30',
                    fee: 213,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'FlyOne - Confirmation: G89DTG'
                },
                {
                    id: 'booking3',
                    artistId: 'adam-sellouk',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight TLV-MXP',
                    date: '2025-09-19',
                    time: '04:55',
                    fee: 356,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'Neos - Confirmation: 9A8CIE'
                },
                {
                    id: 'booking4',
                    artistId: 'adam-sellouk',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight MXP-IBZ',
                    date: '2025-09-19',
                    time: '14:20',
                    fee: 254,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'Easy Jet - Confirmation: KB2HZZ4'
                },
                {
                    id: 'booking5',
                    artistId: 'adam-sellouk',
                    artistName: 'Adam Sellouk',
                    venue: 'Ibiza Show',
                    date: '2025-09-19',
                    time: '20:00',
                    fee: 5000,
                    status: 'confirmed',
                    type: 'performance',
                    details: 'Performance: 20:00-21:30'
                }
            ],
            opportunities: [],
            crises: [],
            tasks: [],
            calendarEvents: []
        };
        
        console.log('Initial bookings:', this.data.bookings);
        this.currentSection = 'dashboard';
        this.currentDate = new Date();
        
        this.loadData();
        this.initializeApp();
    }

    initializeApp() {
        this.setupNavigation();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderArtists();
        this.renderBookings();
        this.renderCalendar();
        
        // Handle OAuth callbacks
        if (window.integrations) {
            window.integrations.handleOAuthCallback();
        }
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });
    }

    setupEventListeners() {
        // Auto-save data every 30 seconds
        setInterval(() => {
            this.saveData();
        }, 30000);

        // Handle window beforeunload
        window.addEventListener('beforeunload', () => {
            this.saveData();
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

        this.currentSection = sectionName;

        // Render section-specific content
        switch (sectionName) {
            case 'dashboard':
                this.renderDashboard();
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
                this.renderCrisis();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    renderDashboard() {
        // Update stats
        document.getElementById('artist-count').textContent = this.data.artists.length;
        document.getElementById('booking-count').textContent = this.data.bookings.filter(b => b.status === 'pending').length;
        document.getElementById('opportunity-count').textContent = this.data.opportunities.length;
        
        // Calculate total revenue
        const totalRevenue = this.data.artists.reduce((sum, artist) => sum + (artist.monthlyRevenue || 0), 0);
        document.getElementById('revenue-total').textContent = `$${totalRevenue.toLocaleString()}`;

        this.renderUpcomingTasks();
        this.renderRecentActivity();
    }

    renderUpcomingTasks() {
        const container = document.getElementById('upcoming-tasks');
        
        if (this.data.tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>No upcoming tasks</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.tasks.map(task => `
            <div class="task-item priority-${task.priority}">
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-details">
                        <div class="task-due">
                            <i class="fas fa-clock"></i>
                            ${new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div class="task-artist">
                            <i class="fas fa-user"></i>
                            ${task.artistName || 'General'}
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-complete" onclick="app.completeTask('${task.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderRecentActivity() {
        const container = document.getElementById('recent-activity');
        
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No recent activity</p>
            </div>
        `;
    }

    renderArtists() {
        const container = document.getElementById('artists-grid');
        
        if (this.data.artists.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-plus"></i>
                    <p>No artists added yet</p>
                    <button class="btn-secondary" onclick="addArtist()">Add Your First Artist</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.artists.map(artist => `
            <div class="artist-card" onclick="app.viewArtist('${artist.id}')">
                <div class="artist-header">
                    <h3>${artist.name}</h3>
                    <div class="artist-actions">
                        <button class="btn-outline" onclick="event.stopPropagation(); app.editArtist('${artist.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-danger" onclick="event.stopPropagation(); app.deleteArtist('${artist.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="artist-details">
                    <p><strong>Genre:</strong> ${artist.genre}</p>
                    <p><strong>Status:</strong> <span class="artist-status ${artist.status}">${artist.status}</span></p>
                    <p><strong>Email:</strong> ${artist.email}</p>
                    <p><strong>Phone:</strong> ${artist.phone}</p>
                </div>
                <div class="artist-stats">
                    <div class="artist-stat">
                        <div class="artist-stat-number">${this.data.bookings.filter(b => b.artistId === artist.id).length}</div>
                        <div class="artist-stat-label">Bookings</div>
                    </div>
                    <div class="artist-stat">
                        <div class="artist-stat-number">${this.data.opportunities.filter(o => o.artistId === artist.id).length}</div>
                        <div class="artist-stat-label">Opportunities</div>
                    </div>
                    <div class="artist-stat">
                        <div class="artist-stat-number">$${(artist.monthlyRevenue || 0).toLocaleString()}</div>
                        <div class="artist-stat-label">Monthly</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderBookings() {
        const container = document.getElementById('bookings-list');
        
        if (!container) {
            console.error('ERROR: bookings-list container not found!');
            return;
        }
        
        console.log('Rendering bookings:', this.data.bookings.length, 'bookings found');
        
        if (this.data.bookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>No booking offers yet</p>
                    <button class="btn-secondary" onclick="addBooking()">Add Your First Booking</button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="bookings-table">
                <div class="bookings-header">
                    <div class="booking-col">Artist</div>
                    <div class="booking-col">Venue/Event</div>
                    <div class="booking-col">Date</div>
                    <div class="booking-col">Time</div>
                    <div class="booking-col">Fee</div>
                    <div class="booking-col">Status</div>
                    <div class="booking-col">Type</div>
                    <div class="booking-col">Actions</div>
                </div>
                ${this.data.bookings.map(booking => `
                    <div class="booking-row">
                        <div class="booking-col">${booking.artistName}</div>
                        <div class="booking-col">${booking.venue}</div>
                        <div class="booking-col">${new Date(booking.date).toLocaleDateString()}</div>
                        <div class="booking-col">${booking.time}</div>
                        <div class="booking-col">$${booking.fee.toLocaleString()}</div>
                        <div class="booking-col">
                            <span class="status-badge ${booking.status}">${booking.status}</span>
                        </div>
                        <div class="booking-col">
                            <span class="type-badge ${booking.type}">${booking.type}</span>
                        </div>
                        <div class="booking-col">
                            <button class="btn-outline btn-sm" onclick="app.editBooking('${booking.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-danger btn-sm" onclick="app.deleteBooking('${booking.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="booking-details">
                        <small>${booking.details}</small>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderOpportunities() {
        const container = document.getElementById('opportunities-list');
        
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-lightbulb"></i>
                <p>No opportunities tracked yet</p>
                <button class="btn-secondary" onclick="addOpportunity()">Add Your First Opportunity</button>
            </div>
        `;
    }

    renderCrisis() {
        const container = document.getElementById('crisis-list');
        
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shield-alt"></i>
                <p>No active crises</p>
                <small>Hopefully it stays that way!</small>
            </div>
        `;
    }

    renderCalendar() {
        const monthYear = document.getElementById('calendar-month-year');
        const calendarGrid = document.getElementById('calendar-grid');
        
        if (!monthYear || !calendarGrid) return;

        // Make sure bookings are synced to calendar
        this.syncBookingsToCalendar();

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Create calendar grid
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        let calendarHTML = '';
        
        // Day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            calendarHTML += `<div class="calendar-day-header">${day}</div>`;
        });

        // Calendar days
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.toDateString() === new Date().toDateString();
            
            const dayEvents = this.data.calendarEvents.filter(event => 
                new Date(event.date).toDateString() === currentDate.toDateString()
            );

            calendarHTML += `
                <div class="calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}" 
                     onclick="app.addCalendarEvent('${currentDate.toISOString().split('T')[0]}')">
                    <div class="calendar-day-number">${currentDate.getDate()}</div>
                    <div class="calendar-day-events">
                        ${dayEvents.map(event => `
                            <div class="calendar-event ${event.type}" title="${event.title} - ${event.time || ''} ${event.fee ? '$' + event.fee : ''}">
                                ${event.title} ${event.time ? event.time : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        calendarGrid.innerHTML = calendarHTML;
        this.renderUpcomingEvents();
    }

    renderUpcomingEvents() {
        const container = document.getElementById('upcoming-events');
        if (!container) return;

        const upcomingEvents = this.data.calendarEvents
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 10);

        if (upcomingEvents.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar"></i>
                    <p>No upcoming events</p>
                </div>
            `;
            return;
        }

        container.innerHTML = upcomingEvents.map(event => `
            <div class="event-item ${event.type}">
                <div class="event-content">
                    <div class="event-title">${event.title}</div>
                    <div class="event-details">
                        <div class="event-time">
                            <i class="fas fa-clock"></i>
                            ${new Date(event.date).toLocaleDateString()} ${event.time || ''}
                        </div>
                        <div class="event-type">
                            <i class="fas fa-tag"></i>
                            ${event.type} ${event.fee ? '- $' + event.fee.toLocaleString() : ''}
                        </div>
                        ${event.details ? `<div class="event-details-text"><i class="fas fa-info-circle"></i> ${event.details}</div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderSettings() {
        if (window.integrations) {
            window.integrations.renderIntegrations();
        }
    }

    // Navigation methods
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    addCalendarEvent(date) {
        console.log('Add calendar event for date:', date);
        // TODO: Implement calendar event creation
    }

    // Data management
    loadData() {
        try {
            const saved = localStorage.getItem('artistManagementData');
            if (saved) {
                const savedData = JSON.parse(saved);
                // Merge with default data, but always keep our bookings
                this.data = { 
                    ...this.data, 
                    ...savedData,
                    // Force our bookings to always be there
                    bookings: this.data.bookings
                };
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        
        // Ensure we always have our booking data
        if (!this.data.bookings || this.data.bookings.length === 0) {
            this.data.bookings = [
                {
                    id: 'booking1',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight TLV-ATH-SAW',
                    date: '2025-09-13',
                    time: '05:00',
                    fee: 351,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'Aegean/Pegasus - Confirmation: XXASFT/16PU8S'
                },
                {
                    id: 'booking2',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight IST-RMO-TLV',
                    date: '2025-09-14',
                    time: '09:30',
                    fee: 213,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'FlyOne - Confirmation: G89DTG'
                },
                {
                    id: 'booking3',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight TLV-MXP',
                    date: '2025-09-19',
                    time: '04:55',
                    fee: 356,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'Neos - Confirmation: 9A8CIE'
                },
                {
                    id: 'booking4',
                    artistName: 'Adam Sellouk',
                    venue: 'Flight MXP-IBZ',
                    date: '2025-09-19',
                    time: '14:20',
                    fee: 254,
                    status: 'confirmed',
                    type: 'travel',
                    details: 'Easy Jet - Confirmation: KB2HZZ4'
                },
                {
                    id: 'booking5',
                    artistName: 'Adam Sellouk',
                    venue: 'Ibiza Show',
                    date: '2025-09-19',
                    time: '20:00',
                    fee: 5000,
                    status: 'confirmed',
                    type: 'performance',
                    details: 'Performance: 20:00-21:30'
                }
            ];
        }
        
        // Automatically sync bookings to calendar events
        this.syncBookingsToCalendar();
    }

    syncBookingsToCalendar() {
        // Clear existing booking-based calendar events
        this.data.calendarEvents = this.data.calendarEvents.filter(event => event.source !== 'booking');
        
        // Convert confirmed bookings to calendar events
        this.data.bookings.forEach(booking => {
            if (booking.status === 'confirmed') {
                const calendarEvent = {
                    id: `cal-${booking.id}`,
                    title: `${booking.artistName} - ${booking.venue}`,
                    date: booking.date,
                    time: booking.time,
                    type: booking.type === 'performance' ? 'booking' : 'task',
                    source: 'booking',
                    details: booking.details,
                    fee: booking.fee,
                    artist: booking.artistName
                };
                this.data.calendarEvents.push(calendarEvent);
            }
        });
        
        console.log('Synced bookings to calendar:', this.data.calendarEvents.length, 'events');
    }

    saveData() {
        try {
            localStorage.setItem('artistManagementData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Utility methods
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function addArtist() {
    console.log('Add artist clicked');
}

function addBooking() {
    console.log('Add booking clicked');
}

function addOpportunity() {
    console.log('Add opportunity clicked');
}

function addCrisis() {
    console.log('Add crisis clicked');
}

function addTask() {
    console.log('Add task clicked');
}

function exportData() {
    if (window.app) {
        const dataStr = JSON.stringify(window.app.data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'artist-management-data.json';
        link.click();
        URL.revokeObjectURL(url);
    }
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (window.app) {
                        window.app.data = data;
                        window.app.saveData();
                        window.app.renderDashboard();
                        window.app.renderArtists();
                        window.app.renderBookings();
                        window.app.renderCalendar();
                        window.app.showNotification('Data imported successfully!', 'success');
                    }
                } catch (error) {
                    console.error('Error importing data:', error);
                    if (window.app) {
                        window.app.showNotification('Error importing data', 'error');
                    }
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.removeItem('artistManagementData');
        location.reload();
    }
}

// Initialize the app
window.app = new ArtistManagementApp();