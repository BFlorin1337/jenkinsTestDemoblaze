pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14' // Ensure this matches the configured tool name exactly
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BFlorin1337/jenkinsTestDemoblaze', credentialsId: 'your-credentials-id'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
}
