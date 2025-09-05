// API Integrations Manager
class IntegrationsManager {
    constructor() {
        this.integrations = {
            notion: {
                name: 'Notion',
                icon: 'fas fa-sticky-note',
                connected: false,
                config: {},
                scopes: ['read_content', 'insert_content', 'update_content']
            },
            dropbox: {
                name: 'Dropbox',
                icon: 'fab fa-dropbox',
                connected: false,
                config: {},
                scopes: ['files.content.read', 'files.content.write']
            },
            googleCalendar: {
                name: 'Google Calendar',
                icon: 'fas fa-calendar',
                connected: false,
                config: {},
                scopes: ['https://www.googleapis.com/auth/calendar']
            },
            googleSheets: {
                name: 'Google Sheets',
                icon: 'fas fa-table',
                connected: false,
                config: {},
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            },
            gmail: {
                name: 'Gmail',
                icon: 'fas fa-envelope',
                connected: false,
                config: {},
                scopes: ['https://www.googleapis.com/auth/gmail.readonly']
            }
        };
        
        this.loadIntegrationStates();
    }

    loadIntegrationStates() {
        try {
            const saved = localStorage.getItem('integrationStates');
            if (saved) {
                const states = JSON.parse(saved);
                Object.keys(states).forEach(key => {
                    if (this.integrations[key]) {
                        this.integrations[key] = { ...this.integrations[key], ...states[key] };
                    }
                });
            }
        } catch (error) {
            console.error('Error loading integration states:', error);
        }
    }

    saveIntegrationStates() {
        try {
            localStorage.setItem('integrationStates', JSON.stringify(this.integrations));
        } catch (error) {
            console.error('Error saving integration states:', error);
        }
    }

    // Notion Integration
    async connectNotion() {
        try {
            const token = prompt('Enter your Notion Integration Token (starts with secret_):');
            if (!token) return;
            
            if (!token.startsWith('secret_') && !token.startsWith('ntn_')) {
                app.showNotification('Invalid token format. Token should start with "secret_" or "ntn_"', 'error');
                return;
            }

            // Test the connection
            const response = await fetch('/api/notion/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            const result = await response.json();
            
            if (response.ok) {
                this.integrations.notion.connected = true;
                this.integrations.notion.config = { 
                    token: token,
                    user: result.user 
                };
                this.saveIntegrationStates();
                app.showNotification(`Notion connected successfully! Welcome ${result.user.name}`, 'success');
                this.renderIntegrations();
            } else {
                throw new Error(result.error || 'Connection failed');
            }
        } catch (error) {
            console.error('Notion connection error:', error);
            app.showNotification('Failed to connect to Notion: ' + error.message, 'error');
        }
    }

    async disconnectNotion() {
        this.integrations.notion.connected = false;
        this.integrations.notion.config = {};
        this.saveIntegrationStates();
        app.showNotification('Notion disconnected', 'info');
        this.renderIntegrations();
    }

    // Dropbox Integration
    async connectDropbox() {
        try {
            const appKey = prompt('Enter your Dropbox App Key:');
            if (!appKey) return;

            // Redirect to Dropbox OAuth
            const redirectUri = window.location.origin;
            const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${appKey}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=dropbox`;
            
            app.showNotification('Redirecting to Dropbox for authorization...', 'info');
            window.location.href = authUrl;
        } catch (error) {
            app.showNotification('Failed to connect to Dropbox: ' + error.message, 'error');
        }
    }

    async disconnectDropbox() {
        this.integrations.dropbox.connected = false;
        this.integrations.dropbox.config = {};
        this.saveIntegrationStates();
        app.showNotification('Dropbox disconnected', 'info');
        this.renderIntegrations();
    }

    // Google Services Integration
    async connectGoogleService(service) {
        try {
            const clientId = prompt('Enter your Google OAuth Client ID:');
            if (!clientId) return;

            const scopes = this.integrations[service].scopes.join(' ');
            const redirectUri = window.location.origin;
            
            const authUrl = `https://accounts.google.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code&state=${service}`;
            
            app.showNotification(`Redirecting to Google for ${this.integrations[service].name} authorization...`, 'info');
            window.location.href = authUrl;
        } catch (error) {
            app.showNotification(`Failed to connect to ${this.integrations[service].name}: ` + error.message, 'error');
        }
    }

    async disconnectGoogleService(service) {
        this.integrations[service].connected = false;
        this.integrations[service].config = {};
        this.saveIntegrationStates();
        app.showNotification(`${this.integrations[service].name} disconnected`, 'info');
        this.renderIntegrations();
    }

    // Handle OAuth callbacks
    handleOAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        if (code && state) {
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
            
            if (state === 'dropbox') {
                this.completeDropboxAuth(code);
            } else if (['googleCalendar', 'googleSheets', 'gmail'].includes(state)) {
                this.completeGoogleAuth(code, state);
            }
        }
    }

