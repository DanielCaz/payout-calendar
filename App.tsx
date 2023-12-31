import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./colors";
import { useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import { dateToString } from "./utils";

export default function App() {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const calculateMarkedDates = (month: number, year: number) => {
    let firstTargetDate = new Date(year, month - 1, 13);
    if (firstTargetDate.getDay() === 0) {
      firstTargetDate.setDate(11);
    } else if (firstTargetDate.getDay() === 6) {
      firstTargetDate.setDate(12);
    }

    let secondTargetDate = new Date(year, month - 1, 28);
    let daysInMonth = new Date(year, month, 0).getDate();
    if (daysInMonth === 30) {
      secondTargetDate.setDate(28);
    } else {
      secondTargetDate.setDate(29);
    }
    if (secondTargetDate.getDay() === 0) {
      secondTargetDate.setDate(secondTargetDate.getDate() - 2);
    } else if (secondTargetDate.getDay() === 6) {
      secondTargetDate.setDate(secondTargetDate.getDate() - 1);
    }

    let markedDates: MarkedDates = {};
    const options = { selected: true };

    markedDates[dateToString(firstTargetDate)] = {
      ...options,
      selectedColor:
        new Date().getDate() === firstTargetDate.getDate()
          ? colors.secondary
          : colors.primary,
    };
    markedDates[dateToString(secondTargetDate)] = {
      ...options,
      selectedColor:
        new Date().getDate() === secondTargetDate.getDate()
          ? colors.secondary
          : colors.primary,
    };

    setMarkedDates(markedDates);
  };

  useEffect(() => {
    const today = new Date();

    calculateMarkedDates(today.getMonth() + 1, today.getFullYear());
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Payout Calendar</Text>
          </View>
          <Calendar
            style={styles.calendar}
            theme={{
              arrowColor: colors.primary,
              todayTextColor: colors.secondary,
            }}
            markedDates={markedDates}
            onMonthChange={(date) =>
              calculateMarkedDates(date.month, date.year)
            }
          />
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.base,
    flex: 1,
  },
  header: {
    backgroundColor: colors.secondary,
    padding: 15,
  },
  headerText: {
    fontSize: 22,
    color: colors.base,
    fontWeight: "bold",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 5,
    margin: 10,
  },
});
