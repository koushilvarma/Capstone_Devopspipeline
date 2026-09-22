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

        stage('Verify Kubernetes Connection') {
            steps {
                bat 'kubectl --kubeconfig="C:\\ProgramData\\Jenkins\\.kube\\config" get nodes'
                bat 'kubectl --kubeconfig="C:\\ProgramData\\Jenkins\\.kube\\config" get deployment devops-demo'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl --kubeconfig="C:\\ProgramData\\Jenkins\\.kube\\config" set image deployment/devops-demo devops-demo=devops-demo:%BUILD_NUMBER%'
            }
        }

        stage('Wait for Deployment') {
            steps {
                bat 'kubectl --kubeconfig="C:\\ProgramData\\Jenkins\\.kube\\config" rollout status deployment/devops-demo --timeout=120s'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl --kubeconfig="C:\\ProgramData\\Jenkins\\.kube\\config" get pods'
                bat 'kubectl --kubeconfig="C:\\ProgramData\\Jenkins\\.kube\\config" get service devops-demo-service'
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
