export enum WizardStep {
  TEMPLATE_SELECTION = 'template',
  ASSET_CREATION = 'assets',
  GAME_MECHANICS = 'mechanics',
  LEVEL_DESIGN = 'levels',
  TESTING = 'testing',
  EXPORT = 'export'
}

export enum GameCategory {
  PUZZLE = 'puzzle',
  ENDLESS_RUNNER = 'endless_runner',
  MATCH_THREE = 'match_three',
  PLATFORMER = 'platformer',
  SHOOTER = 'shooter'
}

export enum AssetType {
  SPRITE = 'sprite',
  BACKGROUND = 'background',
  AUDIO = 'audio',
  ANIMATION = 'animation'
}

export enum Platform {
  WECHAT = 'wechat',
  TELEGRAM = 'telegram',
  FACEBOOK_MESSENGER = 'facebook',
  GENERIC_WEB = 'web'
}

export interface GameTemplate {
  id: string;
  name: string;
  category: GameCategory;
  description: string;
  preview: string;
  mechanics: string[];
  requiredAssets: AssetRequirement[];
}

export interface AssetRequirement {
  type: AssetType;
  name: string;
  description: string;
}

export interface GeneratedAsset {
  id: string;
  type: AssetType;
  name: string;
  url: string;
  description: string;
}

export interface GameProject {
  id: string;
  name: string;
  description: string;
  template: GameTemplate;
  assets: GeneratedAsset[];
  currentStep: WizardStep;
  createdAt: Date;
}

export interface GameMechanics {
  playerSpeed: number;
  jumpHeight: number;
  gravity: number;
  collectibles: boolean;
  enemies: boolean;
  powerUps: boolean;
}

export interface Level {
  id: string;
  name: string;
  difficulty: number;
  layout: string;
  assets: string[];
}