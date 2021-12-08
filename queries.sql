-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

    SELECT
        ProductName,
        c.CategoryName
    FROM Product as p
    LEFT JOIN Category as c
        ON p.categoryid = c.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

    SELECT
        o.id,
        s.CompanyName
    FROM "Order" as o
    LEFT JOIN Shipper as s
        ON o.shipvia = s.id
    WHERE o.orderdate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

    SELECT
        p.ProductName,
        od.quantity
    FROM Product as p
    JOIN OrderDetail as od
        ON p.id = od.productid
    WHERE od.OrderID = 10251
    ORDER BY p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

    SELECT
        o.Id as OrderID,
        c.CompanyName,
        e.LastName as EmployeeLastName
    FROM "Order" as o
    JOIN Customer as c
        ON o.customerid = c.id
    JOIN Employee as e
        ON o.employeeid = e.id;
