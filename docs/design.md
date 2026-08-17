Only eyes and mouth.
Stroke it, feed it, sing to it, clean it

TODO
Pet stats tick down while phone is off or app is closed
Store player and pet changes and stats

xp
Unlocks:
Feeding
Cleaning
Playing
Treats
Birthday
Teach it tricks / train it


1. Emotional States — Realistic and Game-Useful
   Here’s a comprehensive list of emotions, needs, and states drawn from real ethology (animal behaviour science), simplified for a game design system.
   Grouped by category for clarity.

🩷 Core Emotional States
Category
Examples
Description / Notes
Happiness / Contentment
happy, joyful, playful, relaxed, affectionate
Default “good” state; relaxed body, wagging tail, soft eyes, responsive to interaction.
Love / Bonding
trusting, loyal, attached, protective
Builds through consistent positive care; tied to “affection” stat.
Curiosity / Interest
curious, alert, engaged
Investigates new items, sounds, or smells. Easily triggered by player interactions or new toys.
Excitement / Anticipation
eager, expectant
When about to play, go for walk, or be fed. Animated, tail wagging, pacing.



Negative / Stress States
Category
Examples
Description / Notes
Fear / Anxiety
scared, startled, cautious, trembling, hiding
Triggered by loud sounds, sudden motion, or separation. Dog seeks safe space or shows avoidance.
Sadness / Depression
lonely, neglected, tired, withdrawn
Prolonged lack of interaction or comfort; low energy, whines softly, sleeps more.
Frustration
bored, restless, needy
Happens when needs unmet (no toys, hunger, ignored). May bark, scratch, or whine.
Anger / Irritation
defensive, growly, nipping
Rare, only if persistently overstimulated or frightened. Could be used sparingly for realism.
Stress / Overstimulation
panting, pacing, restless
Triggered by too much noise, movement, or over-petting. Needs cooldown time.



Physiological / Bodily States
Category
Examples
Description / Notes
Hunger / Fullness
hungry, content, overfed
Drives motivation for food. Hunger lowers mood; fullness improves it temporarily.
Thirst
thirsty, hydrated
Subtle but can impact comfort or energy.
Fatigue / Energy
sleepy, energetic, exhausted
Energy influences playfulness and mood.
Temperature Comfort
cold, hot, cozy
Could be linked to weather/time of day simulation or environment.
Health / Sickness
healthy, ill, injured
Optional deeper layer for nurturing gameplay.



Special Personality-Linked Emotions
Category
Examples
Description / Notes
Pride
proud, confident
After mastering tricks or positive reinforcement.
Guilt / Shame (anthropomorphized)
guilty, remorseful
Responds to scolding or player feedback.
Protectiveness / Jealousy
jealous, possessive
Triggered if pet sees “attention” going elsewhere (another pet, app activity).
Empathy / Concern
worried, watchful
May detect player sadness via mic tone or inactivity and react soothingly.



Additional Emotional States from Other Animals (if you include others)
Animal
Unique Emotional States
Cats
aloof, smug, overstimulated, predatory focus, contempt, curiosity spikes
Birds
vocal joy, mimic interest, fear-freeze, territorial alert
Small mammals (rabbits, hamsters)
cautious curiosity, comfort-nuzzle, panic freeze, nesting comfort
Reptiles (anthropomorphized)
basking contentment, wary alert, hunger-driven aggression



2. Mobile Sensors and Environmental Reactions
   You can make the pet aware of the player’s environment in subtle ways using smartphone sensors.
   Here’s how:
   Sensor
   What It Detects
   Possible Emotional Response
   Microphone
   Loud noises (claps, shouting, cars, wind)
   Pet becomes scared or hides. Long-term loudness = stress. Calm background = relaxed.
   Accelerometer / Gyroscope
   Movement, shaking, speed
   Gentle movement = playful; fast shaking = frightened; stationary for long = sleepy or relaxed.
   GPS + Motion
   Player is walking, running, or stationary
   Walking → pet excited; running → playful; driving → pet curls up quietly.
   Time of Day
   System clock
   Night = pet sleepy; morning = active; evening = cuddly.
   Touch Input
   Player tapping / stroking screen
   Increases affection, happiness. Too fast or harsh = overstimulation.
   Camera (optional)
   Light levels or facial emotion detection
   Dark → sleepy; bright → alert. Optional: detect smiling = dog wags tail.
   Device Orientation
   Upside down, portrait, flat
   Flat = sleeping beside you; upright = paying attention; upside down = confusion.
   App Usage / Idle Time
   Periods of neglect
   Pet gets lonely, seeks attention through notifications or sad eyes.



3. Gameplay Implications
   Emotional System Design Idea
   You could model the emotional system as:
   Mood = (Happiness + Energy + Comfort + Affection - Fear - Stress - Boredom)


Mood slowly decays toward neutral unless player interacts.


Then layer it with short-term emotions (momentary states) and long-term disposition (personality tendencies).

Example: Player Actions Affecting Emotions
Action
Immediate Effect
Long-term Effect
Feeding
+Happiness, +Trust, -Hunger
Builds affection over time
Playing
+Excitement, +Happiness
Builds bond, reduces boredom
Ignoring
-Happiness, +Loneliness
Reduces trust if prolonged
Scolding
+Fear, -Trust
Useful only if behavioral correction needed
Petting (mic/touch)
+Comfort, +Affection
Boosts long-term bond
Loud environment
+Stress
May hide or whimper
Calm, consistent care
+Trust, +Security
Pet develops stable temperament

Bonus Ideas for Immersion
Mood Soundscape: background ambience subtly shifts with pet mood.


Pet Diary: logs “Today you made me happy!” or “I missed you when it was noisy.”


Weather API Integration: if it’s raining, pet reacts (e.g., sleepy or anxious).


Sleep Sync: pet sleeps when user’s local time is night (passive care loop).


Voice Tone Detection: rough detection of pitch or loudness of your voice to influence pet’s comfort level (no speech-to-text needed).

