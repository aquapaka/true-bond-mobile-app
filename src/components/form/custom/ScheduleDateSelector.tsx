import { BookingSlot, TimeSlot, Weekday } from "@/src/types/CounselorProfile";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

interface SessionDatePickerProps {
  availableSlots: BookingSlot[]; // List of available days and times
  onSelect: (date: Date) => void; // Callback when date & time is selected
}

const SessionDatePicker: React.FC<SessionDatePickerProps> = ({
  availableSlots,
  onSelect,
}) => {
  const [selectedDay, setSelectedDay] = useState<Weekday | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [nextAvailableDays, setNextAvailableDays] = useState<
    { day: Weekday; date: Date }[]
  >([]);

  // Extract available days with their full Date
  useEffect(() => {
    const today = new Date();
    const availableDaysWithDates = availableSlots.map((slot) => {
      const targetDate = new Date(today);
      const dayOffset =
        ([
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].indexOf(slot.day) -
          today.getDay() +
          7) %
        7;
      targetDate.setDate(today.getDate() + dayOffset);

      return { day: slot.day, date: targetDate };
    });

    setNextAvailableDays(availableDaysWithDates);

    if (availableDaysWithDates.length > 0) {
      setSelectedDay(availableDaysWithDates[0].day); // Auto-select first available day
    }
  }, [availableSlots]);

  // Handle selecting a time slot
  const handleSelectTime = (slot: TimeSlot) => {
    if (!selectedDay) return;
    setSelectedTime(slot);

    const selectedDayData = nextAvailableDays.find(
      (d) => d.day === selectedDay
    );
    if (!selectedDayData) return;

    const selectedDate = new Date(selectedDayData.date);
    selectedDate.setHours(parseInt(slot.split(":")[0]), 0, 0, 0);

    onSelect(selectedDate);
  };

  // Format date (DD/MM/YYYY)
  const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

  return (
    <View>
      {/* Select Available Day */}
      <Text
        variant="labelMedium"
        style={{ fontWeight: "bold", marginBottom: 8 }}
      >
        Select a Day
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {nextAvailableDays.map(({ day, date }) => (
          <Chip
            key={day}
            selected={selectedDay === day}
            onPress={() => setSelectedDay(day)}
            compact
          >
            {day} ({formatDate(date)})
          </Chip>
        ))}
      </View>

      {/* Select Available Time */}
      {selectedDay && (
        <>
          <Text
            variant="labelSmall"
            style={{ fontWeight: "bold", marginTop: 12, marginBottom: 8 }}
          >
            Available Time Slots for {selectedDay}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {availableSlots
              .find((slot) => slot.day === selectedDay)
              ?.slots.map((slot) => (
                <Chip
                  key={slot}
                  selected={selectedTime === slot}
                  onPress={() => handleSelectTime(slot)}
                  compact
                >
                  {slot}
                </Chip>
              ))}
          </View>
        </>
      )}
    </View>
  );
};

export default SessionDatePicker;
