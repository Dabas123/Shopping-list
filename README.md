# Shopping list app

This project is under development, it is not recommended to test it because it is not stable!

## Project description

This is my first Next.js app, i would make a shopping list app, with these features:
- Multi user functions (login, own list)
- Many lists belong to a person
- In a list has many items
- A item status is one of these: deleted, completed, active
- Deploy the app in my homepage


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Authentication
I use Auth0 authentication provider. Use only email/password authentication process.

## Database
I use Mysql database for backend functions.

### Steps for settings a db (use mysql cli):
- CREATE USER 'shoppinglist_user'@'localhost' IDENTIFIED BY 'shoppinglist_psw';
- CREATE DATABASE shoppinglist;
- GRANT ALL ON shoppinglist.* TO 'shoppinglist_user'@'localhost';

### Create shoppinglist table
create table shoppinglist (
    ID bigint primary key auto_increment,
    title varchar(255)
    );

### Create shoppingitem table
create table shoppingitem (
    ID bigint primary key auto_increment,
    list_id bigint,
    foreign key (list_id) references shoppinglist(ID),
    title varchar(255)
    );

