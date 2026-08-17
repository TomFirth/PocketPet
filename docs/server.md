# Server Architecture

Currently, PocketPet is a **client-side only** application. However, a server-side component is planned for future phases to support cloud saves and social features.

## Proposed Server Stack (Future)
- **Runtime**: Node.js or Kotlin (Ktor/Spring Boot).
- **Communication**: REST API or GraphQL for stat synchronization.
- **Real-time**: WebSockets for potential multi-pet interactions.
- **Authentication**: Firebase Auth or OAuth 2.0.

## Responsibilities
- **Cloud Sync**: Storing pet stats and progress across devices.
- **Global Leaderboards**: XP and Level rankings.
- **Anti-Cheat**: Validating XP gains and stat updates server-side.
- **Push Notifications**: Reminding users to feed or play with their pet.

## Interaction Flow
1. Client performs an action (e.g., Feeding).
2. Client updates local state for immediate feedback.
3. Client synchronizes the delta or full state with the server.
4. Server validates the update and returns the persisted state.
