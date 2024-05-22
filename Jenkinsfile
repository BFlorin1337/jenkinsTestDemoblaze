pipeline {
    agent any

    tools {
        nodejs "NodeJS 14"
        allure 'Allure'
    }

    environment {
        ALLURE_VERSION = '2.13.8'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/BFlorin1337/jenkinsTestDemoblaze', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }

        stage('Generate Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            junit 'allure-report/*.xml'
        }
    }
}
