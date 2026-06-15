/**
 * Represents the main application configuration.
 *
 * @property {string} version - The version of the configuration schema.
 * @property {Record<string, LabelDefinition>} labels - Map of label names to their definitions.
 * @property {RuleDefinition[]} rules - List of rules for email categorization.
 * @property {DigestSettings} digest - Settings for email digest generation.
 */
export interface AppConfig {
  version: string;
  labels: Record<string, LabelDefinition>;
  rules: RuleDefinition[];
  digest: DigestSettings;
}

/**
 * Definition of a single Gmail label.
 *
 * @property {boolean} nested - Whether the label can contain sub-labels.
 * @property {string} [description] - Optional description of the label's purpose.
 */
export interface LabelDefinition {
  nested: boolean;
  description?: string;
}

/**
 * A rule that matches emails to target labels.
 *
 * @property {string} id - Unique identifier for the rule.
 * @property {string} name - Human-readable name of the rule.
 * @property {string} type - The matching mechanism to use ('sender_match' | 'keyword_match').
 * @property {string} pattern - The pattern (e.g., email address or keyword) to match.
 * @property {string} target_label - The name of the label to apply.
 */
export interface RuleDefinition {
  id: string;
  name: string;
  type: 'sender_match' | 'keyword_match';
  pattern: string;
  target_label: string;
}

/**
 * Settings for the automated email digest.
 *
 * @property {boolean} enabled - Whether the digest feature is active.
 * @property {string} frequency - How often to generate the digest ('daily' | 'weekly').
 * @property {string} time - The time of day to send the digest (HH:mm).
 */
export interface DigestSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly';
  time: string;
}
