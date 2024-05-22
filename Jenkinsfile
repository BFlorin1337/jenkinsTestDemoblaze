pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14' // This should match the name given in Step 2
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/jenkinstesting.git'
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

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
            junit 'cypress/results/*.xml' // If you generate JUnit reports
        }
    }
}
