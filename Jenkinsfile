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
                sh 'npm install cypress-multi-reporters --save-dev'
            }
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            junit '**/junit/*.xml'
            emailext attachmentsPattern: '**/junit/*.xml',
                body: 'Please check the attached JUnit XML files for test results.',
                subject: 'Cypress Test Results',
                to: 'bocseflorin@yahoo.com'
        }
    }
}