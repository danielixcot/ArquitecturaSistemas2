# Assignment 01 - Docker Balanceo de Carga (Round Robin) con Nginx
Daniel Fernando Ixcot Nimatuj 202308026

## Diagrama de la infraestructura

```mermaid
flowchart LR
  U[Usuario / Navegador] --> LB[Load Balancer lb]
  LB --> W1[Web Server 1 web1]
  LB --> W2[Web Server 2 web2]

  subgraph labnet
    LB
    W1
    W2
  end
```

## Comando para ejecutar la infraestructura
Luego de clonar Ingresar a la carpeta de 'balanceo de carga' y ejecutar

- docker compose up -d

## URL al link del balanceador
http://localhost:8080 
- Al recargar estara alternando entre web1 y web2
