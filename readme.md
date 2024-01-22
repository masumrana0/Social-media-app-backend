# SOCIAL-MEDIA-BACKEND

## Overview

Social-Media application.In this app have become an integral part of daily life, offering users diverse features to share, interact, and engage with content.

## Social Media Application - Key Features

### User Profiles:

- Users create personalized profiles with details such as name, profile picture, bio, and other relevant information.
- Profiles serve as the user's digital identity, reflecting their interests, activities, and connections.

### Content Sharing:

- Users can share various types of content, including text posts, images, and links.
- Content sharing is at the core of the social media experience, enabling users to express themselves and share moments with their network.

### News Feed:

- A dynamic feed displays content from users' connections and the broader community.
- Algorithms curate the feed based on user preferences, engagement history, and trending topics.

### Interactions:

- Users can engage with content through likes, comments, and shares, fostering interaction and creating a sense of community.
- Real-time notifications keep users informed about interactions on their content.

### Friendship and Connections:

- Users can connect with others by sending friend requests or following profiles.
- Friendships and connections form the foundation of the social network, enabling users to stay updated on each other's activities.

### Messaging and Chat:

- Private messaging features allow users to communicate one-on-one or in group chats.
- Emojis, stickers, and multimedia sharing enhance the messaging experience.

### Privacy and Security:

- Robust privacy settings empower users to control the visibility of their content and personal information.
- Security measures, such as account verification and two-factor authentication, enhance user safety.

### Explore and Discover:

- Discovery features help users find new content, connect with like-minded individuals, and explore trending topics.
- Hashtags and trending sections facilitate content discovery on a broader scale.

## Technology Stack

#### Backend

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js.
- **Mongoose**: Query language.
- **Mongodb**: Non-Relational Database.
- **JWt**:JWT use for authentication.
- **Zod**:zod use for data validation before saving data into database.

## How to Contribute.

When you contribute, you will create a branch in your own name. Then, you will push your contributed code to that branch.Please Remember, After pushing the code, you must submit a pull request to the development branch.

## please follow these steps:

1. Clone the repository:

```bash
   git clone https://github.com/masumrana0
```

2. Create a branch with your own name:

```bash
   git branch your-name
```

3.Contribute and push code:

```bash
git push origin brach-name
```

## How to commit organisely

#### Commit-type

- auth: User authentication.
- feat: A new feature for the user.
- fix: A bug fix.
- chore: Routine tasks, maintenance, or refactoring.
- docs: Documentation changes.
- style: Code style changes (e.g., formatting).

##### commit message format

git commit -m '<type>:[description]',

- **Like:**

```bash
  git commit -m '<auth>: implement JWT-based authentication'

```

### Data Pattern

#### Collection

- **user:**
- **profile**:
- **post**:
- **comment**:
- **Register:**

```json
{
  "userName": "omukhasan123",
  "name": {
    "firstName": "Omuk",
    "lastName": "Hasan"
  },
  "email": "omukhasan@gmail.com",
  "PhoneNumber": "01978797987",
  "password": "12345"
}
```

- **goole authentication**

```json
"userName":"omukhasan123",
"photoUrl":" ",
"displayName":"Omuk Hasan ",
"email":"omoukhasan@gmail.com",
```

- **Login**

```json
{
  "email": "masum.rana6267@gmail.com",
  "password": "123456"
}
```

- **Profile:**:

```json
  "user":"reference id",
  "Bio":"ramdom text "
  "skills": ["JavaScript", "React js"],
  "Education": ["HSC", "honus", "masters"],
  "Gender": "male",
  "Nationality": "Bangladeshi",
  "DateofBirth": "12/01/2023",
  "profilePicture": "url",
  "socialMediaLinks": ["https://www.facebook.com/", "https://www.linkedin.com/", "https://github.com/"],
  "friendList":['reference id']
```

- **post**:

```json
[
  {
    "user": "reference id",
    "hashTag": "#random",
    "status": " ramdom text anythig ",
    "Images": [],
    "comments": "reference id",
    "Reactions": [
      { "userID": 555, "emoji": "👍" },
      { "userID": 999, "emoji": "❤️" },
      { "userID": 555, "emoji": "👎" }
    ],
    "Location": {"latitude": 37.7749, "longitude": -122.4194},
    "ShareCount": 10
    "postVisibility":{
      "public":true,
      "friendlyOnly":true,
      "onlyMe":false
    }
  }
  "sharedPost": "reference id",
]
```

- **Notification**:,

```json
{
  "user": "reference id",
  "text": "ramdomString"
}
```

Thank You.
written by Masum Rana.
