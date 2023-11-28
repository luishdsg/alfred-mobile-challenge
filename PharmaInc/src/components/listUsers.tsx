// UserListItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';
import Swipeout from 'react-native-swipeout';
import { components } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


interface SwipeoutButton {
  text: string;
  backgroundColor: string;
  color: string;
  onPress: (user?: _getRandomUserInterface) => void;
}

interface UserListItemProps {
  user: _getRandomUserInterface;
  swipeoutBtns: SwipeoutButton[];
  onPress: (user?: _getRandomUserInterface | null) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, swipeoutBtns, onPress = () => { } }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);
    return `${addLeadingZero(day)}/${addLeadingZero(month)}/${year}`;
  };


  const handlePress = () => {
    if (onPress) {
      onPress(user);
    }
  };


  return (
    <Swipeout style={components.bgDarkBlue} right={swipeoutBtns} autoClose>
      <TouchableOpacity onPress={handlePress} style={components.TouchableOpacity}>
        <Image source={{ uri: user.picture.thumbnail }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={components.centralText}> <Ionicons name="person-outline" size={14} color="#293241" /> {`${user.name.first} ${user.name.last}`}</Text>
          <Text style={components.centralText}> <Entypo name="location-pin" size={14} color="#293241" /> {user.location.country}</Text>
          <Text style={components.centralText}> <MaterialCommunityIcons name="cake-variant-outline" size={14} color="#293241" /> {formatDate(user.registered.date)}</Text>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

export default UserListItem;
