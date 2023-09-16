import { Text, VStack } from "@chakra-ui/react";
import moment from "moment-timezone";
import { useState } from "react";

export function IndexPage() {
  moment.updateLocale("ja", {
    weekdays: [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
  });
  const [time, setTime] = useState(moment().tz("Asia/Tokyo"));

  setInterval(() => {
    setTime(moment().tz("Asia/Tokyo"));
  }, 100);

  return (
    <VStack mt="20vh" spacing={0}>
      <Text fontSize={{ base: "5xl", md: "7xl" }}>{time.format("h:mm")}</Text>
      <Text fontSize={{ base: "lg", md: "xl" }}>
        {time.format("MM月DD日 dddd")}
      </Text>
    </VStack>
  );
}