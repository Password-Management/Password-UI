#!/bin/bash

# Function to check if Docker is installed
check_docker_installed() {
    if ! command -v docker &>/dev/null; then
        echo "Docker is not installed. Installing Docker..."
        install_docker
    else
        echo "Docker is installed."
        check_docker_running
    fi
}

# Function to install Docker on macOS
install_docker() {
    if ! command -v brew &>/dev/null; then
        echo "Homebrew is not installed. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi

    echo "Installing Docker using Homebrew..."
    brew install --cask docker

    echo "Starting Docker..."
    open -a Docker
    echo "Please wait for Docker to initialize."
    echo "You may need to authorize Docker in macOS System Preferences -> Security & Privacy."
}

# Function to check if Docker is running
check_docker_running() {
    if ! docker info &>/dev/null; then
        echo "Docker is installed but not running. Starting Docker..."
        open -a Docker
        echo "Please wait for Docker to initialize."
    else
        echo "Docker is running."
    fi
}

# Main script
check_docker_installed
