import requests

class UsersAPI:
    def __init__(self):
        self.base_url = "https://jsonplaceholder.typicode.com/users"

    def list_users(self):
        response = requests.get(self.base_url)
        response.raise_for_status()
        return response.json()

    def create_user(self, user_data):
        response = requests.post(self.base_url, json=user_data)
        response.raise_for_status()
        return response.json()

    def get_user(self, user_id):
        response = requests.get(f"{self.base_url}/{user_id}")
        response.raise_for_status()
        return response.json()

    def update_user(self, user_id, user_data):
        response = requests.patch(f"{self.base_url}/{user_id}", json=user_data)
        response.raise_for_status()
        return response.json()

    def delete_user(self, user_id):
        response = requests.delete(f"{self.base_url}/{user_id}")
        response.raise_for_status()
        return response.status_code
