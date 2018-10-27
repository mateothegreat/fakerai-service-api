# faker.ai REST API Service
https://faker.ai is a public service for generating random data over HTTP REST.

This service relies heavily (for now) on the faker.js library (https://github.com/Marak/faker.js).

# Generate Random Data

```
$ curl -XPOST -d '["{{company.companyName}} ({{internet.email}})","{{image.avatar}}"]' -H 'Content-type: application/json' 'https://api.faker.ai/pattern?n=10&unique=true'

{
    "status": true,
    "data": [
        {
            "pattern": "{{company.companyName}} ({{internet.email}})",
            "unique": true,
            "requestedLength": 10,
            "data": [
                "Strosin Group (Lavina.Schulist@hotmail.com)",
                "Littel Group (Vito_Herman39@yahoo.com)",
                "Wisozk, Grady and Kunze (Kianna.Jacobs96@hotmail.com)",
                "Homenick LLC (Janick76@hotmail.com)",
                "Boyer - Morar (Delfina.Stoltenberg72@hotmail.com)",
                "Waelchi, Veum and Lebsack (Dawson.Williamson30@yahoo.com)",
                "Harvey and Sons (Madisen_Moen53@hotmail.com)",
                "MacGyver - Lakin (Buford33@yahoo.com)",
                "Gleason, Hackett and Carter (Dorothy_Boyle48@yahoo.com)",
                "Weissnat - Kub (Carolyne_Reichert@yahoo.com)"
            ]
        },
        {
            "pattern": "{{image.avatar}}",
            "unique": true,
            "requestedLength": 10,
            "data": [
                "https://s3.amazonaws.com/uifaces/faces/twitter/gauravjassal/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/toddrew/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/vikasvinfotech/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/carlosm/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/j04ntoh/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/michalhron/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/victor_haydin/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/rawdiggie/128.jpg",
                "https://s3.amazonaws.com/uifaces/faces/twitter/tjrus/128.jpg"
            ]
        }
    ]
}
```
