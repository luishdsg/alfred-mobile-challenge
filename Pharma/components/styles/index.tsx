import react from 'react';
import { StyleProp, ViewStyle,StyleSheet } from "react-native";

export const fullView: StyleProp<ViewStyle> = {
  height: '100%',
  width: '100%',
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#3D5A80',
  },
  search:{
    borderRadius: 50,
    backgroundColor: 'transparent',
    padding: 4,
    flex: 1,
    marginRight: 10
  }
});

// #3D5A80. #98C1D9, #E0FBFC, #EE6C4D, #293241