import { GameTemplate, GameCategory, AssetType } from '../types';

export const gameTemplates: GameTemplate[] = [
  {
    id: 'endless-runner',
    name: 'Endless Runner',
    category: GameCategory.ENDLESS_RUNNER,
    description: 'Classic side-scrolling runner with obstacles and collectibles',
    preview: '🏃‍♂️',
    mechanics: ['Running', 'Jumping', 'Collecting', 'Avoiding obstacles'],
    requiredAssets: [
      { type: AssetType.SPRITE, name: 'Player Character', description: 'Main character sprite' },
      { type: AssetType.SPRITE, name: 'Obstacles', description: 'Various obstacles to avoid' },
      { type: AssetType.SPRITE, name: 'Collectibles', description: 'Items to collect for points' },
      { type: AssetType.BACKGROUND, name: 'Game Background', description: 'Scrolling background scene' },
      { type: AssetType.AUDIO, name: 'Background Music', description: 'Upbeat background music' }
    ]
  },
  {
    id: 'match-three',
    name: 'Match Three',
    category: GameCategory.MATCH_THREE,
    description: 'Match 3 or more similar items to clear them from the board',
    preview: '💎',
    mechanics: ['Matching', 'Swapping', 'Cascading', 'Special effects'],
    requiredAssets: [
      { type: AssetType.SPRITE, name: 'Game Pieces', description: 'Colorful matching pieces' },
      { type: AssetType.SPRITE, name: 'Special Effects', description: 'Explosion and match effects' },
      { type: AssetType.BACKGROUND, name: 'Game Board', description: 'Game board background' },
      { type: AssetType.AUDIO, name: 'Match Sounds', description: 'Sound effects for matches' }
    ]
  },
  {
    id: 'puzzle-platformer',
    name: 'Puzzle Platformer',
    category: GameCategory.PLATFORMER,
    description: 'Navigate through levels solving puzzles and avoiding dangers',
    preview: '🧩',
    mechanics: ['Platforming', 'Puzzle solving', 'Key collection', 'Switch activation'],
    requiredAssets: [
      { type: AssetType.SPRITE, name: 'Player Character', description: 'Puzzle-solving character' },
      { type: AssetType.SPRITE, name: 'Platforms', description: 'Various platform types' },
      { type: AssetType.SPRITE, name: 'Puzzle Elements', description: 'Keys, switches, doors' },
      { type: AssetType.BACKGROUND, name: 'Level Background', description: 'Atmospheric level background' },
      { type: AssetType.AUDIO, name: 'Ambient Music', description: 'Thoughtful puzzle music' }
    ]
  },
  {
    id: 'space-shooter',
    name: 'Space Shooter',
    category: GameCategory.SHOOTER,
    description: 'Defend against waves of enemies in space combat',
    preview: '🚀',
    mechanics: ['Shooting', 'Enemy waves', 'Power-ups', 'Boss battles'],
    requiredAssets: [
      { type: AssetType.SPRITE, name: 'Player Ship', description: 'Player spaceship sprite' },
      { type: AssetType.SPRITE, name: 'Enemy Ships', description: 'Various enemy spacecraft' },
      { type: AssetType.SPRITE, name: 'Projectiles', description: 'Bullets and laser effects' },
      { type: AssetType.BACKGROUND, name: 'Space Background', description: 'Starfield background' },
      { type: AssetType.AUDIO, name: 'Battle Music', description: 'Intense combat music' }
    ]
  }
];