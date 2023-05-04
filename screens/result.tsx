import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NavigationStackProp} from 'react-navigation-stack';
import React from 'react';
import {scoreStore} from './score';

interface Props {
  navigation: NavigationStackProp;
}

const resetScore = () => {
  scoreStore.reset();
};

const Result: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Score: {scoreStore.score}</Text>
      </View>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://merriam-webster.com/assets/mw/images/quiz/quiz-games-landing-featured-lg/an%20simple%20illustration%20of%20a%20confused%20brain%20becoming%20enlightened-8511-81a8b6e0ad3f5ff9251b55b357369be3@1x.jpg',
          }}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPressOut={() => resetScore()}
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Result;

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 375,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#1A759F',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: 'green',
  },
  containerTitle: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
