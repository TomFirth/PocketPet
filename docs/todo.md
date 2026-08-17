# PocketPet Todo List

## Phase 1: MVP (Core Loop & Persistence)
*Focus: A playable, persistent local experience.*

- [x] **Data Persistence**
    - [x] Implement `AsyncStorage` to save/load `PetStats`.
    - [x] Auto-save state on app background/close.
- [x] **Offline Progress**
    - [x] Calculate stat decay based on time elapsed since `lastUpdate` when the app starts.
- [x] **Game Loop Refinement**
    - [x] Move decay logic from `GameScreen` to a dedicated `GameLoop` controller.
    - [x] Implement sleep cycles (Energy decay/recovery).
- [x] **UI/UX Polish**
    - [x] Improve the "Stroking" gesture feedback.
- [x] **Bug Fixes**
    - [x] Ensure deltas don't stack weirdly during rapid updates.

## Phase 2: Enhanced Interactions & Personality
*Focus: Making the pet feel "alive" through sensors and varied responses.*

- [ ] **Sensor Integration**
    - [ ] Microphone: Detect loud noises (scare pet).
    - [ ] Accelerometer: Detect shaking/gentle movement.
- [ ] **Emotional Depth**
    - [ ] Implement complex moods (Anxious, Bored, Excited) based on stats and environment.
    - [ ] Add "Curiosity" triggers (e.g., reacting to specific screen taps).
- [ ] **Personalization**
    - [ ] Pet naming.
    - [ ] Color customization for fur/eyes.
- [ ] **Unlocks & Progression**
    - [ ] Expand the level-up system with more rewards.
    - [ ] Birthday system.

## Phase 3: Social & Cloud
*Focus: Persistence across devices and social features.*

- [ ] **Server Integration**
    - [ ] Implement Cloud Saves.
    - [ ] Account creation/login.
- [ ] **Notifications**
    - [ ] "I'm hungry" reminders.
    - [ ] Daily login rewards.
- [ ] **Social Features**
    - [ ] Pet "playdates" (visit other players' pets).
    - [ ] Global leaderboards.

## Phase 4: Long Term Vision
- [ ] **AR Mode**: Play with your pet in your actual room.
- [ ] **Health API Integration**: Pet gets energy when you walk (GPS/Steps).
- [ ] **Weather Integration**: Pet reacts to real-world local weather.
- [ ] **Minigames**: Small arcade games to earn coins/treats.
