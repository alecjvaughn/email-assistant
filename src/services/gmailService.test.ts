import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { GmailService } from './gmailService';

interface MockLabel {
    getName: Mock;
}

interface MockGmailApp {
    getUserLabelByName: Mock;
    createLabel: Mock;
}

/**
 * Tests for the GmailService wrapper.
 */
describe('GmailService', () => {
    let mockGmailApp: MockGmailApp;

    beforeEach(() => {
        mockGmailApp = {
            getUserLabelByName: vi.fn(),
            createLabel: vi.fn(),
        };

        // Injecting global mock
        (global as any).GmailApp = mockGmailApp;
    });

    it('should return existing label if it exists', () => {
        const mockLabel: MockLabel = { getName: vi.fn().mockReturnValue('existing') };
        mockGmailApp.getUserLabelByName.mockReturnValue(mockLabel);

        const service = new GmailService();
        const label = service.getOrCreateLabel('existing');

        expect(mockGmailApp.getUserLabelByName).toHaveBeenCalledWith('existing');
        expect(mockGmailApp.createLabel).not.toHaveBeenCalled();
        expect(label).toBe(mockLabel);
    });

    it('should create a new label if it does not exist', () => {
        const mockLabel: MockLabel = { getName: vi.fn().mockReturnValue('new') };
        mockGmailApp.getUserLabelByName.mockReturnValue(null);
        mockGmailApp.createLabel.mockReturnValue(mockLabel);

        const service = new GmailService();
        const label = service.getOrCreateLabel('new');

        expect(mockGmailApp.getUserLabelByName).toHaveBeenCalledWith('new');
        expect(mockGmailApp.createLabel).toHaveBeenCalledWith('new');
        expect(label).toBe(mockLabel);
    });

    it('should recursively create parent labels for nested labels', () => {
        const parentLabel: MockLabel = { getName: vi.fn().mockReturnValue('parent') };
        const childLabel: MockLabel = { getName: vi.fn().mockReturnValue('parent/child') };

        // First call: child doesn't exist
        // Second call: parent doesn't exist
        mockGmailApp.getUserLabelByName
            .mockReturnValueOnce(null) // child check
            .mockReturnValueOnce(null); // parent check

        mockGmailApp.createLabel
            .mockReturnValueOnce(parentLabel) // parent creation
            .mockReturnValueOnce(childLabel); // child creation

        const service = new GmailService();
        const label = service.getOrCreateLabel('parent/child');

        expect(mockGmailApp.getUserLabelByName).toHaveBeenCalledWith('parent/child');
        expect(mockGmailApp.getUserLabelByName).toHaveBeenCalledWith('parent');
        expect(mockGmailApp.createLabel).toHaveBeenCalledWith('parent');
        expect(mockGmailApp.createLabel).toHaveBeenCalledWith('parent/child');
        expect(label).toBe(childLabel);
    });
});
