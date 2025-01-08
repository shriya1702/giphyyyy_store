# Project README

## Project Structure and Naming Conventions

To ensure consistency, scalability, and maintainability in our codebase, we've followed a specific folder structure and naming conventions for this React Native project.

### 1. **Folder Structure**

The project's `src` folder contains the main codebase. Here’s an overview of the folder structure:

```
/my-react-native-app
│
├── /src
│   ├── /assets            # Static resources like images, icons, and fonts.
│   ├── /components        # Reusable UI components (buttons, inputs, etc.).
│   ├── /navigation        # React Navigation setup (stacks, tabs, etc.).
│   ├── /redux             # Redux store, actions, reducers, slices.
│   ├── /screens           # Screen components (each represents a view or screen).
│   ├── /services          # API calls, authentication services, etc.
│   ├── /styles            # Centralized styles (colors, fonts, etc.).
│   ├── /utils             # Utility functions and helpers.
│   ├── App.tsx            # Main entry point of the application.
│   └── index.tsx          # Entry point for React Native.
│
├── /android               # Android platform-specific code.
├── /ios                   # iOS platform-specific code.
├── /node_modules          # Installed npm packages.
└── package.json           # Project dependencies and scripts.
```

### 2. **Naming Conventions**

Consistent naming conventions help with readability and maintainability of the code. Below are the guidelines followed in this project:

#### **Folders**:
- All folder names should be **lowercase**.
- If a folder contains multiple words, separate them with a hyphen (`-`) or underscore (`_`).
  - Examples: 
    - `components/`
    - `redux/`
    - `screens/`

#### **Files**:
- **Component files**: Use **PascalCase** (first letter of each word capitalized).
  - Example: `Button.tsx`, `ProfileScreen.tsx`
  
- **Screen files**: Use **PascalCase**.
  - Example: `HomeScreen.tsx`, `LoginScreen.tsx`

- **Redux files** (actions, reducers, slices): Use **PascalCase**.
  - Example: `authSlice.ts`, `userSlice.ts`

- **Service files** (e.g., API, authentication): Use **camelCase**.
  - Example: `authService.ts`, `apiService.ts`

- **Utility files**: Use **camelCase**.
  - Example: `validateEmail.ts`, `formatDate.ts`

- **Constants files**: Use **UPPERCASE_WITH_UNDERSCORES**.
  - Example: `COLORS.ts`, `FONTS.ts`

### 3. **Folder Breakdown**

#### `src/assets/`
This folder contains static resources like images, icons, and fonts used across the application.
- Example: `logo.png`, `Roboto-Regular.ttf`

#### `src/components/`
This folder contains reusable UI components used throughout the application. Components should be independent, self-contained units of functionality.

- Example: **Button.tsx**
```tsx
// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
```

#### `src/screens/`
Screens represent the main views or pages in your app. Each screen is a separate component.
- Example: **HomeScreen.tsx**
```tsx
// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const HomeScreen = () => {
  const handlePress = () => {
    console.log('Button Pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
```

#### `src/navigation/`
This folder contains all the navigation setup for your app, such as stack, tab, and drawer navigation.

Example: **MainNavigator.tsx**:
```tsx
// src/navigation/MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
```

#### `src/redux/`
This folder contains all the Redux-related files such as actions, reducers, and slices.

Example: **authSlice.ts**:
```tsx
// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    signOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
```

#### `src/services/`
This folder contains services for making API requests, handling authentication, etc.

Example: **authService.ts**:
```tsx
// src/services/authService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
```

#### `src/styles/`
This folder is for centralized styling, including color, font, and other style-related constants.

Example: **colors.ts**:
```tsx
// src/styles/colors.ts
export const COLORS = {
  primary: '#6200ee',
  secondary: '#03dac6',
  background: '#f5f5f5',
  text: '#000000',
};
```

### 4. **Note**

By adhering to this folder structure and naming conventions, we ensure that our code is consistent, easy to navigate, and scalable. If you're unsure about any naming conventions or folder organization, please refer to this guide. Consistent structure helps improve the collaboration and maintainability of the project.

---