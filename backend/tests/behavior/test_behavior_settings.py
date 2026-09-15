from plonegovbr.socialmedia import PACKAGE_NAME
from plonegovbr.socialmedia import utils

import pytest
import transaction


class TestBehaviorSettings:
    name: str = f"{PACKAGE_NAME}.settings"

    @pytest.mark.parametrize("role,path", (["anonymous", "/"], ["manager", "/"]))
    def test_inherit_endpoint(self, request_roles, role: str, path: str):
        request = request_roles(role)
        url = f"{path}?expand=inherit&expand.inherit.behaviors={self.name}"
        response = request.get(url)
        assert response.status_code == 200
        data = response.json()
        inherit = data["@components"]["inherit"]
        assert self.name in inherit
        behavior_info = inherit[self.name]
        assert "data" in behavior_info
        assert "from" in behavior_info
        behavior_data = behavior_info["data"]
        assert behavior_data["share_social_data"] is True
        assert behavior_data["facebook_app_id"] == ""
        assert behavior_data["facebook_username"] == "PloneBr"
        assert behavior_data["x_username"] == "ploneorgbr"
        assert len(behavior_data["social_links"]) == 4

    def behavior_data(self, request) -> dict:
        url = f"/?expand=inherit&expand.inherit.behaviors={self.name}"
        response = request.get(url)
        assert response.status_code == 200
        return response.json()["@components"]["inherit"][self.name]["data"]

    @pytest.mark.parametrize(
        "field,value",
        [
            ("share_social_data", False),
            ("facebook_app_id", "123456789"),
        ],
    )
    def test_patch_site(self, manager_request, field: str, value: bool | str):
        response = manager_request.patch("/", json={field: value})
        assert response.status_code == 204
        assert self.behavior_data(manager_request)[field] == value

    def test_patch_social_links_updates_usernames(self, manager_request):
        social_links = [
            {
                "@id": "0b9f6a3e-2c1d-4e8f-9a7b-5c6d7e8f9a0b",
                "id": "x",
                "title": "X",
                "href": [{"@id": "https://x.com/plone", "title": "x.com/plone"}],
            },
        ]
        response = manager_request.patch("/", json={"social_links": social_links})
        assert response.status_code == 204
        behavior_data = self.behavior_data(manager_request)
        assert behavior_data["social_links"] == social_links
        assert behavior_data["x_username"] == "plone"
        # Facebook is no longer linked
        assert behavior_data["facebook_username"] == ""

    def test_add_social_link_from_python(self, portal, manager_request):
        links, added = utils.add_social_link(
            portal.social_links, "github", "https://github.com/plonegovbr", "GitHub"
        )
        assert added is True
        portal.social_links = links
        transaction.commit()
        social_links = self.behavior_data(manager_request)["social_links"]
        assert len(social_links) == 5
        assert social_links[-1] == utils.create_social_link(
            "github", "https://github.com/plonegovbr", "GitHub"
        )

    @pytest.mark.parametrize("portal_type", ("Plone Site",))
    def test_types_endpoint(self, manager_request, portal_type: str):
        url = f"/@types/{portal_type}"
        response = manager_request.get(url)
        assert response.status_code == 200
        data = response.json()
        fieldsets = {f["id"]: f for f in data["fieldsets"]}
        assert "social_media" in fieldsets
        fields = fieldsets["social_media"]["fields"]
        assert "share_social_data" in fields
        assert "facebook_app_id" in fields
        assert "social_links" in fields
        # Not in the schema
        assert "facebook_username" not in fields
        assert "x_username" not in fields
