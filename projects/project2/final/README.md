# Project 2 - Anything

## Artist Statement

_Flames of Conquest_ is a two-player turn-based strategy game about medieval warfare.

Inspired by other video games of the same sort such as _Fire Emblem_ or _Age of Empires_, but also by classic board games like chess and _Stratego_, I wanted to create an engaging experience that encouraged tactical thinking and favored replayability. I wanted my game to have a good amount of depth so that new players could have fun with it, but also that more experienced players could keep discovering new strategies as they played. More than simply making a game, I wanted to make a fun and interesting game that anyone interested in strategy could enjoy.

On a technical level, I am proud to say that I successfully implemented the turn and grid systems on which most of the game heavily relies, but also a functional semi-random map generation system that makes each round unique. I was also able to implement special abilities for each type of unit, making the game much more diversified and giving it an additional layer of depth. I think I have also succeeded on an artistic level, mainly because of the feedback from those who tested the game, which was overwhelmingly positive, but also simply because of my own perception of the project. A frequent comment I received was that the game had real depth and strategy built into it. This is exactly what I was going for, so it makes me think it safe to say that I did indeed reach my goal.

## How to Play

### Basics

#### Objective

The main objective of the game is to defeat all three enemy lords, represented on the battlefield by units with crown icons. To do so, the player will have to manage armies and think strategically to outmaneuver their opponent.

#### Controlling Units

To control their units, the players will first need to select them by clicking on them and will then be able to use WASD or the arrow keys to move them on the board. To deselect a selected unit, they will be able to simply click on it once more. Special options such as attacking, healing or capturing will appear only when available and are activated by clicking on their respective icons. If a unit is grayed out, this means it has done everything it could for this turn and can no longer be selected until the next turn.

#### Purchasing Units

During the game, players will be able to purchase new units. To do so, they will need to click on the "Buy" button and then click on one of the unit types displayed in the shop menu. If they have sufficient funds, the shop menu will be closed and possible locations for the new unit to appear will be displayed on the map in the form of icons representing the unit's type.

#### Defeating Units

When a unit gets attacked to the point where its Defense reaches 0 or less, it is defeated and disappear from the map. Defeating a unit gives half of its cost in currency to the player who defeated it. Even though they cannot be purchased, defeating a Lord is worth 150 \$.

#### Popups

At some points of the game, popup windows may appear to announce special events. Popup windows are not clickable and require the player to press one of the keys indicated in [BRACKETS] to interact with them.

#### Ending Turns

Once all of their units are grayed out and can't do anything else or once they have decided that they were done with their turn, players will need to click the "End Turn" button to end their turn and begin their opponent's.

#### Optimal Resolution

The game is optimised for a window resolution of 1920 x 940 pixels. Other resolutions may possibly experience some minor issues with map generation.

### Units

Each player will be able to purchase new units from their "Buy" menu. Each type of unit has different stats and special abilities that make it useful in different scenarios. Special units cannot be purchased by default: the player will need to capture a specific structure to unlock them.

- **Lord:** A noble leading his personal guard into battle. Lords have high offense and very high defense but cannot be purchased, so you should think twice before sending them out on the battlefield. They can capture neutral or enemy structures.
- **Infantry:** Standard foot soldiers. With low offense and average defense, infantry is the bread and butter of any army.
- **Cavalry:** Mounted units with high mobility. Cavalry has average offense and average defense but high movement.
- **Archers:** Ranged units. Archers have high offense and low defense but can attack from 2 squares away.
- **Heavy:** Infantry clad in heavy armor. Heavy units have low offense but very high defense and reduce the damage of all nonmagical attacks by 2.
- **Mages (Special):** Powerful practitioners of the arcane arts. Mages have very high offense and low defense and can attack from 2 squares away. Their magical attacks ignore Heavy units’ damage reduction.
- **Priests (Special):** Servants of God blessed with divine power. Priests have average offense and average defense but can heal ally units. Their magical attacks ignore Heavy units’ damage reduction.
- **Dragon Riders (Special):** Valorous knights mounted on fierce creatures. Dragon Riders have high offense and average defense and are not hindered by water, mountains or forests.

#### Stats

Each unit has three base stats. These stats determine their capabilities in combat.

- **Offense:** Indicated by the number in the red gem, Offense is the amount of damage a unit deals its target every time it attacks.
- **Defense:** Indicated by the number in the blue shield, Defense is the amount of damage a unit can take before being defeated and disappearing from the map. If the number is displayed in red, this means that the unit's Defense is not at its maximum and that it could be healed by a Priest.
- **Movement:** Indicated by the number in the green arrow, Movement is the maximum number of tiles a unit can move every turn. Units cannot move after taking an action such as attacking an enemy, healing an ally, or capturing a structure.

#### Currency

Each player starts with 300 \$. This currency can be used to purchase new units to replenish their army. Players receive 150 \$ at the beginning of each of their turns.

### Structures

Four types of structures will be placed on the map. These structures are strategic locations that can be captured by Lord units. Except for Castles, capturing a structure will unlock a new type of unit for the player who captures it as long as it remains under their control. All structures can be used as a location for new units to appear.

- **Castles:** Each player starts with one castle (which they control) on their side of the map. Castles are not linked to any type of unit in particular.
- **Lair:** The Lair starts as a neutral structure and can be on either side of the map. Controlling the Lair unlocks Dragon Rider units.
- **Tower:** The Tower starts as a neutral structure and can be on either side of the map. Controlling the Tower unlocks Mage units.
- **Church:** The Lair starts as a neutral structure and is always near the middle of the map. Controlling the Church unlocks Priest units.

### Terrain

The map of _Flames of Conquest_ is made up of randomly-generated tiles, which can be of one of seven types:

- **Plains:** Plains are the default type of terrain. They have no special effect.
- **Road:** Road tiles exist to ensure that there is always a clear path between both castles. They have no special effect.
- **Bridge:** Bridge tiles exist to make sure that the players can always cross the river. They have no special effect.
- **Forest:** Forest tiles are dangerous to traverse. Units (other than Dragon Riders) that land on a forest tile have a 25% chance of encountering bandits. They can then choose to pay their fee or to try and fight them.
- **Mountains:** Mountain tiles are difficult terrain for horses to move through. They cannot be crossed by Cavalry units.
- **Water:** Water tiles form a river that goes across the map. They cannot be crossed by units (other than Dragon Riders).
- **Structure:** Structure tiles cannot be crossed by any type of unit. When controlled by a player, they serve as spawn points for new units.

## Attribution

All icons except for the offense, defense, and movement icons (made by me) were taken from **FontAwesome** (fontawesome.com) under Creative Commons license.

All music tracks were made by me.

All sound effects were taken from **Freesound** (freesound.org) under Creative Commons license. Here are the users credited for each of the sound effects:

Attack: user **Abyssmal**  
Magic attack: user **SilverIllusionist**  
Heal: user **ryusa**  
Conquest: user **ryusa**  
Lord defeat: user **Kneeling**  
Select/spawn unit: user **ryusa**  
Bandits: user **magnuswaker**  
Pay: user **Anthousai**
