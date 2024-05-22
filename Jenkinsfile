pipeline {
    agent any
    tools {
        nodejs "NodeJS 14" // Adjust this to your NodeJS installation name
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
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --env allure=true --reporter cypress-multi-reporters --reporter-options configFile=reporter-config.json'
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
            emailext(
                to: 'bocseflorin@yahoo.com',
                subject: "Build ${currentBuild.fullDisplayName} - ${currentBuild.result}",
                body: "Check the Allure Report at ${env.BUILD_URL}allure/",
                attachLog: true,
                compressLog: true,
                mimeType: 'text/html'
            )
        }
    }
}
