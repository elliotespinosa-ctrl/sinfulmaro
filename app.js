// ShiftSmart Turnaway Tool - Main Application
class TurnawayTracker {
    constructor() {
        this.turnaways = this.loadTurnaways();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDateTime();
        this.renderTurnaways();
        this.updateStats();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('turnaway-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTurnaway();
        });

        // Clear all button
        document.getElementById('clear-all').addEventListener('click', () => {
            this.clearAll();
        });

        // Export buttons
        document.getElementById('export-json').addEventListener('click', () => {
            this.exportJSON();
        });

        document.getElementById('export-text').addEventListener('click', () => {
            this.exportText();
        });
    }

    setDefaultDateTime() {
        const now = new Date();
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
        document.getElementById('date').value = localISOTime;
    }

    addTurnaway() {
        const turnaway = {
            id: Date.now(),
            date: document.getElementById('date').value,
            location: document.getElementById('location').value,
            reason: document.getElementById('reason').value,
            notes: document.getElementById('notes').value,
            compensation: document.getElementById('compensation').value,
        };

        this.turnaways.unshift(turnaway);
        this.saveTurnaways();
        this.renderTurnaways();
        this.updateStats();
        this.resetForm();
        this.showNotification('Turnaway logged successfully! ✓');
    }

    deleteTurnaway(id) {
        if (confirm('Are you sure you want to delete this turnaway?')) {
            this.turnaways = this.turnaways.filter(t => t.id !== id);
            this.saveTurnaways();
            this.renderTurnaways();
            this.updateStats();
            this.showNotification('Turnaway deleted');
        }
    }

    clearAll() {
        if (confirm('Are you sure you want to delete all turnaways? This cannot be undone.')) {
            this.turnaways = [];
            this.saveTurnaways();
            this.renderTurnaways();
            this.updateStats();
            this.showNotification('All turnaways cleared');
        }
    }

    renderTurnaways() {
        const list = document.getElementById('turnaway-list');
        
        if (this.turnaways.length === 0) {
            list.innerHTML = '<p class="empty-state">No turnaways logged yet</p>';
            return;
        }

        list.innerHTML = this.turnaways.map(turnaway => this.createTurnawayHTML(turnaway)).join('');

        // Add delete event listeners
        list.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.deleteTurnaway(id);
            });
        });
    }

    createTurnawayHTML(turnaway) {
        const date = new Date(turnaway.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });

        const reasonLabels = {
            'overstaffed': 'Overstaffed',
            'shift-cancelled': 'Shift Cancelled',
            'early-release': 'Early Release',
            'not-needed': 'Not Needed',
            'schedule-error': 'Schedule Error',
            'other': 'Other'
        };

        const compensationLabels = {
            'none': 'No Compensation',
            'partial': 'Partial Pay',
            'full': 'Full Pay',
            'pending': 'Pending'
        };

        return `
            <div class="turnaway-item">
                <button class="delete-btn" data-id="${turnaway.id}">×</button>
                <div class="turnaway-header">
                    <div>
                        <div class="turnaway-location">${this.escapeHtml(turnaway.location)}</div>
                        <div class="turnaway-date">${formattedDate}</div>
                    </div>
                </div>
                <div class="turnaway-reason">${reasonLabels[turnaway.reason] || turnaway.reason}</div>
                ${turnaway.notes ? `<div class="turnaway-notes">"${this.escapeHtml(turnaway.notes)}"</div>` : ''}
                <div class="turnaway-compensation">
                    <span class="compensation-badge compensation-${turnaway.compensation}">
                        ${compensationLabels[turnaway.compensation]}
                    </span>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.turnaways.length;
        document.getElementById('total-count').textContent = total;

        // Count this month
        const now = new Date();
        const thisMonth = this.turnaways.filter(t => {
            const turnawayDate = new Date(t.date);
            return turnawayDate.getMonth() === now.getMonth() &&
                   turnawayDate.getFullYear() === now.getFullYear();
        }).length;
        document.getElementById('month-count').textContent = thisMonth;

        // Count compensated (partial or full)
        const compensated = this.turnaways.filter(t => 
            t.compensation === 'partial' || t.compensation === 'full'
        ).length;
        document.getElementById('compensated-count').textContent = compensated;
    }

    resetForm() {
        document.getElementById('turnaway-form').reset();
        this.setDefaultDateTime();
    }

    exportJSON() {
        const dataStr = JSON.stringify(this.turnaways, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        this.downloadFile(dataBlob, 'shiftsmart-turnaways.json');
    }

    exportText() {
        let text = 'ShiftSmart Turnaway Report\n';
        text += '=' .repeat(50) + '\n\n';
        
        if (this.turnaways.length === 0) {
            text += 'No turnaways recorded.\n';
        } else {
            this.turnaways.forEach((turnaway, index) => {
                const date = new Date(turnaway.date);
                text += `${index + 1}. ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n`;
                text += `   Location: ${turnaway.location}\n`;
                text += `   Reason: ${turnaway.reason}\n`;
                text += `   Compensation: ${turnaway.compensation}\n`;
                if (turnaway.notes) {
                    text += `   Notes: ${turnaway.notes}\n`;
                }
                text += '\n';
            });
            
            text += '\n' + '=' .repeat(50) + '\n';
            text += `Total Turnaways: ${this.turnaways.length}\n`;
            
            const compensated = this.turnaways.filter(t => 
                t.compensation === 'partial' || t.compensation === 'full'
            ).length;
            text += `Compensated: ${compensated}\n`;
        }
        
        const dataBlob = new Blob([text], { type: 'text/plain' });
        this.downloadFile(dataBlob, 'shiftsmart-turnaways.txt');
    }

    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showNotification(`Exported: ${filename}`);
    }

    showNotification(message) {
        // Simple notification using native alert for iOS compatibility
        // Could be enhanced with a custom toast notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #34C759;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }

    loadTurnaways() {
        try {
            const data = localStorage.getItem('shiftsmart-turnaways');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading turnaways:', error);
            return [];
        }
    }

    saveTurnaways() {
        try {
            localStorage.setItem('shiftsmart-turnaways', JSON.stringify(this.turnaways));
        } catch (error) {
            console.error('Error saving turnaways:', error);
            alert('Error saving data. Storage might be full.');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TurnawayTracker();
    });
} else {
    new TurnawayTracker();
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
}
