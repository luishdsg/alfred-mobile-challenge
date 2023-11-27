import { StyleProp, ViewStyle, StyleSheet } from "react-native";
export const fullView: StyleProp<ViewStyle> = {
  height: '100%',
  width: '100%',
  backgroundColor: '#293241'
};
export const p2: StyleProp<ViewStyle> = {
  padding: 20
};
export const mb_4: StyleProp<ViewStyle> = {
  marginBottom: 50
};

export const components = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  notFavorite:{
    justifyContent: 'center',
    color: '#E0FBFC',
    top: '40%',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  search: {
    borderRadius: 50,
    backgroundColor: '#3D5A80',
    height: 40,
    color: '#E0FBFC',
    padding: 10,
    flex: 1,
    marginRight: 10
  },
  noResults: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightText: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
  favoriteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButton: {
    backgroundColor: '#EE6C4D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 100,
    width: 100,
  },
  snackbar: {
    elevation: 999, 
  },
  bgBlue: {
    backgroundColor: '#3D5A80'
  },
  bgDarkBlue: {
    backgroundColor: '#293241'
  },
  bglightBlue: {
    backgroundColor: '#98C1D9'
  },
  bgBabyBlue: {
    backgroundColor: '#E0FBFC'
  },
  colorBabyBlue: {
    color: '#E0FBFC'
  },
  centralText: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: '#293241'
  },
  msgFavorited: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: '#E0FBFC',
    borderRadius: 20,
    backgroundColor: '#293241'
  },
  TouchableOpacity:{
    padding: 16, borderRadius: 15, margin: 10,flexDirection: 'row', backgroundColor: '#98C1D9',height: 85 
  }
});
export const modal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#E0FBFC',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  modalBlur: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'
  },
  modal: {
    backgroundColor: '#E0FBFC',
    padding: 30,
    width: '100%',
    height: '60%',
    bottom: 0,
    position: 'absolute',
    borderRadius: 30,
  },
  profile:{
    width: 120, height: 120, borderRadius: 100,
    borderWidth: 3,
    borderColor: '#3D5A80',
  },
  roomPic:{
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    top: -90,
    backgroundColor: 'transparent'
  },
  infos:{
    fontSize: 20,
    lineHeight: 30,
    top: -60
  },
  addFavorite:{
    width: '100%',
    height: 50,
    border: 0,
    padding:0,
    top: -50,
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#98C1D9'
  },
  close:{
    borderRadius: 100,
    height: 50,
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#EE6C4D',
    top: -40,
    width: '100%',
    backgroundColor: 'transparent'
  }
})