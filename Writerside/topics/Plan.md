# Plan

## Planned Features
- Team randomization
- Team Resource distrobution
- Animated Wheel of fortune to spread out items
- admin Dashboard
  - start the resource distoribution
  - manage teams
  - randomize the teams
  - other manual data entry/modification
- able to log if the team has things automated
- Valtarhud integration???!?



```mermaid
flowchart LR
    subgraph server
        direction LR
        
        Traefik <--> A[Server] <-- "drizzle" --> DB
        A --> Redis
        A <--> Cache[Cache Service] <--> Redis
         
    end
    
    subgraph Client
        B[Client]
        
    end
    
    B <--> Traefik

```

Start typing here...