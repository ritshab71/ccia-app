# ccia-app

ccia-app is a repository containing all React code for the ccia frontend application.

## Frontend Function

- The ccia-app can be used to run queries based on 'patient ID', 'sample ID' through an autocomplete feature that helps the user target their required search query term.
- It can also run queries through 'filename' by implementing REGEX matching of the search query term to the filenames in the database.
- Filter parameters can be used to additionally specify a particular type of query based on filetype, minimum and maximum filesize, sample type, reference genome and the platform location.
- When entering minimum and maximum filesize, the user needs to ensure they input it in a valid format (eg. 10 mb, 23 GB, 4 kb).

## Frontend Design

<img width="800" alt="Screen Shot 2021-08-05 at 12 20 11 pm" src="https://user-images.githubusercontent.com/86877481/128281672-2c96b549-8f0b-47f4-8bf7-4b40047fe3a4.png">

<img width="800" alt="Screen Shot 2021-08-05 at 12 19 54 pm" src="https://user-images.githubusercontent.com/86877481/128281724-acb51d69-a525-4f21-b431-bd0e195d0521.png">

# Getting Started

1. Clone the repository:

```
$ git clone https://github.com/ritshab71/ccia-app.git
```

2. Go into the ccia-app repository:

```
$ cd ccia-app
```

# Node Setup

1. Install node.js (ensure you are using v14.17.4 or later):

```
ccia-app$ brew install nvm
ccia-app$ nvm install 14.17.4
```

2. Check if node.js is installed:

```
ccia-app$ node --version
v14.17.4
```

3. Install project dependencies:

```
ccia-app$ npm install
```

4. Ensure 'node_modules' has been created:

```
.
├── node_modules
├── public
└── src
```

# Backend Setup

## 1. IP Access

Contact an admin to register your IP address to the backend server.

## 2. SSH Setup

Generate a ssh key and save it into 'id_rsa':

```
$ ssh-keygen -t rsa
```

Copy and store the ssh key:

```
$ cd .ssh/
$ cat id_rsa.pub
```

Contact an admin to register your ssh key to the backend server.

## 3. API Setup

Once registered, ssh into the backend repository:

```
$ ssh -i ~/.ssh/desn2000 d2kfiletrack@20.191.211.229
```

Go into the API directory:

```
$ cd zcc_tracker_api
```

Ensure you are on branch 'syan':

```
zcc_tracker_api$ git branch
  jasonS
  master
* syan
```

If you are on a different branch, checkout to 'syan':

```
zcc_tracker_api$ git checkout syan
zcc_tracker_api$ git branch
  jasonS
  master
* syan
```

Install 'poetry' if you haven't:

```
zcc_tracker_api$ pip install poetry
```

Start the backend server:

```
zcc_tracker_api$ poetry run python server.py
```

# Frontend Setup

1. Go into the ccia-app repository previously cloned:

```
$ cd ccia-app
```

2. Run the ccia frontend application:

```
ccia-app$ npm start
```

3. Access the app on "http://localhost:3000".
