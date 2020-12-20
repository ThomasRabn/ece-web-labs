# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - First deployment - 20-12-2020

Bump to version 1.0.0 - First deployment.

### Modified

- **[front-end]** - Settings page: Graphical updates

## [0.0.7] - Image upload - 20-12-2020

### Added

- **[front-end]** - Upload image button in the register page.
- **[back-end]** - Images API to GET and POST their information in the database.

### Modified

- **[front-end]** - Register page: upload image button.
- **[front-end]** - Settings page: upgraded
- **[front-end]** - Register page: form not sent until a name is provided
- **[front-end]** - Register page: picture is refreshed when changed

## [0.0.6] - Maximum security  - 19-12-2020

### Added

- **[readme]** - Almost complete version added.
- **[license]** - MIT License added.
- **[front-end]** - Return to home button placed above the channels.

### Modified

- **[front-end]** - Invite Friends popup modified.
- **[front-end]** - Create Channel popup modified.
- **[back-end]** - Create Channel's invited users are persistent in the database.
- **[back-end]** - Security reinforced, users face a 404 response if they try to access a unauthorized ressource.

## [0.0.5] - Messages modification and deletion & Register page - 18-12-2020

### Added

- **[back-end]** - Ability to delete your own messages.
- **[back-end]** - Ability to modify your own messages.
- **[back-end]** - User creation.
- **[front-end]** - Popup to confirm deletion of a message.
- **[front-end]** - Popup to modify a modification of a message.
- **[front-end]** - Opening a register page when the account does not exists.

### Modified

- **[front-end]** - Unification of the imports.
- **[front-end]** - Warnings removal.

### Deleted

- **[old]** - Old code version deleted.

## [0.0.4] - Private channels - 17-12-2020

### Added

- **[back-end]** - Unability for a user to access channels they are not in.
- **[front-end]** - Channels printing only contains the channels you are part of.
- **[tests]** **[back-end]** - Adding `.env` password to pass the tests with private channels and messages.
- **[CI]** - Modifying `.travis.yaml` so that it only builds on master's pushes.
- **[CI]** - Adding encrypted key to simulate the `.env` file and pass tests on Travis-CI.

## [0.0.3] - Invite friends - 12-12-2020

### Added

- **[back-end]** - Users can add other users to one of their channels.
- **[front-end]** - Form to invite users to a channel.

### Modified

- **[back-end]** - Channel owner added to the database.

## [0.0.2] - Settings - 10-12-2020

### Added

- **[front-end]** - Basic setting page using Material UI components.

## [0.0.1] - Channel creation - 10-12-2020

### Added

- **[back-end]** - Channel creation.
- **[front-end]** - Form to create a channel.

## [0.0.0] - Start of the project - 09-12-2020

### Added

- **[general]** - Copying teacher's files.
- **[general]** - Fixing errors.
- **[CI]** - Adding a `.travis.yaml` file.

### Modified

- **[front-end]** - Moving from `dayjs` to `luxon` because dayjs does not work.

### Deleted

- **[front-end]** - Removal of Markdown's message content because it does not work.
