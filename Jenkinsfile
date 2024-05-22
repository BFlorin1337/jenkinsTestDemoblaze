pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14' // This should match the name given in Step 2
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BFlorin1337/jenkinsTestDemoblaze'
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

