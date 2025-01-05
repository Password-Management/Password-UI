#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker not found. Installing Docker..."
  
  # Update package list and install dependencies
  sudo apt update
  sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

  # Add Docker's GPG key and repository
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  # Install Docker
  sudo apt update
  sudo apt install -y docker-ce docker-ce-cli containerd.io
  
  echo "Docker installed successfully."
else
  echo "Docker is already installed."
fi

# Check if Docker service is running
if ! systemctl is-active --quiet docker; then
  echo "Docker is not running. Starting Docker..."
  sudo systemctl start docker
  echo "Docker started successfully."
else
  echo "Docker is already running."
fi

# Enable Docker to start on boot
sudo systemctl enable docker

echo "Setup completed. Docker is installed and running."
