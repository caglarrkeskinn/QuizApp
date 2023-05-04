import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {scoreStore} from './score';

interface Props {
  navigation: NavigationStackProp;
}
interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz: React.FC<Props> = ({navigation}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [options, setOptions] = useState([]);

  const generateOptionsAndShuffle = (_question: any) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const getQuiz = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleAnswer = (_options: any) => {
    console.log(_options === questions[currentQuestion].correct_answer);
    if (_options === questions[currentQuestion].correct_answer) {
      scoreStore.correct();
      handleSkip();
    }
    handleSkip();
  };

  const handleSkip = () => {
    if (currentQuestion === 9) {
      handleEnd();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setOptions(generateOptionsAndShuffle(questions[currentQuestion + 1]));
    }
  };

  const handleEnd = () => {
    navigation.navigate('Result');
  };
  const handlePrev = () => {
    if (currentQuestion === 0) {
      navigation.navigate('Home');
    } else {
      setCurrentQuestion(currentQuestion - 1);
      setOptions(generateOptionsAndShuffle(questions[currentQuestion - 1]));
    }
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>
              {currentQuestion + 1}){'\n\n'}
              {'\t'}
              {decodeURIComponent(questions[currentQuestion].question)}
            </Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleAnswer(options[0])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[0])}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleAnswer(options[1])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[1])}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleAnswer(options[2])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[2])}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleAnswer(options[3])}>
              <Text style={styles.option}>
                {decodeURIComponent(options[3])}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom}>
            {currentQuestion === 0 && (
              <TouchableOpacity style={styles.button} onPress={() => null}>
                <Text style={styles.buttonText}>PREVIOUS</Text>
              </TouchableOpacity>
            )}
            {currentQuestion !== 0 && (
              <TouchableOpacity style={styles.button} onPress={handlePrev}>
                <Text style={styles.buttonText}>PREVIOUS</Text>
              </TouchableOpacity>
            )}
            {currentQuestion !== 9 && (
              <TouchableOpacity style={styles.button} onPress={handleSkip}>
                <Text style={styles.buttonText}>SKIP</Text>
              </TouchableOpacity>
            )}
            {currentQuestion === 9 && (
              <TouchableOpacity
                style={styles.buttonFinish}
                onPress={() => navigation.navigate('Result')}>
                <Text style={styles.buttonText}>FINISH</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
export let score: number;
export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonFinish: {
    backgroundColor: 'tomato',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 24,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
  selectedOptionButton: {
    color: 'black',
  },
  selectedOption: {
    color: 'black',
  },
});
