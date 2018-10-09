# Arcade Game Project

## How the Game Works
The user have a Player and Enemies. The goal of the player is to reach the water, without colliding into any one of the enemies. Once the player reaches the water the game is won!.

The gameplay rules are:
  -  The player can move left, right, up and down.
  - The enemies move in varying speeds on the paved block portion of the scene.
  - If the cards do not match, both cards are flipped face down.
  - When a the player collides with an enemy, the game is reset and the player moves back to the start square.
  - The score can increase each time the player reaches the water, and it can be reset to 0 when collision occurs in 3 times.

## Getting Started
Download the GitHub source code. Open the .css, js and html files with a text editor. To open the index.html file with any browser.

### Prerequisites

  - Any browser  It is supported by most web browsers including Chrome, Firefox, Safari, internet Explorer, Edge, Opera, etc.
  - Text editor.
  
### Built With

The memory game project uses three technologies: 

* CSS -  Cascading Style Sheets
* HTML - HyperText Markup Language 
* JavaScript - Object-Oriented Javascript.

### Development
The following functions were implemented:
```sh
On app.js file
```
* Enemy.prototype.update => Update the enemy's position and handles collision between Player and Enemy.
* Enemy.prototype.render => Draw the enemy on the screen.
* OwnPlayer.prototype.update => Update the player's position.
* OwnPlayer.prototype.render => Draw the player on the screen.
* OwnPlayer.prototype.handleInput => Receive user input, allowedKeys (the key which was pressed) and move the player according to that input.

License
----

Free Sofware



