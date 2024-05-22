pipeline {
    agent any

    tools {
        nodejs "NodeJS 14"
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
                script {
                    def cypressOutput = sh(script: 'npx cypress run --reporter junit,json', returnStdout: true).trim()
                    currentBuild.result = cypressOutput.contains("All specs passed") ? 'SUCCESS' : 'FAILURE'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate --clean'
            }
        }
    }

    post {
        always {
            allure([includeProperties: true, jdk: '', results: [[path: 'allure-results']]])
            script {
                if (currentBuild.result == 'FAILURE') {
                    emailext body: 'Cypress tests have failed. Please check the build logs for details.\n\nAllure report: ${BUILD_URL}allure',
                        subject: 'Cypress Test Failed',
                        to: 'bocseflorin@yahoo.com'
                } else if (currentBuild.result == 'SUCCESS') {
                    emailext body: 'Cypress tests have passed successfully.\n\nAllure report: ${BUILD_URL}allure',
                        subject: 'Cypress Test Passed',
                        to: 'bocseflorin@yahoo.com'
                }
            }
        }
    }
}
