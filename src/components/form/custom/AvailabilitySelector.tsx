import { BookingSlot, TimeSlot, Weekday } from "@/src/types/CounselorProfile";
import React, { useState } from "react";
import { View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

// Props for available slots
interface AvailabilitySelectorProps {
  availableSlots: BookingSlot[]; // Counselor's available slots
  onSelect: (selected: BookingSlot[]) => void; // Callback when selection changes
  singleSelection?: boolean; // Allow only one slot to be selected at a time
}

const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({
  availableSlots,
  onSelect,
  singleSelection = false,
}) => {
  const theme = useTheme();
  // Convert availableSlots to a lookup object for quick filtering
  const availableMap = availableSlots.reduce<Record<Weekday, Set<TimeSlot>>>(
    (acc, { day, slots }) => {
      acc[day] = new Set(slots);
      return acc;
    },
    {} as Record<Weekday, Set<TimeSlot>>,
  );

  const [selectedDays, setSelectedDays] = useState<
    Partial<Record<Weekday, TimeSlot[]>>
  >({});

  const toggleTimeSlot = (day: Weekday, slot: TimeSlot) => {
    setSelectedDays((prev) => {
      let newSelection: Partial<Record<Weekday, TimeSlot[]>>;

      if (singleSelection) {
        // Single selection mode: Clear previous selection and set only the new one
        newSelection = { [day]: [slot] };
      } else {
        // Multi-selection mode: Toggle slots
        const updatedSlots = prev[day]?.includes(slot)
          ? prev[day].filter((s) => s !== slot)
          : [...(prev[day] || []), slot];

        newSelection = { ...prev, [day]: updatedSlots };
      }

      // Notify parent of selection change
      onSelect(
        Object.entries(newSelection).map(([key, value]) => ({
          day: key as Weekday,
          slots: value || [],
        })),
      );

      return newSelection;
    });
  };

  return (
    <View>
      {Object.entries(availableMap).map(([day, slots]) => (
        <View key={day} style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 12 }}>{day}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {Array.from(slots).map((slot) => (
              <Chip
                key={`${day}-${slot}`}
                style={{
                  backgroundColor: selectedDays[day as Weekday]?.includes(slot)
                    ? theme.colors.primary
                    : theme.colors.primaryContainer,
                }}
                selected={selectedDays[day as Weekday]?.includes(slot)}
                onPress={() => toggleTimeSlot(day as Weekday, slot)}
                compact
              >
                {slot}
              </Chip>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default AvailabilitySelector;
