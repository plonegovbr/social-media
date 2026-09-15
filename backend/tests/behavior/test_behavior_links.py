import pytest


#: The UID of the demo content's ``/profiles`` Document.
PROFILES_UID = "7267eca4af2f4d0ba7d24fec73bc2952"


class TestBehaviorLinks:
    @pytest.mark.parametrize("role,path", (["manager", "/profiles"],))
    def test_added_to_content(self, request_roles, role: str, path: str):
        request = request_roles(role)
        response = request.get(path)
        assert response.status_code == 200
        data = response.json()
        assert len(data["social_links"]) == 4

    def test_search_summary(self, manager_request):
        # An anonymous search does not find the demo content.
        response = manager_request.get("/@search", params={"UID": PROFILES_UID})
        assert response.status_code == 200
        items = response.json()["items"]
        assert len(items) == 1
        stored = manager_request.get("/profiles").json()["social_links"]
        assert items[0]["social_links"] == stored

    def test_search_summary_follows_a_patch(self, manager_request):
        social_links = [
            {
                "@id": "github",
                "id": "github",
                "title": "GitHub",
                "href": [{"@id": "https://github.com/plonegovbr", "title": "GitHub"}],
            },
        ]
        response = manager_request.patch(
            "/profiles", json={"social_links": social_links}
        )
        assert response.status_code == 204
        response = manager_request.get("/@search", params={"UID": PROFILES_UID})
        assert response.json()["items"][0]["social_links"] == social_links

    @pytest.mark.parametrize("portal_type", ("Document",))
    def test_types_endpoint(self, manager_request, portal_type: str):
        url = f"/@types/{portal_type}"
        response = manager_request.get(url)
        assert response.status_code == 200
        data = response.json()
        fieldsets = {f["id"]: f for f in data["fieldsets"]}
        assert "social_media" in fieldsets
        fields = fieldsets["social_media"]["fields"]
        assert "social_links" in fields
