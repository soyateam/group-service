# Group-service

a service for managing the organizations groups

## Entities

### Group

The group entity will represent a single group.

```javascript
    kartoffelID: String, // id from kartoffel
    name: String,
    parent: String, // parent id from kartoffel (direct parent)
    ancestors: [String],// all ancestors ids
    children: [String],
    isMador: Boolean,
    unitName: String,
    peopleSum: Number,
    serviceType: {
        kevaSum: Number,
        hovaSum: Number
    },
    rankType: {
        aSum: Number,
        bSum: Number,
        cSum: Number
    },
    assignedCount: Number // assigned tasks
```

## API

| METHOD | ENDPOINT                   | DESCRIPTION                                                           | BODY                                                                               |
| ------ | :------------------------- | :-------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| GET    | `/api/group/:id`           | Get group by kartoffel id                                             |                                                                                    |
| GET    | `/api/group/children/:id?` | Get all children from parent id, if null get the first children level |                                                                                    |
| POST   | `/api/group/`              | Get groups by kartoffel ids                                           | `ids: [kartoffelId]`                                                               |
| POST   | `/api/group/unit`          | Get info about units by unit names                                    | `units: [String]`                                                                  |
| PUT    | `/api/group/:id`           | Update task count assigned by id                                      | `isCountGrow: Boolean` <br>(true - for assigned task, false - for unassigned task) |
