/**
 * Wrapper service for interacting with Google Apps Script's GmailApp.
 * 
 * @method getOrCreateLabel - Retrieves a Gmail label by name, creating it (and any missing parent labels) if it doesn't exist.
 */
export class GmailService {
    /**
     * Retrieves or creates a label by name.
     * 
     * @param {string} name - The full name of the label (e.g., "parent/child").
     * @returns {GoogleAppsScript.Gmail.GmailLabel} The existing or newly created label.
     */
    getOrCreateLabel(name: string): GoogleAppsScript.Gmail.GmailLabel {
        const existing = GmailApp.getUserLabelByName(name);
        if (existing) {
            return existing;
        }

        // If it's a nested label, ensure parents exist first
        if (name.includes('/')) {
            const parts = name.split('/');
            const parentName = parts.slice(0, -1).join('/');
            this.getOrCreateLabel(parentName);
        }

        return GmailApp.createLabel(name);
    }
}
