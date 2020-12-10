# Project 2 - Anything

## Artist Statement

_Flames of Conquest_ is a turn-based strategy game about medieval warfare.

The game is optimised for a window resolution of 1920 x 940 pixels. Other resolutions may experience some minor issues with map generation.

## How to Play

### Objective

The main objective of the game is to defeat all three enemy lords. To do that, the player will have to manage armies and think strategically to outmaneuver their opponent.

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
- **Road:** Road tiles exist to ensure that there is always a clear path between bot castles. They have no special effect.
- **Bridge:** Bridge tiles exist to make sure that the players can always cross the river. They have no special effect.
- **Forest:** Forest tiles are dangerous to traverse. Units (other than Dragon Riders) that land on a forest tile have a 20% chance of encountering bandits. They can then choose to pay their fee or to try and fight them.
- **Mountains:** Mountain tiles are difficult terrain for horses to move through. They cannot be crossed by Cavalry units.
- **Water:** Water tiles form a river that goes across the map. They cannot be crossed by units (other than Dragon Riders).
- **Structure:** Structure tiles cannot be crossed by any type of unit. When controlled by a player, they serve as spawn points for new units.

## Attribution

All icons except for the offense, defense, and movement icons (made by me) were taken from **FontAwesome** (fontawesome.com) under Creative Commons license.

All music tracks were made by me.

All sound effects were taken from **Freesound** (freesound.org) under Creative Commons license.

Attack: user **Abyssmal**  
Magic Attack: user **SilverIllusionist**  
Heal: user **ryusa**  
Conquest: user **ryusa**  
Lord defeat: user **Kneeling**  
Select/spawn unit: user **ryusa**  
Bandits: user **magnuswaker**  
Pay: user **Anthousai**
