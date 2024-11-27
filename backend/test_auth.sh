#!/bin/bash

BASE_URL="http://localhost:8000/api/auth" # Adjust this to match your API's base URL

# Test Data
USERNAME="testuser"
EMAIL="testuser@example.com"
PASSWORD="securepassword123"

# Test Registration
echo "Testing registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register/" \
  -H "Content-Type: application/json" \
  -d '{
        "username": "'"$USERNAME"'",
        "email": "'"$EMAIL"'",
        "password": "'"$PASSWORD"'"
    }')

echo "Registration Response:"
echo "$REGISTER_RESPONSE"
echo ""

# Test Login
echo "Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login/" \
  -H "Content-Type: application/json" \
  -d '{
        "username": "'"$USERNAME"'",
        "password": "'"$PASSWORD"'"
    }')

ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access')
REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.refresh')

echo "Login Response:"
echo "$LOGIN_RESPONSE"
echo ""

# Test Access to Protected Endpoint
if [[ -n "$ACCESS_TOKEN" && "$ACCESS_TOKEN" != "null" ]]; then
  echo "Testing access to protected endpoint with access token..."
  PROTECTED_RESPONSE=$(curl -s -X GET "http://localhost:8000/api/protected/" \
    -H "Authorization: Bearer $ACCESS_TOKEN")

  echo "Protected Endpoint Response:"
  echo "$PROTECTED_RESPONSE"
else
  echo "Login failed or token missing. Cannot test protected endpoint."
fi
