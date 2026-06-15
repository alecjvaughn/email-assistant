import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { LabelManager } from './labelManager';
import { GmailService } from './gmailService';
import { ConfigurationService } from './configuration';
import { AppConfig } from '../models/config';

/**
 * Tests for the LabelManager.
 */
describe('LabelManager', () => {
    let mockGmailService: { getOrCreateLabel: Mock };
    let mockConfigService: { getConfig: Mock };

    beforeEach(() => {
        mockGmailService = {
            getOrCreateLabel: vi.fn(),
        };
        mockConfigService = {
            getConfig: vi.fn(),
        };
    });

    it('should synchronize all labels from configuration', () => {
        const mockConfig: Partial<AppConfig> = {
            labels: {
                'talent': { nested: true, description: 'Talent related' },
                'finance': { nested: false },
            },
        };
        mockConfigService.getConfig.mockReturnValue(mockConfig);

        const manager = new LabelManager(
            mockGmailService as any as GmailService,
            mockConfigService as any as ConfigurationService
        );

        manager.syncLabels();

        expect(mockGmailService.getOrCreateLabel).toHaveBeenCalledWith('talent');
        expect(mockGmailService.getOrCreateLabel).toHaveBeenCalledWith('finance');
        expect(mockGmailService.getOrCreateLabel).toHaveBeenCalledTimes(2);
    });

    it('should return the correct label name for a given rule ID', () => {
        const mockConfig: Partial<AppConfig> = {
            rules: [
                { id: 'rule-1', name: 'Rule 1', type: 'sender_match', pattern: 'test@example.com', target_label: 'talent/Test' },
            ],
        };
        mockConfigService.getConfig.mockReturnValue(mockConfig);

        const manager = new LabelManager(
            mockGmailService as any as GmailService,
            mockConfigService as any as ConfigurationService
        );

        const labelName = manager.getLabelForRule('rule-1');
        expect(labelName).toBe('talent/Test');
    });

    it('should throw an error if rule ID is not found', () => {
        const mockConfig: Partial<AppConfig> = {
            rules: [],
        };
        mockConfigService.getConfig.mockReturnValue(mockConfig);

        const manager = new LabelManager(
            mockGmailService as any as GmailService,
            mockConfigService as any as ConfigurationService
        );

        expect(() => manager.getLabelForRule('invalid-id')).toThrow('Rule not found: invalid-id');
    });
});
