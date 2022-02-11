## 🧝‍♂️ User features requirements

> Feature requirements of the **User** scope.

- ✔ **Create account**
  - [x] It should be possible to create a user account with **name**, **email** and **password**;
  - [x] It must not be possible to create a user account with the **email** of another;

- ✔ **Authentication**
  - [x] It must be possible to authenticate the user with **email** and **password**;
  - [x] It must not be possible to authenticate a user with the wrong **password**;
  - [x] User authentication must have a **duration** of 15 min.

- 📅 **Password recovery**
  - [ ] Must send a password recovery email to the **email address** provided by the user with a **link** to the password reset page;
  - [ ] Email should not be sent if user does not exist;
  - [ ] The password recovery link must have a **duration** of 2 hours.

- 📅 **Profile**
  - [x] It should be possible to get user profile data;
  - [x] It should be possible to update user **name**;
  - [x] It should be possible to update user **email**;
  - [x] It should be possible to update user **password**;
  - [ ] It should be possible to update user **avatar picture**;
  - [ ] It should be possible to remove user **avatar picture**.
