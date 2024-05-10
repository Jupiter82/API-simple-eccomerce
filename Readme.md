
Requirement
Features
users
-admin

    Banner 
    = CRUD

src

/config - all the configurations
/routes
/module
    /auth
    /banner
    /


    /utilities
    /services




// Auth
    -> Register             // post => /register
    -> Activation           // get => /activate/:token
    -> Password Set         // post => /set-password/:token
    -> Login                // post => /login 
    -> Forget Password      // post => /forget-password
    -> Reset Password       // post => /reset-password
    -> Logout               // get => /logout
    -> Role based Access control

    //User 
    => User Create (register)
    => User List (read all users)
    => User List Based on filter
    => User detail based on ID
    => User update based on ID
    => User delete based on ID

    //banner 
    => banner Create (register)
    => banner List (read all users)
    => banner List Based on filter
    => banner detail based on ID
    => banner update based on ID
    => banner delete based on ID


Route ===> Middleware 
        ---- response return
        res.json()


Route ===> MIddleware-----> Middleware ---------> Middleware =========> Controller


4x 
400 => Bad Request
401 => Unathorized
403 => Access Denied
404 => Not found
422 => Unprocessable Entity



application                                         smtp(25,465,587,2525)                gmail.com
Node app                                            SMTP Server                          IMAP/POP3

mailtrap
sendgrid
mailchimp
gmail


Node Application ===> Laptop ===> Router Block ===> ISP Server ===>NepalTelecome Server ===> Internet ===> Gmail


Registration

Data ===> Validate ===> Mapping ===> Store(Database)
Database ===> Choose

Relational Database
    -mysql, mariadb, postgresql,sqlite,oracle,mssql
Non-Relational DB
    - mangodb ,couchdb, cassandra, redis

Sql(structure quey language),noSql(not structure quey language)

Non-Relational DB
orders
------------------------------------------------------------------------------------------------------------------------
id      name         product        price          qty          totalAmt           createDate 
------------------------------------------------------------------------------------------------------------------------
1        Ram         iPhone 12      128000         1              128000            2023-12-28
------------------------------------------------------------------------------------------------------------------------
2        ram         iphone12       120000         1              100000            2023-12-29
------------------------------------------------------------------------------------------------------------------------
3        ram         iPhone 12      129000         1              129000            2023-12-30



Relational DB

users                                           products
----------------                                -------------------------  
id      name                                    id      name       price
--------------                                  ---------------------------
1       Jupiter                                 1       IPhone 12   128000    

orders
------------------------------------------------------------------------------------------------------------------------
id      UserId         productID           qty          totalAmt           createDate 
------------------------------------------------------------------------------------------------------------------------
1        1                   1             1              128000            2023-12-28
------------------------------------------------------------------------------------------------------------------------
2        1                    1             1               128000              2023-12-29
------------------------------------------------------------------------------------------------------------------------
3        1                    1             1              128000              2023-12-30


# Mangodb
- Localize
- Cloud host(Atlas)

## Mangodb Downloads
    -> Community Server
    -> Mangodb Shell
    -> Mangodb Compass


windows => Edit system Environment Variable

host => localhost/127.0.0.1
protocol => mangodb
user => null
password => null
port => 27017
dbName => ........

url ===> mangodb://user:password@127.0.0.1:27017/dbname

mongosh
===> Switch db from shell
    ----> use <dbname>
===> List of dbs
    ----> show dbs;
===> Current DB(Activate Db)
    ----> db;
===> To list all the tables in current DB
    ----> show tables;




## ORM / ODM
    ===> Object Relational Mapping/Modeling
    ===> Object Document Mapping/Modeling


Document Based
core ===> ODM providers ===> Mongoose
tables ----> collection