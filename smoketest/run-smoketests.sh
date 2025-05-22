#!/bin/bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

FRONTEND_URL="http://localhost:8080"
TIMEOUT=10
INTERVAL=1

# Cleanup function to bring down the stack
cleanup() {
  echo "Cleaning up Docker Compose stack..."
  docker compose down --volumes
}
trap cleanup EXIT

echo "Starting Docker Compose stack in ./$PWD..."
docker compose up -d --build
echo "Docker Compose stack started successfully."

# Wait for frontend to be reachable
echo "Waiting for frontend to be available at $FRONTEND_URL (timeout: ${TIMEOUT}s)..."
for ((i=0; i<TIMEOUT; i+=INTERVAL)); do
  if curl -fs "$FRONTEND_URL" > /dev/null; then
    echo "Frontend is up!"
    break
  fi
  sleep $INTERVAL
done

# Final check: fail if still unreachable
if ! curl -fs "$FRONTEND_URL" > /dev/null; then
  echo "Error: Frontend not reachable after ${TIMEOUT}s"
  exit 1
fi

