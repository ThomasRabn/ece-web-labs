# Chat application :speaking_head: - Final project

[![Build Status](https://travis-ci.com/ThomasRabn/ece-web-labs.svg?token=1jxmpSezCsqHsfQfR29Q&branch=master)](https://travis-ci.com/ThomasRabn/ece-web-labs)

This repository contains our final *Webtech* project. It is a simple chat application that aims to provide the most basic functionnalities of a private chat app. It is composed of `back-end` folder, a `front-end` folder, a `dex-config` folder and some configuration files at the root.

## :woman_teacher: Usage :man_teacher:

This web application is made to be simple, and we are going to explain in details how to use it.

- Clone this repository, from your local machine:

  ```bash
  git clone https://github.com/ThomasRabn/ece-web-labs.git webtech
  cd webtech
  ```

- Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:

  ```bash
  # Install Go
  sudo apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```

- We provide a Dex configuration in the `dex-config` folder. It is present so that we are sure that you are able to make our project work by using the exact same Dex configuration. Now that Dex is built and configured, you can launch the Dex server from the root directory with the following commands:

  ```bash
  dex/bin/dex serve dex-config/config.yaml
  ```

- Start the back-end, it will be launched on port 3001

  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  npm install
  # (Optional) Test the back-end functionnalities
  npm test
  # Start the back-end
  npm start
  ```

- Start the front-end, it will be launched on port 3000. Make sure that you are on `127.0.0.1:3000` and not on `localhost:3000`, otherwise the login will not work as Dex only works with `127.0.0.1:3000`

  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  npm install
  # (Optional) Test the front-end
  npm test
  # Start the front-end
  npm start
  ```

## :student: Authors :man_student:

ING4 SI Inter TD03

Thomas RABIAN - thomas.rabian@edu.ece.fr \
Thomas BASTIDE - thomas.bastide@edu.ece.fr

## :mechanic: Tasks :woman_mechanic:

### :woman_office_worker: Project management :man_office_worker:

- #### Naming convention

  We tried our best to have a unified and clean repository. For this, we have put several measures in place: camelCase usage for variables and back-end files, PascalCase usage for components and front-end files.

- #### Project structure

  Having a clean project structure is crucial so that other people can easily understand the project and can find what they want. We tried our best to have a coherent and understandable repository by choosing precise and meaningful names. Our project follows the following structure:

  ```none
  back-end/
  dex-config/
  front-end/
  README.md
  CHANGELOG.md
  .travis.yml
  ...
  ```

- #### Code Quality

  Code quality is one of the most important (if not **the** most important) variable of a project. It is essential to follow a precise naming convention that helps other people understand the code. In our case, we decided to use camelCase for our variable names and we chose to implement a really strong policy on our `imports` in the front-end. Indeed, it is more than important to easily find what we are looking for in the imports, thus we decided to follow this structure:

  ```none
  // import react component
  // import specific libraries (axios, react-dom, react-router-dom...)
  // import jsx
  // import Material UI styles
  // import Material UI core components
  // import Material UI icons
  // import PopupJs component if needed
  // import Local components
  ```

  We also did our best to follow the code quality rules such as:

  - No blank line in the code
  - JSX usage to have functional paradigm in React and shorter files
  - Use of comments for a better understanding

- #### Design, UX

  Considering design and UX, we decided to use as much Material UI components as we could when creating forms and when structuring pages. Material UI is well designed and easy to use, thus we are quite happy with the results. We have never been good front-end programmers, and we did not have time to refine our pages for them to look better.

- #### Git and DevOps <img height="19px" alt="devops" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Devops-toolchain.svg/1280px-Devops-toolchain.svg.png"/>

  - ##### Tests

  We have implemented some `unit tests` in the back-end that can be launched using `npm test`. Because we have an authenticate middleware, the `test` command create a `.env` file that allows the tests to bypass the requested `Authorization` header.

  - ##### Git and Versionning <img height="18px" alt="git" src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"/>

  Since years we have been using Git, it is only since September that we are learning about real DevOps methods and better Git usages. As we are using this GitHub repository since the beginning of the school year, it is a mix of different approaches and it is not well-structured.
  We started the year by using *personal branches*. This means that we had one branch per contributor, we developed on them and we finally merged the changes with the master branch. We did not have any commit policy, we were just writing a commit that we thought was the most useful. Moreover, we always pushed all our commits on the remote repository and never squashed them.
  Since the end of November, we tried to improve our Git knowledge. For this, we implemented a branch policy and a commit policy: branches should be features-centered ans each commit must have a unified message template: `feature: functionnality and changes`. This lets us have a unified and easily understandable master branch. Commits on master must also be rare and important. For this, we followed [this article](https://blog.carbonfive.com/always-squash-and-rebase-your-git-commits)'s workflow for our project. It is a *squash and rebase* workflow which allows us to have a **cleaner** and **easier to understand** versionning graph. Since we are using this workflow, we have a much easier to understand repository and professional-looking commits. We have now totally understood this workflow which is about:
  1. Pulling the latest master branch and integrating its changes in our branch by rebasing our branch on it
  2. Squashing our commits so that we have only one commit per feature
  3. Merging our branch into master

  - ##### Continuous-Integration   <img height="18px" alt="travis-ci" src="https://raw.githubusercontent.com/travis-ci/travis-web/master/public/images/logos/Tessa-pride-4.png"/>

  Because it is a very important point to check that it is possible to deliver an application at any-time, we decided to implement a **CI** workflow using [Travis-CI](https://travis-ci.com). This is why we have a `.travis.yaml` file at the root of our project. Our Travis CI file launches a back-end and front-end build as well as a back-end and front-end test. It can only test our application because we gave it an encrypted `.env` key that allows it to have access to the channels he created.

### :man_technologist: Application development :woman_technologist:

- #### Welcome screens

- #### New channel creation

  A channel creation form is accessible through one of the Welcome page buttons. It shows a popup on which it is possible to choose the name of the channel and the people we want to invite. After validating the channel, the user is directly redirected to the channel page and can send a message.

- #### Channel membership and access

  Each request made to the API is composed of the `Authorization` header that has the OAuth access token of the user. The middleware can then extract the user's information and make sure that they have the rights to do what they are trying to. Each time a user connects, the app sends a verification request to the back-end to make sure that they have an account. If they do not have an account, they are asked to choose a unique username which will finalize their inscription and will persist their account in the database. When creating a channel, a user is automatically added to it as the owner. When inviting other people to a channel, those people are directly added as to the channel and they are granted the access.

- #### Ressource access control

  We did our best to implement a safe and secure ressource access control. Because we want the channels, users and messages to be private, we compare the user linked to the access token sent in the `Authorization` header with the access information of the ressource that is asked. If the ressource is not shared with the user that is requesting it, it is blocked and a bad response is returned. This is primordial to have a secure application.

- #### Invite users to channels

  Because channels are not fun when you are alone, we implemented users' invitations. When on the Welcome page, you can click on the `Invite Friends` button. It will open a popup that is composed of a form. In the first `Select` component, you can choose one of the channel you are part of to invite people in. In the other `Select` component, you need to choose the people to invite. This second component gives you autocomplete choices and can take multiple inputs (to invite multiple users at once). The Autocomplete function is linked to the back-end and returns the 10 first users that match the given start of username. It is way more scalable that a static autocomplete that would be composed of all the users of the database.

- #### Message modification

  Mistakes happen. This is why we decided to implement a message modification in our application. By clicking on the 3 dots on the right of your message, it is possible to choose `Modify`. This will open a popup containing your current message. This message will be modifiable and you can then either apply the changes or discard them. If the user desire to apply them, the changes will be persistently written in the database.

- #### Message removal

  You made an unfunny joke? That happens... If you cannot bear the brunt of being the laughing stock  of the entire channel, you can easily delete your message. By clicking the 3 dots on the right of a message, you will be able to chose `Delete`. When clicking on it, you will face a confirmation popup to make sure that you want to delete this message. This popup contains the channel name and the content of your message so that you are sure that you are not making a mistake! (And do not worry, your joke was not **that** bad after all)

- #### Account settings

  The welcome page is composed of a `Settings` button. This button redirects to a settings page in which we have placed multiple Material UI components. Those components and the functionnalities they implement do not work.

- #### Avatar

  The first time,you login you are redirected to the register page. On this page you can choose your avatar and your username. This avatar must have a `.png` type with a `maximum size of 1 MB`. You will also have the oppportunitie to modify this avatar later on the settings page.
  The Settings page give you the opportunities to test some existing avatar or upload on other one with a drag and drop feature, with the same constraints given in the register page.

## Bonus

- ### Register Page

  It might not really be a bonus, but we implemented a `Register page` that popup when opening the website for the first time. It actually popups when the user does not have an account in the database. On this page, the user can chose his **unique** username and a personalized profile avatar. If the picture is too big, it will open a `SnackBar` that will tell you that the file cannot be proceeded by the application.
