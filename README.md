# MY NOTE
```
1. This is the first time I code with Nestjs and joi validator
2. This is demo project so I don't have enough time to study libraries and creating a good project structure
```


# RUN PROJECT
1. docker network create demo-net
2. docker-compose up 


# API
## Product
1. Find All
```
endpoint: http://localhost:3000/products
method: GET
```
2. Create
```
endpoint: http://localhost:3000/products
method: POST
body example : {
    "productName": "123",
    "productCode": "12345"
}
```

## Order
1. Find
```
endpoint: http://localhost:3000/orders?limit=10&offset=1&orderType=furniture&orderStatus=success&orderId=2
method: GET
queries example: 
    limit=10 // this field is used for pagination
    offset=1 // this field is used for pagination
    orderType=furniture
    orderStatus=success
    orderId=2
```

2. Find by id
```
endpoint: http://localhost:3000/orders/:id
method: GET
```
3. Create
```
endpoint: http://localhost:3000/orders
method: POST
```

4. Update
```
endpoint: http://localhost:3000/orders/:id
method: PUT
```

5. Delete
```
endpoint: http://localhost:3000/orders/:id
method: DELETE
```
6. Report
```
http://localhost:3000/orders/report
method: GET
query example:
    startDate=2021-06-01
    endDate=2021-06-01
```