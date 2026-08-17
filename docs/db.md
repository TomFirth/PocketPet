# Database Design

The database needs to store pet state, player preferences, and historical data.

## Local Storage (MVP)
PocketPet uses **AsyncStorage** for local data persistence. This allows the game to be played offline while ensuring that progress is saved across sessions.

### `Persistence.ts` Utility
A dedicated utility handles saving and loading the `PetStats` object. Data is stored as a JSON string under the key `@PocketPet:stats`.

### Auto-save Strategy
- **Backgrounding**: Stats are saved whenever the app moves to the background or becomes inactive (using `AppState`).
- **Periodic Save**: Stats are automatically saved every 30 seconds during active gameplay.
- **Manual Triggers**: Critical actions or transitions can also trigger a save.

### `PetState` Schema
Stored as a JSON object:
```typescript
{
  hunger: number;
  thirst: number;
  happiness: number;
  energy: number;
  relationship: number;
  xp: number;
  level: number;
  lastUpdate: number; // Unix timestamp
  hasEverHungry: boolean;
  hasEverThirsty: boolean;
  hasUsedFoodOrWater: boolean;
  lastToyTime: number;
  lastTreatTime: number;
  lastCleanTime: number;
}
```

## Remote Database (Long Term)
A relational database (e.g., **PostgreSQL**) or NoSQL (e.g., **Firestore**) will be used for cloud synchronization.

### Tables (Relational Example)

#### `Users`
- `id`: UUID (Primary Key)
- `email`: String
- `createdAt`: Timestamp

#### `Pets`
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `name`: String
- `species`: String
- `xp`: Integer
- `level`: Integer
- `lastUpdate`: Timestamp

#### `PetStats`
- `petId`: UUID (Foreign Key)
- `hunger`: Float
- `thirst`: Float
- `happiness`: Float
- `energy`: Float
- `relationship`: Float

#### `Interactions` (Optional)
- `id`: UUID
- `petId`: UUID
- `actionType`: String (FEED, PLAY, etc.)
- `timestamp`: Timestamp
