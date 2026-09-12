import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  Pressable,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';

const ANDROID_BACKGROUND_COLOR = '#FFFFE0';
const IOS_BACKGROUND_COLOR = '#B0E0E6';

export default function App() {
  const [enteredFeedback, setEnteredFeedback] = useState('');
  const [feedbackCollection, setFeedbackCollection] = useState([]);

  // Отримуємо актуальні розміри екрана для відстеження повороту
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  function feedbackInputHandler(enteredText) {
    setEnteredFeedback(enteredText);
  }

  function addFeedbacHandler() {
    if (enteredFeedback.trim() === '') return;

    setFeedbackCollection((curFeedbackCollection) => [
      ...curFeedbackCollection,
      enteredFeedback,
    ]);
    setEnteredFeedback('');
  }

  return (
    <View
      style={[
        styles.appContainer,
        {
          backgroundColor: Platform.select({
            android: ANDROID_BACKGROUND_COLOR,
            ios: IOS_BACKGROUND_COLOR,
            default: '#ffffff',
          }),
        },
      ]}
    >
      <View style={isLandscape ? styles.landscapeWrapper : styles.portraitWrapper}>
        {/* Навігаційний блок */}
        <View style={isLandscape ? styles.headerLandscape : styles.header}>
          <View style={isLandscape ? styles.menuItemsLandscape : styles.menuItemsPortrait}>
            <Pressable onPress={() => Alert.alert('Go to Home!')}>
              <Text style={styles.headerItem}>Home</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert('Go to Catalog!')}>
              <Text style={styles.headerItem}>Catalog</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert('Go to Order!')}>
              <Text style={styles.headerItem}>Order</Text>
            </Pressable>
          </View>

          {/* Картинка відображається тільки в ландшафтному режимі */}
          {isLandscape && (
            <Image
              source={require('./assets/Feedback_Icon.png')}
              style={styles.navIconLandscape}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Основний блок */}
        <View style={[styles.main, isLandscape && styles.mainLandscape]}>
          <Text style={styles.headerText}>Feedback form</Text>

          <View style={[styles.inputContainer, isLandscape && styles.inputContainerLandscape]}>
            <TextInput
              editable
              multiline
              numberOfLines={isLandscape ? 3 : 6}
              maxLength={500}
              style={[styles.textInput, isLandscape && styles.textInputLandscape]}
              placeholder="Enter your comment"
              onChangeText={feedbackInputHandler}
              value={enteredFeedback}
            />
            <Pressable
              style={[styles.button, isLandscape && styles.buttonLandscape]}
              onPress={addFeedbacHandler}
            >
              <Text style={styles.buttonText}>Add feedback</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.scrollContainer}>
            {feedbackCollection.map((feedback, index) => (
              <Pressable key={index}>
                <Text style={[styles.feedbackItem, styles.shadowProp]}>
                  {feedback}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 50,
    paddingHorizontal: 16,
  },
  portraitWrapper: {
    flex: 1,
  },
  landscapeWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D8BFD8',
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
  headerLandscape: {
    width: '25%',
    backgroundColor: '#D8BFD8',
    padding: 12,
    borderWidth: 1,
    borderColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuItemsPortrait: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menuItemsLandscape: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
  },
  navIconLandscape: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  main: {
    flex: 1,
  },
  mainLandscape: {
    width: '75%',
    paddingLeft: 16,
  },
  headerItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00008B',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00008B',
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#DDA0DD',
  },
  inputContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    width: '90%',
    height: 120,
    fontSize: 18,
    padding: 8,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
  },
  textInputLandscape: {
    width: '65%',
    height: 80,
  },
  button: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    marginTop: 15,
    backgroundColor: '#DDA0DD',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonLandscape: {
    width: '30%',
    marginTop: 0,
    height: 80,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00008B',
  },
  scrollContainer: {
    flex: 1,
  },
  feedbackItem: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E6E6FA',
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
  },
  // Платформно-специфічні тіні
  shadowProp: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
});