# Database Design

The database needs to store pet state, player preferences, and historical data.

## Local Storage (MVP)
For the initial release, data will be stored locally on the device using **AsyncStorage** or **SQLite**.

### `PetState` Schema
Stored as a JSON object:
```typescript
{
  id: string;
  species: string;
  hunger: number;
  thirst: number;
  happiness: number;
  energy: number;
  relationship: number;
  xp: number;
  level: number;
  lastUpdate: number; // Unix timestamp
  unlockedActions: string[]; // ['food', 'water', etc.]
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
