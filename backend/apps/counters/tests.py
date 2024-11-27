from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Counter
from rest_framework_simplejwt.tokens import RefreshToken


class CounterAPITests(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser", password="password123"
        )

        # Obtain JWT token for the user
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)

        # Authenticate client
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        # Create another user
        self.other_user = User.objects.create_user(
            username="otheruser", password="password456"
        )

        # Create counters for the test user
        self.counter = Counter.objects.create(
            name="Test Counter", value=10, type=0, created_by=self.user
        )
        self.url = f"/api/counters/{self.counter.id}/"

    def test_list_counters(self):
        response = self.client.get("/api/counters/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 1)
        self.assertEqual(response.data["data"][0]["name"], "Test Counter")

    def test_create_counter(self):
        payload = {"name": "New Counter", "type": 2, "created_by": self.user.id}
        response = self.client.post("/api/counters/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"]["name"], "New Counter")
        self.assertEqual(response.data["data"]["type"], 2)

    def test_retrieve_counter(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"]["name"], "Test Counter")

    def test_update_counter(self):
        payload = {"name": "Updated Counter"}
        response = self.client.put(self.url, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"]["name"], "Updated Counter")

    def test_delete_counter(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Counter.objects.count(), 0)

    def test_increment_counter(self):
        response = self.client.post(f"{self.url}increment/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.counter.refresh_from_db()
        self.assertEqual(self.counter.value, 11)

    def test_decrement_counter(self):
        response = self.client.post(f"{self.url}decrement/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.counter.refresh_from_db()
        self.assertEqual(self.counter.value, 9)

    def test_retrieve_other_user_counter(self):
        # Counter created by another user
        other_counter = Counter.objects.create(
            name="Other User Counter", value=5, type=0, created_by=self.other_user
        )
        url = f"/api/counters/{other_counter.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_increment_other_user_counter(self):
        other_counter = Counter.objects.create(
            name="Other User Counter", value=5, type=0, created_by=self.other_user
        )
        url = f"/api/counters/{other_counter.id}/increment/"
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
