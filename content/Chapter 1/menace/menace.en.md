---
title: "1.5 MENACE: The Matchbox Learning Machine"
description: "Explore MENACE, the 1960s mechanical computer made from matchboxes that learned to play tic-tac-toe through reinforcement learning."
date: 2023-10-28
weight: 52
slug: "menace-matchbox-learning-machine"
---


MENACE (Machine Educable Noughts And Crosses Engine) was a mechanical computer built in 1961 by Donald Michie, a pioneering artificial intelligence researcher. This remarkable machine, constructed from 304 matchboxes and colored beads, could learn to play tic-tac-toe (noughts and crosses) through reinforcement learning—years before modern computers made such experiments commonplace.

## History and Context

### The Creator: Donald Michie

Donald Michie (1923-2007) was a British researcher who had worked on code-breaking during World War II alongside Alan Turing at Bletchley Park. Fifteen years after the war, Michie wanted to demonstrate the principles of machine learning and artificial intelligence, but faced a significant challenge: computers were not readily available for such experimental purposes in 1960.

### Origin of MENACE

MENACE was created as the result of a bet with a computer science colleague who claimed that such a learning machine was impossible. Michie took on the challenge, constructing a functional mechanical computer from matchboxes and beads as a "fun project" that later became an important demonstration tool.

Michie completed his seminal essay "Experiments on the mechanization of game-learning" in 1963, describing MENACE's operation and introducing the "BOXES" algorithm—one of the earliest documented reinforcement learning systems.

## How MENACE Works

### Physical Construction

MENACE consists of:
- **304 matchboxes**: Each glued together in an arrangement similar to a chest of drawers
- **Colored beads**: Each color represents a different move on the tic-tac-toe grid
- **V-shaped cards**: Placed at the front of each matchbox tray to randomly select a bead

Each matchbox is labeled with a code number corresponding to a specific game state. After eliminating duplicate arrangements (rotations and mirror images), exactly 304 unique configurations are needed to represent all possible game states where MENACE needs to make a move.

### Game Operation

