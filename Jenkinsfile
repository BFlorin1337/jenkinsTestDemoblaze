pipeline {
    agent any

    tools {
        nodejs "NodeJS 14"
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

        stage('Install Tools') {
            steps {
                script {
                    allureHome = tool 'Allure'
                    env.PATH = "${allureHome}/bin:${env.PATH}"
                }
                sh 'npm install -g cucumber'
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

        stage('Run Cucumber Tests') {
            steps {
                sh 'cucumber-js'
            }
        }

        stage('Generate Cucumber Report') {
            steps {
                cucumber buildStatus: 'FAILURE',
                          fileIncludePattern: '**/*.json',
                          jsonReportDirectory: 'cucumber-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cucumber-report/*.json', allowEmptyArchive: true
            junit 'cucumber-report/*.xml'
        }
    }
}
