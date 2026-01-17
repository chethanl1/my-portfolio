# Complete AWS EKS Deployment Guide (Node.js + Docker + CI/CD)

## 📁 Project Structure
```
my-nodejs-app/
├── .github/
│   └── workflows/
│       └── deploy-to-eks.yml       # CI/CD Pipeline
├── k8s/
│   ├── deployment.yml              # Kubernetes Deployment
│   └── service.yml                 # Kubernetes Service
├── src/
│   └── index.js                    # Your Node.js app
├── Dockerfile                      # Docker image config
├── .dockerignore
├── package.json
└── README.md
```

---

## 🐳 Step 1: Create Dockerfile

**File: `Dockerfile`**
```dockerfile
# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start app
CMD ["node", "src/index.js"]
```

**File: `.dockerignore`**
```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
```

---

## 📦 Step 2: Sample Node.js App

**File: `src/index.js`**
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from EKS!', 
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**File: `package.json`**
```json
{
  "name": "my-nodejs-app",
  "version": "1.0.0",
  "description": "Node.js app for EKS deployment",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## ☸️ Step 3: Kubernetes Manifests

**File: `k8s/deployment.yml`**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
  labels:
    app: nodejs-app
spec:
  replicas: 3  # Number of pods
  selector:
    matchLabels:
      app: nodejs-app
  template:
    metadata:
      labels:
        app: nodejs-app
    spec:
      containers:
      - name: nodejs-app
        image: <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/nodejs-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: APP_VERSION
          value: "1.0.0"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

**File: `k8s/service.yml`**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nodejs-app-service
spec:
  type: LoadBalancer  # Creates AWS ELB
  selector:
    app: nodejs-app
  ports:
    - protocol: TCP
      port: 80         # External port
      targetPort: 3000 # Container port
```

---

## 🚀 Step 4: GitHub Actions CI/CD Pipeline

**File: `.github/workflows/deploy-to-eks.yml`**
```yaml
name: Deploy to AWS EKS

on:
  push:
    branches:
      - main  # Trigger on push to main

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: nodejs-app
  EKS_CLUSTER_NAME: my-eks-cluster

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      # Step 1: Checkout code
      - name: Checkout code
        uses: actions/checkout@v3
      
      # Step 2: Configure AWS credentials
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      # Step 3: Login to Amazon ECR
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      # Step 4: Build Docker image
      - name: Build Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
      
      # Step 5: Push to ECR
      - name: Push image to ECR
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
      
      # Step 6: Update kubeconfig for EKS
      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig --region ${{ env.AWS_REGION }} --name ${{ env.EKS_CLUSTER_NAME }}
      
      # Step 7: Replace image in deployment
      - name: Update Kubernetes deployment
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          # Update image in deployment.yml
          sed -i "s|<AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/nodejs-app:latest|$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG|g" k8s/deployment.yml
      
      # Step 8: Deploy to EKS
      - name: Deploy to EKS
        run: |
          kubectl apply -f k8s/deployment.yml
          kubectl apply -f k8s/service.yml
          kubectl rollout status deployment/nodejs-app
      
      # Step 9: Get service URL
      - name: Get LoadBalancer URL
        run: |
          echo "Waiting for LoadBalancer..."
          kubectl get service nodejs-app-service
```

---

## 🔐 Step 5: GitHub Secrets Setup

Add these secrets in GitHub repo: **Settings → Secrets and variables → Actions**

1. **`AWS_ACCESS_KEY_ID`** - Your AWS access key
2. **`AWS_SECRET_ACCESS_KEY`** - Your AWS secret key

---

## 🛠️ Step 6: AWS Setup (What you'd do with an AWS account)

### 6.1 Create ECR Repository
```bash
aws ecr create-repository \
  --repository-name nodejs-app \
  --region us-east-1
```

### 6.2 Create EKS Cluster
```bash
# Install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin

# Create cluster (takes 15-20 minutes)
eksctl create cluster \
  --name my-eks-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4 \
  --managed
```

### 6.3 Create IAM User for GitHub Actions
```bash
# Create user
aws iam create-user --user-name github-actions-eks

# Attach policies
aws iam attach-user-policy \
  --user-name github-actions-eks \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

aws iam attach-user-policy \
  --user-name github-actions-eks \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess

# Create access keys
aws iam create-access-key --user-name github-actions-eks
```

---

## 🔄 Complete Flow (What Happens Automatically)

```
1. You make code changes
   ↓
2. git add . && git commit -m "update" && git push
   ↓
3. GitHub Actions triggers:
   ├─ Checks out code
   ├─ Configures AWS credentials
   ├─ Builds Docker image
   │  └─ docker build -t nodejs-app:v1.2.3 .
   ├─ Tags image
   │  └─ docker tag nodejs-app:v1.2.3 123456.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:v1.2.3
   ├─ Pushes to ECR
   │  └─ docker push 123456.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:v1.2.3
   ├─ Updates kubeconfig
   │  └─ aws eks update-kubeconfig --name my-eks-cluster
   ├─ Applies Kubernetes manifests
   │  └─ kubectl apply -f k8s/
   └─ Rolls out new version
      └─ kubectl rollout status deployment/nodejs-app
   ↓
4. EKS pulls new image from ECR
   ↓
5. Old pods are replaced with new ones (zero downtime)
   ↓
6. App is live at LoadBalancer URL!
```

---

## 📊 Monitoring & Verification

```bash
# Check pods
kubectl get pods

# Check deployments
kubectl get deployments

# Check services
kubectl get services

# Get LoadBalancer URL
kubectl get service nodejs-app-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'

# View logs
kubectl logs -f deployment/nodejs-app

# Scale deployment
kubectl scale deployment nodejs-app --replicas=5
```

---

## 🎯 Key Differences from Firebase Deployment

| Aspect | Firebase | AWS EKS |
|--------|----------|---------|
| **Infrastructure** | Managed (serverless) | You manage K8s cluster |
| **Scaling** | Automatic | Configure autoscaling |
| **Container** | No Docker needed | Docker required |
| **Complexity** | Simple | More complex |
| **Cost** | Pay per use | Pay for EC2 instances |
| **Control** | Limited | Full control |

---

## 💰 Cost Estimate (AWS)

- **EKS Cluster**: $0.10/hour (~$73/month)
- **EC2 Nodes**: t3.medium × 3 = ~$75/month
- **LoadBalancer**: ~$20/month
- **ECR Storage**: ~$0.10/GB/month
- **Total**: ~$170-200/month minimum

---

## 🔥 Quick Test Locally

```bash
# Build image
docker build -t nodejs-app .

# Run container
docker run -p 3000:3000 nodejs-app

# Test
curl http://localhost:3000
curl http://localhost:3000/health
```

---

## ✅ Summary

**What you created:**
1. ✅ Dockerfile - Containerizes your app
2. ✅ Kubernetes manifests - Define how app runs in K8s
3. ✅ GitHub Actions workflow - Automates everything
4. ✅ CI/CD Pipeline - Push code → Auto deploy

**The flow:**
```
Code → GitHub → Build Docker → Push to ECR → Deploy to EKS → Live!
```

This is production-ready enterprise-level deployment! 🚀
