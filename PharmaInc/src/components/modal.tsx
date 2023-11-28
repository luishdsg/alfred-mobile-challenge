import { Image, Modal, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { _getRandomUserInterface } from '../interface/getRandomUser-interface';
import { View } from '../utils/Themed';
import favoriteManager from './favoriteManager';
import { modal } from '../styles';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


interface UserDetailsModalProps {
  user: _getRandomUserInterface | null;
  isVisible: boolean;
  onClose: () => void;
}

const ModalDetail: React.FC<UserDetailsModalProps> = ({ user, isVisible, onClose }) => {


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

    return `${addLeadingZero(day)}/${addLeadingZero(month)}/${year}`;
  };


  if (!user) {
    return null;
  }


  const handleAddToFavorites = () => {
    favoriteManager.addFavorite(user);
    onClose();
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      style={{ backgroundColor: 'transparent' }}
    >
      <BlurView intensity={30} style={modal.modalBlur}>
        <View style={modal.modal}>
          <View style={modal.roomPic}>
            <Image source={{ uri: user.picture.large }} style={modal.profile} />
          </View>
          <ScrollView style={modal.scroll}>
            <Text style={modal.infos}>Name: <Ionicons name="person-outline" size={14} color="#293241" /> {`${user.name.first} ${user.name.last}`}</Text>
            <Text style={modal.infos}>Email: <Entypo name="email" size={14} color="#293241" /> {user.email}</Text>
            <Text style={modal.infos}>Gender: <FontAwesome name="transgender-alt" size={14} color="#293241" /> {user.gender}</Text>
            <Text style={modal.infos}>BirthDay: <MaterialCommunityIcons name="cake-variant-outline" size={14} color="#293241" /> {formatDate(user.registered.date)}</Text>
            <Text>{'\n'}</Text>
            <Text style={modal.infos}>Phone: <AntDesign name="phone" size={14} color="#293241" /> {user.phone}</Text>
            <Text style={modal.infos}>Nat: <Feather name="flag" size={14} color="#293241" /> {user.nat}</Text>
            <Text style={modal.infos}>ED: <Entypo name="location-pin" size={18} color="#293241" /> {user.location.street.name} {user.location.street.number} - {user.location.city} - {user.location.state} | {user.location.country}</Text>
            <Text style={modal.infos}>Id: <AntDesign name="idcard" size={14} color="#293241" /> {user.id.value}</Text>
            <TouchableOpacity >
              <Button onPress={handleAddToFavorites} style={modal.addFavorite}>❤️ Favoritar</Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button onPress={onClose} style={modal.close}><Text style={{ color: '#EE6C4D' }}>Fechar</Text></Button>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );
}

export default ModalDetail;