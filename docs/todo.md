# PocketPet Todo List

## Phase 1: MVP (Core Loop & Persistence) - COMPLETE ✅
- [x] **Data Persistence**
    - [x] Implement `AsyncStorage` to save/load `PetStats`.
    - [x] Auto-save state on app background/close.
- [x] **Offline Progress**
    - [x] Calculate stat decay based on time elapsed since `lastUpdate` when the app starts.
- [x] **Game Loop Refinement**
    - [x] Move decay logic from `GameScreen` to a dedicated `GameLoop` controller.
    - [x] Implement sleep cycles (Energy decay/recovery).
- [x] **UI/UX Polish**
    - [x] Improve the "Stroking" gesture feedback (Floating Hearts ❤️).
- [x] **Bug Fixes**
    - [x] Ensure deltas don't stack weirdly during rapid updates (Atomic State).
- [x] **Menu Implementation**
    - [x] **Food: Restores hunger. Unlocked when hunger < 50%.
    - [x] **Water: Restores thirst. Unlocked when thirst < 50%.
    - [x] **Toys: Interactive play. Unlocked after first feed/water.
    - [x] **Clean: Maintenance action. Unlocks at Level 5.
    - [x] **Sleep: Energy recovery toggle. Multi-phase (Awake/Sleeping).
    - [x] **Treats: High-reward happiness item. Unlocks at Level 10.
    - [x] **Status: Statistical overview of all pet metrics.

## Phase 2: Enhanced Interactions & Personality
- [x] **Sensor Integration**
    - [x] Microphone: Detect loud noises (scare pet).
    - [x] Accelerometer: Detect shaking/gentle movement.
- [ ] **Emotional Depth**
    - [ ] Implement complex moods (Anxious, Bored, Excited) based on stats.
    - [ ] Add "Curiosity" triggers (reacting to specific taps).
- [ ] **Growth & Evolution**
    - [ ] **Growth Stages**: Baby -> Child -> Teen -> Adult based on Level.
    - [ ] **Appearance Changes**: Scale the pet or swap assets based on stage.
- [ ] **Personalization**
    - [x] Pet naming.
    - [ ] Color customization for fur/eyes.

## Phase 3: Social & Cloud
- [ ] **Server Integration**
    - [ ] Implement Cloud Saves & User Accounts.
- [ ] **Inventory System**
    - [ ] Collectable items, food types, and accessories.
- [ ] **Notifications**
    - [ ] "I'm hungry" reminders & Daily login rewards.

## Phase 4: Long Term Vision
- [ ] **Health API Integration**: Pet gets energy when you walk (GPS/Steps).
- [ ] **Weather Integration**: Pet reacts to real-world local weather.
- [ ] **Minigames**: Small arcade games to earn coins/treats.
- [ ] **Room Customization**: Buying furniture and decor for the pet's home.

## Phase 5: Longer Term Vision
- [ ] **AR Mode**: Play with your pet in your actual room.