{{% notice style="info" title="How to Play Against MENACE" %}}
1. **MENACE always plays first as O** (all matchboxes represent states from O's perspective)
2. **Find the current game state**: Locate the matchbox matching the current board configuration
3. **Shake and select**: Remove the tray and gently shake it so beads roll toward the V-shaped card
4. **The bead at the V-point is the chosen move**: Its color indicates which square to play
5. **Keep the matchbox ajar**: Leave used matchboxes slightly open with the selected bead aside
6. **Continue alternating turns** until the game ends
{{% /notice %}}

### The Learning Process

{{% notice style="tip" title="Reinforcement Mechanism" %}}
After each game, MENACE learns through a reward and punishment system:

**If MENACE wins:**
- All beads used in that game are returned to their matchboxes
- **Three additional beads** of each used color are added
- This makes winning moves more likely in future games

**If MENACE loses:**
- The beads used during the game are **permanently removed**
- This makes losing strategies less likely or impossible to repeat

**If the game is a draw:**
- Used beads are returned with **one additional bead** of each color
- Draws are mildly reinforced as acceptable outcomes
{{% /notice %}}

### Learning Curve

When playing against a player using optimal strategy, MENACE's performance steadily improves:

- **Initial games**: MENACE plays randomly, often losing
- **After ~20 games**: MENACE begins showing strategic preferences
- **After ~50+ games**: Against optimal play, MENACE consistently draws
- **Against random players**: MENACE learns to win most games

The learning is not perfectly linear—statistical variance means MENACE might occasionally make suboptimal choices, but over many games, optimal strategies emerge through statistical convergence.

## Theoretical Significance

### Reinforcement Learning Pioneer

MENACE implemented what would later be formalized as **reinforcement learning**:
- Starts with no predetermined strategy (equal beads in each box)
- Learns through trial and error
- Uses reward (adding beads) and punishment (removing beads) to adjust behavior
- Converges on optimal strategies through statistical learning

This approach predated and influenced modern reinforcement learning algorithms, including Q-Learning developed by Christopher Watkins decades later.

### Weight Initialization Parallel

The way MENACE starts with equal numbers of each colored bead mirrors **weight initialization** in modern neural networks. Both systems:
- Begin with relatively uniform starting conditions
- Adjust these weights/beads through experience
- Converge on optimal solutions through iterative learning

## Legacy and Impact

### Influence on AI Research

After MENACE's success, Donald Michie:
- Was invited to the US Office of Naval Research
- Was commissioned to build a BOXES-running program for an IBM computer at Stanford University
- Created a simulation of MENACE on a Ferranti Pegasus 2 computer
- Developed GLEE (Game Learning Expectimaxing Engine) in 1968 for cart-pole balancing

### Modern Recreations

MENACE has been recreated multiple times:
- **Matthew Scroggs** (University College London) built a functional replica in 2016
- This replica appeared on QI (BBC quiz show), the Royal Institution Christmas Lectures, and various science festivals
- This [interactive online version](https://www.mscroggs.co.uk/menace/) allows anyone to play against a virtual MENACE
- MENACE is used as a teaching tool for demonstrating reinforcement learning concepts

MENACE has been referenced in:
- Fred Saberhagen's 1963 short story "Without A Thought"
- Thomas J. Ryan's 1977 novel "The Adolescence of P-1"
- Naomi Alderman's 2023 book "The Future"

## Try It Yourself

You can experience MENACE in action through these resources:


🎮 **[Play against MENACE online](https://www.mscroggs.co.uk/menace/)** - Interactive simulation by Matthew Scroggs

📺 **[Watch MENACE in action](https://www.youtube.com/watch?v=R9c-_neaxeU)** - Excellent video explanation by Matt Parker (Stand-up Maths)

{{< youtube "R9c-_neaxeU" >}}


🏗️ **[Build your own MENACE](https://www.mscroggs.co.uk/blog/94)** - Detailed instructions for constructing a physical MENACE

📄 **[Read the original paper](https://doi.org/10.1093/comjnl/6.3.232)** - Michie's 1963 publication in The Computer Journal


## Key Concepts Demonstrated

{{% notice style="warning" title="What MENACE Teaches Us" %}}
1. **Machine learning doesn't require computers**: The principles can be demonstrated with physical components
2. **Reinforcement learning is powerful**: Learning from outcomes (win/lose/draw) without explicit instruction
3. **Statistical convergence**: Even with randomness, optimal strategies emerge over time
4. **Historical precedent**: Modern AI concepts have deep historical roots
5. **Accessible demonstration**: Complex AI principles can be understood through tangible, physical systems
{{% /notice %}}

## Conclusion

MENACE stands as a testament to the ingenuity of early AI researchers and demonstrates that the fundamental principles of machine learning—learning from experience, trial and error, and reinforcement—can be implemented even without modern digital computers. Donald Michie's matchbox machine continues to inspire and educate new generations about the foundations of artificial intelligence and machine learning.

The elegance of MENACE lies not just in its clever mechanical implementation, but in how clearly it illustrates the core concepts that drive modern AI systems. When today's neural networks adjust their weights through backpropagation, they're following the same fundamental principle that MENACE demonstrated with colored beads in 1961: learn from outcomes, reinforce what works, and eliminate what doesn't.

## References and Further Reading

- [MENACE - Wikipedia](https://en.wikipedia.org/wiki/Matchbox_Educable_Noughts_and_Crosses_Engine)
- [Michie, D. (1963). "Experiments on the Mechanization of Game-Learning Part I"](https://doi.org/10.1093/comjnl/6.3.232), The Computer Journal, 6(3), 232-236
- [Interactive MENACE by Matthew Scroggs](https://www.mscroggs.co.uk/menace/)
- [How to Build MENACE](https://www.mscroggs.co.uk/blog/94)
- [Video: MENACE Explained (Stand-up Maths)](https://www.youtube.com/watch?v=R9c-_neaxeU)
