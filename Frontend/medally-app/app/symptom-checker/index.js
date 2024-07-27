import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput} from 'react-native';
import { useForm, Controller } from 'react-hook-form';


export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <View>
        <View style = {styles.header}>
        <Text style={styles.screenTitle}>Symptom Checker</Text>
        <Text>H</Text>
        </View>

        <View>
        <View style = {styles.chatBox}>
      <Controller
          name="chatbox"
          control={control}
          style = {styles.inputfield}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.contentText}
              placeholder="Type.."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text>S</Text>
      </View>
        </View>      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%'
  }, 
  header:{
    flexDirection: 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    marginTop : 25,
    width : '100%'
  },

  
  chatBox: {
    shadowColor: "rgba(0, 0, 0, 0.13)",
    shadowOffset: {
    width: 5,
    height: 4
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    },
    inputfield:{
        textwrap: 'wrap'
    },
  screenTitle: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: "#121419",
    textAlign: "left"
    },

    contentText: {
        fontSize: 16,
        letterSpacing: -0.8,
        fontFamily: "Inter-Regular",
        color: "#7d7d7d",
        textAlign: "left"
    }
});
