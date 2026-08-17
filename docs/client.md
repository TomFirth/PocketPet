# Client Architecture

The PocketPet client is built using **React Native** with **TypeScript**, targeting both iOS and Android.

## Core Technologies
- **React Native**: UI Framework.
- **TypeScript**: Type safety and better developer experience.
- **React Hooks**: State management and side-effects.
- **Animated API**: Smooth UI transitions and pet interactions.
- **PanResponder**: Gesture detection for stroking and toy interactions.

## Directory Structure
- `src/components/`: UI components (Pet, MenuWheel, GameScreen).
- `src/logic/`: Core game logic, state definitions, and assets configuration.
- `src/hooks/`: Custom hooks for encapsulating logic.
- `src/styles/`: Shared styling definitions.

## Key Components

### `GameScreen.tsx`
The main entry point for the game UI. It manages:
- The game loop (stat decay).
- Gesture handling (PanResponders).
- UI state (Modals, Toasts, Menu visibility).
- Stat updates and XP/Leveling logic.

### `Pet.tsx`
A presentational component that renders the pet. It features:
- Layered rendering (Fur, Eyes, Pupils, Mouth).
- Dynamic "Look At" behavior where eyes follow coordinates.
- Mouth open/closed states.

### `MenuWheel.tsx`
A radial menu for player actions (Feed, Clean, Play, etc.).

## Game Logic & State

### `GameState.ts`
Defines the `PetStats` interface and `INITIAL_STATS`. Stats include:
- Hunger, Thirst, Happiness, Energy.
- Relationship, XP, Level.
- Last update timestamp (for offline progress calculation).

### `GameLoop.ts`
Contains logic for time-based decay. Currently implemented as a `setInterval` in `GameScreen`, but designed to be moved to a background-friendly loop.

## Upcoming Client Features
- **Persistence**: Integration with `AsyncStorage` or a local database.
- **Sensors**: Integration with Accelerometer and Microphone for environmental reactions.
- **Theming**: More pet species and customization options.
- **Offline Logic**: Calculating stat decay since the last time the app was open.
