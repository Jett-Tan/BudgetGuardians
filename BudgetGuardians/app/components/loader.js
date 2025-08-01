import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

export default Loader = ({ isLoading = false, withText = false }) => {
  return isLoading ? (
    <>
    <View style={styles.loader}>
      <ActivityIndicator size='large' color='#aaaaaa' />
      {withText ? (
          <Text style={{ color: 'grey' }}>Loading...</Text>
        ) : null}
    </View>
    </>
  ) : null;
};
const styles = StyleSheet.create({
  loader: {
    marginVertical: 15,
    alignItems: 'center',
  },
});