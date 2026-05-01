# Assignment 08 - Kubernetes

## Estudiante

**Nombre:** Daniel Fernando Ixcot Nimatuj -- 202308026

---
# Capturas

## Aplicación desplegada usando DNS local

<img width="1922" height="1041" alt="image" src="https://github.com/user-attachments/assets/a7caa334-bf67-49b5-a060-3ba8fdb3d3c9" />


```txt
http://app.daniel-ixcot.com:8081
```

---

## ArgoCD desplegado usando DNS local

<img width="1917" height="1041" alt="image" src="https://github.com/user-attachments/assets/4c65ed38-addc-408a-9ef0-0a134f482515" />

```txt
http://argo.daniel-ixcot.com:8081
```

---

# Configuración de ArgoCD con dominio local

## Dominio configurado:
```txt
http://argo.daniel-ixcot.com:8081
```
## Configuración DNS local:
```txt
127.0.0.1 argo.daniel-ixcot.com
```
## Manifiesto utilizado para ArgoCD (argocd-ingressroute.yaml):
```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: argocd-route
  namespace: argocd
spec:
  entryPoints:
    - web
  routes:
    - match: Host(`argo.daniel-ixcot.com`)
      kind: Rule
      services:
        - name: argocd-server
          port: 80
```
## Configuración adicional para acceso HTTP (argocd-cmd-params-cm.yaml):
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cmd-params-cm
  namespace: argocd
data:
  server.insecure: "true"
```
## Comando utilizado para aplicar la configuración:
```PowerShell
kubectl apply -f k8s/argocd-ingressroute.yaml
kubectl apply -f k8s/argocd/argocd-cmd-params-cm.yaml
kubectl rollout restart deployment argocd-server -n argocd
```
---

# Manifiestos YAML

## Namespace de aplicación

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: week4-app
```

---

## Deployment - week4-app

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: week4-app
  namespace: week4-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: week4-app
  template:
    metadata:
      labels:
        app: week4-app
    spec:
      containers:
        - name: week4-app
          image: week4-app:1.0
          imagePullPolicy: Never
          ports:
            - containerPort: 80
```

---

## Service - week4-app

```yaml
apiVersion: v1
kind: Service
metadata:
  name: week4-app-service
  namespace: week4-app
spec:
  selector:
    app: week4-app
  ports:
    - port: 80
      targetPort: 80
```

---

## IngressRoute - week4-app

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: week4-app-route
  namespace: week4-app
spec:
  entryPoints:
    - web
  routes:
    - match: Host(`app.daniel-ixcot.com`)
      kind: Rule
      services:
        - name: week4-app-service
          port: 80
```

---

## IngressRoute - ArgoCD

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: argocd-route
  namespace: argocd
spec:
  entryPoints:
    - web
  routes:
    - match: Host(`argo.daniel-ixcot.com`)
      kind: Rule
      services:
        - name: argocd-server
          port: 80
```

---

## Configuración ArgoCD insecure mode

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cmd-params-cm
  namespace: argocd
data:
  server.insecure: "true"
```

---

# Lista de comandos ejecutados

## Instalación y arranque de Minikube

```powershell
minikube start --driver=docker
kubectl get nodes
```

---

## Creación de namespaces

```powershell
kubectl create namespace argocd
kubectl create namespace traefik
kubectl create namespace week4-app
```

---

## Instalación de ArgoCD

```powershell
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

---

## Instalación de Traefik

```powershell
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm install traefik traefik/traefik --namespace traefik
```

---

## Construcción de imagen Docker

```powershell
minikube docker-env | Invoke-Expression
docker build -t week4-app:1.0 .
```

---

## Aplicación de manifiestos

```powershell
kubectl apply -f k8s/week4-app/deployment.yaml
kubectl apply -f k8s/week4-app/service.yaml
kubectl apply -f k8s/week4-app/ingressroute.yaml
kubectl apply -f k8s/argocd-ingressroute.yaml
kubectl apply -f k8s/argocd/argocd-cmd-params-cm.yaml
```

---

## Port Forward para Traefik

```powershell
kubectl port-forward -n traefik svc/traefik 8081:80
```

---

## Verificación de servicios

```powershell
kubectl get pods -A
kubectl get svc -A
kubectl get ingressroute -A
```

---

# Credenciales de ArgoCD

## Usuario:

```txt
admin
```

## Obtener contraseña:

```powershell
$pass = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($pass))
```

---

# Estructura del Proyecto

```txt
assignment-08/
│
├── README.md
├── Dockerfile
└── k8s/
    ├── week4-app/
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   └── ingressroute.yaml
    ├── argocd-ingressroute.yaml
    └── argocd/
        └── argocd-cmd-params-cm.yaml
```

---


