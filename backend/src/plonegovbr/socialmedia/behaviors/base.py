import json


OBJECT_LIST_DEFAULT_VALUE: list[dict] = []

OBJECT_LIST = json.dumps({
    "type": "array",
    "items": {
        "type": "object",
    },
})
