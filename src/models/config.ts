export interface AppConfig {
  version: string;
  labels: Record<string, LabelDefinition>;
  rules: RuleDefinition[];
  digest: DigestSettings;
}

export interface LabelDefinition {
  nested: boolean;
  description?: string;
}

export interface RuleDefinition {
  id: string;
  name: string;
  type: 'sender_match' | 'keyword_match';
  pattern: string;
  target_label: string;
}

export interface DigestSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly';
  time: string; // HH:mm
}
