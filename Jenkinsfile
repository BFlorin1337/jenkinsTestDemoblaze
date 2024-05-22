pipeline {
    agent any

    tools {
        nodejs 'NodeJS 14' // Ensure this matches the configured tool name exactly
        allure 'Allure' // Ensure this matches the name configured in Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BFlorin1337/jenkinsTestDemoblaze', credentialsId: 'github-credentials'
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
                // Ensure Cypress generates a Cucumber JSON report, for example:
                // sh 'npx cypress run --reporter cypress-cucumber-preprocessor'
            }
        }
        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate --clean -o allure-results'
            }
            post {
                always {
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                }
            }
        }
        stage('Publish Cucumber Report') {
            steps {
                publishCucumberReports(
                    fileIncludePattern: '**/*.json', // Adjust this pattern to match your JSON report location
                    fileExcludePattern: '',
                    failedFeaturesNumber: 0,
                    failedScenariosNumber: 0,
                    skippedFeaturesNumber: 0,
                    skippedScenariosNumber: 0,
                    pendingFeaturesNumber: 0,
                    pendingScenariosNumber: 0,
                    undefinedScenariosNumber: 0,
                    missedStepsNumber: 0,
                    buildTime: '',
                    runWithCucumber: true
                )
            }
        }
    }
}