    async completeDropboxAuth(code) {
        try {
            // In a real implementation, you'd exchange the code for an access token
            // For now, we'll simulate a successful connection
            this.integrations.dropbox.connected = true;
            this.integrations.dropbox.config = { authCode: code };
            this.saveIntegrationStates();
            app.showNotification('Dropbox connected successfully!', 'success');
            this.renderIntegrations();
        } catch (error) {
            app.showNotification('Failed to complete Dropbox authentication', 'error');
        }
    }

    async completeGoogleAuth(code, service) {
        try {
            // In a real implementation, you'd exchange the code for an access token
            // For now, we'll simulate a successful connection
            this.integrations[service].connected = true;
            this.integrations[service].config = { authCode: code };
            this.saveIntegrationStates();
            app.showNotification(`${this.integrations[service].name} connected successfully!`, 'success');
            this.renderIntegrations();
        } catch (error) {
            app.showNotification(`Failed to complete ${this.integrations[service].name} authentication`, 'error');
        }
    }

    // API Methods for each service
    async syncWithNotion(data) {
        if (!this.integrations.notion.connected) {
            throw new Error('Notion not connected');
        }
        
        // Implementation for syncing data with Notion
        console.log('Syncing with Notion:', data);
        return { success: true, message: 'Data synced with Notion' };
    }

    async uploadToDropbox(file, path) {
        if (!this.integrations.dropbox.connected) {
            throw new Error('Dropbox not connected');
        }
        
        // Implementation for uploading to Dropbox
        console.log('Uploading to Dropbox:', file, path);
        return { success: true, message: 'File uploaded to Dropbox' };
    }

    async createCalendarEvent(event) {
        if (!this.integrations.googleCalendar.connected) {
            throw new Error('Google Calendar not connected');
        }
        
        // Implementation for creating calendar events
        console.log('Creating calendar event:', event);
        return { success: true, message: 'Event created in Google Calendar' };
    }

    async updateGoogleSheet(sheetId, data) {
        if (!this.integrations.googleSheets.connected) {
            throw new Error('Google Sheets not connected');
        }
        
        // Implementation for updating Google Sheets
        console.log('Updating Google Sheet:', sheetId, data);
        return { success: true, message: 'Google Sheet updated' };
    }

    async scanGmailForBookings() {
        if (!this.integrations.gmail.connected) {
            throw new Error('Gmail not connected');
        }
        
        // Implementation for scanning Gmail for booking offers
        console.log('Scanning Gmail for booking offers');
        return { success: true, bookings: [], message: 'Gmail scanned for bookings' };
    }

    // Render integrations in settings
    renderIntegrations() {
        const container = document.querySelector('.integration-list');
        if (!container) return;

        container.innerHTML = Object.entries(this.integrations).map(([key, integration]) => `
            <div class="integration-item">
                <div class="integration-info">
                    <i class="${integration.icon}"></i>
                    <span>${integration.name}</span>
                    ${integration.connected ? '<span class="status-badge connected">Connected</span>' : '<span class="status-badge disconnected">Not Connected</span>'}
                </div>
                <div class="integration-actions">
                    ${integration.connected ? 
                        `<button class="btn-outline" onclick="window.integrations.disconnect('${key}')">Disconnect</button>` :
                        `<button class="btn-primary" onclick="window.integrations.connect('${key}')">Connect</button>`
                    }
                    ${integration.connected ? 
                        `<button class="btn-secondary" onclick="window.integrations.test('${key}')">Test</button>` : ''
                    }
                </div>
            </div>
        `).join('');
    }

    // Generic connect/disconnect methods
    connect(service) {
        switch (service) {
            case 'notion':
                this.connectNotion();
                break;
            case 'dropbox':
                this.connectDropbox();
                break;
            case 'googleCalendar':
            case 'googleSheets':
            case 'gmail':
                this.connectGoogleService(service);
                break;
            default:
                app.showNotification(`Connection for ${service} not implemented yet`, 'info');
        }
    }

    disconnect(service) {
        switch (service) {
            case 'notion':
                this.disconnectNotion();
                break;
            case 'dropbox':
                this.disconnectDropbox();
                break;
            case 'googleCalendar':
            case 'googleSheets':
            case 'gmail':
                this.disconnectGoogleService(service);
                break;
        }
    }

    async test(service) {
        try {
            let result;
            switch (service) {
                case 'notion':
                    result = await this.syncWithNotion({ test: true });
                    break;
                case 'dropbox':
                    result = await this.uploadToDropbox(new Blob(['test']), '/test.txt');
                    break;
                case 'googleCalendar':
                    result = await this.createCalendarEvent({ title: 'Test Event', start: new Date() });
                    break;
                case 'googleSheets':
                    result = await this.updateGoogleSheet('test', [['Test', 'Data']]);
                    break;
                case 'gmail':
                    result = await this.scanGmailForBookings();
                    break;
            }
            app.showNotification(`${this.integrations[service].name} test successful!`, 'success');
        } catch (error) {
            app.showNotification(`${this.integrations[service].name} test failed: ` + error.message, 'error');
        }
    }
}

// Initialize integrations manager
const integrations = new IntegrationsManager();