// Artist Management Hub - Main Application
class ArtistManagementApp {
    constructor() {
        console.log('App starting...');
        
        // Initialize with clean, working data
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
        
        // Initialize with Adam Sellouk and his bookings
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
        
        this.currentSection = 'dashboard';
        this.currentDate = new Date();
        
        // Don't load from localStorage - use fresh data
        this.syncBookingsToCalendar();
        this.initializeApp();
    }

    initializeApp() {
        this.setupNavigation();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderArtists();
        this.renderBookings();
        this.renderCalendar();
        
        // Handle OAuth callbacks and ensure integrations are ready
        if (window.integrations) {
            window.integrations.handleOAuthCallback();
        }
        
        // Ensure integrations are available globally
        window.integrations = integrations;
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
        document.getElementById('booking-count').textContent = this.data.bookings.filter(b => b.status === 'confirmed' && b.type === 'performance').length;
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

    // Task Management
    addTask() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Add New Task</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.saveTask(event)">
                        <div class="form-group">
                            <label for="task-title">Task Title</label>
                            <input type="text" id="task-title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="task-artist">Artist</label>
                            <select id="task-artist" name="artistId">
                                <option value="">General Task</option>
                                ${this.data.artists.map(artist => `
                                    <option value="${artist.id}">${artist.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="task-due">Due Date</label>
                            <input type="date" id="task-due" name="dueDate" required>
                        </div>
                        <div class="form-group">
                            <label for="task-priority">Priority</label>
                            <select id="task-priority" name="priority" required>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="task-description">Description</label>
                            <textarea id="task-description" name="description"></textarea>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-primary">Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    saveTask(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const task = {
            id: Date.now().toString(),
            title: formData.get('title'),
            artistId: formData.get('artistId'),
            artistName: formData.get('artistId') ? this.data.artists.find(a => a.id === formData.get('artistId'))?.name : 'General',
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            description: formData.get('description'),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.data.tasks.push(task);
        this.saveData();
        this.renderUpcomingTasks();
        event.target.closest('.modal-overlay').remove();
        this.showNotification('Task added successfully!', 'success');
    }

    completeTask(taskId) {
        const taskIndex = this.data.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            this.data.tasks.splice(taskIndex, 1);
            this.saveData();
            this.renderUpcomingTasks();
            this.showNotification('Task completed!', 'success');
        }
    }

    // Artist Management
    addArtist() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Add New Artist</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.saveArtist(event)">
                        <div class="form-group">
                            <label for="artist-name">Artist Name</label>
                            <input type="text" id="artist-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="artist-genre">Genre</label>
                            <input type="text" id="artist-genre" name="genre" placeholder="e.g., House, Techno, Electronic">
                        </div>
                        <div class="form-group">
                            <label for="artist-email">Email</label>
                            <input type="email" id="artist-email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="artist-phone">Phone</label>
                            <input type="tel" id="artist-phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="artist-status">Status</label>
                            <select id="artist-status" name="status" required>
                                <option value="developing">Developing</option>
                                <option value="established">Established</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="artist-revenue">Monthly Revenue ($)</label>
                            <input type="number" id="artist-revenue" name="monthlyRevenue" min="0">
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-primary">Add Artist</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    saveArtist(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const artist = {
            id: Date.now().toString(),
            name: formData.get('name'),
            genre: formData.get('genre'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            status: formData.get('status'),
            monthlyRevenue: parseInt(formData.get('monthlyRevenue')) || 0,
            milestone: '',
            progress: 0,
            nextGoals: '',
            socialMedia: {}
        };
        
        this.data.artists.push(artist);
        this.saveData();
        this.renderArtists();
        this.renderDashboard();
        event.target.closest('.modal-overlay').remove();
        this.showNotification('Artist added successfully!', 'success');
    }

    editArtist(artistId) {
        const artist = this.data.artists.find(a => a.id === artistId);
        if (!artist) return;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Edit Artist</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.updateArtist(event, '${artistId}')">
                        <div class="form-group">
                            <label for="artist-name">Artist Name</label>
                            <input type="text" id="artist-name" name="name" value="${artist.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="artist-genre">Genre</label>
                            <input type="text" id="artist-genre" name="genre" value="${artist.genre}">
                        </div>
                        <div class="form-group">
                            <label for="artist-email">Email</label>
                            <input type="email" id="artist-email" name="email" value="${artist.email}" required>
                        </div>
                        <div class="form-group">
                            <label for="artist-phone">Phone</label>
                            <input type="tel" id="artist-phone" name="phone" value="${artist.phone}">
                        </div>
                        <div class="form-group">
                            <label for="artist-status">Status</label>
                            <select id="artist-status" name="status" required>
                                <option value="developing" ${artist.status === 'developing' ? 'selected' : ''}>Developing</option>
                                <option value="established" ${artist.status === 'established' ? 'selected' : ''}>Established</option>
                                <option value="inactive" ${artist.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="artist-revenue">Monthly Revenue ($)</label>
                            <input type="number" id="artist-revenue" name="monthlyRevenue" value="${artist.monthlyRevenue || 0}" min="0">
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-primary">Update Artist</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    updateArtist(event, artistId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const artistIndex = this.data.artists.findIndex(a => a.id === artistId);
        
        if (artistIndex !== -1) {
            this.data.artists[artistIndex] = {
                ...this.data.artists[artistIndex],
                name: formData.get('name'),
                genre: formData.get('genre'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                status: formData.get('status'),
                monthlyRevenue: parseInt(formData.get('monthlyRevenue')) || 0
            };
            
            this.saveData();
            this.renderArtists();
            this.renderDashboard();
            event.target.closest('.modal-overlay').remove();
            this.showNotification('Artist updated successfully!', 'success');
        }
    }

    deleteArtist(artistId) {
        if (confirm('Are you sure you want to delete this artist? This will also delete all their bookings and tasks.')) {
            this.data.artists = this.data.artists.filter(a => a.id !== artistId);
            this.data.bookings = this.data.bookings.filter(b => b.artistId !== artistId);
            this.data.tasks = this.data.tasks.filter(t => t.artistId !== artistId);
            this.data.opportunities = this.data.opportunities.filter(o => o.artistId !== artistId);
            
            this.saveData();
            this.renderArtists();
            this.renderDashboard();
            this.renderBookings();
            this.showNotification('Artist deleted successfully!', 'success');
        }
    }

    // Booking Management
    addBooking() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Add New Booking</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.saveBooking(event)">
                        <div class="form-group">
                            <label for="booking-artist">Artist</label>
                            <select id="booking-artist" name="artistId" required>
                                <option value="">Select Artist</option>
                                ${this.data.artists.map(artist => `
                                    <option value="${artist.id}">${artist.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-venue">Venue/Event</label>
                            <input type="text" id="booking-venue" name="venue" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-date">Date</label>
                            <input type="date" id="booking-date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-time">Time</label>
                            <input type="time" id="booking-time" name="time" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-fee">Fee ($)</label>
                            <input type="number" id="booking-fee" name="fee" min="0" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-status">Status</label>
                            <select id="booking-status" name="status" required>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-type">Type</label>
                            <select id="booking-type" name="type" required>
                                <option value="performance">Performance</option>
                                <option value="travel">Travel</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-details">Details</label>
                            <textarea id="booking-details" name="details"></textarea>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-primary">Add Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    saveBooking(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const artist = this.data.artists.find(a => a.id === formData.get('artistId'));
        
        const booking = {
            id: Date.now().toString(),
            artistId: formData.get('artistId'),
            artistName: artist ? artist.name : 'Unknown',
            venue: formData.get('venue'),
            date: formData.get('date'),
            time: formData.get('time'),
            fee: parseInt(formData.get('fee')),
            status: formData.get('status'),
            type: formData.get('type'),
            details: formData.get('details')
        };
        
        this.data.bookings.push(booking);
        this.syncBookingsToCalendar();
        this.saveData();
        this.renderBookings();
        this.renderDashboard();
        this.renderCalendar();
        event.target.closest('.modal-overlay').remove();
        this.showNotification('Booking added successfully!', 'success');
    }

    editBooking(bookingId) {
        const booking = this.data.bookings.find(b => b.id === bookingId);
        if (!booking) return;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Edit Booking</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.updateBooking(event, '${bookingId}')">
                        <div class="form-group">
                            <label for="booking-artist">Artist</label>
                            <select id="booking-artist" name="artistId" required>
                                ${this.data.artists.map(artist => `
                                    <option value="${artist.id}" ${artist.id === booking.artistId ? 'selected' : ''}>${artist.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-venue">Venue/Event</label>
                            <input type="text" id="booking-venue" name="venue" value="${booking.venue}" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-date">Date</label>
                            <input type="date" id="booking-date" name="date" value="${booking.date}" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-time">Time</label>
                            <input type="time" id="booking-time" name="time" value="${booking.time}" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-fee">Fee ($)</label>
                            <input type="number" id="booking-fee" name="fee" value="${booking.fee}" min="0" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-status">Status</label>
                            <select id="booking-status" name="status" required>
                                <option value="pending" ${booking.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="confirmed" ${booking.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                                <option value="cancelled" ${booking.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-type">Type</label>
                            <select id="booking-type" name="type" required>
                                <option value="performance" ${booking.type === 'performance' ? 'selected' : ''}>Performance</option>
                                <option value="travel" ${booking.type === 'travel' ? 'selected' : ''}>Travel</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-details">Details</label>
                            <textarea id="booking-details" name="details">${booking.details}</textarea>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-primary">Update Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    updateBooking(event, bookingId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const bookingIndex = this.data.bookings.findIndex(b => b.id === bookingId);
        const artist = this.data.artists.find(a => a.id === formData.get('artistId'));
        
        if (bookingIndex !== -1) {
            this.data.bookings[bookingIndex] = {
                ...this.data.bookings[bookingIndex],
                artistId: formData.get('artistId'),
                artistName: artist ? artist.name : 'Unknown',
                venue: formData.get('venue'),
                date: formData.get('date'),
                time: formData.get('time'),
                fee: parseInt(formData.get('fee')),
                status: formData.get('status'),
                type: formData.get('type'),
                details: formData.get('details')
            };
            
            this.syncBookingsToCalendar();
            this.saveData();
            this.renderBookings();
            this.renderDashboard();
            this.renderCalendar();
            event.target.closest('.modal-overlay').remove();
            this.showNotification('Booking updated successfully!', 'success');
        }
    }

    deleteBooking(bookingId) {
        if (confirm('Are you sure you want to delete this booking?')) {
            this.data.bookings = this.data.bookings.filter(b => b.id !== bookingId);
            this.syncBookingsToCalendar();
            this.saveData();
            this.renderBookings();
            this.renderDashboard();
            this.renderCalendar();
            this.showNotification('Booking deleted successfully!', 'success');
        }
    }

    // Opportunity Management
    addOpportunity() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Add New Opportunity</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.saveOpportunity(event)">
                        <div class="form-group">
                            <label for="opp-title">Opportunity Title</label>
                            <input type="text" id="opp-title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="opp-artist">Artist</label>
                            <select id="opp-artist" name="artistId">
                                <option value="">General Opportunity</option>
                                ${this.data.artists.map(artist => `
                                    <option value="${artist.id}">${artist.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="opp-type">Type</label>
                            <select id="opp-type" name="type" required>
                                <option value="brand-partnership">Brand Partnership</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="remix">Remix</option>
                                <option value="label">Label Deal</option>
                                <option value="festival">Festival</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="opp-description">Description</label>
                            <textarea id="opp-description" name="description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="opp-deadline">Deadline</label>
                            <input type="date" id="opp-deadline" name="deadline">
                        </div>
                        <div class="form-group">
                            <label for="opp-value">Potential Value ($)</label>
                            <input type="number" id="opp-value" name="value" min="0">
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-primary">Add Opportunity</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    saveOpportunity(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const artist = this.data.artists.find(a => a.id === formData.get('artistId'));
        
        const opportunity = {
            id: Date.now().toString(),
            title: formData.get('title'),
            artistId: formData.get('artistId'),
            artistName: artist ? artist.name : 'General',
            type: formData.get('type'),
            description: formData.get('description'),
            deadline: formData.get('deadline'),
            value: parseInt(formData.get('value')) || 0,
            status: 'open',
            createdAt: new Date().toISOString()
        };
        
        this.data.opportunities.push(opportunity);
        this.saveData();
        this.renderOpportunities();
        this.renderDashboard();
        event.target.closest('.modal-overlay').remove();
        this.showNotification('Opportunity added successfully!', 'success');
    }

    // Crisis Management
    addCrisis() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Report Crisis</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="app.saveCrisis(event)">
                        <div class="form-group">
                            <label for="crisis-title">Crisis Title</label>
                            <input type="text" id="crisis-title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="crisis-artist">Affected Artist</label>
                            <select id="crisis-artist" name="artistId">
                                <option value="">General Crisis</option>
                                ${this.data.artists.map(artist => `
                                    <option value="${artist.id}">${artist.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="crisis-severity">Severity</label>
                            <select id="crisis-severity" name="severity" required>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="crisis-description">Description</label>
                            <textarea id="crisis-description" name="description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="crisis-actions">Immediate Actions Needed</label>
                            <textarea id="crisis-actions" name="actions"></textarea>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                            <button type="submit" class="btn-danger">Report Crisis</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    saveCrisis(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const artist = this.data.artists.find(a => a.id === formData.get('artistId'));
        
        const crisis = {
            id: Date.now().toString(),
            title: formData.get('title'),
            artistId: formData.get('artistId'),
            artistName: artist ? artist.name : 'General',
            severity: formData.get('severity'),
            description: formData.get('description'),
            actions: formData.get('actions'),
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        this.data.crises.push(crisis);
        this.saveData();
        this.renderCrisis();
        event.target.closest('.modal-overlay').remove();
        this.showNotification('Crisis reported successfully!', 'error');
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
                        <div class="artist-stat-number">${this.data.bookings.filter(b => b.artistId === artist.id && b.type === 'performance').length}</div>
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

    viewArtist(artistId) {
        const artist = this.data.artists.find(a => a.id === artistId);
        if (!artist) return;

        const artistBookings = this.data.bookings.filter(b => b.artistId === artistId);
        const artistOpportunities = this.data.opportunities.filter(o => o.artistId === artistId);
        const artistTasks = this.data.tasks.filter(t => t.artistId === artistId);

        this.showModal(`
            <div class="artist-detail-view">
                <div class="artist-detail-header">
                    <div class="artist-detail-title">
                        <h2>${artist.name}</h2>
                        <span class="artist-status ${artist.status}">${artist.status}</span>
                    </div>
                    <button class="btn-outline" onclick="app.editArtist('${artistId}')">
                        <i class="fas fa-edit"></i>
                        Edit Artist
                    </button>
                </div>

                <div class="artist-detail-tabs">
                    <button class="artist-tab active" onclick="app.showArtistTab('overview')">Overview</button>
                    <button class="artist-tab" onclick="app.showArtistTab('bookings')">Bookings (${artistBookings.length})</button>
                    <button class="artist-tab" onclick="app.showArtistTab('opportunities')">Opportunities (${artistOpportunities.length})</button>
                    <button class="artist-tab" onclick="app.showArtistTab('tasks')">Tasks (${artistTasks.length})</button>
                </div>

                <div class="artist-tab-content active" id="artist-overview">
                    <div class="artist-overview-grid">
                        <div class="overview-section">
                            <h4>Contact Information</h4>
                            <p><strong>Email:</strong> ${artist.email}</p>
                            <p><strong>Phone:</strong> ${artist.phone}</p>
                            <p><strong>Genre:</strong> ${artist.genre}</p>
                        </div>
                        <div class="overview-section">
                            <h4>Performance Stats</h4>
                            <p><strong>Monthly Revenue:</strong> $${(artist.monthlyRevenue || 0).toLocaleString()}</p>
                            <p><strong>Total Bookings:</strong> ${artistBookings.filter(b => b.type === 'performance').length}</p>
                            <p><strong>Confirmed Shows:</strong> ${artistBookings.filter(b => b.status === 'confirmed' && b.type === 'performance').length}</p>
                        </div>
                        <div class="overview-section">
                            <h4>Current Milestone</h4>
                            <p><strong>Goal:</strong> ${artist.milestone || 'No milestone set'}</p>
                            <p><strong>Progress:</strong> ${artist.progress || 0}%</p>
                            <p><strong>Next Goals:</strong> ${artist.nextGoals || 'No goals set'}</p>
                        </div>
                    </div>
                </div>

                <div class="artist-tab-content" id="artist-bookings">
                    <div class="artist-items-list">
                        ${artistBookings.length === 0 ? '<p>No bookings yet</p>' : 
                            artistBookings.map(booking => `
                                <div class="artist-item">
                                    <h4>${booking.venue}</h4>
                                    <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()} at ${booking.time}</p>
                                    <p><strong>Fee:</strong> $${booking.fee.toLocaleString()}</p>
                                    <p><strong>Status:</strong> <span class="status-badge ${booking.status}">${booking.status}</span></p>
                                    <p><strong>Type:</strong> <span class="type-badge ${booking.type}">${booking.type}</span></p>
                                    <p><strong>Details:</strong> ${booking.details}</p>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>

                <div class="artist-tab-content" id="artist-opportunities">
                    <div class="artist-items-list">
                        ${artistOpportunities.length === 0 ? '<p>No opportunities yet</p>' : 
                            artistOpportunities.map(opp => `
                                <div class="artist-item">
                                    <h4>${opp.title}</h4>
                                    <p>${opp.description}</p>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>

                <div class="artist-tab-content" id="artist-tasks">
                    <div class="artist-items-list">
                        ${artistTasks.length === 0 ? '<p>No tasks yet</p>' : 
                            artistTasks.map(task => `
                                <div class="artist-item">
                                    <h4>${task.title}</h4>
                                    <p><strong>Due:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
                                    <p><strong>Priority:</strong> ${task.priority}</p>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
            </div>
        `);
    }

    showArtistTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.artist-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.artist-tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        event.target.classList.add('active');
        document.getElementById(`artist-${tabName}`).classList.add('active');
    }

    showModal(content) {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>Artist Details</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-content">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }

    renderBookings() {
        const container = document.getElementById('bookings-list');
        
        if (!container) {
            console.error('ERROR: bookings-list container not found!');
            return;
        }
        
        // Filter to only show performance bookings
        const performanceBookings = this.data.bookings.filter(booking => booking.type === 'performance');
        
        if (performanceBookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>No performance bookings yet</p>
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
                ${performanceBookings.map(booking => `
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
        console.log('Rendering settings...');
        
        // Make sure integrations are rendered
        if (window.integrations) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                window.integrations.renderIntegrations();
            }, 100);
        } else {
            console.error('Integrations not available');
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

    // Calendar event management
    addCalendarEvent(date) {
        console.log('Add calendar event for date:', date);
        // TODO: Implement calendar event creation
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
    }

    // Data management
    loadData() {
        // Don't load from localStorage for now - use fresh data
        this.syncBookingsToCalendar();
    }

    saveData() {
        try {
            localStorage.setItem('artistManagementData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    saveCalendarEvent(event, date) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const calendarEvent = {
            id: Date.now().toString(),
            title: formData.get('title'),
            date: date,
            time: formData.get('time'),
            type: formData.get('type'),
            description: formData.get('description'),
            source: 'manual'
        };
        
        this.data.calendarEvents.push(calendarEvent);
        this.saveData();
        this.renderCalendar();
        event.target.closest('.modal-overlay').remove();
        this.showNotification('Event added successfully!', 'success');
    }

    syncCalendar() {
        const btn = document.getElementById('sync-calendar-btn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Syncing...';
            btn.disabled = true;
        }
        
        // Check if Google Calendar is connected
        if (window.integrations && window.integrations.integrations.googleCalendar.connected) {
            window.integrations.getCalendarEvents()
                .then(result => {
                    if (result.success) {
                        // Add Google Calendar events to our calendar
                        result.events.forEach(event => {
                            const existingEvent = this.data.calendarEvents.find(e => e.id === event.id);
                            if (!existingEvent) {
                                this.data.calendarEvents.push(event);
                            }
                        });
                        this.saveData();
                        this.renderCalendar();
                        this.showNotification('Calendar synced successfully!', 'success');
                    }
                })
                .catch(error => {
                    this.showNotification('Calendar sync failed: ' + error.message, 'error');
                })
                .finally(() => {
                    if (btn) {
                        btn.innerHTML = '<i class="fas fa-sync"></i> Sync Calendar';
                        btn.disabled = false;
                    }
                });
        } else {
            this.showNotification('Google Calendar not connected. Go to Settings to connect.', 'info');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-sync"></i> Sync Calendar';
                btn.disabled = false;
            }
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
    if (window.app) {
        window.app.addArtist();
    }
}

function addBooking() {
    if (window.app) {
        window.app.addBooking();
    }
}

function addOpportunity() {
    if (window.app) {
        window.app.addOpportunity();
    }
}

function addCrisis() {
    if (window.app) {
        window.app.addCrisis();
    }
}

function addTask() {
    if (window.app) {
        window.app.addTask();
    }
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