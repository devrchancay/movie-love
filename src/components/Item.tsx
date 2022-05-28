import { Image } from "react-native";
import { useWindowDimensions } from "react-native";
import Box from "./Box";
import Text from "./Text";

function Item({ item }: { item: any }) {
  const { width } = useWindowDimensions();
  return (
    <Box flexDirection="row">
      <Box width={120}>
        <Image
          source={{ uri: item.Poster }}
          style={{
            width: 105,
            height: 140,
            borderRadius: 5,
            overflow: "hidden",
          }}
        />
      </Box>
      <Box justifyContent="space-between" width={width - 170} pb={2}>
        <Box>
          <Text variant="bold" fontSize={3}>
            {item.Title}
          </Text>
          <Text variant="light" fontSize={2}>
            {item.Year}
          </Text>
        </Box>
        <Box width={80} py={1} bg="primary" borderRadius={10}>
          <Text color="text" variant="light" fontSize={3} textAlign="center">
            {item.Type?.toUpperCase()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Item;
