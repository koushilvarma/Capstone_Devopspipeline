pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-demo:%BUILD_NUMBER% .'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl set image deployment/devops-demo devops-demo=devops-demo:%BUILD_NUMBER%'
            }
        }

        stage('Wait for Deployment') {
            steps {
                bat 'kubectl rollout status deployment/devops-demo --timeout=120s'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl get pods'
                bat 'kubectl get service devops-demo-service'
            }
        }
    }

    post {
        success {
            echo '========================================='
            echo ' DEPLOYMENT SUCCESSFUL!'
            echo ' Application deployed to Kubernetes.'
            echo '========================================='
        }

        failure {
            echo 'Deployment failed. Check the console output.'
        }
    }
}
