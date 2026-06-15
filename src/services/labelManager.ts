import { GmailService } from './gmailService';
import { ConfigurationService } from './configuration';

/**
 * Manager responsible for higher-level Gmail label operations, using the GmailService and ConfigurationService.
 * 
 * @param {GmailService} gmailService - The service wrapper for GmailApp.
 * @param {ConfigurationService} configService - The service for managing application configuration.
 * @method syncLabels - Ensures all labels defined in the configuration exist in Gmail.
 * @method getLabelForRule - Retrieves the target label name for a specific rule ID.
 */
export class LabelManager {
    constructor(
        private gmailService: GmailService,
        private configService: ConfigurationService
    ) {}

    /**
     * Synchronizes Gmail labels with the current configuration.
     * Iterates through all label definitions in the config and ensures they are created.
     */
    syncLabels(): void {
        const config = this.configService.getConfig();
        const labels = config.labels || {};

        Object.keys(labels).forEach(labelName => {
            this.gmailService.getOrCreateLabel(labelName);
        });
    }

    /**
     * Gets the target label for a specific rule.
     * 
     * @param {string} ruleId - The ID of the rule to look up.
     * @returns {string} The name of the target label.
     * @throws {Error} If the rule ID is not found in the configuration.
     */
    getLabelForRule(ruleId: string): string {
        const config = this.configService.getConfig();
        const rules = config.rules || [];
        const rule = rules.find(r => r.id === ruleId);

        if (!rule) {
            throw new Error(`Rule not found: ${ruleId}`);
        }

        return rule.target_label;
    }
}
